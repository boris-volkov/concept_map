// The map on screen: one element per card, open topic and open file, and a layer of lines under
// the cards, which run between the domains and between a domain's topics. Deeper down, where a
// thing stands says what comes before it (see layout.js), and a selection lights up the rest.
//
// The domains stand in rows, each below those it builds on, with the lines between them running
// down the gaps, and a domain's topics stand the same way in its frame. Everything opens where it
// sits, the way a folder opens in a file manager's tree: a folder into a frame around what it
// holds, a concept into its entry, the card growing into the full text while the map makes room
// for it. The "i" on a topic's frame opens the topic's README at the top of the frame. Nothing on
// the map opens anywhere else.
//
// A new layout is applied at once, without any animation, so the map stays quick however much
// of it is open.

import { computeLayout, FRAME_PAD, DOMAINS } from './layout.js'
import {
  ancestors, isAncestor, descendants, visibleRep, visibleEdges, prerequisitesOf, dependentsOf,
  externalPrereqs, externalDependents, finder,
} from './model.js'
import { renderInline, plainText, esc } from './markdown.js'
import { KINDS } from './content.js'
import { Camera } from './camera.js'
import { mountQuiz } from './quiz.js'
import * as progress from './progress.js'
import * as deck from './deck.js'
import * as docs from './docs.js'

const SVG = 'http://www.w3.org/2000/svg'
const readmeKey = n => 'readme:' + n.id
const ENTRY_COLUMN = 620 // about how tall a column of an open entry may run
const MAX_COLUMNS = 4
const README_VIEW = 440 // how much of a README a view of it takes in, from its left edge
const PHONE = matchMedia('(max-width: 760px)') // as in the stylesheet: a README stays as wide as the phone
const ENTRY_COLUMN_GAP = 32 // as in the stylesheet
const LINE_SPAN = 300 // how much of a box's side lines meet it along, from its left: a frame is too wide for all of it
const r1 = v => Math.round(v * 10) / 10

