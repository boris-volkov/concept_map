// Rewriting a content file for the editor (edit.js): finding the lines of one heading, reading
// them into the fields of a form, and writing them back.
//
// Everything here works on text and nothing else, so it can be tested without a page. The rule
// throughout is the smallest change: only the lines of the heading being edited are touched, and
// a field that was not changed keeps the line it had, to the letter. So a save shows up in
// `git diff` as exactly what was edited.

import { parseOutline, slugify } from './content.js'
import { parseQuiz, writeQuiz, tidyQuiz } from './quiz.js'

const QUIZ_FENCE = /^\s*(`{3,}|~{3,})\s*quiz\s*$/i
const lf = s => s.replace(/\r\n/g, '\n')
const ids = value => value.split(/[\s,;]+/).map(t => t.replace(/^\[\[|\]\]$/g, '').replace(/^#/, '').trim().toLowerCase()).filter(Boolean)
const same = (a, b) => a.length === b.length && a.every((x, i) => x === b[i])

/** The headings of a file, in order, each with its line and level (see parseOutline in content.js). */
export function outline(file, text) {
  const out = []
  parseOutline(file, lf(text), out)
  return out
}

// Where a concept's heading is in its file: its record in the outline, and the lines it runs
// over, up to the next heading. The line the atlas remembers is checked against the id, so that
// a file that has changed since can never have the wrong card rewritten.
function locate(text, node) {
  const heads = outline(node.file, text)
  const idOf = h => h.meta.id?.value.trim().toLowerCase() || h.explicitId || slugify(h.title)
  const id = node.id.replace(/~\d+$/, '') // a duplicate id is told apart by its line
  let i = heads.findIndex(h => h.line === node.line && idOf(h) === id)
  if (i === -1) {
    const named = heads.filter(h => idOf(h) === id)
    if (named.length !== 1) throw new Error(`“${node.plainTitle ?? node.title}” is no longer where it was in ${node.file}. Reload the page and try again.`)
    i = heads.indexOf(named[0])
  }
  const lines = lf(text).split('\n')
  const end = i + 1 < heads.length ? heads[i + 1].line - 1 : lines.length
  return { heads, i, head: heads[i], lines, start: heads[i].line - 1, end }
}

/**
 * The fields of one heading, for the form: its title, id, kind, prerequisites, text and quiz.
 * `quiz` is null when its quizzes are not one block at the end of the text; they then stay in the
 * text, to be edited there.
 */
export function readSection(text, node) {
  const { head, lines, start, end } = locate(text, node)
  const metaEnd = Math.max(start, ...Object.values(head.meta).map(m => m.line - 1))
  const meta = lines.slice(start + 1, metaEnd + 1).map(raw => {
    const key = /^\s*([A-Za-z][\w-]*)\s*:/.exec(raw)?.[1].toLowerCase()
    return { raw, own: ['kind', 'type'].includes(key) ? 'kind' : ['prereqs', 'prereq', 'prerequisites', 'requires', 'needs'].includes(key) ? 'prereqs' : null }
  })
  let from = metaEnd + 1
  let to = end
  while (from < to && !lines[from].trim()) from++
  while (to > from && !lines[to - 1].trim()) to--
  const bodyLines = lines.slice(from, to)
  const { body, quiz, quizRaw } = splitQuiz(bodyLines)
  const s = {
    level: head.level,
    title: head.title,
    id: head.explicitId ?? '', // the id written on it; its id is otherwise made from its title
    kind: head.meta.kind?.value.trim().toLowerCase() || 'concept',
    prereqs: head.meta.prereqs ? ids(head.meta.prereqs.value) : [],
    body,
    quiz,
  }
  s.from = {
    start, end, heading: lines[start], meta, before: lines.slice(metaEnd + 1, from), bodyLines, after: lines.slice(to, end),
    title: s.title, id: s.id, kind: s.kind, prereqs: [...s.prereqs], body, quiz: quiz && writeQuiz(quiz), quizRaw,
    autoId: slugify(head.title),
  }
  return s
}

/** The fields of a heading that isn't written yet. */
export const blankSection = (kind = 'concept') => ({ level: 0, title: '', id: '', kind, prereqs: [], body: '', quiz: [], builtOn: [], from: null })

// A concept's text, and its quiz when that is a single block at the end of it.
function splitQuiz(bodyLines) {
  const blocks = []
  for (let i = 0; i < bodyLines.length; i++) {
    const m = QUIZ_FENCE.exec(bodyLines[i])
    if (!m) {
      // Another kind of fenced block, such as a graph, is passed over whole.
      const f = /^\s*(`{3,}|~{3,})/.exec(bodyLines[i])
      if (f) for (i++; i < bodyLines.length && !bodyLines[i].trim().startsWith(f[1]); i++);
      continue
    }
    const start = i
    for (i++; i < bodyLines.length && !bodyLines[i].trim().startsWith(m[1]); i++);
    blocks.push({ start, end: Math.min(i, bodyLines.length - 1) })
  }
  const whole = { body: bodyLines.join('\n'), quiz: blocks.length ? null : [], quizRaw: null }
  if (blocks.length !== 1 || blocks[0].end !== bodyLines.length - 1) return whole
  const inner = bodyLines.slice(blocks[0].start + 1, blocks[0].end).map((text, k) => ({ text, line: k }))
  let broken = false
  const quiz = parseQuiz(inner, () => { broken = true })
  if (broken) return whole // a quiz with a mistake in it is mended as text
  let cut = blocks[0].start
  while (cut > 0 && !bodyLines[cut - 1].trim()) cut--
  return { body: bodyLines.slice(0, cut).join('\n'), quiz: quiz.map(tidyQuiz), quizRaw: bodyLines.slice(cut) }
}

