// What a file shows when it is open.
//
// On the map everything is a file. A domain or a topic is a folder, which opens into a frame
// around what it holds; a concept is a file, which opens right where it sits into its entry;
// and the "i" on a topic's frame opens the topic's README, at the top of the frame. Beside the
// domains are two more files, the Index and the Ranking. This module writes what each shows.
//
// An open concept shows its content and nothing else: the arrows on the map already say what
// it builds on. The "i" on it opens a band under its head with those connections spelled out.

import { renderMarkdown, renderInline, esc } from './markdown.js'
import { ancestors, learningPath, externalPrereqs, externalDependents, leaves, domainOf, TIERS } from './model.js'
import { KINDS } from './content.js'
import * as progress from './progress.js'

/** The files at the root of the atlas, beside the domains, in their order on the map. */
export const ROOT_FILES = [
  { id: '@index', title: 'Index', root: true },
  { id: '@ranking', title: 'Ranking', root: true },
]

/** A concept, open: its content and its exercises. `info`: with the band its "i" opens. */
export function conceptDoc(n, atlas, { info = false } = {}) {
  const resolve = id => atlas.nodes.get(id)
  const kind = `${KINDS[n.kind] ?? esc(n.kind)}<span class="doc-check" title="Mastered"> ✓</span>`
  const about = `<button type="button" class="about${info ? ' is-on' : ''}" title="What it builds on, and what builds on it" ` +
    `aria-label="About ${esc(n.plainTitle)}" aria-expanded="${info}">i</button>`
  return `${head(kind, renderInline(n.title), n.plainTitle, about)}
    ${info ? conceptInfo(n) : ''}
    <div class="doc-body">
      ${entry(n, resolve)}
      ${n.quiz.length ? '<section class="practice"><h3>Exercises</h3><div class="quiz-mount"></div></section>' : ''}
    </div>`
}

/** Opens or closes the band that the "i" on an open concept shows, under the concept's head. */
export function showInfo(el, n, on) {
  el.querySelector('.doc-info')?.remove()
  if (on) el.querySelector('.doc-head').insertAdjacentHTML('afterend', conceptInfo(n))
  const button = el.querySelector('.doc-head .about')
  button.classList.toggle('is-on', on)
  button.setAttribute('aria-expanded', on)
  refresh(el, n)
}

// The band under an open concept's "i": how it joins the rest of the map, which the arrows
// otherwise say on their own, the chain behind it, and where it is written.
function conceptInfo(n) {
  const path = learningPath(n)
  return `<div class="doc-body doc-info">
      ${twins(n)}
      ${links('Prerequisites', n.directPrereqs, 'pre', '', 'None: a starting point.')}
      ${links('Required for', n.directDependents, 'post', '', '')}
      ${path.length ? pathSection(n, path) : ''}
      <div class="info-foot"><button type="button" class="mastery"></button>${source(n)}</div>
    </div>`
}

/** A topic's README, at the top of its open frame: what it is, and how it joins the rest of the map. */
export function readme(n, atlas) {
  const resolve = id => atlas.nodes.get(id)
  const path = learningPath(n)
  const what = n.depth === 0 ? 'domain' : 'topic'
  return `<header class="doc-head">
      <span class="doc-kind">About this ${what}</span>
      <span class="topic-progress"></span>
      <button type="button" class="shut" title="Close (Esc)" aria-label="Close the README of ${esc(n.plainTitle)}">×</button>
    </header>
    <div class="doc-body">
      ${entry(n, resolve)}
      ${twins(n)}
      ${links('Prerequisites', [...externalPrereqs(n)], 'pre', `from outside this ${what}`, 'None: a starting point.')}
      ${links('Required for', [...externalDependents(n)], 'post', `outside this ${what}`, '')}
      ${path.length ? pathSection(n, path) : ''}
    </div>
    <footer class="doc-foot">${source(n)}</footer>`
}

/** A root file, closed: a card beside the domains. */
export function rootCard(f, atlas) {
  const supers = atlas.ranking.filter(n => n.tier?.key === 's').length
  const [eyebrow, summary] = f.id === '@index'
    ? [`${atlas.ranking.length} concepts in ${atlas.roots.length} domains`, 'Every concept, domain by domain.']
    : [`${supers} super-concepts`, 'Every concept, ranked by how much is built on it.']
  return `<div class="face">
      <div class="eyebrow">${eyebrow}</div>
      <div class="title">${esc(f.title)}</div>
      <div class="summary">${summary}</div>
    </div>`
}

