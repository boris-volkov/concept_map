// A sheet: a tree of prerequisites popped out of the map. The button on an open concept asks
// first, then copies the concept and everything that leads up to it into a frame of their own,
// on the canvas to the right of the map.
//
// A sheet is an AtlasMap, drawn from an atlas that holds only those copies (see sheetAtlas in
// model.js), so its cards open, select, light up their arrows and run their quizzes by the same
// code as the map's. What is open and selected in it is its own, and its arrows run only among
// its cards, so nothing done in a sheet moves the map, or the map a sheet. Only what belongs to
// a concept rather than a card is shared: mastery, and the flashcards.

import { AtlasMap } from './map.js'
import { layoutSheet } from './layout.js'
import { sheetAtlas, learningPath, visibleRep } from './model.js'
import { renderInline, esc } from './markdown.js'

const SVG = 'http://www.w3.org/2000/svg'

class Sheet extends AtlasMap {
  constructor(map, n) {
    const frame = document.createElement('section')
    const head = document.createElement('div')
    const svg = document.createElementNS(SVG, 'svg')
    frame.className = 'sheet'
    frame.style.setProperty('--c', n.color)
    head.className = 'frame-head'
    svg.setAttribute('aria-hidden', 'true')
    frame.append(head, svg)
    map.world.append(frame)
    super({
      viewport: frame, world: frame, svg, atlas: sheetAtlas(map.atlas, n), camera: map.camera,
      onSelect: picked => map.onSelect?.(picked, this), onView: map.onView, onPop: map.onPop,
    })
    this.map = map
    this.id = n.id
    this.head = head
    this.caption(n)
  }

  /** Writes the head of the frame, and notes how wide the frame must be to fit it. */
  caption(n) {
    this.head.innerHTML = `<span class="frame-title">What leads up to <a href="#${esc(n.id)}" title="Show it on the map">${renderInline(n.title)}</a></span>
      <span class="frame-count">${this.atlas.roots.length}</span>
      <button type="button" class="shut" title="Close this copy" aria-label="Close the copy of what leads up to ${esc(n.plainTitle)}">×</button>`
    const frame = this.viewport
    frame.setAttribute('aria-label', `What leads up to ${n.plainTitle}`)
    frame.style.width = 'max-content'
    this.headWidth = frame.offsetWidth
  }

  lay() {
    return layoutSheet(this.atlas.root, n => this.sizeOf(n))
  }

  laidOut() {
    this.width = Math.max(this.bounds.w, this.headWidth)
    this.height = this.bounds.h
    this.viewport.style.width = `${this.width}px`
    this.viewport.style.height = `${this.height}px`
    this.map.placeSheets()
  }

  /** Puts the frame on the canvas. Only the map calls this, as it lays out its row of sheets. */
  place(x, y) {
    if (x === this.x && y === this.y) return
    this.x = x
    this.y = y
    this.viewport.style.transform = `translate(${x}px, ${y}px)`
  }

  onCanvas(box) {
    return { ...box, x: box.x + this.x, y: box.y + this.y }
  }

  click(e) {
    const path = e.composedPath()
    const hit = selector => path.find(x => x.matches?.(selector))
    if (hit('.sheet > .frame-head .shut')) return this.close()
    // A link to a concept in this sheet stays in it; any other goes to the map, as does the title.
    const link = !hit('.sheet > .frame-head') && hit('a[href^="#"]')
    const n = link && this.atlas.nodes.get(link.getAttribute('href').slice(1))
    if (n && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault()
      return this.reveal(n)
    }
    super.click(e)
  }

  /** Brings the whole sheet into view. */
  show() {
    const c = this.camera
    c.moveTo(c.fit(this.onCanvas({ x: 0, y: 0, w: this.width, h: this.height }), { maxK: 1 }))
  }

  close() {
    const { map } = this
    const focused = this.viewport.contains(document.activeElement)
    map.sheets.splice(map.sheets.indexOf(this), 1)
    for (const stop of this.listening) stop()
    this.resizes.disconnect()
    this.viewport.remove()
    const had = this.selected
    this.selected = null
    if (had) this.onSelect?.(null)
    map.placeSheets()
    // The view goes back only as far as shows the concept this came from, as when a domain closes.
    const n = map.atlas.nodes.get(this.id)
    const rep = n && visibleRep(n, x => map.isOpen(x))
    const box = rep && map.boxes.get(rep.id)
    if (box) map.camera.moveTo(map.camera.nudge(box))
    // Closed with the keyboard: the focus goes to where the sheet came from.
    if (focused && rep) (map.els.get(rep.id)?.querySelector('.pop') ?? map.els.get(rep.id))?.focus({ preventScroll: true })
    this.onView?.()
  }

  saved() {
    return { id: this.id, open: [...this.open], readmes: [...this.readmes] }
  }
}

function add(map, n, view) {
  const sheet = new Sheet(map, n)
  if (view) sheet.restore(view)
  map.sheets.push(sheet)
  sheet.relayout()
  return sheet
}

/** The button on an open concept: asks, in `dialog`, then pops it out. One already out is shown instead. */
export function popOut(map, n, dialog) {
  const there = map.sheets.find(s => s.id === n.id)
  if (there) return there.show()
  const concept = map.atlas.nodes.get(n.id)
  const count = learningPath(concept).length
  dialog.querySelector('.pop-name').innerHTML = renderInline(concept.title)
  dialog.querySelector('.pop-count').textContent = `${count} ${count === 1 ? 'concept' : 'concepts'}`
  dialog.querySelector('.pop-yes').onclick = e => {
    e.preventDefault()
    dialog.close()
    const sheet = add(map, concept)
    sheet.show()
    sheet.head.querySelector('.shut').focus({ preventScroll: true })
    map.onView?.()
  }
  dialog.showModal()
}

/** Puts back the sheets that were out when the map was last left. */
export function showSheets(map, saved = []) {
  for (const view of saved) {
    const n = map.atlas.nodes.get(view.id)
    if (n && !n.children.length) add(map, n, view)
  }
}

/** The content changed: draws every sheet again from the new atlas. */
export function redrawSheets(map) {
  for (const sheet of [...map.sheets]) {
    const n = map.atlas.nodes.get(sheet.id)
    if (!n || n.children.length) {
      sheet.close()
      continue
    }
    sheet.setAtlas(sheetAtlas(map.atlas, n))
    sheet.caption(n)
    sheet.relayout()
  }
}
