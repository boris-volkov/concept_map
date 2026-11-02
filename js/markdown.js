// A small Markdown renderer for concept descriptions.
//
// It handles what explanations need: paragraphs, **bold**, *italic*, `code`,
// [links](url), [[concept-id]] links, images, lists, > quotes, tables, and math
// between $...$ or $$...$$. Raw HTML such as an <iframe> passes through, so a
// Desmos graph or a video can sit inside a concept's description.

import { texToMathML } from './tex.js'

const MATH = '\u0000' // brackets the index of a stashed formula
const HELD = '\u0001' // brackets the index of a stashed inline fragment

export const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

const stripComments = s => s.replace(/<!--[\s\S]*?-->/g, '')

/** Renders block Markdown (paragraphs, lists, tables…) to HTML. opts.resolve(id) finds a concept for [[id]] links. */
export function renderMarkdown(src, opts = {}) {
  const math = []
  const text = protectMath(stripComments(src ?? ''), math)
  return restoreMath(blocks(text.split(/\r?\n/), opts), math)
}

/** Renders one line of Markdown (no paragraphs) to HTML: for titles, summaries, quiz choices. */
export function renderInline(src, opts = {}) {
  const math = []
  return restoreMath(inline(protectMath(stripComments(src ?? ''), math), opts), math)
}

/** Plain text with the Markdown and TeX markup removed: for search, tooltips and labels. */
export function plainText(src) {
  return stripComments(src ?? '')
    .replace(/\$\$?([^$]+)\$\$?/g, (_, t) => t
      .replace(/\\(?:text|mathrm|operatorname|mathbf|mathbb)\{([^}]*)\}/g, '$1')
      .replace(/\\(left|right|displaystyle|,|;|!)/g, '')
      .replace(/\\([a-zA-Z]+)/g, '$1')
      .replace(/[{}]/g, ''))
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, id, t) => t || id)
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[*_`~]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// Math is lifted out before any Markdown runs, so that * and _ inside formulas stay put.
const INLINE_MATH = /^\$((?:\\[\s\S]|[^\\$\s])(?:(?:\\[\s\S]|[^\\$])*?(?:\\[\s\S]|[^\\$\s]))?)\$(?!\d)/

function protectMath(src, store) {
  const put = (tex, display) => {
    store.push({ tex, display })
    return MATH + (store.length - 1) + MATH
  }
  let out = ''
  let i = 0
  while (i < src.length) {
    const c = src[i]
    if (c === '`') {
      const rest = src.slice(i)
      const fence = (i === 0 || src[i - 1] === '\n') && /^(`{3,})[^\n]*\n[\s\S]*?\n\1[ \t]*(?=\n|$)/.exec(rest)
      const span = fence || /^(`+)[\s\S]*?[^`]\1(?!`)/.exec(rest)
      if (span) { out += span[0]; i += span[0].length; continue }
    }
    if (c === '\\') {
      const next = src[i + 1]
      if (next === '(' || next === '[') {
        const end = src.indexOf(next === '(' ? '\\)' : '\\]', i + 2)
        if (end !== -1) { out += put(src.slice(i + 2, end), next === '['); i = end + 2; continue }
      }
      out += c + (next ?? '') // escapes like \$ are resolved by the inline pass
      i += 2
      continue
    }
    if (c === '$') {
      if (src[i + 1] === '$') {
        const end = src.indexOf('$$', i + 2)
        if (end !== -1) { out += put(src.slice(i + 2, end), true); i = end + 2; continue }
      } else {
        const m = INLINE_MATH.exec(src.slice(i))
        if (m) { out += put(m[1], false); i += m[0].length; continue }
      }
    }
    out += c
    i++
  }
  return out
}

// A displayed formula sits in a span of its own, so a long one can scroll sideways without stretching the page.
const restoreMath = (html, store) =>
  html.replace(/\u0000(\d+)\u0000/g, (_, n) => store[n].display
    ? `<span class="math-block">${texToMathML(store[n].tex, true)}</span>`
    : texToMathML(store[n].tex, false))

// ---- blocks ----

