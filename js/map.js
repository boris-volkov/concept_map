// The map on screen: one element per visible card or open topic, a layer of
// arrows underneath the cards, and the animation from one layout to the next.

import { computeLayout, direction } from './layout.js'
import {
  ancestors, isAncestor, descendants, visibleRep, visibleEdges, prerequisitesOf, dependentsOf,
  externalPrereqs, externalDependents,
} from './model.js'
import { renderInline, plainText, esc } from './markdown.js'
import { KINDS } from './content.js'
import { Camera } from './camera.js'
import { mountQuiz } from './quiz.js'
import * as progress from './progress.js'

const SVG = 'http://www.w3.org/2000/svg'
const DURATION = 560
const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
const lerp = (a, b, t) => a + (b - a) * t
const r1 = v => Math.round(v * 10) / 10
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export class AtlasMap {
  constructor({ viewport, world, svg, atlas, onSelect, onView }) {
    this.viewport = viewport
    this.world = world
    this.svg = svg
    this.onSelect = onSelect
    this.onView = onView
    this.open = new Set() // ids of open topics
    this.els = new Map() // id → element, for everything on screen
    this.cur = new Map() // id → box as currently drawn (mid-animation too)
    this.paths = new Map() // edge key → <path>
    this.edges = new Map()
    this.sizes = new Map()
    this.heads = new Map()
    this.selected = null
    this.hl = null
    this.anim = null
    this.quiz = null
    this.camera = new Camera(viewport, world, () => this.cameraMoved())
    viewport.addEventListener('click', e => this.click(e))
    viewport.addEventListener('pointerover', e => {
      const el = e.target.closest?.('.node:not(.is-open)')
      this.hover(el ? this.atlas.nodes.get(el.dataset.id) : null)
    })
    viewport.addEventListener('pointerleave', () => this.hover(null))
    viewport.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList?.contains('node')) {
        e.preventDefault()
        this.click(e)
      }
    })
    progress.onChange(() => this.refreshProgress())
    this.setAtlas(atlas)
  }

  setAtlas(atlas) {
    this.finish()
    this.closeQuiz()
    this.atlas = atlas
    for (const el of this.els.values()) el.remove()
    for (const p of this.paths.values()) p.remove()
    for (const m of [this.els, this.cur, this.paths, this.sizes, this.heads]) m.clear()
    this.edges = new Map()
    this.open = new Set([...this.open].filter(id => atlas.nodes.get(id)?.children.length))
    this.selected = (this.selected && atlas.nodes.get(this.selected.id)) || null
  }

  isOpen(n) {
    return n.children.length > 0 && this.open.has(n.id)
  }

  visibleNodes() {
    const out = []
    const walk = list => {
      for (const n of list) {
        out.push(n)
        if (this.isOpen(n)) walk(n.children)
      }
    }
    walk(this.atlas.roots)
    return out
  }

  // ---- elements ----

  element(n) {
    let el = this.els.get(n.id)
    if (el) return el
    el = document.createElement('div')
    el.dataset.id = n.id
    el.style.setProperty('--c', n.color)
    el.style.opacity = '0'
    el.tabIndex = 0
    el.setAttribute('role', 'button')
    if (n.children.length) {
      const label = n.depth === 0 ? 'Domain' : 'Topic'
      el.className = `node group depth-${Math.min(n.depth, 4)}`
      el.innerHTML = `<div class="face">
          <div class="eyebrow">${label} · ${n.leafCount} ${n.leafCount === 1 ? 'concept' : 'concepts'}</div>
          <div class="title">${renderInline(n.title)}</div>
          ${n.summary ? `<div class="summary">${renderInline(n.summary)}</div>` : ''}
          <div class="meter"><span></span></div>
        </div>${frameHead(n)}`
      el.setAttribute('aria-label', `${n.plainTitle}, ${label.toLowerCase()} of ${n.leafCount} concepts`)
    } else {
      el.className = `node leaf kind-${n.kind}`
      el.innerHTML = `${n.kind !== 'concept' ? `<div class="kind">${KINDS[n.kind] ?? esc(n.kind)}</div>` : ''}
        <div class="title">${renderInline(n.title)}</div>
        <div class="marks">${n.quiz.length
          ? `<button type="button" class="quiz-badge" title="Quiz: ${n.quiz.length} question${n.quiz.length > 1 ? 's' : ''}" aria-label="Quiz">?</button>`
          : ''}<span class="check" title="Mastered">✓</span></div>`
      el.setAttribute('aria-label', n.plainTitle + (n.kind !== 'concept' ? ` (${n.kind})` : ''))
      if (n.summary) el.title = plainText(n.summary)
    }
    this.world.append(el)
    this.els.set(n.id, el)
    this.markProgress(n, el)
    return el
  }

  cardSize(n) {
    let s = this.sizes.get(n.id)
    if (s) return s
    const el = this.element(n)
    const wasOpen = el.classList.contains('is-open')
    const { width, height } = el.style
    el.classList.remove('is-open')
    el.style.width = ''
    el.style.height = ''
    s = { w: el.offsetWidth, h: el.offsetHeight }
    el.classList.toggle('is-open', wasOpen)
    el.style.width = width
    el.style.height = height
    this.sizes.set(n.id, s)
    return s
  }

  headWidth(n) {
    let w = this.heads.get(n.id)
    if (w !== undefined) return w
    const probe = document.createElement('div')
    probe.className = `node group is-open probe depth-${Math.min(n.depth, 4)}`
    probe.innerHTML = frameHead(n)
    this.world.append(probe)
    w = probe.firstElementChild.scrollWidth + 4
    probe.remove()
    this.heads.set(n.id, w)
    return w
  }

  // ---- layout and animation ----

  /** Lays the map out again and animates to it. Returns the new boxes at once, and a promise for the end. */
  relayout({ animate = true } = {}) {
    this.finish()
    const visible = this.visibleNodes()
    const shown = new Set(visible.map(n => n.id))
    for (const n of visible) this.element(n).classList.toggle('is-open', this.isOpen(n))
    const layout = computeLayout(this.atlas.root, n => this.isOpen(n), n => this.cardSize(n), n => this.headWidth(n))
    this.bounds = { x: 0, y: 0, w: layout.width, h: layout.height }
    const target = layout.boxes

    // New cards grow out of the topic they were inside; departing ones shrink back into it.
    const moves = []
    for (const n of visible) {
      const to = target.get(n.id)
      const from = this.cur.get(n.id)
      if (from) { moves.push({ id: n.id, el: this.els.get(n.id), from, to, s0: 1, o0: 1, s1: 1, o1: 1 }); continue }
      const home = ancestors(n).map(a => this.cur.get(a.id)).find(Boolean)
      moves.push({
        id: n.id, el: this.els.get(n.id), to, s1: 1, o1: 1, o0: 0, s0: home ? 0.35 : 1,
        from: home ? { x: home.x + home.w / 2 - to.w / 2, y: home.y + Math.min(home.h, 160) / 2 - to.h / 2, w: to.w, h: to.h } : to,
      })
    }
    for (const [id, box] of this.cur) {
      if (shown.has(id)) continue
      const n = this.atlas.nodes.get(id)
      const home = n && ancestors(n).map(a => target.get(a.id)).find(Boolean)
      moves.push({
        id, el: this.els.get(id), from: box, s0: 1, o0: 1, s1: 0.35, o1: 0, leaving: true,
        to: home ? { x: home.x + home.w / 2 - box.w / 2, y: home.y + Math.min(home.h, 160) / 2 - box.h / 2, w: box.w, h: box.h } : box,
      })
    }

    const before = this.edges
    this.edges = visibleEdges(this.atlas, n => this.isOpen(n))
    this.highlight()
    let done
    const finished = new Promise(resolve => { done = resolve })
    this.anim = { moves, before, start: performance.now(), done }
    if (!animate || reduceMotion()) this.finish()
    else this.raf = requestAnimationFrame(this.tick)
    return { boxes: target, finished }
  }

  tick = now => {
    const a = this.anim
    if (!a) return
    const u = Math.min(1, (now - a.start) / DURATION)
    this.frame(a, ease(u))
    if (u < 1) this.raf = requestAnimationFrame(this.tick)
    else this.finish()
  }

  frame(a, t) {
    for (const m of a.moves) {
      const b = { x: lerp(m.from.x, m.to.x, t), y: lerp(m.from.y, m.to.y, t), w: lerp(m.from.w, m.to.w, t), h: lerp(m.from.h, m.to.h, t) }
      this.cur.set(m.id, b)
      const s = lerp(m.s0, m.s1, t)
      m.el.style.transform = `translate(${r1(b.x)}px, ${r1(b.y)}px)${s !== 1 ? ` scale(${s.toFixed(3)})` : ''}`
      m.el.style.width = `${r1(b.w)}px`
      m.el.style.height = `${r1(b.h)}px`
      const settled = (m.o0 === 1 && m.o1 === 1) || (t === 1 && !m.leaving)
      m.el.style.opacity = settled ? '' : lerp(m.o0, m.o1, t).toFixed(3)
    }
    this.drawEdges(a.before, t)
    this.placeQuiz()
  }

  finish() {
    const a = this.anim
    if (!a) return
    cancelAnimationFrame(this.raf)
    this.anim = null
    this.frame(a, 1)
    for (const m of a.moves) {
      if (!m.leaving) continue
      m.el.remove()
      this.els.delete(m.id)
      this.cur.delete(m.id)
    }
    this.drawEdges(null, 1)
    a.done()
  }

  // ---- arrows ----

  drawEdges(before, t) {
    const items = []
    for (const e of this.edges.values()) items.push({ e, alpha: before && !before.has(e.key) ? t : 1 })
    if (before) for (const e of before.values()) if (!this.edges.has(e.key)) items.push({ e, alpha: 1 - t })
    const outs = new Map()
    const ins = new Map()
    const live = []
    for (const it of items) {
      it.a = this.cur.get(it.e.from.id)
      it.b = this.cur.get(it.e.to.id)
      if (!it.a || !it.b) continue
      // An arrow follows the flow of the topic it runs within: out of a right side into a left one, or bottom into top.
      it.dir = direction(it.e.within ? it.e.within.depth : -1)
      addTo(outs, it.e.from.id + it.dir, it)
      addTo(ins, it.e.to.id + it.dir, it)
      live.push(it)
    }
    // Several arrows leaving (or entering) one side spread out along it, in the order of their other ends.
    fan(outs, 'out')
    fan(ins, 'in')
    const keep = new Set()
    for (const it of live) {
      const p = this.paths.get(it.e.key) ?? this.makePath(it.e)
      p.setAttribute('d', it.dir === 'down'
        ? curve(it.out, it.a.y + it.a.h, it.in, it.b.y, true)
        : curve(it.a.x + it.a.w, it.out, it.b.x, it.in, false))
      p.style.opacity = it.alpha === 1 ? '' : it.alpha.toFixed(3)
      keep.add(it.e.key)
    }
    for (const [key, p] of this.paths) {
      if (keep.has(key)) continue
      p.remove()
      this.paths.delete(key)
    }
  }

  makePath(e) {
    const p = document.createElementNS(SVG, 'path')
    p.classList.add('edge')
    // Arrows between cards in different topics run across other cards and frames; draw them lighter.
    if (e.from.parent !== e.to.parent) p.classList.add('cross')
    if (this.hovered && (e.from === this.hovered || e.to === this.hovered)) p.classList.add('lit')
    p.style.setProperty('--c', e.from.color)
    p.style.setProperty('--w', (1.2 + Math.min(2.6, Math.log2(e.pairs.length) * 0.65)).toFixed(2))
    const title = document.createElementNS(SVG, 'title')
    title.textContent = edgeLabel(e)
    p.append(title)
    const state = this.edgeState(e)
    if (state) p.classList.add(state)
    this.svg.append(p)
    this.paths.set(e.key, p)
    return p
  }

  // ---- selection ----

  select(n, { pan = true } = {}) {
    this.selected = n
    this.highlight()
    this.onSelect?.(n)
    if (n && pan) {
      const box = this.cur.get(visibleRep(n, x => this.isOpen(x)).id)
      if (box && !this.camera.shows(box)) this.camera.animateTo(this.camera.centre(box))
    }
  }

  highlight() {
    const sel = this.selected
    this.viewport.classList.toggle('has-selection', !!sel)
    this.hl = null
    if (sel) {
      const isOpen = n => this.isOpen(n)
      const reps = set => new Set([...set].map(n => visibleRep(n, isOpen)))
      this.hl = {
        sel,
        pre: prerequisitesOf(sel),
        post: dependentsOf(sel),
        selRep: visibleRep(sel, isOpen),
        preDirect: reps(sel.children.length ? externalPrereqs(sel) : sel.prereqs),
        postDirect: reps(sel.children.length ? externalDependents(sel) : sel.dependents),
      }
      this.hl.preRep = reps(this.hl.pre)
      this.hl.postRep = reps(this.hl.post)
    }
    for (const [id, el] of this.els) this.markNode(this.atlas.nodes.get(id), el)
    for (const [key, p] of this.paths) {
      p.classList.remove('pre', 'post', 'dim')
      const e = this.edges.get(key)
      const state = e && this.edgeState(e)
      if (state) p.classList.add(state)
    }
  }

  markNode(n, el) {
    const h = this.hl
    const sel = !!h && n === h.selRep
    const pre = !!h && !sel && h.preRep.has(n)
    const post = !!h && !sel && !pre && h.postRep.has(n)
    el.classList.toggle('is-selected', sel)
    el.classList.toggle('is-pre', pre)
    el.classList.toggle('is-pre-direct', pre && h.preDirect.has(n))
    el.classList.toggle('is-post', post)
    el.classList.toggle('is-post-direct', post && h.postDirect.has(n))
    el.classList.toggle('is-dim', !!h && !sel && !pre && !post && !this.isOpen(n))
  }

  // 'pre' if the arrow is part of what the selection builds on, 'post' if part of what builds on it.
  edgeState(e) {
    const h = this.hl
    if (!h) return ''
    const within = n => n === h.sel || isAncestor(h.sel, n)
    let post = false
    for (const [p, c] of e.pairs) {
      if (h.pre.has(p) && (h.pre.has(c) || within(c))) return 'pre'
      if ((within(p) || h.post.has(p)) && h.post.has(c)) post = true
    }
    return post ? 'post' : 'dim'
  }

  // ---- interaction ----

  /** Lights up the arrows into and out of the card under the pointer. */
  hover(n) {
    if (n === this.hovered) return
    this.hovered = n
    for (const [key, p] of this.paths) {
      const e = this.edges.get(key)
      p.classList.toggle('lit', !!n && !!e && (e.from === n || e.to === n))
    }
  }

  click(e) {
    const t = e.target
    // The path, not t.closest(): a quiz redraws itself on click, detaching the button that was clicked.
    if (e.composedPath().some(x => x.classList?.contains('quiz-pop'))) return
    const el = t.closest('.node')
    const n = el && this.atlas.nodes.get(el.dataset.id)
    if (!n) return this.background()
    if (t.closest('.quiz-badge')) return this.openQuiz(n)
    if (t.closest('.frame-head .about')) return this.select(n)
    if (t.closest('.frame-head') || (this.isOpen(n) && e.type === 'keydown')) return this.collapse(n)
    if (this.isOpen(n)) return this.background()
    if (n.children.length) return this.expand(n)
    this.select(n)
  }

  background() {
    this.closeQuiz()
    if (this.selected) this.select(null)
  }

  expand(n) {
    this.open.add(n.id)
    const { boxes } = this.relayout()
    this.camera.animateTo(this.camera.fit(boxes.get(n.id), { pad: 36, maxK: Math.max(1, this.camera.k) }), DURATION + 120)
  }

  collapse(n) {
    this.open.delete(n.id)
    for (const d of descendants(n)) this.open.delete(d.id)
    const { boxes } = this.relayout()
    const box = boxes.get(n.id)
    if (box && !this.camera.shows(box)) this.camera.animateTo(this.camera.centre(box), DURATION + 120)
    this.onView?.()
  }

  /** Opens whatever hides `n`, selects it and brings it to the middle of the screen. */
  reveal(n) {
    let changed = false
    for (const a of ancestors(n)) {
      if (this.open.has(a.id)) continue
      this.open.add(a.id)
      changed = true
    }
    const boxes = changed ? this.relayout().boxes : this.cur
    this.select(n, { pan: false })
    const box = boxes.get(n.id)
    if (box) this.camera.animateTo(this.camera.centre(box, Math.min(1.25, Math.max(this.camera.k, 0.9))), DURATION + 150)
  }

  /** Opens topics until `n` and its direct prerequisites (or dependents) show as separate cards, then frames them. */
  revealAround(n, which = 'pre') {
    const group = n.children.length > 0
    const others = which === 'pre'
      ? [...(group ? externalPrereqs(n) : n.prereqs)]
      : [...(group ? externalDependents(n) : n.dependents)]
    for (const t of [n, ...others]) for (const a of ancestors(t)) this.open.add(a.id)
    const { boxes } = this.relayout()
    this.select(n, { pan: false })
    const all = [n, ...others].map(t => boxes.get(t.id)).filter(Boolean)
    this.camera.animateTo(this.camera.fit(union(all), { pad: 60, maxK: 1.1 }), DURATION + 150)
  }

  overview() {
    this.closeQuiz()
    this.open.clear()
    this.relayout()
    this.camera.animateTo(this.camera.fit(this.bounds, { maxK: 1 }), DURATION + 150)
  }

  openAll() {
    for (const n of this.atlas.nodes.values()) if (n.children.length) this.open.add(n.id)
    this.relayout()
    this.camera.animateTo(this.camera.fit(this.bounds, { maxK: 1 }), DURATION + 150)
  }

  fitAll(animate = true) {
    this.camera.animateTo(this.camera.fit(this.bounds, { maxK: 1 }), animate ? 600 : 0)
  }

  zoomBy(f) {
    const c = this.camera
    const { w, h } = c.size()
    const px = c.inset.left + (w - c.inset.left - c.inset.right) / 2
    const py = c.inset.top + (h - c.inset.top - c.inset.bottom) / 2
    const k = Math.min(c.maxK, Math.max(c.minK, c.k * f))
    c.animateTo({ x: px - (px - c.x) * (k / c.k), y: py - (py - c.y) * (k / c.k), k }, 220)
  }

  // ---- quizzes inside the map ----

  openQuiz(n) {
    this.closeQuiz()
    const pop = document.createElement('div')
    pop.className = 'quiz-pop'
    pop.style.setProperty('--c', n.color)
    pop.innerHTML = `<div class="quiz-pop-head"><span class="quiz-pop-title">${renderInline(n.title)}</span>` +
      '<button type="button" class="quiz-pop-close" aria-label="Close quiz">×</button></div><div class="quiz-pop-body"></div>'
    pop.querySelector('.quiz-pop-close').addEventListener('click', () => this.closeQuiz())
    mountQuiz(pop.querySelector('.quiz-pop-body'), n.quiz, {
      resolve: id => this.atlas.nodes.get(id),
      onFinish: (right, total) => { if (right === total) progress.setMastered(n.id, true) },
    })
    this.world.append(pop)
    this.quiz = { node: n, el: pop }
    this.els.get(n.id)?.classList.add('has-quiz-open')
    this.placeQuiz()
    const b = this.cur.get(n.id)
    if (b) {
      const area = { x: b.x - 12, y: b.y - 16, w: b.w + 14 + pop.offsetWidth + 24, h: Math.max(b.h, pop.offsetHeight) + 32 }
      if (!this.camera.shows(area)) this.camera.animateTo(this.camera.fit(area, { pad: 24, maxK: Math.max(1, this.camera.k) }))
    }
  }

  closeQuiz() {
    if (!this.quiz) return
    this.quiz.el.remove()
    this.els.get(this.quiz.node.id)?.classList.remove('has-quiz-open')
    this.quiz = null
  }

  placeQuiz() {
    if (!this.quiz) return
    const b = this.cur.get(this.quiz.node.id)
    if (!b) return this.closeQuiz()
    this.quiz.el.style.transform = `translate(${r1(b.x + b.w + 14)}px, ${r1(b.y - 6)}px)`
  }

  // ---- progress and camera ----

  markProgress(n, el) {
    if (n.children.length) {
      const { done, total } = progress.countIn(n)
      el.querySelector('.meter span').style.width = `${(100 * done) / total}%`
      el.classList.toggle('has-progress', done > 0)
    } else {
      el.classList.toggle('is-mastered', progress.isMastered(n.id))
      el.classList.toggle('is-ready', progress.isReady(n))
    }
  }

  refreshProgress() {
    for (const [id, el] of this.els) {
      const n = this.atlas.nodes.get(id)
      if (n) this.markProgress(n, el)
    }
  }

  cameraMoved() {
    const { x, y, k } = this.camera
    const minor = 32 * k
    const major = minor * 5
    const s = this.viewport.style
    s.backgroundSize = `${major}px ${major}px, ${major}px ${major}px, ${minor}px ${minor}px, ${minor}px ${minor}px`
    s.backgroundPosition = `${x}px ${y}px`
    s.setProperty('--minor', Math.max(0, Math.min(1, (k - 0.3) / 0.5)).toFixed(2))
    this.viewport.classList.toggle('is-far', k < 0.45)
    this.onView?.()
  }
}