/** A root file, open. `domain`: the Ranking shows only that domain's concepts, when set. */
export function rootDoc(f, atlas, domain) {
  const body = f.id === '@index'
    ? `<div class="doc-body index">${index(atlas)}</div>`
    : `<div class="doc-body ranking">${ranking(atlas, domain)}</div>`
  return head('The atlas', esc(f.title), f.title, '') + body
}

/** Brings the marks of mastery inside an open file up to date. `n`: the file's concept or topic, if any. */
export function refresh(el, n = null) {
  el.querySelectorAll('[data-id]').forEach(a => a.classList.toggle('is-mastered', progress.isMastered(a.dataset.id)))
  if (!n) return
  const button = el.querySelector('.mastery')
  if (button) {
    const on = progress.isMastered(n.id)
    button.classList.toggle('is-on', on)
    button.textContent = on ? '✓ Mastered' : 'Mark as mastered'
  }
  const meter = el.querySelector('.topic-progress')
  if (meter) {
    const { done, total } = progress.countIn(n)
    meter.textContent = `${done} of ${total} mastered`
  }
}

// A file's head: what it is, its title, and the × that closes it (and on a concept, its "i").
// Like a topic's frame, the whole head closes the file when clicked, so a second click where it
// opened puts it away.
const head = (label, title, name, extra) => `<header class="doc-head">
    <span class="doc-kind">${label}</span>${extra}
    <button type="button" class="shut" title="Close (Esc)" aria-label="Close ${esc(name)}">×</button>
    <h2 class="doc-title">${title}</h2>
  </header>`

const source = n => `<span class="source" title="Where this is written">${esc(n.file)} · line ${n.line}</span>`

const STATED = { axiom: 'Axiom', theorem: 'Theorem', definition: 'Definition', formula: 'Formula', property: 'Property' }

// The entry text. For an axiom, theorem, definition or formula the first paragraph is its formal
// statement, set apart in a box the way a textbook would; any remarks follow underneath.
function entry(n, resolve) {
  if (!n.body) return '<p class="prose empty">No entry written yet.</p>'
  const label = STATED[n.kind]
  if (!label) return `<div class="prose">${renderMarkdown(n.body, { resolve })}</div>`
  const cut = n.body.search(/\n[ \t]*\n/)
  const statement = cut === -1 ? n.body : n.body.slice(0, cut)
  const remarks = cut === -1 ? '' : n.body.slice(cut).trim()
  return `<div class="statement statement-${n.kind}"><div class="statement-label">${label}.</div>` +
    `<div class="prose">${renderMarkdown(statement, { resolve })}</div></div>` +
    (remarks ? `<div class="prose">${renderMarkdown(remarks, { resolve })}</div>` : '')
}

function chip(c) {
  const where = c.parent ? `<span class="chip-where">${renderInline(c.parent.title)}</span>` : ''
  return `<a class="chip" href="#${esc(c.id)}" data-id="${esc(c.id)}" style="--c:${c.color}">` +
    `<span class="chip-title">${renderInline(c.title)}</span>${where}</a>`
}

const twins = n => (n.twins?.length
  ? `<section class="links twins"><h3>Intertwined with <span class="note">each builds on part of the other</span></h3><div class="chips">${n.twins.map(chip).join('')}</div></section>`
  : '')

function links(title, list, kind, note, empty) {
  if (!list.length && !empty) return ''
  const sorted = [...list].sort((a, b) => a.order - b.order)
  return `<section class="links ${kind}">
    <h3>${title}${note ? ` <span class="note">${note}</span>` : ''}</h3>
    ${list.length
      ? `<div class="chips">${sorted.map(chip).join('')}</div>
         <button type="button" class="reveal" data-reveal="${kind}">Show ${kind === 'pre' ? 'these' : 'them'} on the map</button>`
      : `<p class="none">${empty}</p>`}
  </section>`
}

