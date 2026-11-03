// The side panel: everything about one concept (or topic), and the index of all of them,
// by domain or ranked.

import { renderMarkdown, renderInline, esc } from './markdown.js'
import { ancestors, learningPath, externalPrereqs, externalDependents, leaves, domainOf, TIERS } from './model.js'
import { KINDS } from './content.js'
import { mountQuiz } from './quiz.js'
import * as progress from './progress.js'

export class Panel {
  constructor(el, { onClose, onReveal, onRanking }) {
    this.el = el
    this.node = null
    this.mode = null
    this.tab = 'contents' // the index's tab: 'contents' or 'ranking'
    this.domain = '' // the ranking shows only this domain's concepts, when set
    el.addEventListener('click', e => {
      const t = e.target
      if (t.closest('.panel-close')) return onClose()
      const tab = t.closest('[data-tab]')
      if (tab) return this.showIndex(tab.dataset.tab)
      if (t.closest('.rank-tag')) return onRanking(this.node)
      const reveal = t.closest('[data-reveal]')
      if (reveal) return onReveal(this.node, reveal.dataset.reveal)
      if (t.closest('.mastery')) progress.setMastered(this.node.id, !progress.isMastered(this.node.id))
    })
    el.addEventListener('change', e => {
      if (!e.target.closest('.rank-filter')) return
      this.domain = e.target.value
      el.querySelector('.tiers').innerHTML = tiers(this.atlas, this.domain)
      this.refreshProgress()
    })
    progress.onChange(() => this.refreshProgress())
  }

  setAtlas(atlas) {
    this.atlas = atlas
    if (this.mode === 'index') this.showIndex()
    else if (this.node) {
      const n = atlas.nodes.get(this.node.id)
      if (n) this.show(n)
      else this.hide()
    }
  }

  get isOpen() {
    return !this.el.hidden
  }

  show(n) {
    this.node = n
    this.mode = 'concept'
    const resolve = id => this.atlas.nodes.get(id)
    const topic = n.children.length > 0
    const pre = topic ? [...externalPrereqs(n)] : n.directPrereqs
    const post = topic ? [...externalDependents(n)] : n.directDependents
    const path = learningPath(n)
    const crumbs = ancestors(n).reverse()
      .map(a => `<a href="#${esc(a.id)}" style="--c:${a.color}">${renderInline(a.title)}</a>`).join('<span aria-hidden="true">›</span>')

    this.el.innerHTML = `
      <div class="panel-top">
        <nav class="crumbs" aria-label="Where this sits">${crumbs || '<span>The whole map</span>'}</nav>
        <button type="button" class="panel-close" title="Close (Esc)" aria-label="Close">×</button>
      </div>
      <article class="panel-body" style="--c:${n.color}">
        <div class="panel-kind">${KINDS[n.kind] ?? esc(n.kind)}${topic ? ` · ${n.leafCount} concepts` : rankTag(n, this.atlas)}</div>
        <h2 class="panel-title">${renderInline(n.title)}</h2>
        ${entry(n, resolve)}
        ${topic ? contents(n) : ''}
        ${n.twins?.length ? `<section class="links twins"><h3>Intertwined with <span class="note">each builds on part of the other</span></h3><div class="chips">${n.twins.map(chip).join('')}</div></section>` : ''}
        ${links('Prerequisites', pre, 'pre', topic ? 'from outside this topic' : '', 'None: a starting point.')}
        ${links('Required for', post, 'post', topic ? 'outside this topic' : '', '')}
        ${path.length ? pathSection(n, path) : ''}
        ${n.quiz.length ? '<section class="practice"><h3>Exercises</h3><div class="quiz-mount"></div></section>' : ''}
      </article>
      <footer class="panel-foot">
        ${topic ? '<span class="topic-progress"></span>' : '<button type="button" class="mastery"></button>'}
        <span class="source" title="Where this is written">${esc(n.file)} · line ${n.line}</span>
      </footer>`
    if (n.quiz.length) {
      mountQuiz(this.el.querySelector('.quiz-mount'), n.quiz, {
        resolve,
        onFinish: (right, total) => { if (right === total) progress.setMastered(n.id, true) },
      })
    }
    this.el.hidden = false
    this.el.scrollTop = 0
    this.refreshProgress()
  }