const frameHead = n => `<div class="frame-head">
  <span class="frame-title">${renderInline(n.title)}</span>
  <span class="frame-count">${n.leafCount}</span>
  <button type="button" class="about" title="About this topic" aria-label="About ${esc(n.plainTitle)}">i</button>
  <button type="button" class="shut" title="Close this topic" aria-label="Close ${esc(n.plainTitle)}">×</button>
</div>`

function edgeLabel(e) {
  const n = e.pairs.length
  if (n === 1) return `${e.pairs[0][0].plainTitle} → ${e.pairs[0][1].plainTitle}`
  return `${e.from.plainTitle} → ${e.to.plainTitle}: ${n} prerequisites\n` +
    e.pairs.slice(0, 8).map(([p, c]) => `  ${p.plainTitle} → ${c.plainTitle}`).join('\n') +
    (n > 8 ? `\n  …and ${n - 8} more` : '')
}

function addTo(map, key, item) {
  const list = map.get(key)
  if (list) list.push(item)
  else map.set(key, [item])
}

// side 'out' places where arrows leave their source box; 'in', where they reach their target.
function fan(groups, side) {
  for (const list of groups.values()) {
    const down = list[0].dir === 'down'
    const own = it => (side === 'out' ? it.a : it.b)
    const other = it => (side === 'out' ? it.b : it.a)
    const mid = box => (down ? box.x + box.w / 2 : box.y + box.h / 2)
    list.sort((p, q) => mid(other(p)) - mid(other(q)))
    const box = own(list[0])
    const span = down ? box.w : box.h
    const gap = list.length > 1 ? Math.min(9, (span * 0.6) / (list.length - 1)) : 0
    list.forEach((it, i) => { it[side] = mid(box) + (i - (list.length - 1) / 2) * gap })
  }
}

