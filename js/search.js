// The search box: type part of a name, pick a result, and the map flies to it.

import { renderInline, esc } from './markdown.js'
import { ancestors } from './model.js'
import { KINDS } from './content.js'

export class Search {
  constructor(input, list, { onPick }) {
    this.input = input
    this.list = list
    this.onPick = onPick
    this.results = []
    this.active = 0
    input.addEventListener('input', () => this.update())
    input.addEventListener('focus', () => this.update())
    input.addEventListener('blur', () => setTimeout(() => this.close(), 150))
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        this.move(e.key === 'ArrowDown' ? 1 : -1)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        this.pick(this.results[this.active])
      } else if (e.key === 'Escape') {
        input.value = ''
        this.close()
        input.blur()
      }
    })
    list.addEventListener('pointerdown', e => e.preventDefault()) // keep focus in the box while clicking a result
    list.addEventListener('click', e => {
      const li = e.target.closest('[data-i]')
      if (li) this.pick(this.results[+li.dataset.i])
    })
  }

  setAtlas(atlas) {
    this.entries = [...atlas.nodes.values()].map(n => {
      const title = n.plainTitle.toLowerCase()
      return {
        node: n,
        title,
        words: title.split(/[^a-z0-9']+/).filter(Boolean),
        id: n.id,
        tags: n.tags,
        summary: (n.summary ?? '').toLowerCase(),
        path: ancestors(n).reverse().map(a => a.plainTitle).join(' › '),
      }
    })
  }

  score(e, q, tokens) {
    let s = 0
    if (e.title === q) s += 200
    else if (e.title.startsWith(q)) s += 120
    else if (e.words.some(w => w.startsWith(q))) s += 90
    else if (e.title.includes(q)) s += 60
    if (e.id === q.replace(/\s+/g, '-')) s += 80
    for (const t of tokens) {
      if (e.words.some(w => w.startsWith(t))) s += 14
      else if (e.title.includes(t) || e.id.includes(t)) s += 10
      else if (e.tags.some(g => g.startsWith(t))) s += 8
      else if (e.summary.includes(t)) s += 3
      else return 0
    }
    return s - e.node.depth * 0.5
  }

  update() {
    const q = this.input.value.trim().toLowerCase()
    if (!q) return this.close()
    const tokens = q.split(/\s+/)
    this.results = this.entries
      .map(e => ({ e, s: this.score(e, q, tokens) }))
      .filter(r => r.s > 0)
      .sort((a, b) => b.s - a.s || a.e.node.order - b.e.node.order)
      .slice(0, 12)
      .map(r => r.e.node)
    this.active = 0
    this.list.innerHTML = this.results.length
      ? this.results.map((n, i) => `<li role="option" data-i="${i}" style="--c:${n.color}">
          <span class="r-title">${renderInline(n.title)}</span>
          <span class="r-kind">${n.depth === 0 ? 'Subject' : KINDS[n.kind] ?? esc(n.kind)}</span>
          <span class="r-path">${esc(this.entries.find(e => e.node === n).path)}</span></li>`).join('')
      : '<li class="empty">Nothing by that name yet.</li>'
    this.list.hidden = false
    this.input.setAttribute('aria-expanded', 'true')
    this.move(0)
  }

  move(step) {
    if (!this.results.length) return
    this.active = (this.active + step + this.results.length) % this.results.length
    this.list.querySelectorAll('[data-i]').forEach((li, i) => {
      li.classList.toggle('is-active', i === this.active)
      li.setAttribute('aria-selected', i === this.active)
    })
    this.list.querySelector('.is-active')?.scrollIntoView({ block: 'nearest' })
  }

  pick(n) {
    if (!n) return
    this.input.value = ''
    this.close()
    this.input.blur()
    this.onPick(n)
  }

  close() {
    this.list.hidden = true
    this.input.setAttribute('aria-expanded', 'false')
  }
}
