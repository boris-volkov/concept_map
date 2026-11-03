// The map on screen: one element per visible card or open topic, and a layer of
// arrows underneath the cards. A new layout is applied at once, without any
// animation, so the map stays quick however much of it is open.

import { computeLayout, flowOf } from './layout.js'
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
const GRID_MARGIN = 4000 // how far the survey grid runs past the edges of the map; a multiple of its 160px squares
const r1 = v => Math.round(v * 10) / 10

export class AtlasMap {
  constructor({ viewport, world, svg, grid, atlas, onSelect, onView }) {
    this.viewport = viewport
    this.world = world
    this.svg = svg
    this.grid = grid
    this.onSelect = onSelect
    this.onView = onView
    this.open = new Set() // ids of open topics
    this.els = new Map() // id → element, for everything on screen
    this.boxes = new Map() // id → its box on the map
    this.paths = new Map() // edge key → <path>
    this.edges = new Map()
    this.sizes = new Map()
    this.heads = new Map()
    this.selected = null
    this.hl = null
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
    this.closeQuiz()
    this.atlas = atlas
    for (const el of this.els.values()) el.remove()
    for (const p of this.paths.values()) p.remove()
    for (const m of [this.els, this.boxes, this.paths, this.sizes, this.heads]) m.clear()
    this.edges = new Map()
    this.open = new Set([...this.open].filter(id => atlas.nodes.get(id)?.children.length))
    this.selected = (this.selected && atlas.nodes.get(this.selected.id)) || null
    this.current = (this.current && atlas.nodes.get(this.current.id)) || null
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
    el.tabIndex = 0
    el.setAttribute('role', 'button')
    if (n.children.length) {
      const label = n.depth === 0 ? 'Domain' : 'Topic'
      const supers = descendants(n).filter(d => d.tier?.key === 's').length
      el.className = `node group depth-${Math.min(n.depth, 4)}`
      // A topic holding nothing but axioms is gilded like its axioms.
      if (descendants(n).every(d => d.children.length || d.kind === 'axiom')) el.classList.add('axioms')
      el.innerHTML = `<div class="face">
          <div class="eyebrow">${label} · ${n.leafCount} ${n.leafCount === 1 ? 'concept' : 'concepts'}${supers
            ? ` · <span class="super-mark" title="Super-concepts inside">★ ${supers}</span>` : ''}</div>
          <div class="title">${renderInline(n.title)}</div>
          ${n.summary ? `<div class="summary">${renderInline(n.summary)}</div>` : ''}
          <div class="meter"><span></span></div>
        </div>${frameHead(n)}`
      el.setAttribute('aria-label', `${n.plainTitle}, ${label.toLowerCase()} of ${n.leafCount} concepts` +
        (supers ? `, ${supers} of them ${supers === 1 ? 'a super-concept' : 'super-concepts'}` : ''))
    } else {
      // A super-concept, at the top of the ranking, carries a red star (see the stylesheet).
      const sup = n.tier?.key === 's'
      el.className = `node leaf kind-${n.kind}${sup ? ' is-super' : ''}`
      el.innerHTML = `${n.kind !== 'concept' ? `<div class="kind">${KINDS[n.kind] ?? esc(n.kind)}</div>` : ''}
        <div class="title">${renderInline(n.title)}</div>
        <div class="marks">${n.quiz.length
          ? `<button type="button" class="quiz-badge" title="Quiz: ${n.quiz.length} question${n.quiz.length > 1 ? 's' : ''}" aria-label="Quiz">?</button>`
          : ''}<span class="check" title="Mastered">✓</span></div>`
      el.setAttribute('aria-label', n.plainTitle + (n.kind !== 'concept' ? ` (${n.kind})` : '') + (sup ? ', a super-concept' : ''))
      const tip = [n.summary && plainText(n.summary), sup && `★ Super-concept, ranked ${n.rank} of ${this.atlas.ranking.length}`]
        .filter(Boolean).join('\n\n')
      if (tip) el.title = tip
    }
    this.world.append(el)
    this.els.set(n.id, el)
    this.markProgress(n, el)
    return el
  }

