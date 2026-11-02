// Loads the content files and turns their headings into the tree of concepts.
//
// Each content file is an outline: # starts a domain, ## a topic inside it, ###
// a concept inside that, and so on. Lines right under a heading, such as
// "prereqs: lcm, equivalent-fractions", describe it; the text after them is its
// explanation. content/README.md documents the format for authors.
//
// Problems (a misspelled prerequisite, two concepts with one id, a loop) are
// collected in atlas.issues rather than thrown, so a typo never blanks the map.

import { parseQuiz } from './quiz.js'
import { plainText } from './markdown.js'
import { prepare } from './model.js'

export const KINDS = {
  concept: 'Concept', definition: 'Definition', axiom: 'Axiom', property: 'Property',
  theorem: 'Theorem', formula: 'Formula', skill: 'Skill', technique: 'Technique', topic: 'Topic',
}

const KEYS = {
  id: 'id', kind: 'kind', type: 'kind', prereqs: 'prereqs', prereq: 'prereqs', prerequisites: 'prereqs',
  requires: 'prereqs', needs: 'prereqs', color: 'color', colour: 'color', parent: 'parent',
  summary: 'summary', tags: 'tags', tag: 'tags',
}

const DEFAULT_COLOR = '#6b5a45'
const HEADING = /^(#{1,6})\s+(.+?)\s*#*\s*$/
const META = /^([A-Za-z][\w-]*)\s*:\s*(.*)$/

export async function fetchText(url) {
  const res = await fetch(url, { cache: 'no-cache' })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText || 'error'} for ${url}`)
  return res.text()
}

/** Fetches content/index.md and every file it links to. */
export async function loadSources(base) {
  const indexText = await fetchText(base + 'index.md')
  const index = parseIndex(indexText)
  const files = await Promise.all(index.files.map(path =>
    fetchText(base + path).then(text => ({ path, text }), error => ({ path, error }))))
  return { index, indexText, files }
}

function parseIndex(text) {
  const lines = text.split(/\r?\n/)
  const index = { title: 'Concept Atlas', intro: '', settings: {}, files: [] }
  let afterTitle = false
  for (const line of lines) {
    const h = /^#\s+(.+?)\s*$/.exec(line)
    if (h && !afterTitle) { index.title = h[1]; afterTitle = true; continue }
    const m = META.exec(line.trim())
    if (afterTitle && m && !index.intro && !index.files.length && !/\]\(/.test(line)) {
      index.settings[m[1].toLowerCase()] = m[2].trim()
      continue
    }
    const links = [...line.matchAll(/\[[^\]]*\]\(([^)\s]+\.md)\)/g)].map(l => l[1])
    if (links.length) index.files.push(...links)
    else if (afterTitle && !index.intro && line.trim() && !/^[-*#>]/.test(line.trim())) index.intro = line.trim()
  }
  return index
}

/** Builds the atlas (tree, prerequisites, quizzes, issues) from loaded sources. */
export function buildAtlas({ index, files }) {
  const issues = []
  const report = (level, file, line, message, id) => issues.push({ level, file, line, message, id })
  const raw = []
  for (const f of files) {
    if (f.error) report('error', f.path, null, `This file could not be loaded (${f.error.message}).`)
    else parseOutline(f.path, f.text, raw)
  }

  // Ids: the {#id} on the heading or its "id:" line, otherwise made from the title.
  const byId = new Map()
  for (const n of raw) {
    let id = n.explicitId ?? slugify(n.title)
    if (n.explicitId && !/^[a-z0-9][a-z0-9-]*$/.test(n.explicitId)) {
      report('warning', n.file, n.line, `The id “${n.explicitId}” should use only lowercase letters, digits and dashes.`)
    }
    if (!id) {
      report('error', n.file, n.line, `The heading “${n.title}” gives no usable id; add one, like “{#my-id}”.`)
      id = `untitled-${n.line}`
    }
    if (byId.has(id)) {
      const first = byId.get(id)
      report('error', n.file, n.line, `Two concepts have the id “${id}” (the other is at ${first.file}:${first.line}). ` +
        `Give this one its own, e.g. “${'#'.repeat(n.level)} ${n.title} {#${id}-2}”.`)
      id = `${id}~${n.line}`
    }
    n.id = id
    byId.set(id, n)
  }

  // The tree: headings nest by level; a file's top heading may move under another with "parent:".
  for (const n of raw) {
    n.parent = n.fileParent
    const p = n.meta.parent
    if (!p) continue
    const pid = p.value.trim().toLowerCase()
    if (n.fileParent) report('warning', n.file, p.line, '“parent:” only works on a file’s top (#) heading, so it is ignored here.', n.id)
    else if (!byId.has(pid)) report('error', n.file, p.line, `“parent: ${pid}” names no concept${suggest(pid, byId)}.`, n.id)
    else n.parent = byId.get(pid)
  }
  for (const n of raw) {
    const seen = new Set([n])
    for (let a = n.parent; a; a = a.parent) {
      if (seen.has(a)) {
        report('error', n.file, n.line, `“${n.title}” ends up inside itself through “parent:”.`, n.id)
        n.parent = null
        break
      }
      seen.add(a)
    }
  }
  const roots = []
  for (const n of raw) (n.parent ? n.parent.children : roots).push(n)

  const nodes = new Map()
  let order = 0
  const visit = (n, depth, color) => {
    const own = n.meta.color?.value.trim()
    if (own && !/^#[0-9a-f]{3,8}$|^[a-z]+$/i.test(own)) report('warning', n.file, n.meta.color.line, `“${own}” is not a colour like #8f2d2d.`, n.id)
    n.depth = depth
    n.color = own || color
    n.order = order++
    nodes.set(n.id, n)
    for (const c of n.children) visit(c, depth + 1, n.color)
    n.leafCount = n.children.length ? n.children.reduce((s, c) => s + c.leafCount, 0) : 1
  }
  roots.forEach(r => visit(r, 0, DEFAULT_COLOR))

  for (const n of nodes.values()) {
    const kind = n.meta.kind?.value.trim().toLowerCase()
    if (kind && !(kind in KINDS)) {
      report('warning', n.file, n.meta.kind.line, `Unknown kind “${kind}”; the usual ones are ${Object.keys(KINDS).join(', ')}.`, n.id)
    }
    n.kind = n.children.length ? 'topic' : kind || 'concept'

    const { body, quizzes } = splitBody(n.bodyLines)
    n.body = body
    n.quiz = quizzes.flatMap(lines => parseQuiz(lines, (line, msg) => report('error', n.file, line, `Quiz in “${n.title}”: ${msg}`, n.id)))
    n.summary = n.meta.summary?.value.trim() || firstParagraph(body)
    n.tags = (n.meta.tags?.value ?? '').split(/[,\s]+/).filter(Boolean).map(t => t.toLowerCase())
    n.plainTitle = plainText(n.title)
    n.prereqs = []
    n.dependents = []
    delete n.bodyLines
  }

  for (const n of nodes.values()) {
    const m = n.meta.prereqs
    if (!m) continue
    for (const token of m.value.split(/[\s,;]+/)) {
      const pid = token.replace(/^\[\[|\]\]$/g, '').replace(/^#/, '').trim().toLowerCase()
      if (!pid) continue
      const p = nodes.get(pid)
      const problem = !p ? `“${n.title}” lists the prerequisite “${pid}”, but no concept has that id${suggest(pid, nodes)}.`
        : p === n ? `“${n.title}” lists itself as a prerequisite.`
        : isInside(n, p) ? `“${n.title}” is inside “${p.title}”, so it can’t also require it.`
        : isInside(p, n) ? `“${p.title}” is inside “${n.title}”, so “${n.title}” can’t require it.`
        : null
      if (problem) report('error', n.file, m.line, problem, n.id)
      else if (!n.prereqs.includes(p)) n.prereqs.push(p)
    }
  }
  for (const n of nodes.values()) for (const p of n.prereqs) p.dependents.push(n)

  for (const n of nodes.values()) {
    for (const m of n.body.matchAll(/\[\[([^\]|]+?)(?:\|[^\]]*)?\]\]/g)) {
      const id = m[1].trim().toLowerCase()
      if (!nodes.has(id)) report('warning', n.file, n.line, `“${n.title}” links to [[${id}]], but no concept has that id${suggest(id, nodes)}.`, n.id)
    }
  }

  const root = { id: '', title: index.title, children: roots, parent: null, depth: -1, isRoot: true }
  const atlas = { title: index.title, intro: index.intro, settings: index.settings, root, roots, nodes, issues }
  prepare(atlas)
  return atlas
}