  /** The index, on the tab given or the one shown last. `focus`, a concept, is found in the ranking. */
  showIndex(tab = this.tab, focus = null) {
    this.node = null
    this.mode = 'index'
    this.tab = tab
    const known = this.atlas.roots.some(d => d.id === this.domain)
    if (!known || (focus && domainOf(focus).id !== this.domain)) this.domain = ''
    const tabs = { contents: 'Index', ranking: 'Ranking' }
    this.el.innerHTML = `
      <div class="panel-top">
        <div class="tabs" role="tablist">${Object.entries(tabs).map(([t, label]) =>
          `<button type="button" role="tab" data-tab="${t}" aria-selected="${t === tab}">${label}</button>`).join('')}</div>
        <button type="button" class="panel-close" title="Close (Esc)" aria-label="Close">×</button>
      </div>
      <article class="panel-body ${tab === 'ranking' ? 'ranking' : 'index'}">${tab === 'ranking' ? ranking(this.atlas, this.domain) : index(this.atlas)}</article>`
    this.el.hidden = false
    this.el.scrollTop = 0
    this.refreshProgress()
    const found = focus && this.el.querySelector(`.ranked [data-id="${CSS.escape(focus.id)}"]`)
    if (found) {
      found.classList.add('is-focus')
      found.closest('details')?.setAttribute('open', '')
      found.scrollIntoView({ block: 'center' })
    }
  }

  hide() {
    this.el.hidden = true
    this.node = null
    this.mode = null
  }

  refreshProgress() {
    if (this.el.hidden) return
    this.el.querySelectorAll('[data-id]').forEach(a => a.classList.toggle('is-mastered', progress.isMastered(a.dataset.id)))
    const n = this.node
    if (!n) return
    const button = this.el.querySelector('.mastery')
    if (button) {
      const on = progress.isMastered(n.id)
      button.classList.toggle('is-on', on)
      button.textContent = on ? '✓ Mastered' : 'Mark as mastered'
    }
    const meter = this.el.querySelector('.topic-progress')
    if (meter) {
      const { done, total } = progress.countIn(n)
      meter.textContent = `${done} of ${total} mastered`
    }
  }
}

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

function contents(n) {
  return `<section class="contents"><h3>Inside</h3><ul>${n.children.map(c =>
    `<li><a href="#${esc(c.id)}" data-id="${esc(c.id)}" style="--c:${c.color}">${renderInline(c.title)}</a>${superMark(c)}` +
    `${c.children.length ? ` <span class="where">${c.leafCount} concepts</span>`
      : c.kind !== 'concept' ? ` <span class="where">${KINDS[c.kind] ?? esc(c.kind)}</span>` : ''}</li>`).join('')}</ul></section>`
}

function index(atlas) {
  const tree = list => `<ul>${list.map(n => `<li><a href="#${esc(n.id)}" data-id="${esc(n.id)}" style="--c:${n.color}">` +
    `${renderInline(n.title)}</a>${superMark(n)}${n.children.length ? tree(n.children) : ''}</li>`).join('')}</ul>`
  return `<p class="index-note">${atlas.ranking.length} concepts in ${atlas.roots.length} domains. Choose one to find it on the map.</p>
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

// The ranking as a tier list. Each concept keeps its number in the whole ranking, even when only
// one domain is shown. With every domain shown, the long lower tiers start folded.
function tiers(atlas, domain) {
  const shown = domain ? atlas.ranking.filter(n => domainOf(n).id === domain) : atlas.ranking
  return TIERS.map(t => {
    const list = shown.filter(n => n.tier === t)
    const end = t.key === 'end' // these all share the last place, so their number says nothing
    const items = `<ol class="ranked chips">${list.map(n => `<li><a class="chip" href="#${esc(n.id)}" data-id="${esc(n.id)}" ` +
      `style="--c:${n.color}" title="${esc(placeOf(n, atlas))}"><span class="chip-title">` +
      `${end ? '' : `<span class="rank-no">${n.rank}</span> `}${renderInline(n.title)}</span></a></li>`).join('')}</ol>`
    const head = `<h3>${t.name} <span class="note">${t.note}</span> <span class="count">${list.length}</span></h3>`
    const fold = !domain && list.length && ['c', 'd', 'end'].includes(t.key)
    return `<section class="tier tier-${t.key}">
      <div class="tier-mark" aria-hidden="true">${t.mark}</div>
      <div class="tier-body">${fold ? `<details><summary>${head}</summary>${items}</details>`
        : head + (list.length ? items : '<p class="none">None.</p>')}</div>
    </section>`
  }).join('')
}

// A concept's place in the ranking, as a button that opens the ranking there.
function rankTag(n, atlas) {
  const t = n.tier
  if (!t) return ''
  const label = t.key === 's' ? '★ Super-concept' : t.key === 'end' ? 'Endpoint' : `Tier ${t.mark}`
  const place = t.key === 'end' ? 'nothing builds on it yet' : `${ordinal(n.rank)} of ${atlas.ranking.length}`
  return `<button type="button" class="rank-tag tier-${t.key}" title="Show it in the ranking">${label} · ${place}</button>`
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