  // Card sizes and frame-title widths are measured once each and remembered. Every new element
  // is put in place before any is measured, so the browser lays the page out once rather than
  // once per card.
  measure(visible) {
    for (const n of visible) this.element(n)
    const cards = visible.filter(n => !this.sizes.has(n.id))
    const frames = visible.filter(n => this.isOpen(n) && !this.heads.has(n.id))
    const probes = frames.map(n => {
      const probe = document.createElement('div')
      probe.className = `node group is-open probe depth-${Math.min(n.depth, 4)}`
      probe.innerHTML = frameHead(n)
      this.world.append(probe)
      return probe
    })
    for (const n of cards) {
      const el = this.els.get(n.id)
      this.sizes.set(n.id, { w: el.offsetWidth, h: el.offsetHeight })
    }
    frames.forEach((n, i) => this.heads.set(n.id, probes[i].firstElementChild.scrollWidth + 4))
    for (const probe of probes) probe.remove()
  }

  // ---- layout ----

  /** Lays the map out again and puts everything in its new place at once. Returns the boxes by id. */
  relayout() {
    const visible = this.visibleNodes()
    const shown = new Set(visible.map(n => n.id))
    for (const [id, el] of this.els) {
      if (shown.has(id)) continue
      el.remove()
      this.els.delete(id)
    }
    this.measure(visible)
    for (const n of visible) {
      const el = this.els.get(n.id)
      el.classList.toggle('is-open', this.isOpen(n))
      el.classList.toggle('is-current', n === this.current) // the topic opened last, outlined in gold
    }
    const layout = computeLayout(this.atlas.root, n => this.isOpen(n), n => this.sizes.get(n.id), n => this.heads.get(n.id))
    this.bounds = { x: 0, y: 0, w: layout.width, h: layout.height }
    for (const n of visible) {
      const b = layout.boxes.get(n.id)
      const was = this.boxes.get(n.id)
      if (was && was.x === b.x && was.y === b.y && was.w === b.w && was.h === b.h) continue
      const s = this.els.get(n.id).style
      s.transform = `translate(${r1(b.x)}px, ${r1(b.y)}px)`
      s.width = `${r1(b.w)}px`
      s.height = `${r1(b.h)}px`
    }
    this.boxes = layout.boxes
    const g = this.grid.style
    g.transform = `translate(${-GRID_MARGIN}px, ${-GRID_MARGIN}px)`
    g.width = `${Math.ceil(layout.width) + 2 * GRID_MARGIN}px`
    g.height = `${Math.ceil(layout.height) + 2 * GRID_MARGIN}px`
    this.drawEdges()
    this.highlight()
    this.placeQuiz()
    return layout.boxes
  }

  // ---- arrows ----

  drawEdges() {
    this.edges = visibleEdges(this.atlas, n => this.isOpen(n), this.selected)
    const outs = new Map()
    const ins = new Map()
    const live = []
    for (const e of this.edges.values()) {
      const a = this.boxes.get(e.from.id)
      const b = this.boxes.get(e.to.id)
      if (!a || !b) continue
      // An arrow follows the flow of the topic it runs within: out of a right side into a left one, or bottom into top.
      const it = { e, a, b, dir: flowOf(e.within ?? this.atlas.root) }
      if (!e.twin) {
        addTo(outs, e.from.id + it.dir, it)
        addTo(ins, e.to.id + it.dir, it)
      }
      live.push(it)
    }
    // Several arrows leaving (or entering) one side spread out along it, in the order of their other ends.
    fan(outs, 'out')
    fan(ins, 'in')
    for (const it of live) {
      const p = this.paths.get(it.e.key) ?? this.makePath(it.e)
      p.setAttribute('d', it.e.twin ? link(it.a, it.b, it.dir === 'down') : (it.dir === 'down'
        ? curve(it.out, it.a.y + it.a.h, it.in, it.b.y, true)
        : curve(it.a.x + it.a.w, it.out, it.b.x, it.in, false)))
    }
    for (const [key, p] of this.paths) {
      if (this.edges.has(key)) continue
      p.remove()
      this.paths.delete(key)
    }
  }