const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/
const RULE = /^ {0,3}([-*_])( *\1){2,} *$/
const QUOTE = /^ {0,3}>/
const LIST_ITEM = /^( *)([-*+]|\d{1,9}[.)])( +|$)(.*)$/
const TABLE_RULE = /^ *\|? *:?-+:? *(\| *:?-+:? *)*\|? *$/
const HTML_BLOCK = /^ {0,3}<\/?(div|iframe|figure|table|details|video|audio|section|aside|center|ul|ol|pre|hr|img|p)\b/i

const isTableStart = (lines, i) => lines[i].includes('|') && (lines[i + 1] ?? '').includes('|') && TABLE_RULE.test(lines[i + 1])
const startsBlock = (lines, i) => FENCE.test(lines[i]) || RULE.test(lines[i]) || QUOTE.test(lines[i]) ||
  LIST_ITEM.test(lines[i]) || HTML_BLOCK.test(lines[i]) || isTableStart(lines, i)

function blocks(lines, opts) {
  let html = ''
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) { i++; continue }
    let m
    if ((m = FENCE.exec(line))) {
      const body = []
      for (i++; i < lines.length && !lines[i].trim().startsWith(m[1]); i++) body.push(lines[i])
      i++
      html += `<pre><code>${esc(body.join('\n'))}</code></pre>`
    } else if (RULE.test(line)) {
      html += '<hr>'
      i++
    } else if (QUOTE.test(line)) {
      const body = []
      while (i < lines.length && QUOTE.test(lines[i])) body.push(lines[i++].replace(/^ {0,3}> ?/, ''))
      html += `<blockquote>${blocks(body, opts)}</blockquote>`
    } else if (LIST_ITEM.test(line)) {
      const r = list(lines, i, opts)
      html += r.html
      i = r.next
    } else if (isTableStart(lines, i)) {
      const r = table(lines, i, opts)
      html += r.html
      i = r.next
    } else if (HTML_BLOCK.test(line)) {
      const body = []
      while (i < lines.length && lines[i].trim()) body.push(lines[i++])
      html += body.join('\n')
    } else {
      const para = [line]
      for (i++; i < lines.length && lines[i].trim() && !startsBlock(lines, i); i++) para.push(lines[i])
      html += `<p>${inline(para.join('\n'), opts)}</p>`
    }
  }
  return html
}

function list(lines, i, opts) {
  const first = LIST_ITEM.exec(lines[i])
  const indent = first[1].length
  const ordered = /\d/.test(first[2])
  const start = ordered ? parseInt(first[2], 10) : 1
  const sameList = m => m && m[1].length === indent && /\d/.test(m[2]) === ordered
  const items = []
  let loose = false
  while (i < lines.length) {
    const m = LIST_ITEM.exec(lines[i])
    if (sameList(m)) {
      const contentIndent = indent + m[2].length + Math.max(1, m[3].length)
      const item = [m[4]]
      for (i++; i < lines.length; i++) {
        const l = lines[i]
        const lead = l.length - l.trimStart().length
        if (!l.trim()) {
          // A blank line continues the item only if indented text follows it.
          let j = i + 1
          while (j < lines.length && !lines[j].trim()) j++
          const nextLead = j < lines.length ? lines[j].length - lines[j].trimStart().length : 0
          if (j < lines.length && nextLead >= contentIndent) { item.push(''); continue }
          break
        }
        if (lead > indent) { item.push(l.slice(Math.min(lead, contentIndent))); continue }
        if (!LIST_ITEM.test(l) && !startsBlock(lines, i) && item.at(-1) !== '') { item.push(l.trim()); continue }
        break
      }
      items.push(item)
      continue
    }
    if (!lines[i].trim()) {
      let j = i
      while (j < lines.length && !lines[j].trim()) j++
      if (sameList(LIST_ITEM.exec(lines[j] ?? ''))) { loose = true; i = j; continue }
    }
    break
  }
  const tag = ordered ? 'ol' : 'ul'
  const body = items.map(item => {
    const h = blocks(item, opts)
    return `<li>${loose ? h : h.replace(/^<p>([\s\S]*?)<\/p>/, '$1')}</li>`
  }).join('')
  return { html: `<${tag}${ordered && start !== 1 ? ` start="${start}"` : ''}>${body}</${tag}>`, next: i }
}

