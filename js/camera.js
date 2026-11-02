// Pan and zoom. Drag to move; wheel, pinch or trackpad-pinch to zoom.
//
// The world element carries one CSS transform, translate(x, y) scale(k), so a
// point p on the map appears on screen at (x + p.x·k, y + p.y·k).

const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

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
      this.stop()
      this.set(this.x + (now.w - before.w) / 2, this.y + (now.h - before.h) / 2, this.k)
    }).observe(viewport)
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

  set(x, y, k) {
    this.k = Math.min(this.maxK, Math.max(this.minK, k))
    this.x = x
    this.y = y
    this.world.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.k})`
    this.onChange?.(this)
  }

  size() {
    return { w: this.viewport.clientWidth, h: this.viewport.clientHeight }
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
  centre(box, k = (this.target ?? this).k) {
    const { w, h } = this.size()
    const i = this.inset
    return {
      x: i.left + (w - i.left - i.right) / 2 - (box.x + box.w / 2) * k,
      y: i.top + (h - i.top - i.bottom) / 2 - (box.y + box.h / 2) * k,
      k,
    }
  }

  /** Whether a box is fully inside the uncovered part of the screen, once any glide in progress ends. */
  shows(box, margin = 16) {
    const { w, h } = this.size()
    const i = this.inset
    const t = this.target ?? this
    const x0 = t.x + box.x * t.k
    const y0 = t.y + box.y * t.k
    return x0 >= i.left + margin && y0 >= i.top + margin &&
      x0 + box.w * t.k <= w - i.right - margin && y0 + box.h * t.k <= h - i.bottom - margin
  }

  stop() {
    if (this.raf) cancelAnimationFrame(this.raf)
    this.raf = null
    this.target = null
  }

  /** Glides to a transform, easing out a little in zoom on long journeys so the way stays readable. */
  animateTo(t, duration = 650) {
    this.stop()
    if (duration <= 0 || reduceMotion()) { this.set(t.x, t.y, t.k); return Promise.resolve() }
    const { w, h } = this.size()
    const k0 = this.k
    const k1 = Math.min(this.maxK, Math.max(this.minK, t.k))
    const c0 = { x: (w / 2 - this.x) / k0, y: (h / 2 - this.y) / k0 }
    const c1 = { x: (w / 2 - t.x) / t.k, y: (h / 2 - t.y) / t.k }
    const screens = Math.hypot(c1.x - c0.x, c1.y - c0.y) * Math.min(k0, k1) / Math.max(w, h)
    const dip = screens > 1 ? Math.min(0.45, (screens - 1) * 0.2) : 0
    const start = performance.now()
    this.target = { x: t.x, y: t.y, k: k1 }
    return new Promise(resolve => {
      const step = now => {
        const u = Math.min(1, (now - start) / duration)
        const e = ease(u)
        const k = k0 * (k1 / k0) ** e * (1 - dip * Math.sin(Math.PI * e))
        const cx = c0.x + (c1.x - c0.x) * e
        const cy = c0.y + (c1.y - c0.y) * e
        this.set(w / 2 - cx * k, h / 2 - cy * k, k)
        if (u < 1) this.raf = requestAnimationFrame(step)
        else { this.raf = null; this.target = null; resolve() }
      }
      this.raf = requestAnimationFrame(step)
    })
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
      this.stop()
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
        const k = this.pinch.k * Math.hypot(a.x - b.x, a.y - b.y) / this.pinch.dist
        const kk = Math.min(this.maxK, Math.max(this.minK, k))
        this.set(mid.x - this.pinch.wx * kk, mid.y - this.pinch.wy * kk, kk)
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
      this.stop()
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