const quizBlock = quiz => ['```quiz', ...writeQuiz(quiz).split('\n'), '```']

// The lines of a heading, from its fields. What was not changed is written as it was.
function writeSection(s, level = s.level) {
  const f = s.from
  const title = s.title.trim()
  const kind = s.kind === 'concept' || s.kind === 'topic' ? '' : s.kind
  const out = []

  if (f && title === f.title && s.id === f.id) out.push(f.heading)
  else {
    // A heading that is renamed keeps the id it had, so that what refers to it still does.
    const id = s.id || (f && slugify(title) !== f.autoId ? f.autoId : '')
    out.push(`${'#'.repeat(level)} ${title}${id ? ` {#${id}}` : ''}`)
  }

  const line = { kind: kind && `kind: ${kind}`, prereqs: s.prereqs.length ? `prereqs: ${s.prereqs.join(', ')}` : '' }
  const kept = { kind: f && (f.kind === 'concept' ? '' : f.kind) === kind, prereqs: f && same(f.prereqs, s.prereqs) }
  const written = new Set()
  const meta = []
  for (const m of f?.meta ?? []) {
    if (!m.own) { meta.push(m.raw); continue }
    if (written.has(m.own)) continue // a second "kind:" line never counted
    written.add(m.own)
    if (kept[m.own]) meta.push(m.raw)
    else if (line[m.own]) meta.push(line[m.own])
  }
  // New lines go where an author would put them: kind first, then what it builds on.
  if (!written.has('prereqs') && line.prereqs) meta.splice(written.has('kind') ? meta.findIndex(r => /^\s*(kind|type)\s*:/i.test(r)) + 1 : 0, 0, line.prereqs)
  if (!written.has('kind') && line.kind) meta.unshift(line.kind)
  if (!f && s.builtOn?.length) meta.unshift(`built-on: ${s.builtOn.join(', ')}`)
  out.push(...meta)

  const quizKept = f && (s.quiz === null ? f.quiz === null : f.quiz !== null && writeQuiz(s.quiz) === f.quiz)
  if (f && s.body === f.body && quizKept) {
    out.push(...f.before, ...f.bodyLines, ...f.after)
    return out
  }
  const text = lf(s.body).replace(/\s+$/, '')
  const body = text ? text.split('\n') : []
  if (s.quiz?.length) {
    if (body.length) body.push('')
    // A quiz that wasn't touched keeps its own lines, under whatever the text has become.
    body.push(...(quizKept && f.quizRaw ? f.quizRaw.slice(f.quizRaw.findIndex(l => l.trim())) : quizBlock(s.quiz)))
  }
  if (body.length) out.push('', ...body)
  out.push(...(f?.after.length ? f.after : ['']))
  return out
}

const joined = lines => lines.join('\n').replace(/\n*$/, '\n')

/** The file's text with one heading rewritten from its fields (as readSection gave them, then edited). */
export function replaceSection(text, s) {
  const lines = lf(text).split('\n')
  return [...lines.slice(0, s.from.start), ...writeSection(s), ...lines.slice(s.from.end)].join('\n')
}

/**
 * The file's text with new headings added at the end of what `parent` holds: one section a level
 * below it, or a topic followed by its first card, a level below that.
 */
export function appendSections(text, parent, sections) {
  const { heads, i, head, lines } = locate(text, parent)
  let next = heads.slice(i + 1).find(h => h.level <= head.level)
  let at = next ? next.line - 1 : lines.length
  while (at > 0 && !lines[at - 1].trim()) at--
  const out = []
  sections.forEach((s, k) => {
    const level = head.level + 1 + k
    if (level > 6) throw new Error('Headings only go six levels deep, and this would be a seventh.')
    out.push('', ...writeSection(s, level))
    while (!out.at(-1).trim()) out.pop()
  })
  return joined([...lines.slice(0, at), ...out, '', ...lines.slice(at).join('\n').replace(/^\n+/, '').split('\n')])
}