  makePath(e) {
    const p = document.createElementNS(SVG, 'path')
    p.classList.add('edge')
    // Arrows between cards in different topics run across other cards and frames; draw them lighter.
    if (e.from.parent !== e.to.parent) p.classList.add('cross')
    if (e.focus) p.classList.add('focus')
    if (e.twin) p.classList.add('twin')
    p.style.setProperty('--c', e.from.color)
    p.style.setProperty('--w', (1.2 + Math.min(2.6, Math.log2(e.pairs.length) * 0.65)).toFixed(2))
    this.svg.append(p)
    this.paths.set(e.key, p)
    return p
  }

  // ---- selection ----

  select(n, { pan = true } = {}) {
    this.selected = n
    this.drawEdges() // the selection brings its own links to other topics
    this.highlight()
    this.onSelect?.(n)
    if (n && pan) {
      const box = this.boxes.get(visibleRep(n, x => this.isOpen(x)).id)
      if (box && !this.camera.shows(box)) this.camera.moveTo(this.camera.centre(box))
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
        preDirect: reps(sel.children.length ? externalPrereqs(sel) : sel.directPrereqs),
        postDirect: reps(sel.children.length ? externalDependents(sel) : sel.directDependents),
      }
      this.hl.preRep = reps(this.hl.pre)
      this.hl.postRep = reps(this.hl.post)
    }
    for (const [id, el] of this.els) this.markNode(this.atlas.nodes.get(id), el)
    for (const [key, p] of this.paths) {
      const state = this.edgeState(this.edges.get(key))
      p.classList.toggle('pre', state === 'pre')
      p.classList.toggle('post', state === 'post')
      p.classList.toggle('dim', state === 'dim')
      p.classList.toggle('lit', !!this.hovered && (this.edges.get(key).from === this.hovered || this.edges.get(key).to === this.hovered))
      // Highlighted arrows go on top, so others crossing them don't hide them.
      if (state === 'pre' || state === 'post') this.svg.append(p)
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
      const lit = !!n && !!e && (e.from === n || e.to === n)
      p.classList.toggle('lit', lit)
      if (lit) this.svg.append(p)
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
    this.current = n
    // Opening a topic takes the focus: whatever was selected before lets go.
    const had = this.selected
    this.selected = null
    const boxes = this.relayout()
    if (had) this.onSelect?.(null)
    this.camera.moveTo(this.camera.fit(boxes.get(n.id), { pad: 36, maxK: Math.max(1, this.camera.k) }))
  }

  collapse(n) {
    this.open.delete(n.id)
    for (const d of descendants(n)) this.open.delete(d.id)
    // Closing the current topic (or one around it) hands "current" to the topic that held it.
    if (this.current && (this.current === n || isAncestor(n, this.current))) this.current = n.parent
    const box = this.relayout().get(n.id)
    if (box && !this.camera.shows(box)) this.camera.moveTo(this.camera.centre(box))
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
    if (n.parent) this.current = n.parent
    const boxes = changed || n.parent ? this.relayout() : this.boxes
    this.select(n, { pan: false })
    const box = boxes.get(n.id)
    if (box) this.camera.moveTo(this.camera.centre(box, Math.min(1.25, Math.max(this.camera.k, 0.9))))
  }

  /** Opens topics until `n` and its direct prerequisites (or dependents) show as separate cards, then frames them. */
  revealAround(n, which = 'pre') {
    const group = n.children.length > 0
    const others = which === 'pre'
      ? [...(group ? externalPrereqs(n) : n.directPrereqs)]
      : [...(group ? externalDependents(n) : n.directDependents)]
    for (const t of [n, ...others]) for (const a of ancestors(t)) this.open.add(a.id)
    const boxes = this.relayout()
    this.select(n, { pan: false })
    const all = [n, ...others].map(t => boxes.get(t.id)).filter(Boolean)
    this.camera.moveTo(this.camera.fit(union(all), { pad: 60, maxK: 1.1 }))
  }

  overview() {
    this.closeQuiz()
    this.open.clear()
    this.current = null
    this.relayout()
    this.fitAll()
  }

  openAll() {
    for (const n of this.atlas.nodes.values()) if (n.children.length) this.open.add(n.id)
    this.relayout()
    this.fitAll()
  }