// An S-curve from one box to the next, across (right side to left side) or down (bottom to top),
// ending in an open arrowhead. One that has to double back loops out wide.
function curve(sx, sy, tx, ty, down) {
  const d = down ? ty - sy : tx - sx
  const c = d > 30 ? Math.min(360, Math.max(30, d * 0.5)) : Math.max(70, 70 - d * 0.5)
  const [p, q] = down ? [[sx, sy + c], [tx, ty - c]] : [[sx + c, sy], [tx - c, ty]]
  const head = down
    ? `M${r1(tx - 4)},${r1(ty - 7)}L${r1(tx)},${r1(ty)}L${r1(tx + 4)},${r1(ty - 7)}`
    : `M${r1(tx - 7)},${r1(ty - 4)}L${r1(tx)},${r1(ty)}L${r1(tx - 7)},${r1(ty + 4)}`
  return `M${r1(sx)},${r1(sy)}C${r1(p[0])},${r1(p[1])} ${r1(q[0])},${r1(q[1])} ${r1(tx)},${r1(ty)}${head}`
}

function union(boxes) {
  const x0 = Math.min(...boxes.map(b => b.x))
  const y0 = Math.min(...boxes.map(b => b.y))
  const x1 = Math.max(...boxes.map(b => b.x + b.w))
  const y1 = Math.max(...boxes.map(b => b.y + b.h))
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }
}
