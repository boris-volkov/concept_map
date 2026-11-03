// Pan and zoom. Drag to move; wheel, pinch or trackpad-pinch to zoom.
//
// The world element carries one CSS transform, translate(x, y) scale(k), so a
// point p on the map appears on screen at (x + p.x·k, y + p.y·k). The world is
// its own GPU layer (will-change in the CSS), so panning only slides a finished
// picture; after zooming stops, the picture is redrawn once at the new scale.
// Nothing glides: every move happens at once, which keeps the map quick.

export class Camera {
  constructor(viewport, world, onChange) {
    this.viewport = viewport
    this.world = world
    this.onChange = onChange
    this.x = 0
    this.y = 0
    this.k = 1
    this.minK = 0.04
    this.maxK = 2.5
    this.pointers = new Map()
    this.dragged = false
    this.listen()
    // When the window changes size (or a phone turns), keep the same point of the map in the middle.
    this.seen = this.size()
    new ResizeObserver(() => {
      const now = this.size()
      const before = this.seen
      this.seen = now
      if (!before.w || !before.h || !now.w || !now.h) return
      this.set(this.x + (now.w - before.w) / 2, this.y + (now.h - before.h) / 2, this.k)
    }).observe(viewport)
  }

  set(x, y, k) {
    k = Math.min(this.maxK, Math.max(this.minK, k))
    const zoomed = k !== this.k
    this.k = k
    this.x = x
    this.y = y
    this.world.style.transform = `translate(${x}px, ${y}px) scale(${k})`
    if (zoomed) this.sharpenSoon()
    this.onChange?.(this)
  }

  moveTo(t) {
    this.set(t.x, t.y, t.k)
  }

  // The GPU scales the layer it already has, which softens text; once zooming pauses,
  // drop the layer for one frame so the browser redraws it sharp at the new scale.
  sharpenSoon() {
    clearTimeout(this.sharpenTimer)
    this.sharpenTimer = setTimeout(() => {
      this.world.style.willChange = 'auto'
      requestAnimationFrame(() => requestAnimationFrame(() => { this.world.style.willChange = '' }))
    }, 160)
  }

  size() {
    return { w: this.viewport.clientWidth, h: this.viewport.clientHeight }
  }

  /** Resolves once the map has a size on screen; a hidden tab or frame can start out at 0 × 0. */
  ready() {
    const { w, h } = this.size()
    if (w && h) return Promise.resolve()
    return new Promise(resolve => {
      const watch = new ResizeObserver(() => {
        const s = this.size()
        if (!s.w || !s.h) return
        watch.disconnect()
        resolve()
      })
      watch.observe(this.viewport)
    })
  }

  zoomAt(px, py, factor) {
    const k = Math.min(this.maxK, Math.max(this.minK, this.k * factor))
    this.set(px - (px - this.x) * (k / this.k), py - (py - this.y) * (k / this.k), k)
  }

  /** The transform that fits a world-space box into the screen. */
  fit(box, { pad = 40, maxK = 1.1, minK = this.minK } = {}) {
    const { w, h } = this.size()
    const aw = Math.max(60, w - 2 * pad)
    const ah = Math.max(60, h - 2 * pad)
    const k = Math.min(maxK, this.maxK, Math.max(minK, Math.min(aw / box.w, ah / box.h)))
    return { x: pad + (aw - box.w * k) / 2 - box.x * k, y: pad + (ah - box.h * k) / 2 - box.y * k, k }
  }

  /** The transform that centres a box at zoom k. */
  centre(box, k = this.k) {
    const { w, h } = this.size()
    return { x: w / 2 - (box.x + box.w / 2) * k, y: h / 2 - (box.y + box.h / 2) * k, k }
  }

  /**
   * The transform that shows a box for reading, at zoom k or less if it is too wide: centred
   * across, and centred down as well if it fits, or else with its top near the top of the screen.
   */
  frame(box, { k = this.k, pad = 28 } = {}) {
    const { w, h } = this.size()
    k = Math.max(this.minK, Math.min(k, this.maxK, (w - 2 * pad) / box.w))
    return {
      x: (w - box.w * k) / 2 - box.x * k,
      y: box.h * k <= h - 2 * pad ? (h - box.h * k) / 2 - box.y * k : pad - box.y * k,
      k,
    }
  }

  /** The least move, at this zoom, that brings a box into view. When it can't all fit, its top left corner wins. */
  nudge(box, margin = 24) {
    const { w, h } = this.size()
    const k = this.k
    const along = (at, start, length, room) => {
      const end = at + (start + length) * k
      if (end > room - margin) at -= end - (room - margin)
      if (at + start * k < margin) at = margin - start * k
      return at
    }
    return { x: along(this.x, box.x, box.w, w), y: along(this.y, box.y, box.h, h), k }
  }