  fitAll() {
    this.camera.moveTo(this.camera.fit(this.bounds, { maxK: 1 }))
  }

  zoomBy(f) {
    const c = this.camera
    const { w, h } = c.size()
    c.zoomAt(c.inset.left + (w - c.inset.left - c.inset.right) / 2, c.inset.top + (h - c.inset.top - c.inset.bottom) / 2, f)
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
    const b = this.boxes.get(n.id)
    if (b) {
      const area = { x: b.x - 12, y: b.y - 16, w: b.w + 14 + pop.offsetWidth + 24, h: Math.max(b.h, pop.offsetHeight) + 32 }
      if (!this.camera.shows(area)) this.camera.moveTo(this.camera.fit(area, { pad: 24, maxK: Math.max(1, this.camera.k) }))
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
    const b = this.boxes.get(this.quiz.node.id)
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

  // Runs on every frame of a pan or zoom, so it does as little as possible: it touches the
  // page only when the zoom crosses into another band (far out, the grid and small labels go).
  cameraMoved() {
    const k = this.camera.k
    const level = k < 0.2 ? 2 : k < 0.45 ? 1 : 0
    if (level !== this.level) {
      this.level = level
      this.viewport.classList.toggle('is-far', level >= 1)
      this.viewport.classList.toggle('is-tiny', level === 2)
    }
    this.onView?.()
  }
}

const frameHead = n => `<div class="frame-head">
  <span class="frame-title">${renderInline(n.title)}</span>
  <span class="frame-count">${n.leafCount}</span>
  <button type="button" class="about" title="About this topic" aria-label="About ${esc(n.plainTitle)}">i</button>
  <button type="button" class="shut" title="Close this topic" aria-label="Close ${esc(n.plainTitle)}">×</button>
</div>`

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

// An S-curve from one box to the next, across (right side to left side) or down (bottom to top).
// It stops HEAD short of the target, where the arrowhead marker takes over (see index.html).
// One that has to double back loops out wide.
const HEAD = 10
function curve(sx, sy, tx, ty, down) {
  if (down) ty -= HEAD
  else tx -= HEAD
  const d = down ? ty - sy : tx - sx
  const c = d > 30 ? Math.min(360, Math.max(30, d * 0.5)) : Math.max(70, 70 - d * 0.5)
  const [p, q] = down ? [[sx, sy + c], [tx, ty - c]] : [[sx + c, sy], [tx - c, ty]]
  return `M${r1(sx)},${r1(sy)}C${r1(p[0])},${r1(p[1])} ${r1(q[0])},${r1(q[1])} ${r1(tx)},${r1(ty)}`
}

// The link between two intertwined topics, which sit side by side in one layer: a straight line
// between their facing sides, with a dot at each end and no arrowhead, since each needs the other.
function link(a, b, down) {
  const V = q => (down ? q.x : q.y)
  const W = q => (down ? q.w : q.h)
  const U = q => (down ? q.y : q.x)
  const L = q => (down ? q.h : q.w)
  const [p, q] = V(a) <= V(b) ? [a, b] : [b, a]
  const lo = Math.max(U(p), U(q))
  const hi = Math.min(U(p) + L(p), U(q) + L(q))
  const u = hi > lo ? (lo + hi) / 2 : (U(p) + L(p) / 2 + U(q) + L(q) / 2) / 2
  const xy = (uu, vv) => (down ? [vv, uu] : [uu, vv])
  const [x1, y1] = xy(u, V(p) + W(p))
  const [x2, y2] = xy(u, V(q))
  const dot = (x, y) => `M${r1(x - 2.5)},${r1(y)}a2.5,2.5 0 1,0 5,0a2.5,2.5 0 1,0 -5,0`
  return `M${r1(x1)},${r1(y1)}L${r1(x2)},${r1(y2)}${dot(x1, y1)}${dot(x2, y2)}`
}

function union(boxes) {
  const x0 = Math.min(...boxes.map(b => b.x))
  const y0 = Math.min(...boxes.map(b => b.y))
  const x1 = Math.max(...boxes.map(b => b.x + b.w))
  const y1 = Math.max(...boxes.map(b => b.y + b.h))
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }
}
