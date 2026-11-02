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
    this.inset = { top: 0, right: 0, bottom: 0, left: 0 } // screen space covered by panels
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

  /** The transform that fits a world-space box into the uncovered part of the screen. */
  fit(box, { pad = 40, maxK = 1.1, minK = this.minK } = {}) {
    const { w, h } = this.size()
    const i = this.inset
    const aw = Math.max(60, w - i.left - i.right - 2 * pad)
    const ah = Math.max(60, h - i.top - i.bottom - 2 * pad)
    const k = Math.min(maxK, this.maxK, Math.max(minK, Math.min(aw / box.w, ah / box.h)))
    return {
      x: i.left + pad + (aw - box.w * k) / 2 - box.x * k,
      y: i.top + pad + (ah - box.h * k) / 2 - box.y * k,
      k,
    }
  }

  /** The transform that centres a box at zoom k. */
  centre(box, k = this.k) {
    const { w, h } = this.size()
    const i = this.inset
    return {
      x: i.left + (w - i.left - i.right) / 2 - (box.x + box.w / 2) * k,
      y: i.top + (h - i.top - i.bottom) / 2 - (box.y + box.h / 2) * k,
      k,
    }
  }

  /** Whether a box is fully inside the uncovered part of the screen. */
  shows(box, margin = 16) {
    const { w, h } = this.size()
    const i = this.inset
    const x0 = this.x + box.x * this.k
    const y0 = this.y + box.y * this.k
    return x0 >= i.left + margin && y0 >= i.top + margin &&
      x0 + box.w * this.k <= w - i.right - margin && y0 + box.h * this.k <= h - i.bottom - margin
  }

  listen() {
    const vp = this.viewport
    const local = e => {
      const r = vp.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }

    vp.addEventListener('pointerdown', e => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      if (e.target.closest('input, textarea, select, .quiz-pop .quiz')) return
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

    // A drag ends with a click on whatever is under the pointer; swallow it.
    vp.addEventListener('click', e => {
      if (!this.dragged) return
      this.dragged = false
      e.stopPropagation()
      e.preventDefault()
    }, true)

    vp.addEventListener('wheel', e => {
      if (e.target.closest('.quiz-pop')) return
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