const isInside = (n, a) => { for (let p = n.parent; p; p = p.parent) if (p === a) return true; return false }

// Splits one file into raw heading records, in document order.
function parseOutline(file, text, out) {
  const stack = []
  let node = null
  let fence = null
  let inMeta = false
  let inComment = false
  text.split(/\r?\n/).forEach((raw, i) => {
    const line = i + 1
    if (fence) {
      node?.bodyLines.push({ text: raw, line })
      if (raw.trim().startsWith(fence) && !raw.trim().slice(fence.length).trim()) fence = null
      return
    }
    // HTML comments hide text from the map; they may span lines, which lets a draft concept be commented out.
    let t = raw
    if (inComment) {
      const end = t.indexOf('-->')
      if (end === -1) return
      t = t.slice(end + 3)
      inComment = false
    }
    t = t.replace(/<!--[\s\S]*?-->/g, '')
    const open = t.indexOf('<!--')
    if (open !== -1) { t = t.slice(0, open); inComment = true }
    if (!t.trim() && raw.trim()) return

    const f = /^\s{0,3}(`{3,}|~{3,})/.exec(t)
    if (f) {
      fence = f[1]
      inMeta = false
      node?.bodyLines.push({ text: t, line })
      return
    }
    const h = HEADING.exec(t)
    if (h) {
      const level = h[1].length
      let title = h[2]
      let explicitId = null
      const idm = /\s*\{#([^}]+)\}\s*$/.exec(title)
      if (idm) { explicitId = idm[1].trim().toLowerCase(); title = title.slice(0, idm.index).trim() }
      while (stack.length && stack.at(-1).level >= level) stack.pop()
      node = { title, explicitId, level, file, line, meta: {}, bodyLines: [], children: [], fileParent: stack.at(-1)?.node ?? null }
      stack.push({ level, node })
      out.push(node)
      inMeta = true
      return
    }
    if (!node) return
    if (inMeta) {
      if (!t.trim()) return
      const m = META.exec(t.trim())
      const key = m && KEYS[m[1].toLowerCase()]
      if (key) {
        node.meta[key] = { value: m[2], line }
        if (key === 'id') node.explicitId = m[2].trim().toLowerCase()
        return
      }
      inMeta = false
    }
    node.bodyLines.push({ text: t, line })
  })
}

function splitBody(lines) {
  const kept = []
  const quizzes = []
  for (let i = 0; i < lines.length; i++) {
    const m = /^\s*(`{3,}|~{3,})\s*quiz\s*$/i.exec(lines[i].text)
    if (!m) { kept.push(lines[i].text); continue }
    const block = []
    for (i++; i < lines.length && !lines[i].text.trim().startsWith(m[1]); i++) block.push(lines[i])
    quizzes.push(block)
  }
  return { body: kept.join('\n').trim(), quizzes }
}

function firstParagraph(body) {
  for (const para of body.split(/\n\s*\n/)) {
    const p = para.trim()
    if (!p || /^(\$\$|```|~~~|<|!\[|\||>|[-*+] |\d+[.)] )/.test(p)) continue
    return p.replace(/\s*\n\s*/g, ' ')
  }
  return ''
}

/** A title as an id: "The Unit Circle" → "unit-circle", "Adding & Subtracting" → "adding-and-subtracting". */
export function slugify(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\$/g, '').replace(/\\([a-zA-Z]+)/g, '$1')
    .replace(/&/g, ' and ').replace(/['’]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    .replace(/^(the|a|an)-(?=.)/, '')
}

function suggest(id, known) {
  let best = null
  let bestScore = Infinity
  for (const k of known.keys()) {
    const score = k.includes(id) || id.includes(k) ? Math.abs(k.length - id.length) / 2 : distance(id, k)
    if (score < bestScore) { bestScore = score; best = k }
  }
  return best && bestScore <= Math.max(2, id.length / 3) ? ` (did you mean “${best}”?)` : ''
}

function distance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, j) => j)
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0]
    row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j]
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
      prev = tmp
    }
  }
  return row[b.length]
}
