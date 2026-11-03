// The side panel: everything about one concept (or topic), and the index of all of them.

import { renderMarkdown, renderInline, esc } from './markdown.js'
import { ancestors, learningPath, externalPrereqs, externalDependents, leaves } from './model.js'
import { KINDS } from './content.js'
import { mountQuiz } from './quiz.js'
import * as progress from './progress.js'

export class Panel {
  constructor(el, { onClose, onReveal }) {
    this.el = el
    this.node = null
    this.mode = null
    el.addEventListener('click', e => {
      const t = e.target
      if (t.closest('.panel-close')) return onClose()
      const reveal = t.closest('[data-reveal]')
      if (reveal) return onReveal(this.node, reveal.dataset.reveal)
      if (t.closest('.mastery')) progress.setMastered(this.node.id, !progress.isMastered(this.node.id))
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
        <div class="panel-kind">${KINDS[n.kind] ?? esc(n.kind)}${topic ? ` · ${n.leafCount} concepts` : ''}</div>
        <h2 class="panel-title">${renderInline(n.title)}</h2>
        ${n.body ? `<div class="prose">${renderMarkdown(n.body, { resolve })}</div>` : '<p class="prose empty">No explanation written yet.</p>'}
        ${topic ? contents(n) : ''}
        ${links('Builds on', pre, 'pre', topic ? 'from outside this topic' : '', 'Nothing: this is a starting point.')}
        ${links('Leads to', post, 'post', topic ? 'outside this topic' : '', topic ? '' : 'Nothing yet: the end of the line, for now.')}
        ${path.length ? pathSection(n, path) : ''}
        ${n.quiz.length ? '<section class="practice"><h3>Practice</h3><div class="quiz-mount"></div></section>' : ''}
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

  showIndex() {
    this.node = null
    this.mode = 'index'
    const tree = list => `<ul>${list.map(n => `<li><a href="#${esc(n.id)}" data-id="${esc(n.id)}" style="--c:${n.color}">` +
      `${renderInline(n.title)}</a>${n.children.length ? tree(n.children) : ''}</li>`).join('')}</ul>`
    const leafCount = [...this.atlas.nodes.values()].filter(n => !n.children.length).length
    this.el.innerHTML = `
      <div class="panel-top">
        <span class="panel-heading">Index</span>
        <button type="button" class="panel-close" title="Close (Esc)" aria-label="Close">×</button>
      </div>
      <article class="panel-body index">
        <p class="index-note">${leafCount} concepts in ${this.atlas.roots.length} domains. Choose one to find it on the map.</p>
        ${this.atlas.roots.map(d => `<details style="--c:${d.color}"><summary>${renderInline(d.title)}` +
          `<span class="where">${d.leafCount}</span></summary>${tree(d.children)}</details>`).join('')}
      </article>`
    this.el.hidden = false
    this.el.scrollTop = 0
    this.refreshProgress()
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
    `<li><a href="#${esc(c.id)}" data-id="${esc(c.id)}" style="--c:${c.color}">${renderInline(c.title)}</a>` +
    `${c.children.length ? ` <span class="where">${c.leafCount} concepts</span>`
      : c.kind !== 'concept' ? ` <span class="where">${KINDS[c.kind] ?? esc(c.kind)}</span>` : ''}</li>`).join('')}</ul></section>`
}

function pathSection(n, path) {
  const known = q => leaves(q).every(l => progress.isMastered(l.id))
  const started = path.some(p => progress.isMastered(p.id))
  const next = [...path, n].find(p => !p.children.length && !progress.isMastered(p.id) && p.prereqs.every(known))
  const suggestion = started && next
    ? `<p class="next-up">Next to learn: <a href="#${esc(next.id)}" style="--c:${next.color}">${renderInline(next.title)}</a></p>`
    : ''
  return `<section class="path">
    ${suggestion}
    <details>
      <summary>Everything it rests on <span class="count">${path.length}</span></summary>
      <p class="note">In an order you could learn them, foundations first.</p>
      <ol>${path.map(p => `<li><a href="#${esc(p.id)}" data-id="${esc(p.id)}" style="--c:${p.color}">${renderInline(p.title)}</a>` +
        `${p.parent ? ` <span class="where">${renderInline(p.parent.title)}</span>` : ''}</li>`).join('')}</ol>
    </details>
  </section>`
}
