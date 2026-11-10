// What a file shows when it is open.
//
// On the map everything is a file. A domain or a topic is a folder, which opens into a frame
// around what it holds; a concept is a file, which opens right where it sits into its entry;
// and the "i" on a topic's frame opens the topic's README, at the top of the frame. This module
// writes what each shows, and the index of every concept, which opens in a panel beside the map.
//
// An open concept shows its content and nothing else: the map already lights up what it builds
// on. The "i" on it opens a band under its head with those connections spelled out.

import { renderMarkdown, renderInline, esc } from './markdown.js'
import { learningPath, externalPrereqs, externalDependents, leaves, finder } from './model.js'
import { KINDS } from './content.js'
import * as progress from './progress.js'
import * as deck from './deck.js'

// A playing card, with a + on it: the button on an open concept's head that adds it to the deck.
const CARD_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="1.5" width="9" height="13" rx="1.5"/>' +
  '<path d="M8 5.5v5M5.5 8h5"/></svg>'
// Two things leading to a third: the button that pops out what leads up to a concept.
const TREE_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="3.5" cy="3.5" r="2"/><circle cx="12.5" cy="3.5" r="2"/>' +
  '<circle cx="8" cy="12.5" r="2"/><path d="M4.6 5.2 6.9 10.8M11.4 5.2 9.1 10.8"/></svg>'