function index(atlas) {
  const tree = list => `<ul>${list.map(n => `<li><a href="#${esc(n.id)}" data-id="${esc(n.id)}" style="--c:${n.color}">` +
    `${renderInline(n.title)}</a>${superMark(n)}${n.children.length ? tree(n.children) : ''}</li>`).join('')}</ul>`
  return `<p class="index-note">${atlas.ranking.length} concepts in ${atlas.roots.length} domains. Choose one to open it where it sits on the map.</p>
    ${atlas.roots.map(d => `<details style="--c:${d.color}"><summary>${renderInline(d.title)}` +
      `<span class="where">${d.leafCount}</span></summary>${tree(d.children)}</details>`).join('')}`
}

function ranking(atlas, domain) {
  return `<p class="index-note">Ranked the way a search engine ranks pages: a concept scores high when concepts that score high
      build on it. Scores are multiples of the average. Super-concepts carry a red ★ on the map.</p>
    <label class="rank-filter">Show <select>
      <option value="">every domain</option>
      ${atlas.roots.map(d => `<option value="${esc(d.id)}"${d.id === domain ? ' selected' : ''}>${esc(d.plainTitle)}</option>`).join('')}
    </select></label>
    <div class="tiers">${tiers(atlas, domain)}</div>`
}

/**
 * The ranking as a tier list. Each concept keeps its number in the whole ranking, even when only
 * one domain is shown. With every domain shown, the long lower tiers start folded.
 */
export function tiers(atlas, domain) {
  const shown = domain ? atlas.ranking.filter(n => domainOf(n).id === domain) : atlas.ranking
  return TIERS.map(t => {
    const list = shown.filter(n => n.tier === t)
    const end = t.key === 'end' // these all share the last place, so their number says nothing
    const items = `<ol class="ranked chips">${list.map(n => `<li><a class="chip" href="#${esc(n.id)}" data-id="${esc(n.id)}" ` +
      `style="--c:${n.color}" title="${esc(placeOf(n, atlas))}"><span class="chip-title">` +
      `${end ? '' : `<span class="rank-no">${n.rank}</span> `}${renderInline(n.title)}</span></a></li>`).join('')}</ol>`
    const heading = `<h3>${t.name} <span class="note">${t.note}</span> <span class="count">${list.length}</span></h3>`
    const fold = !domain && list.length && ['c', 'd', 'end'].includes(t.key)
    return `<section class="tier tier-${t.key}">
      <div class="tier-mark" aria-hidden="true">${t.mark}</div>
      <div class="tier-body">${fold ? `<details><summary>${heading}</summary>${items}</details>`
        : heading + (list.length ? items : '<p class="none">None.</p>')}</div>
    </section>`
  }).join('')
}

const placeOf = (n, atlas) => (n.tier.key === 'end' ? 'Nothing builds on it yet'
  : `${ordinal(n.rank)} of ${atlas.ranking.length}, scoring ${n.score.toFixed(1)} times the average`) +
  ` · ${ancestors(n).reverse().map(a => a.plainTitle).join(' › ')}`

const ordinal = k => k + (k % 100 > 10 && k % 100 < 14 ? 'th' : ['th', 'st', 'nd', 'rd'][k % 10] ?? 'th')

const superMark = n => (n.tier?.key === 's' ? ' <span class="super-mark" title="Super-concept">★</span>' : '')

function pathSection(n, path) {
  const known = q => leaves(q).every(l => progress.isMastered(l.id))
  const started = path.some(p => progress.isMastered(p.id))
  const next = [...path, n].find(p => !p.children.length && !progress.isMastered(p.id) && p.prereqs.every(known))
  const suggestion = started && next
    ? `<p class="next-up">Suggested next: <a href="#${esc(next.id)}" style="--c:${next.color}">${renderInline(next.title)}</a></p>`
    : ''
  return `<section class="path">
    ${suggestion}
    <details>
      <summary>Full chain of prerequisites <span class="count">${path.length}</span></summary>
      <p class="note">In an order they can be learned, foundations first.</p>
      <ol>${path.map(p => `<li><a href="#${esc(p.id)}" data-id="${esc(p.id)}" style="--c:${p.color}">${renderInline(p.title)}</a>` +
        `${p.parent ? ` <span class="where">${renderInline(p.parent.title)}</span>` : ''}</li>`).join('')}</ol>
    </details>
  </section>`
}