export class AtlasMap {
  // A sheet (see sheet.js) is one of these too, with its frame for a viewport and a world, and
  // the main map's camera.
  constructor({ viewport, world, svg, atlas, camera, onSelect, onView, onPop }) {
    this.viewport = viewport
    this.world = world
    this.svg = svg
    this.onSelect = onSelect
    this.onView = onView
    this.onPop = onPop
    this.sheets = [] // the trees of prerequisites popped out of this map
    this.open = new Set() // ids of what is open: domains and topics, and concepts
    this.readmes = new Set() // ids of the topics whose README is open, and of the open concepts whose "i" is
    this.els = new Map() // key → element, for everything on screen; a README's key is "readme:" and its topic's id
    this.boxes = new Map() // key → its box on the map
    this.paths = new Map() // edge key → <path>
    this.edges = new Map()
    this.sizes = new Map() // id → its size as a closed card
    this.fileSizes = new Map() // key → the size of an open file or README, which changes with what it shows
    this.heads = new Map()
    this.routes = new Map() // edge key → the route of a line (see layoutGraph and layoutSheet)
    this.selected = null
    this.hl = null
    this.camera = camera ?? new Camera(viewport, world, () => this.cameraMoved())
    // An open file changes size when its quiz moves on, a list in it unfolds, or a font arrives.
    this.resizes = new ResizeObserver(entries => this.resized(entries))
    viewport.addEventListener('click', e => this.click(e))
    viewport.addEventListener('pointerover', e => {
      const el = !this.inSheet(e) && e.target.closest?.('.node.leaf, .node.group:not(.is-open)')
      this.hover(el ? this.atlas.nodes.get(el.dataset.node ?? el.dataset.id) : null)
    })
    viewport.addEventListener('pointerleave', () => this.hover(null))
    viewport.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList?.contains('node')) {
        e.preventDefault()
        this.click(e)
      }
    })
    const refresh = () => this.refreshProgress()
    this.listening = [progress.onChange(refresh), deck.onChange(refresh)] // deck: the flashcard buttons on open concepts
    this.setAtlas(atlas)
  }

  setAtlas(atlas) {
    this.atlas = atlas
    this.resizes.disconnect()
    for (const el of this.els.values()) el.remove()
    for (const p of this.paths.values()) p.remove()
    for (const m of [this.els, this.boxes, this.paths, this.sizes, this.fileSizes, this.heads]) m.clear()
    this.edges = new Map()
    this.open = new Set([...this.open].filter(id => atlas.nodes.has(id)))
    this.readmes = new Set([...this.readmes].filter(id => atlas.nodes.has(id)))
    this.selected = (this.selected && atlas.nodes.get(this.selected.id)) || null
    this.current = (this.current && atlas.nodes.get(this.current.id)) || null
  }

  /** Opens what was open when the map was last left. */
  restore({ open = [], readmes = [] }) {
    this.open = new Set(open.filter(id => this.atlas.nodes.has(id)))
    this.readmes = new Set(readmes.filter(id => this.atlas.nodes.has(id)))
  }

  // ---- what is open ----

  /** Whether a domain or topic is open, showing what it holds. */
  isOpen(n) {
    return n.children.length > 0 && this.open.has(n.id)
  }

  /** Whether a concept is open, showing its entry. */
  isFileOpen(n) {
    return !n.children.length && this.open.has(n.id)
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
    } else if (!n.children.length && el.classList.contains('doc') !== this.isFileOpen(n)) {
      this.fill(n, el) // opened or closed since it was drawn
    }
    return el
  }

  // Writes what an element shows: a card, or an open concept. (An open topic is the same
  // element as its card, which the stylesheet draws as a frame.)
  fill(n, el) {
    const s = el.style
    s.removeProperty('width')
    s.removeProperty('height')
    this.boxes.delete(n.id) // so the next layout puts it in place again
    this.fileSizes.delete(n.id)
    this.resizes.unobserve(el)
    el.removeAttribute('title')
    s.setProperty('--c', n.color)
    if (n.children.length) return this.fillGroup(n, el)
    const open = this.isFileOpen(n)
    el.className = `node leaf kind-${n.kind}${open ? ' is-open doc' : ''}`
    if (open) {
      el.innerHTML = docs.conceptDoc(n, this.atlas, { info: this.readmes.has(n.id) })
      el.removeAttribute('tabindex')
      el.setAttribute('role', 'article')
      el.setAttribute('aria-label', n.plainTitle)
      const mount = el.querySelector('.quiz-mount')
      if (mount) {
        mountQuiz(mount, n.quiz, {
          resolve: finder(this.atlas),
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
      el.setAttribute('aria-label', n.plainTitle + (n.kind !== 'concept' ? ` (${n.kind})` : ''))
      if (n.summary) el.title = plainText(n.summary)
    }
    this.markProgress(n, el)
  }

  fillGroup(n, el) {
    el.className = `node group depth-${Math.min(n.depth, 4)}`
    // A topic holding nothing but axioms is gilded like its axioms.
    if (descendants(n).every(d => d.children.length || d.kind === 'axiom')) el.classList.add('axioms')
    el.tabIndex = 0
    el.setAttribute('role', 'button')
    el.innerHTML = groupFace(n) + frameHead(n)
    el.setAttribute('aria-label', `${n.plainTitle}, ${n.depth === 0 ? 'subject' : 'topic'}`)
    this.markProgress(n, el)
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
    for (const n of visible) this.element(n)
    for (const n of readmes) this.readmeElement(n)
    const cards = visible.filter(n => !this.isFileOpen(n) && !this.sizes.has(n.id))
    const files = [...visible.filter(n => this.isFileOpen(n)).map(n => n.id), ...readmes.map(readmeKey)]
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
      spread(el)
      this.fileSizes.set(key, { w: el.offsetWidth, h: el.offsetHeight })
    }
    frames.forEach((n, i) => this.heads.set(n.id, probes[i].firstElementChild.scrollWidth + 4))
    for (const probe of probes) probe.remove()
  }

  sizeOf(n) {
    return this.isFileOpen(n) ? { ...this.fileSizes.get(n.id), file: true } : this.sizes.get(n.id)
  }

  // A README spans its frame, never narrower than it first measured. It is measured again only
  // when the frame's width has changed. Something opening in the frame can widen it, and so shorten
  // the README by a line, but what stands under the README must not move up for that: it keeps
  // the room it had, until what the README shows changes (see resized).
  fitReadme(n, width) {
    const key = readmeKey(n)
    const size = this.fileSizes.get(key)
    if (PHONE.matches) return size
    const least = size.least ?? size.w
    const w = Math.max(least, Math.floor(width))
    if (w === size.w) return { w, h: size.room ?? size.h }
    const el = this.els.get(key)
    el.style.width = `${w}px`
    const h = el.offsetHeight
    const room = Math.max(h, size.room ?? 0)
    this.fileSizes.set(key, { w, h, least, room })
    return { w, h: room }
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
      this.fileSizes.set(key, { ...was, w, h, room: h })
      changed.push(key)
    }
    if (!changed.length) return
    const active = document.activeElement
    const inView = k => this.boxes.has(k) && this.camera.sees(this.onCanvas(this.boxes.get(k)))
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
    const keep = new Set([...visible.map(n => n.id), ...readmes.map(readmeKey)])
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
    const layout = this.lay()
    const boxes = layout.boxes
    for (const n of readmes) {
      const frame = boxes.get(n.id)
      const size = this.fileSizes.get(readmeKey(n))
      boxes.set(readmeKey(n), { x: frame.x + FRAME_PAD.left, y: frame.y + FRAME_PAD.top, w: size.w, h: size.h })
    }
    this.routes = layout.routes
    this.bounds = { x: 0, y: 0, w: layout.width, h: layout.height }
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
    this.laidOut()
    this.drawEdges()
    this.highlight()
    return boxes
  }

  lay() {
    return computeLayout(this.atlas.root, n => this.isOpen(n), n => this.sizeOf(n), n => this.heads.get(n.id),
      (n, width) => (this.hasReadme(n) ? this.fitReadme(n, width) : null))
  }

  laidOut() {
    this.placeSheets()
  }

  // Sheets stand in a row to the right of the map, so whatever opens on the map only pushes them
  // further right, and they never lie over it. The canvas reaches as far as they do.
  placeSheets() {
    let w = this.bounds.w
    let h = this.bounds.h
    for (const s of this.sheets) {
      s.place(w + DOMAINS.float, 0)
      w += DOMAINS.float + s.width
      h = Math.max(h, s.height)
    }
    this.canvas = { x: 0, y: 0, w, h }
  }

  /** Where a box of this map stands on the canvas, which the camera works in. A sheet's are inside its frame. */
  onCanvas(box) {
    return box
  }

  // ---- lines ----

  // Lines run only where a layout made room for them: between the domains, between a domain's
  // topics, and between the cards of a sheet, where there are few enough to follow. Deeper down
  // there are none: where a thing stands says what comes before it, and a selection says the rest.
  drawEdges() {
    this.edges = visibleEdges(this.atlas, n => this.isOpen(n), this.selected)
    for (const key of this.edges.keys()) if (!this.routes.has(key)) this.edges.delete(key)
    const sides = new Map() // a card's top or bottom → the lines that enter or leave it there
    const routed = []
    for (const e of this.edges.values()) {
      const p = this.paths.get(e.key) ?? this.makePath(e)
      const route = this.routes.get(e.key)
      const it = { e, p, route, U: this.boxes.get(route.upper.id), L: this.boxes.get(route.lower.id) }
      addTo(sides, route.upper.id + ' bottom', it)
      addTo(sides, route.lower.id + ' top', it)
      routed.push(it)
    }
    // The lines leaving (or entering) a card spread out along its side, in the order of where they
    // head next. Each then runs from the upper card's bottom, straight down out of its row and
    // through its gap in every row it passes, into the lower card's top, turned round if it points up.
    const span = box => Math.min(box.w, LINE_SPAN)
    const mid = box => box.x + span(box) / 2
    for (const [key, list] of sides) {
      const bottom = key.endsWith(' bottom')
      const next = it => (bottom ? it.route.pass[0]?.x ?? mid(it.L) : it.route.pass.at(-1)?.x ?? mid(it.U))
      list.sort((p, q) => next(p) - next(q))
      const box = bottom ? list[0].U : list[0].L
      const gap = list.length > 1 ? Math.min(16, (span(box) * 0.6) / (list.length - 1)) : 0
      list.forEach((it, i) => { it[bottom ? 'out' : 'in'] = mid(box) + (i - (list.length - 1) / 2) * gap })
    }
    for (const it of routed) {
      const { U, L, route } = it
      const pts = [[it.out, U.y + U.h], [it.out, route.leave], ...route.pass.flatMap(q => [[q.x, q.y0], [q.x, q.y1]]), [it.in, L.y]]
      it.p.setAttribute('d', path(route.back ? pts.reverse() : pts))
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
    if (e.focus) p.classList.add('focus')
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
      if (box && !this.camera.shows(this.onCanvas(box))) this.camera.moveTo(this.camera.centre(this.onCanvas(box)))
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
    // A stated line, on the way to the subject or topic that holds the selection, or on from it.
    if (e.stated) {
      const s = [h.sel, ...ancestors(h.sel)].find(a => a.parent === e.to.parent)
      if (!s) return 'dim'
      if (e.to === s || s.groundwork.has(e.to)) return 'pre'
      return e.from === s || e.from.groundwork.has(s) ? 'post' : 'dim'
    }
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

  /** Whether an event belongs to a sheet of this map, which takes care of it itself. */
  inSheet(e) {
    return this.sheets.some(s => e.composedPath().includes(s.viewport))
  }

  click(e) {
    // A double click, as on a file, opens with its first click; the second would land on the
    // open file's head, where the card was, and close it again.
    if (e.detail > 1 || this.inSheet(e)) return
    // Look along the event's path rather than with e.target.closest(): a quiz redraws itself on
    // click, detaching the button that was clicked.
    const path = e.composedPath()
    const hit = selector => path.find(x => x.matches?.(selector))
    if (hit('a[href], input, select, label')) return // main.js follows the links; the rest work by themselves
    const readme = hit('.readme')
    if (readme) return this.readmeClick(this.atlas.nodes.get(readme.dataset.topic), hit)
    const el = hit('.node')
    const n = el && this.atlas.nodes.get(el.dataset.id)
    if (!n) return this.background()
    const keyboard = e.type === 'keydown'
    if (n.children.length) {
      if (hit('.frame-head .open-all')) return this.openInside(n)
      if (hit('.frame-head .about')) return this.toggleReadme(n)
      if (hit('.frame-head .shut')) return this.collapse(n)
      // An open frame from the keyboard selects what it holds; only the × closes it.
      if (this.isOpen(n) && keyboard) {
        if (this.selected !== n) this.select(n, { pan: false })
        return
      }
      // Its head, like the empty space inside it, lets go of the selection, so that it lights up.
      if (this.isOpen(n)) return this.background()
      return this.expand(n)
    }
    if (!this.isFileOpen(n)) return this.openFile(n, { at: hit('.quiz-badge') ? '.practice' : null, keyboard })
    if (hit('.doc-head .pop')) return this.onPop?.(n)
    if (hit('.doc-head .card-add')) return deck.toggle(n.id)
    if (hit('.doc-head .about')) return this.toggleInfo(n)
    // Only the × closes an open concept; a click anywhere else on it, its head included, selects it.
    if (hit('.doc-head .shut')) return this.closeFile(n)
    if (hit('.mastery')) return progress.setMastered(n.id, !progress.isMastered(n.id))
    const reveal = hit('[data-reveal]')
    if (reveal) return this.revealAround(n, reveal.dataset.reveal)
    if (this.selected !== n) this.select(n, { pan: false })
  }

  readmeClick(n, hit) {
    if (hit('.doc-head .shut')) return this.closeReadme(n) // like everything else, only its × closes it
    const reveal = hit('[data-reveal]')
    if (reveal) return this.revealAround(n, reveal.dataset.reveal)
    if (this.selected !== n) this.select(n, { pan: false })
  }

  background() {
    if (this.selected) this.select(null)
  }

  expand(n) {
    const before = this.boxes.get(n.id)
    this.open.add(n.id)
    this.current = n
    // Opening a topic takes the focus: whatever was selected before lets go.
    const had = this.selected
    this.selected = null
    this.relayout()
    if (had) this.onSelect?.(null)
    // The card stays where it was on the screen, and its frame grows out of it.
    this.settle(n.id, before)
    this.onView?.()
  }

  collapse(n) {
    // Closed with the keyboard: the focus goes to its card.
    const focused = !!this.els.get(n.id)?.contains(document.activeElement)
    const before = this.boxes.get(n.id) // it folds up into the corner of its frame
    for (const d of [n, ...descendants(n)]) {
      this.open.delete(d.id)
      this.readmes.delete(d.id)
    }
    // Closing the current topic (or one around it) hands "current" to the topic that held it.
    if (this.current && (this.current === n || isAncestor(n, this.current))) this.current = n.parent
    // Closing a topic closes everything open inside it, and lets go of whatever was selected in there.
    const lost = !!this.selected && (this.selected === n || isAncestor(n, this.selected))
    if (lost) this.selected = null
    this.relayout()
    if (lost) this.onSelect?.(null)
    this.settle(n.id, before)
    if (focused) this.els.get(n.id)?.focus({ preventScroll: true })
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
    this.settle(n.id, before, { at })
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
    this.settle(n.id, before)
    this.onView?.()
  }

  toggleReadme(n) {
    if (this.hasReadme(n)) return this.closeReadme(n)
    const before = this.boxes.get(n.id)
    this.readmes.add(n.id)
    this.selected = n
    this.relayout()
    this.onSelect?.(n)
    this.settle(n.id, before)
    this.onView?.()
  }

  // An open topic's head and its README, together.
  readmeView(n) {
    const frame = this.boxes.get(n.id)
    const note = this.boxes.get(readmeKey(n))
    return { x: frame.x, y: frame.y, w: Math.min(note.w, README_VIEW) + FRAME_PAD.left + FRAME_PAD.right, h: FRAME_PAD.top + note.h }
  }

  closeReadme(n) {
    const before = this.boxes.get(n.id)
    this.readmes.delete(n.id)
    const was = this.selected === n
    if (was) this.selected = null
    this.relayout()
    if (was) this.onSelect?.(null)
    this.settle(n.id, before)
    this.onView?.()
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
  // where it was on the screen: the card seems to unfold into its entry, or fold back up, and the
  // view goes nowhere else. `at`: a part of an open file to bring into view, as the "?" on a
  // card asks for its exercises.
  settle(key, before, { at = null } = {}) {
    const c = this.camera
    const box = this.boxes.get(key)
    if (!box) return
    if (before) c.set(c.x - (box.x - before.x) * c.k, c.y - (box.y - before.y) * c.k, c.k)
    const part = at && this.els.get(key)?.querySelector(at)
    if (part) c.moveTo(c.nudge(this.onCanvas({ x: box.x, y: box.y + part.offsetTop, w: box.w, h: part.offsetHeight })))
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
    c.moveTo(c.frame(this.onCanvas(box), { k: Math.min(1.15, Math.max(c.k, 0.9)) }))
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
    this.camera.moveTo(this.camera.fit(this.onCanvas(union(all)), { pad: 60, maxK: 1.1 }))
    this.onView?.()
  }

  /** Closes everything: every topic, every open file, every sheet. */
  overview() {
    for (const s of [...this.sheets]) s.close()
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

  /**
   * The + on an open folder's head: opens everything inside it, every folder and every concept's
   * entry. The frame's head stays where it is on the screen while the frame grows.
   */
  openInside(n) {
    const before = this.boxes.get(n.id)
    for (const d of descendants(n)) this.open.add(d.id)
    this.current = n
    this.relayout()
    this.settle(n.id, before)
    this.onView?.()
  }

  fitAll() {
    this.camera.moveTo(this.camera.fit(this.canvas, { maxK: 1 }))
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
      const n = this.atlas.nodes.get(el.dataset.node ?? key)
      if (n) this.markProgress(n, el)
      else if (el.classList.contains('doc')) docs.refresh(el, this.atlas.nodes.get(el.dataset.topic))
    }
  }

  // Runs on every frame of a pan or zoom, so it touches nothing on the page. The map is one
  // picture, scaled as a whole: nothing on it changes with the zoom.
  cameraMoved() {
    this.onView?.()
  }
}

// A domain's or topic's card: what it is, its title and summary, and a bar of progress.
function groupFace(n) {
  return `<div class="face">
      <div class="eyebrow">${n.depth === 0 ? 'Subject' : 'Topic'}</div>
      <div class="title">${renderInline(n.title)}</div>
      ${n.summary ? `<div class="summary">${renderInline(n.summary)}</div>` : ''}
      <div class="meter"><span></span></div>
    </div>`
}

// An open folder's head: its title, its count, and its buttons.
const frameHead = n => `<div class="frame-head">
  <span class="frame-title">${renderInline(n.title)}</span>
  <button type="button" class="open-all" title="Open everything inside" aria-label="Open everything inside ${esc(n.plainTitle)}">+</button>
  <button type="button" class="about" title="About this ${n.depth === 0 ? 'subject' : 'topic'}" aria-label="About ${esc(n.plainTitle)}">i</button>
  <button type="button" class="shut" title="Close this ${n.depth === 0 ? 'subject' : 'topic'}" aria-label="Close ${esc(n.plainTitle)}">×</button>
</div>`

// A formula or table too wide for its file widens the file as far as it needs, rather than hide
// behind a scroll bar: on the map, a drag or the wheel moves the map, not what is inside a file.
function widen(el) {
  let extra = el.scrollWidth - el.clientWidth
  for (const box of el.querySelectorAll('.math-block, .table-wrap, pre')) extra = Math.max(extra, box.scrollWidth - box.clientWidth)
  // A pixel to spare, as the widths are whole pixels.
  // An entry in columns shares its width out between them, so each has to gain all of it.
  const columns = +el.style.getPropertyValue('--columns') || 1
  if (extra > 0) el.style.width = `${el.offsetWidth + extra * columns + 1}px`
}

// A long entry runs in columns, as a newspaper does, so that it fills a wide screen rather than
// a tall stack. Called once, as it opens; a quiz being worked through doesn't change the columns.
function spread(el) {
  const body = el.querySelector(':scope.leaf > .doc-body:not(.doc-info)')
  if (!body) return
  // A table is never split, so an entry that is mostly one table has nothing to run into columns.
  const tallest = Math.max(0, ...[...body.querySelectorAll('.table-wrap')].map(t => t.offsetHeight))
  if (tallest > body.offsetHeight * 0.6) return
  const width = el.offsetWidth
  const columns = Math.min(MAX_COLUMNS, Math.ceil(body.offsetHeight / ENTRY_COLUMN), Math.round(innerWidth / width))
  if (columns < 2) return
  const inner = body.clientWidth - parseFloat(getComputedStyle(body).paddingLeft) * 2
  el.style.setProperty('--columns', columns)
  el.classList.add('in-columns')
  el.style.width = `${width + (columns - 1) * (inner + ENTRY_COLUMN_GAP)}px`
}

function addTo(map, key, item) {
  const list = map.get(key)
  if (list) list.push(item)
  else map.set(key, [item])
}

// A line of a sheet, through the points of its route: each joined to the next by an
// S-curve, which runs straight down a gap where two points stand one above the other.
function path(p) {
  let d = `M${r1(p[0][0])},${r1(p[0][1])}`
  for (let i = 1; i < p.length; i++) {
    const [x0, y0] = p[i - 1]
    const [x1, y1] = p[i]
    const c = (y1 - y0) / 2
    d += `C${r1(x0)},${r1(y0 + c)} ${r1(x1)},${r1(y1 - c)} ${r1(x1)},${r1(y1)}`
  }
  return d
}

function union(boxes) {
  const x0 = Math.min(...boxes.map(b => b.x))
  const y0 = Math.min(...boxes.map(b => b.y))
  const x1 = Math.max(...boxes.map(b => b.x + b.w))
  const y1 = Math.max(...boxes.map(b => b.y + b.h))
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }
}