/** A concept, open: its content and its exercises. `info`: with the band its "i" opens. */
export function conceptDoc(n, atlas, { info = false, edit = false } = {}) {
  const resolve = finder(atlas)
  const kind = `${KINDS[n.kind] ?? esc(n.kind)}<span class="doc-check" title="Mastered"> ✓</span>`
  const pop = `<button type="button" class="pop" ${n.requires.length
    ? `title="Pop out what leads up to this" aria-label="Pop out what leads up to ${esc(n.plainTitle)}"`
    : 'title="A starting point: nothing leads up to this" disabled'}>${TREE_ICON}</button>`
  const card = `<button type="button" class="card-add" aria-label="Add ${esc(n.plainTitle)} to the flashcards" ` +
    `aria-pressed="false">${CARD_ICON}</button>`
  const about = `<button type="button" class="about${info ? ' is-on' : ''}" title="What it builds on, and what builds on it" ` +
    `aria-label="About ${esc(n.plainTitle)}" aria-expanded="${info}">i</button>`
  // Only where the page can save (see edit.js): on this computer, served by serve.py.
  const pencil = edit ? `<button type="button" class="edit" title="Edit this card" aria-label="Edit ${esc(n.plainTitle)}">Edit</button>` : ''
  return `${head(kind, renderInline(n.title), n.plainTitle, pencil + pop + card + about)}
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

// The band under an open concept's "i": how it joins the rest of the map, which the lit-up cards
// otherwise show on their own, the chain behind it, and where it is written.
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
  const what = n.depth === 0 ? 'subject' : 'topic'
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

/**
 * The index: every concept, domain by domain, for the panel beside the map. Each domain is
 * folded under its name, and carries its id so that the panel can keep it unfolded when the
 * index is written again.
 */
export function index(atlas) {
  const tree = list => `<ul>${list.map(n => `<li><a href="#${esc(n.id)}" style="--c:${n.color}">` +
    `${renderInline(n.title)}</a>${n.children.length ? tree(n.children) : ''}</li>`).join('')}</ul>`
  const count = atlas.roots.reduce((s, d) => s + d.leafCount, 0)
  return `<p class="index-note">${count} concepts in ${atlas.roots.length} subjects. Choose one to open it where it sits on the map.</p>
    ${atlas.roots.map(d => `<details data-domain="${esc(d.id)}" style="--c:${d.color}"><summary>${renderInline(d.title)}` +
      `<span class="where">${d.leafCount}</span></summary>${tree(d.children)}</details>`).join('')}`
}

/** A flashcard's front: what the concept is, and its name. */
export const cardFront = n => `<div class="card-front">
    <div class="doc-kind">${KINDS[n.kind] ?? esc(n.kind)}</div>
    <h3 class="card-title">${renderInline(n.title)}</h3>
    <p class="card-hint">Click or press Space to turn it over</p>
  </div>`

/** A flashcard's back: the concept's entry, as it reads on the map, without its exercises. */
export const cardBack = (n, atlas) => `<div class="card-back">
    <div class="doc-kind">${KINDS[n.kind] ?? esc(n.kind)}</div>
    <h3 class="card-name">${renderInline(n.title)}</h3>
    ${entry(n, id => atlas.nodes.get(id))}
  </div>`

/**
 * A card that is being written in the editor, as it will read on the map: its head, its entry,
 * and its questions set out with their answers showing.
 */
export function draftDoc(d, atlas) {
  const resolve = finder(atlas)
  const opts = { resolve }
  const questions = (d.quiz ?? []).map(q => `<li>${renderMarkdown(q.prompt || '*No question yet.*', opts)}
      ${q.choices.length
        ? `<ul class="draft-choices">${q.choices.map(c => `<li class="${c.right ? 'is-right' : ''}">${renderInline(c.text, opts)}</li>`).join('')}</ul>`
        : `<p class="draft-answer">Answer: <strong>${esc(q.answer)}</strong></p>`}
      ${q.hint ? `<p class="draft-note"><em>Hint.</em> ${renderInline(q.hint, opts)}</p>` : ''}
      ${q.why ? `<div class="draft-note"><em>Why.</em> ${renderMarkdown(q.why, opts).replace(/^<p>|<\/p>$/g, '')}</div>` : ''}</li>`)
  return `<header class="doc-head">
      <span class="doc-kind">${KINDS[d.kind] ?? esc(d.kind)}</span>
      <h2 class="doc-title">${renderInline(d.title.trim() || 'Untitled')}</h2>
    </header>
    <div class="doc-body">
      ${entry({ kind: d.kind, body: d.body.trim() }, resolve)}
      ${questions.length ? `<section class="practice"><h3>Exercises</h3><ol class="draft-quiz">${questions.join('')}</ol></section>` : ''}
    </div>`
}

/** Brings the marks of mastery, and the flashcard button, inside an open file up to date. `n`: the file's concept or topic, if any. */
export function refresh(el, n = null) {
  el.querySelectorAll('[data-id]').forEach(a => a.classList.toggle('is-mastered', progress.isMastered(a.dataset.id)))
  if (!n) return
  const card = el.querySelector('.doc-head .card-add')
  if (card) {
    const on = deck.has(n.id)
    card.classList.toggle('is-on', on)
    card.setAttribute('aria-pressed', on)
    card.title = on ? 'In your flashcards: click to take it out' : 'Add as a flashcard'
  }
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

// A file's head: what it is, its title, the × that closes it, and on a concept its other buttons.
const head = (label, title, name, extra) => `<header class="doc-head">
    <span class="doc-kind">${label}</span>${extra}
    <button type="button" class="shut" title="Close (Esc)" aria-label="Close ${esc(name)}">×</button>
    <h2 class="doc-title">${title}</h2>
  </header>`

const source = n => `<span class="source" title="Where this is written">${esc(n.file)} · line ${n.line}</span>`

const STATED = { axiom: 'Axiom', theorem: 'Theorem', definition: 'Definition', formula: 'Formula', form: 'Form', property: 'Property', heuristic: 'Heuristic', rule: 'Rule', skill: 'Skill', technique: 'Technique' }

// The entry text. For an axiom, theorem, definition, formula or the like the first paragraph is its
// formal statement, and for a skill its method, set apart in a box the way a textbook would; any
// remarks follow underneath.
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
  const home = homeOf(c)
  const where = home ? `<span class="chip-where">${renderInline(home.title)}</span>` : ''
  return `<a class="chip" href="#${esc(c.id)}" data-id="${esc(c.id)}" style="--c:${c.color}">` +
    `<span class="chip-title">${renderInline(c.title)}</span>${where}</a>`
}

// The topic a concept stands in. A copy in a sheet stands in none, so it says where its original does.
const homeOf = c => c.home ?? c.parent

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
        `${homeOf(p) ? ` <span class="where">${renderInline(homeOf(p).title)}</span>` : ''}</li>`).join('')}</ol>
    </details>
  </section>`
}
