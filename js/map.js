// The map on screen: one element per card, open topic and open file, and a layer of arrows
// underneath the cards.
//
// Everything opens where it sits, the way a folder opens in a file manager's tree. A domain or a
// topic opens into a frame around what it holds. A concept opens into its entry: the card grows
// into the full text, and the map makes room for it. The "i" on a topic's frame opens the
// topic's README at the top of the frame, and the Index and the Ranking are files too, beside
// the domains. Nothing opens anywhere else.
//
// A new layout is applied at once, without any animation, so the map stays quick however much
// of it is open.

import { computeLayout, flowOf, FRAME_PAD } from './layout.js'
import {
  ancestors, isAncestor, descendants, visibleRep, visibleEdges, prerequisitesOf, dependentsOf,
  externalPrereqs, externalDependents,
} from './model.js'
import { renderInline, plainText, esc } from './markdown.js'
import { KINDS } from './content.js'
import { Camera } from './camera.js'
import { mountQuiz } from './quiz.js'
import * as progress from './progress.js'
import * as docs from './docs.js'

const SVG = 'http://www.w3.org/2000/svg'
const GRID = 160 // the survey grid's large squares
const GRID_MARGIN = 4000 // how far the survey grid runs past the edges of the map; a multiple of GRID
const ROOT_GAP = 72 // between the root files and the domains
const READABLE = 0.7 // a file opened from further out than this brings the map in close enough to read it
const ROOT = new Map(docs.ROOT_FILES.map(f => [f.id, f]))
const RANKING = ROOT.get('@ranking')
const readmeKey = n => 'readme:' + n.id
const r1 = v => Math.round(v * 10) / 10