  /** Whether a box is fully on screen. */
  shows(box, margin = 16) {
    const { w, h } = this.size()
    const x0 = this.x + box.x * this.k
    const y0 = this.y + box.y * this.k
    return x0 >= margin && y0 >= margin && x0 + box.w * this.k <= w - margin && y0 + box.h * this.k <= h - margin
  }

  /** Whether any of a box is on screen. */
  sees(box) {
    const { w, h } = this.size()
    const x0 = this.x + box.x * this.k
    const y0 = this.y + box.y * this.k
    return x0 < w && y0 < h && x0 + box.w * this.k > 0 && y0 + box.h * this.k > 0
  }

  listen() {
    const vp = this.viewport
    const local = e => {
      const r = vp.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }

    vp.addEventListener('pointerdown', e => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      // Answering a quiz on the map never turns into a drag that swallows the answer.
      if (e.target.closest('input, textarea, select, .quiz')) return
      this.pointers.set(e.pointerId, local(e))
      if (this.pointers.size === 1) {
        this.dragged = false
        this.drag = { start: local(e), x: this.x, y: this.y }
      } else if (this.pointers.size === 2) {
        this.drag = null
        this.dragged = true
        this.startPinch()
      }
    })

    window.addEventListener('pointermove', e => {
      if (!this.pointers.has(e.pointerId)) return
      this.pointers.set(e.pointerId, local(e))
      if (this.pointers.size === 1 && this.drag) {
        const p = local(e)
        const dx = p.x - this.drag.start.x
        const dy = p.y - this.drag.start.y
        if (!this.dragged && Math.hypot(dx, dy) > 5) {
          this.dragged = true
          vp.classList.add('is-panning')
        }
        if (this.dragged) this.set(this.drag.x + dx, this.drag.y + dy, this.k)
      } else if (this.pointers.size === 2 && this.pinch) {
        const [a, b] = [...this.pointers.values()]
        const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
        const k = Math.min(this.maxK, Math.max(this.minK, this.pinch.k * Math.hypot(a.x - b.x, a.y - b.y) / this.pinch.dist))
        this.set(mid.x - this.pinch.wx * k, mid.y - this.pinch.wy * k, k)
      }
    })

    const end = e => {
      if (!this.pointers.delete(e.pointerId)) return
      vp.classList.remove('is-panning')
      if (this.pointers.size === 1) {
        // Lifting one finger of a pinch: carry on panning with the other, without a jump.
        const p = [...this.pointers.values()][0]
        this.drag = { start: p, x: this.x, y: this.y }
      } else if (!this.pointers.size) {
        this.drag = null
        this.pinch = null
      }
    }
    window.addEventListener('pointerup', end)
    window.addEventListener('pointercancel', end)

    // Tabbing to something off screen, such as a link in an open file, moves the map to show it.
    // Otherwise the browser would scroll the map's box to show it, which nothing here expects.
    vp.addEventListener('focusin', e => {
      if (!this.world.contains(e.target) || !e.target.matches(':focus-visible')) return
      const r = e.target.getBoundingClientRect()
      const v = vp.getBoundingClientRect()
      const m = 24
      let dx = 0
      let dy = 0
      if (r.right > v.right - m) dx = v.right - m - r.right
      if (r.left + dx < v.left + m) dx = v.left + m - r.left
      if (r.bottom > v.bottom - m) dy = v.bottom - m - r.bottom
      if (r.top + dy < v.top + m) dy = v.top + m - r.top
      if (dx || dy) this.set(this.x + dx, this.y + dy, this.k)
    })
    // And whatever scrolls the box all the same (find in page, say) becomes a pan.
    vp.addEventListener('scroll', () => {
      const dx = vp.scrollLeft
      const dy = vp.scrollTop
      if (!dx && !dy) return
      vp.scrollLeft = 0
      vp.scrollTop = 0
      this.set(this.x - dx, this.y - dy, this.k)
    })

    // A drag ends with a click on whatever is under the pointer; swallow it.
    vp.addEventListener('click', e => {
      if (!this.dragged) return
      this.dragged = false
      e.stopPropagation()
      e.preventDefault()
    }, true)

    vp.addEventListener('wheel', e => {
      e.preventDefault()
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1
      if (!e.ctrlKey && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        this.set(this.x - e.deltaX * unit, this.y, this.k)
        return
      }
      const p = local(e)
      this.zoomAt(p.x, p.y, Math.exp(-e.deltaY * unit * (e.ctrlKey ? 0.01 : 0.0015)))
    }, { passive: false })
  }

  startPinch() {
    const [a, b] = [...this.pointers.values()]
    const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
    this.pinch = {
      k: this.k,
      dist: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)),
      wx: (mid.x - this.x) / this.k,
      wy: (mid.y - this.y) / this.k,
    }
  }
}
