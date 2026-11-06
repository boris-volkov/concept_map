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
import { plainText, THUMBNAIL, thumbnail, SMALL_NETWORK, smallNetwork, SMALL_SHAPE } from './markdown.js'
import { graphError } from './graph.js'
import { networkError } from './network.js'
import { shapeError } from './shape.js'
import { prepare } from './model.js'

export const KINDS = {
  concept: 'Concept', definition: 'Definition', axiom: 'Axiom', property: 'Property',
  theorem: 'Theorem', formula: 'Formula', form: 'Form', heuristic: 'Heuristic', rule: 'Rule', skill: 'Skill', technique: 'Technique', topic: 'Topic',
}

const KEYS = {
  id: 'id', kind: 'kind', type: 'kind', prereqs: 'prereqs', prereq: 'prereqs', prerequisites: 'prereqs',
  requires: 'prereqs', needs: 'prereqs', 'built-on': 'builtOn', color: 'color', colour: 'color', parent: 'parent',
  summary: 'summary', tags: 'tags', tag: 'tags', wrap: 'wrap', rows: 'rows',
}

const DEFAULT_COLOR = '#6b5a45'
const HEADING = /^(#{1,6})\s+(.+?)\s*#*\s*$/
const META = /^([A-Za-z][\w-]*)\s*:\s*(.*)$/

// Asks the server whether the file has changed, so an edit shows on the next reload rather
// than after the ten minutes GitHub Pages lets browsers keep a copy. An unchanged file costs
// only a short "not modified" reply.
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

    const { body, quizzes, graphs } = splitBody(n.bodyLines)
    for (const g of graphs) {
      const problem = (g.shape ? shapeError : g.network ? networkError : graphError)(g.src)
      if (problem) report('error', n.file, g.line ?? n.line, `${g.shape ? 'Shape' : g.network ? 'Network' : 'Graph'} in “${n.title}”: ${problem}`, n.id)
    }
    n.body = body
    n.quiz = quizzes.flatMap(lines => parseQuiz(lines, (line, msg) => report('error', n.file, line, `Quiz in “${n.title}”: ${msg}`, n.id)))
    n.summary = n.meta.summary?.value.trim() || firstParagraph(body)
    n.wrap = parseInt(n.meta.wrap?.value, 10) || 0 // for a topic: at most this many children in a line
    const rows = n.meta.rows?.value.trim().toLowerCase()
    if (rows && rows !== 'kinds') report('warning', n.file, n.meta.rows.line, `“rows: ${rows}” should be “kinds”.`, n.id)
    n.rowsByKind = rows === 'kinds' // for a topic: one row per kind of thing, not an order set by its arrows
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

  // What a subject can't be learned without, which is for its author to say (see prepare in model.js).
  for (const n of nodes.values()) {
    n.builtOn = []
    const m = n.meta.builtOn
    if (!m) continue
    if (n.depth !== 0) {
      report('warning', n.file, m.line, `“built-on:” only means something on a subject, and “${n.title}” isn’t one.`, n.id)
      continue
    }
    for (const token of m.value.split(/[\s,;]+/).filter(Boolean)) {
      const pid = token.toLowerCase()
      const p = nodes.get(pid)
      if (p === n) report('error', n.file, m.line, `“${n.title}” lists itself under “built-on:”.`, n.id)
      else if (p?.depth !== 0) report('error', n.file, m.line, `“${n.title}” is built on “${pid}”, but no subject has that id${suggest(pid, new Map(roots.map(d => [d.id, d])))}.`, n.id)
      else if (!n.builtOn.includes(p)) n.builtOn.push(p)
    }
  }
  for (const n of roots) {
    const seen = new Set()
    const todo = [...n.builtOn]
    while (todo.length) {
      const p = todo.pop()
      if (seen.has(p)) continue
      seen.add(p)
      todo.push(...p.builtOn)
    }
    if (seen.has(n)) report('error', n.file, n.meta.builtOn.line, `“${n.title}” is built on itself, through its “built-on:” subjects.`, n.id)
  }

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
  const graphs = []
  const smallOnes = line => {
    for (const [, src] of line.text.matchAll(THUMBNAIL)) graphs.push({ line: line.line, src: thumbnail(src) })
    for (const [, src] of line.text.matchAll(SMALL_NETWORK)) graphs.push({ line: line.line, src: smallNetwork(src), network: true })
    for (const [, src] of line.text.matchAll(SMALL_SHAPE)) graphs.push({ line: line.line, src, shape: true })
  }
  for (let i = 0; i < lines.length; i++) {
    const g = /^\s*(`{3,}|~{3,})\s*(graph|network)\s*$/i.exec(lines[i].text)
    if (g) {
      // A graph stays in the text, where markdown.js draws it; here it is only set aside to be checked.
      const block = []
      kept.push(lines[i].text)
      for (i++; i < lines.length && !lines[i].text.trim().startsWith(g[1]); i++) {
        block.push(lines[i])
        kept.push(lines[i].text)
      }
      if (i < lines.length) kept.push(lines[i].text)
      graphs.push({ line: block[0]?.line, src: block.map(l => l.text).join('\n'), network: g[2].toLowerCase() === 'network' })
      continue
    }
    const m = /^\s*(`{3,}|~{3,})\s*quiz\s*$/i.exec(lines[i].text)
    if (!m) {
      smallOnes(lines[i])
      kept.push(lines[i].text)
      continue
    }
    const block = []
    for (i++; i < lines.length && !lines[i].text.trim().startsWith(m[1]); i++) {
      block.push(lines[i])
      smallOnes(lines[i])
    }
    quizzes.push(block)
  }
  return { body: kept.join('\n').trim(), quizzes, graphs }
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