function cells(line) {
  let s = line.trim()
  if (s.startsWith('|')) s = s.slice(1)
  if (s.endsWith('|') && !s.endsWith('\\|')) s = s.slice(0, -1)
  return s.split(/(?<!\\)\|/).map(c => c.trim().replace(/\\\|/g, '|'))
}

function table(lines, i, opts) {
  const head = cells(lines[i])
  const align = cells(lines[i + 1]).map(c =>
    c.startsWith(':') && c.endsWith(':') ? 'center' : c.endsWith(':') ? 'right' : c.startsWith(':') ? 'left' : '')
  const rows = []
  for (i += 2; i < lines.length && lines[i].trim() && lines[i].includes('|'); i++) rows.push(cells(lines[i]))
  const cell = (tag, c, j) => `<${tag}${align[j] ? ` style="text-align:${align[j]}"` : ''}>${inline(c, opts)}</${tag}>`
  const html = `<div class="table-wrap"><table><thead><tr>${head.map((c, j) => cell('th', c, j)).join('')}</tr></thead>` +
    `<tbody>${rows.map(r => `<tr>${r.map((c, j) => cell('td', c, j)).join('')}</tr>`).join('')}</tbody></table></div>`
  return { html, next: i }
}

// ---- inline ----

const ALLOWED_TAG = /<\/?(?:a|abbr|b|br|code|del|div|em|figcaption|figure|i|iframe|img|kbd|mark|small|span|strong|sub|sup|u|video|audio|source)\b[^<>]*>/gi

function inline(s, opts) {
  const held = []
  const hold = html => { held.push(html); return HELD + (held.length - 1) + HELD }
  s = s.replace(/(`+)([\s\S]*?[^`])\1(?!`)/g, (_, _ticks, code) => hold(`<code>${esc(code.trim())}</code>`))
  s = s.replace(/\\([\\`*_{}[\]()#+\-.!$|~<>])/g, (_, ch) => hold(esc(ch)))
  s = s.replace(ALLOWED_TAG, tag => hold(tag))
  s = esc(s)
  s = s.replace(/!\[([^\]]*)\]\(\s*([^)\s]+)(?:\s+&quot;(.*?)&quot;)?\s*\)/g, (_, alt, src, title) =>
    hold(`<img src="${src}" alt="${alt}"${title ? ` title="${title}"` : ''} loading="lazy">`))
  s = s.replace(/\[\[([^\]|]+?)(?:\|([^\]]+))?\]\]/g, (_, id, text) => hold(conceptLink(id.trim().toLowerCase(), text, opts)))
  s = s.replace(/\[([^\]]+)\]\(\s*([^)\s]+)(?:\s+&quot;(.*?)&quot;)?\s*\)/g, (_, text, href, title) => {
    const t = title ? ` title="${title}"` : ''
    return href.startsWith('#')
      ? `<a href="${href}" class="concept-link"${t}>${text}</a>`
      : `<a href="${href}" target="_blank" rel="noopener"${t}>${text}</a>`
  })
  s = s.replace(/\*\*(?=\S)([\s\S]*?\S)\*\*/g, '<strong>$1</strong>')
  s = s.replace(/(^|[^_\w])__(?=\S)([\s\S]*?\S)__(?![_\w])/g, '$1<strong>$2</strong>')
  s = s.replace(/(^|[^*\w])\*(?=[^\s*])([\s\S]*?[^\s*])\*(?![*\w])/g, '$1<em>$2</em>')
  s = s.replace(/(^|[^_\w])_(?=[^\s_])([\s\S]*?[^\s_])_(?![_\w])/g, '$1<em>$2</em>')
  s = s.replace(/~~(?=\S)([\s\S]*?\S)~~/g, '<del>$1</del>')
  s = s.replace(/(?: {2,}|\\)\n/g, '<br>\n')
  return s.replace(/\u0001(\d+)\u0001/g, (_, n) => held[n])
}

function conceptLink(id, text, opts) {
  const node = opts.resolve?.(id)
  if (!node) return `<span class="broken-link" title="No concept has the id “${esc(id)}”">${text ?? esc(id)}</span>`
  const label = text ?? renderInline(node.title)
  return `<a href="#${esc(node.id)}" class="concept-link" style="--c:${node.color}">${label}</a>`
}