export class AtlasMap {
  constructor({ viewport, world, svg, grid, atlas, onSelect, onView }) {
    this.viewport = viewport
    this.world = world
    this.svg = svg
    this.grid = grid
    this.onSelect = onSelect
    this.onView = onView
    this.open = new Set() // ids of what is open: domains and topics, concepts, and the root files
    this.readmes = new Set() // ids of the topics whose README is open, and of the open concepts whose "i" is
    this.els = new Map() // key → element, for everything on screen; a README's key is "readme:" and its topic's id
    this.boxes = new Map() // key → its box on the map
    this.paths = new Map() // edge key → <path>
    this.edges = new Map()
    this.sizes = new Map() // id → its size as a closed card
    this.fileSizes = new Map() // key → the size of an open file or README, which changes with what it shows
    this.heads = new Map()
    this.rankDomain = '' // the Ranking shows only this domain's concepts, when set
    this.selected = null
    this.hl = null
    this.camera = new Camera(viewport, world, () => this.cameraMoved())
    // An open file changes size when its quiz moves on, a list in it unfolds, or a font arrives.
    this.resizes = new ResizeObserver(entries => this.resized(entries))
    viewport.addEventListener('click', e => this.click(e))
    viewport.addEventListener('change', e => this.changed(e))
    viewport.addEventListener('pointerover', e => {
      const el = e.target.closest?.('.node.leaf, .node.group:not(.is-open)')
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
    this.atlas = atlas
    this.resizes.disconnect()
    for (const el of this.els.values()) el.remove()
    for (const p of this.paths.values()) p.remove()
    for (const m of [this.els, this.boxes, this.paths, this.sizes, this.fileSizes, this.heads]) m.clear()
    this.edges = new Map()
    this.open = new Set([...this.open].filter(id => atlas.nodes.has(id) || ROOT.has(id)))
    this.readmes = new Set([...this.readmes].filter(id => atlas.nodes.has(id)))
    this.selected = (this.selected && atlas.nodes.get(this.selected.id)) || null
    this.current = (this.current && atlas.nodes.get(this.current.id)) || null
    if (!atlas.roots.some(d => d.id === this.rankDomain)) this.rankDomain = ''
  }

  /** Opens what was open when the map was last left. */
  restore({ open = [], readmes = [] }) {
    this.open = new Set(open.filter(id => this.atlas.nodes.has(id) || ROOT.has(id)))
    this.readmes = new Set(readmes.filter(id => this.atlas.nodes.has(id)))
  }

  // ---- what is open ----

  /** Whether a domain or topic is open, showing what it holds. */
  isOpen(n) {
    return n.children.length > 0 && this.open.has(n.id)
  }

  /** Whether a concept, or a root file, is open, showing its entry. */
  isFileOpen(n) {
    return (n.root || !n.children.length) && this.open.has(n.id)
  }

  /** Whether an open topic shows its README. */
  hasReadme(n) {
    return this.isOpen(n) && this.readmes.has(n.id)
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
    if (!el) {
      // Filled before it joins the page, which is quicker for the hundreds of cards of "Open all".
      el = document.createElement('div')
      el.dataset.id = n.id
      this.fill(n, el)
      this.world.append(el)
      this.els.set(n.id, el)
    } else if ((n.root || !n.children.length) && el.classList.contains('doc') !== this.isFileOpen(n)) {
      this.fill(n, el) // opened or closed since it was drawn
    }
    return el
  }

  // Writes what an element shows: a card, or an open concept or root file. (An open topic is
  // the same element as its card, which the stylesheet draws as a frame.)
  fill(n, el) {
    const s = el.style
    s.removeProperty('width')
    s.removeProperty('height')
    this.boxes.delete(n.id) // so the next layout puts it in place again
    this.fileSizes.delete(n.id)
    this.resizes.unobserve(el)
    el.removeAttribute('title')
    if (n.root) return this.fillRoot(n, el)
    s.setProperty('--c', n.color)
    if (n.children.length) return this.fillGroup(n, el)
    const open = this.isFileOpen(n)
    // A super-concept, at the top of the ranking, carries a red star (see the stylesheet).
    const sup = n.tier?.key === 's'
    el.className = `node leaf kind-${n.kind}${sup ? ' is-super' : ''}${open ? ' is-open doc' : ''}`
    if (open) {
      el.innerHTML = docs.conceptDoc(n, this.atlas, { info: this.readmes.has(n.id) })
      el.removeAttribute('tabindex')
      el.setAttribute('role', 'article')
      el.setAttribute('aria-label', n.plainTitle)
      const mount = el.querySelector('.quiz-mount')
      if (mount) {
        mountQuiz(mount, n.quiz, {
          resolve: id => this.atlas.nodes.get(id),
          onFinish: (right, total) => { if (right === total) progress.setMastered(n.id, true) },
        })
      }
      this.resizes.observe(el)
    } else {
      el.tabIndex = 0
      el.setAttribute('role', 'button')
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
    this.markProgress(n, el)
  }

  fillGroup(n, el) {
    const label = n.depth === 0 ? 'Domain' : 'Topic'
    const supers = descendants(n).filter(d => d.tier?.key === 's').length
    el.className = `node group depth-${Math.min(n.depth, 4)}`
    // A topic holding nothing but axioms is gilded like its axioms.
    if (descendants(n).every(d => d.children.length || d.kind === 'axiom')) el.classList.add('axioms')
    el.tabIndex = 0
    el.setAttribute('role', 'button')
    el.innerHTML = `<div class="face">
        <div class="eyebrow">${label} · ${n.leafCount} ${n.leafCount === 1 ? 'concept' : 'concepts'}${supers
          ? ` · <span class="super-mark" title="Super-concepts inside">★ ${supers}</span>` : ''}</div>
        <div class="title">${renderInline(n.title)}</div>
        ${n.summary ? `<div class="summary">${renderInline(n.summary)}</div>` : ''}
        <div class="meter"><span></span></div>
      </div>${frameHead(n)}`
    el.setAttribute('aria-label', `${n.plainTitle}, ${label.toLowerCase()} of ${n.leafCount} concepts` +
      (supers ? `, ${supers} of them ${supers === 1 ? 'a super-concept' : 'super-concepts'}` : ''))
    this.markProgress(n, el)
  }

  fillRoot(f, el) {
    const open = this.isFileOpen(f)
    el.className = `node rootfile${open ? ' is-open doc' : ''}`
    if (open) {
      el.innerHTML = docs.rootDoc(f, this.atlas, this.rankDomain)
      el.removeAttribute('tabindex')
      el.setAttribute('role', 'article')
      el.setAttribute('aria-label', f.title)
      docs.refresh(el)
      this.resizes.observe(el)
    } else {
      el.innerHTML = docs.rootCard(f, this.atlas)
      el.tabIndex = 0
      el.setAttribute('role', 'button')
      el.setAttribute('aria-label', `The ${f.title.toLowerCase()} of the atlas`)
    }
  }

  // A topic's README is an element of its own, laid in the top of the topic's frame.
  readmeElement(n) {
    const key = readmeKey(n)
    let el = this.els.get(key)
    if (el) return el
    el = document.createElement('section')
    el.dataset.id = key
    el.dataset.topic = n.id
    el.className = 'readme doc'
    el.style.setProperty('--c', n.color)
    el.setAttribute('aria-label', `About ${n.plainTitle}`)
    el.innerHTML = docs.readme(n, this.atlas)
    docs.refresh(el, n)
    this.world.append(el)
    this.els.set(key, el)
    this.resizes.observe(el)
    return el
  }

  // Sizes are measured once and remembered: a card's for good, an open file's until what it
  // shows changes. Every new element is put in place before any is measured, so the browser lays
  // the page out once rather than once per card.
  measure(visible, readmes) {
    const items = [...visible, ...docs.ROOT_FILES]
    for (const n of items) this.element(n)
    for (const n of readmes) this.readmeElement(n)
    const cards = items.filter(n => !this.isFileOpen(n) && !this.sizes.has(n.id))
    const files = [...items.filter(n => this.isFileOpen(n)).map(n => n.id), ...readmes.map(readmeKey)]
      .filter(key => !this.fileSizes.has(key))
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
    for (const key of files) {
      const el = this.els.get(key)
      widen(el)
      this.fileSizes.set(key, { w: el.offsetWidth, h: el.offsetHeight })
    }
    frames.forEach((n, i) => this.heads.set(n.id, probes[i].firstElementChild.scrollWidth + 4))
    for (const probe of probes) probe.remove()
  }

  sizeOf(n) {
    return this.isFileOpen(n) ? { ...this.fileSizes.get(n.id), file: true } : this.sizes.get(n.id)
  }

  // An open file grew or shrank: make room for it. The file in use (the one holding the focus, or
  // else the first one in view) stays still on the screen while the map moves around it, so the
  // text being read never jumps.
  resized(entries) {
    const changed = []
    for (const { target: el } of entries) {
      const key = el.dataset.id
      const was = this.fileSizes.get(key)
      if (!was || this.els.get(key) !== el) continue
      widen(el)
      const w = el.offsetWidth
      const h = el.offsetHeight
      if (w === was.w && h === was.h) continue
      this.fileSizes.set(key, { w, h })
      changed.push(key)
    }
    if (!changed.length) return
    const active = document.activeElement
    const inView = k => this.boxes.has(k) && this.camera.sees(this.boxes.get(k))
    const key = changed.find(k => this.els.get(k).contains(active)) ?? changed.find(inView)
    const before = key && this.boxes.get(key)
    this.relayout()
    const after = key && this.boxes.get(key)
    const c = this.camera
    if (before && after) c.set(c.x - (after.x - before.x) * c.k, c.y - (after.y - before.y) * c.k, c.k)
  }

  // ---- layout ----

  /** Lays the map out again and puts everything in its new place at once. Returns the boxes by key. */
  relayout() {
    const visible = this.visibleNodes()
    const readmes = visible.filter(n => this.hasReadme(n))
    const keep = new Set([...visible.map(n => n.id), ...readmes.map(readmeKey), ...ROOT.keys()])
    for (const [key, el] of this.els) {
      if (keep.has(key)) continue
      this.resizes.unobserve(el)
      el.remove()
      this.els.delete(key)
      this.fileSizes.delete(key)
    }
    this.measure(visible, readmes)
    for (const n of visible) {
      const el = this.els.get(n.id)
      el.classList.toggle('is-open', this.isOpen(n) || this.isFileOpen(n))
      el.classList.toggle('is-current', n === this.current) // the topic opened last, outlined in its colour
      if (n.children.length) el.querySelector('.frame-head .about').classList.toggle('is-on', this.hasReadme(n))
    }
    const layout = computeLayout(this.atlas.root, n => this.isOpen(n), n => this.sizeOf(n), n => this.heads.get(n.id),
      n => (this.hasReadme(n) ? this.fileSizes.get(readmeKey(n)) : null))
    const boxes = layout.boxes
    for (const n of readmes) {
      const frame = boxes.get(n.id)
      const size = this.fileSizes.get(readmeKey(n))
      boxes.set(readmeKey(n), { x: frame.x + FRAME_PAD.left, y: frame.y + FRAME_PAD.top, w: size.w, h: size.h })
    }
    // The root files stand in a row before the domains, level with the top of the map, the way an
    // old atlas puts its index before the plates. An open one grows away from the map, never into it.
    let x = -ROOT_GAP
    for (const f of [...docs.ROOT_FILES].reverse()) {
      const s = this.sizeOf(f)
      x -= s.w
      boxes.set(f.id, { x, y: 0, w: s.w, h: s.h })
      x -= 18
    }
    const left = x + 18
    const height = Math.max(layout.height, ...docs.ROOT_FILES.map(f => boxes.get(f.id).h))
    this.bounds = { x: left, y: 0, w: layout.width - left, h: height }
    for (const [key, b] of boxes) {
      const was = this.boxes.get(key)
      if (was && was.x === b.x && was.y === b.y && was.w === b.w && was.h === b.h) continue
      const el = this.els.get(key)
      el.style.transform = `translate(${r1(b.x)}px, ${r1(b.y)}px)`
      if (el.classList.contains('doc')) continue // an open file takes the size of what it shows
      el.style.width = `${r1(b.w)}px`
      el.style.height = `${r1(b.h)}px`
    }
    this.boxes = boxes
    // The grid starts on one of its own lines, so it stays put when the map's edge moves.
    const g = this.grid.style
    const gx = Math.floor(left / GRID) * GRID - GRID_MARGIN
    g.transform = `translate(${gx}px, ${-GRID_MARGIN}px)`
    g.width = `${Math.ceil(layout.width - gx) + GRID_MARGIN}px`
    g.height = `${Math.ceil(height) + 2 * GRID_MARGIN}px`
    this.drawEdges()
    this.highlight()
    return boxes
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
    for (const [key, el] of this.els) {
      const n = this.atlas.nodes.get(key)
      if (n) this.markNode(n, el)
    }
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
    // A double click, as on a file, opens with its first click; the second would land on the
    // open file's head, where the card was, and close it again.
    if (e.detail > 1) return
    // Look along the event's path rather than with e.target.closest(): a quiz redraws itself on
    // click, detaching the button that was clicked.
    const path = e.composedPath()
    const hit = selector => path.find(x => x.matches?.(selector))
    if (hit('a[href], input, select, label')) return // main.js follows the links; the rest work by themselves
    const readme = hit('.readme')
    if (readme) return this.readmeClick(this.atlas.nodes.get(readme.dataset.topic), hit)
    const el = hit('.node')
    if (el && ROOT.has(el.dataset.id)) return this.rootClick(ROOT.get(el.dataset.id), hit)
    const n = el && this.atlas.nodes.get(el.dataset.id)
    if (!n) return this.background()
    const keyboard = e.type === 'keydown'
    if (n.children.length) {
      if (hit('.frame-head .about')) return this.toggleReadme(n)
      if (hit('.frame-head') || (this.isOpen(n) && keyboard)) return this.collapse(n)
      if (this.isOpen(n)) return this.background()
      return this.expand(n)
    }
    if (!this.isFileOpen(n)) return this.openFile(n, { at: hit('.quiz-badge') ? '.practice' : null, keyboard })
    if (hit('.doc-head .about')) return this.toggleInfo(n)
    if (hit('.doc-head')) return this.closeFile(n)
    if (hit('.mastery')) return progress.setMastered(n.id, !progress.isMastered(n.id))
    const reveal = hit('[data-reveal]')
    if (reveal) return this.revealAround(n, reveal.dataset.reveal)
    if (this.selected !== n) this.select(n, { pan: false })
  }

  readmeClick(n, hit) {
    if (hit('.doc-head')) return this.closeReadme(n)
    const reveal = hit('[data-reveal]')
    if (reveal) return this.revealAround(n, reveal.dataset.reveal)
    if (this.selected !== n) this.select(n, { pan: false })
  }

  rootClick(f, hit) {
    if (!this.isFileOpen(f)) return this.openRoot(f, { here: true })
    if (hit('.doc-head')) return this.closeRoot(f)
  }

  // The Ranking's choice of domain.
  changed(e) {
    const choice = e.target.closest?.('.rank-filter select')
    if (!choice) return
    this.rankDomain = choice.value
    const el = this.els.get(RANKING.id)
    el.querySelector('.tiers').innerHTML = docs.tiers(this.atlas, this.rankDomain)
    docs.refresh(el)
  }

  background() {
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
    this.onView?.()
  }

  collapse(n) {
    for (const d of [n, ...descendants(n)]) {
      this.open.delete(d.id)
      this.readmes.delete(d.id)
    }
    // Closing the current topic (or one around it) hands "current" to the topic that held it.
    if (this.current && (this.current === n || isAncestor(n, this.current))) this.current = n.parent
    // Closing a topic closes everything open inside it, and lets go of whatever was selected in there.
    const lost = !!this.selected && (this.selected === n || isAncestor(n, this.selected))
    if (lost) this.selected = null
    const box = this.relayout().get(n.id)
    if (lost) this.onSelect?.(null)
    if (box && !this.camera.shows(box)) this.camera.moveTo(this.camera.centre(box))
    this.onView?.()
  }

  /**
   * Opens a concept where it sits, and selects it. `at`, a part of its entry such as its
   * exercises, is brought into view.
   */
  openFile(n, { at = null, keyboard = false } = {}) {
    const before = this.boxes.get(n.id)
    for (const a of ancestors(n)) this.open.add(a.id)
    this.open.add(n.id)
    this.selected = n
    this.relayout()
    this.onSelect?.(n)
    this.settle(n.id, before, { read: true, at })
    if (keyboard) this.els.get(n.id)?.querySelector('.shut')?.focus({ preventScroll: true })
    this.onView?.()
  }

  closeFile(n) {
    const el = this.els.get(n.id)
    const focused = !!el?.contains(document.activeElement)
    const before = this.boxes.get(n.id)
    this.open.delete(n.id)
    this.readmes.delete(n.id) // it opens again without its "i" band, as a topic does without its README
    const was = this.selected === n
    if (was) this.selected = null
    this.relayout()
    if (was) this.onSelect?.(null)
    this.settle(n.id, before)
    if (focused) this.els.get(n.id)?.focus({ preventScroll: true })
    this.onView?.()
  }

  /**
   * The "i" on an open concept: shows, in a band under its head, what it builds on and what
   * builds on it, which otherwise only the arrows say; or puts the band away again. The rest of
   * the entry is left as it is, a quiz half done included, and stays still on the screen.
   */
  toggleInfo(n) {
    const el = this.els.get(n.id)
    const before = this.boxes.get(n.id)
    const on = !this.readmes.has(n.id)
    if (on) this.readmes.add(n.id)
    else this.readmes.delete(n.id)
    docs.showInfo(el, n, on)
    widen(el)
    this.fileSizes.set(n.id, { w: el.offsetWidth, h: el.offsetHeight })
    this.selected = n
    this.relayout()
    this.onSelect?.(n)
    this.settle(n.id, before, { at: on ? '.doc-info' : '.doc-head' })
    this.onView?.()
  }

  toggleReadme(n) {
    if (this.hasReadme(n)) return this.closeReadme(n)
    const before = this.boxes.get(n.id)
    this.readmes.add(n.id)
    this.selected = n
    this.relayout()
    this.onSelect?.(n)
    this.settle(n.id, before, { read: true, show: () => this.readmeView(n) })
    this.onView?.()
  }

  // An open topic's head and its README, together.
  readmeView(n) {
    const frame = this.boxes.get(n.id)
    const note = this.boxes.get(readmeKey(n))
    return { x: frame.x, y: frame.y, w: note.w + FRAME_PAD.left + FRAME_PAD.right, h: FRAME_PAD.top + note.h }
  }

  closeReadme(n) {
    const before = this.boxes.get(n.id)
    this.readmes.delete(n.id)
    const was = this.selected === n
    if (was) this.selected = null
    this.relayout()
    if (was) this.onSelect?.(null)
    this.settle(n.id, before, { show: b => ({ ...b, w: Math.min(b.w, 480), h: FRAME_PAD.top }) })
    this.onView?.()
  }

  /** Opens the Index or the Ranking: `here`, in place (its card was clicked), or else the map goes to it. */
  openRoot(f, { here = false } = {}) {
    const before = this.boxes.get(f.id)
    this.open.add(f.id)
    const box = this.relayout().get(f.id)
    const c = this.camera
    if (here) this.settle(f.id, before, { read: true })
    else c.moveTo(c.frame(box, { k: Math.min(1.1, Math.max(c.k, 0.9)) }))
    this.onView?.()
  }

  closeRoot(f) {
    const before = this.boxes.get(f.id)
    this.open.delete(f.id)
    this.relayout()
    this.settle(f.id, before)
    this.onView?.()
  }

  /** The Index or Ranking button: goes to that file and opens it, or closes it if it is open in view. */
  toggleRoot(id) {
    const f = ROOT.get(id)
    const box = this.boxes.get(id)
    if (this.isFileOpen(f) && box && this.camera.sees(box)) return this.closeRoot(f)
    this.openRoot(f)
  }

  /**
   * Esc: puts away what was opened last on the selection: an open concept's "i" band, then the
   * concept itself, or a topic's README; or else lets go of the selection.
   */
  escape() {
    const n = this.selected
    if (!n) return
    if (this.isFileOpen(n) && this.readmes.has(n.id)) this.toggleInfo(n)
    else if (this.isFileOpen(n)) this.closeFile(n)
    else if (this.hasReadme(n)) this.closeReadme(n)
    else this.select(null)
  }

  // After something opens or closes in place, the map shifts so that its top left corner stays
  // where it was on the screen: the card seems to unfold into its entry, or fold back up. Then
  // the map moves only as far as it must to show it (or `show`, another box or a part of it),
  // and, for `read`, comes in close enough to read it when it is far out. `at`: a part of an
  // open file to show, such as its exercises.
  settle(key, before, { read = false, show = null, at = null } = {}) {
    const c = this.camera
    const box = this.boxes.get(key)
    if (!box) return
    if (before) c.set(c.x - (box.x - before.x) * c.k, c.y - (box.y - before.y) * c.k, c.k)
    let target = typeof show === 'function' ? show(box) : show ? this.boxes.get(show) : box
    const part = at && this.els.get(key)?.querySelector(at)
    if (part) target = { x: box.x, y: box.y + part.offsetTop, w: box.w, h: part.offsetHeight }
    if (!target) return
    c.moveTo(read && c.k < READABLE ? c.frame(target, { k: 1 }) : c.nudge(target))
  }

  /**
   * Goes to `n`: opens whatever hides it, opens it (a concept's entry, or a topic and its
   * README), selects it, and brings it to the middle of the screen.
   */
  reveal(n) {
    for (const a of ancestors(n)) this.open.add(a.id)
    this.open.add(n.id)
    const topic = n.children.length > 0
    if (topic) this.readmes.add(n.id)
    this.current = topic ? n : n.parent ?? this.current
    this.selected = n
    const boxes = this.relayout()
    this.onSelect?.(n)
    const c = this.camera
    const box = topic ? this.readmeView(n) : boxes.get(n.id)
    c.moveTo(c.frame(box, { k: Math.min(1.15, Math.max(c.k, 0.9)) }))
    this.onView?.()
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
    this.onView?.()
  }

  /** Closes everything: every topic, every open file. */
  overview() {
    this.open.clear()
    this.readmes.clear()
    this.current = null
    const had = this.selected
    this.selected = null
    this.relayout()
    if (had) this.onSelect?.(null)
    this.fitAll()
    this.onView?.()
  }

  openAll() {
    for (const n of this.atlas.nodes.values()) if (n.children.length) this.open.add(n.id)
    this.relayout()
    this.fitAll()
    this.onView?.()
  }

  fitAll() {
    this.camera.moveTo(this.camera.fit(this.bounds, { maxK: 1 }))
  }

  zoomBy(f) {
    const { w, h } = this.camera.size()
    this.camera.zoomAt(w / 2, h / 2, f)
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
      if (el.classList.contains('doc')) docs.refresh(el, n)
    }
  }

  refreshProgress() {
    for (const [key, el] of this.els) {
      const n = this.atlas.nodes.get(key)
      if (n) this.markProgress(n, el)
      else if (el.classList.contains('doc')) docs.refresh(el, this.atlas.nodes.get(el.dataset.topic))
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
  <button type="button" class="about" title="About this ${n.depth === 0 ? 'domain' : 'topic'}" aria-label="About ${esc(n.plainTitle)}">i</button>
  <button type="button" class="shut" title="Close this ${n.depth === 0 ? 'domain' : 'topic'}" aria-label="Close ${esc(n.plainTitle)}">×</button>
</div>`

// A formula or table too wide for its file widens the file as far as it needs, rather than hide
// behind a scroll bar: on the map, a drag or the wheel moves the map, not what is inside a file.
function widen(el) {
  let extra = el.scrollWidth - el.clientWidth
  for (const box of el.querySelectorAll('.math-block, .table-wrap, pre')) extra = Math.max(extra, box.scrollWidth - box.clientWidth)
  if (extra > 0) el.style.width = `${el.offsetWidth + extra}px`
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
