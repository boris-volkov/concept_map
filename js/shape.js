// Small drawings of plane figures and solids, for tables such as Table of Areas & Volumes. A shape
// is known by its name, and its drawing carries the letters its formulas use:
//
//   | Cone | {{ shape: cone }} | $\dfrac{1}{3}\pi r^2 h$ |
//
// The names are the keys of SHAPES, below. A plane figure is written out in the pixels of its box.
// A solid with flat faces is given by its corners and faces in space and looked at from above and
// to one side, without perspective, so that parallel edges stay parallel; which of its edges are
// hidden follows from which way its faces point. A round solid is drawn from the same kind of view:
// a circle lying flat comes out as an ellipse, and the part of it behind the solid is dashed.
//
// Like a graph, it is drawn once, when the entry holding it opens, so it costs the map nothing.

const W = 112
const H = 88
const PI = Math.PI
const TILT = 0.36 // how far above a round solid it is seen from, in radians
const FLAT = Math.sin(TILT) // a circle lying flat comes out this many times as tall as it is wide
const TALL = Math.cos(TILT) // and an upright length this many times as long
const PHI = (1 + Math.sqrt(5)) / 2

/** The SVG for a shape, by name, or a message in red if there is no such shape. */
export function shape(src) {
  const problem = shapeError(src)
  if (problem) return `<p class="graph-error">Shape: ${esc(problem)}</p>`
  const name = src.trim().toLowerCase()
  const s = new Sketch()
  SHAPES[name](s)
  return `<figure class="graph shape"><svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" ` +
    `aria-label="${esc(`A diagram of a ${name.replace(/-/g, ' ')}`)}">${s.out.join('')}</svg></figure>`
}

/** What is wrong with the name of a shape, if anything: for the list of content problems. */
export function shapeError(src) {
  return Object.hasOwn(SHAPES, src.trim().toLowerCase()) ? '' : `there is no shape "${src.trim()}": try ${Object.keys(SHAPES).join(', ')}`
}

// ---- points, in the plane or in space ----

const plus = (a, b) => a.map((v, i) => v + b[i])
const minus = (a, b) => a.map((v, i) => v - b[i])
const times = (a, k) => a.map(v => v * k)
const dot = (a, b) => a.reduce((sum, v, i) => sum + v * b[i], 0)
const unit = a => times(a, 1 / Math.hypot(...a))
const between = (a, b, t = 0.5) => plus(a, times(minus(b, a), t))
const middle = points => times(points.reduce(plus), 1 / points.length)
const cross = ([a, b, c], [d, e, f]) => [b * f - c * e, c * d - a * f, a * e - b * d]
const onCircle = ([x, y], r, turn) => [x + r * Math.cos(turn), y - r * Math.sin(turn)] // turn counted anticlockwise
const degrees = d => (d * PI) / 180
const sweep = (from, to, at, steps = 48) => Array.from({ length: steps + 1 }, (_, k) => at(from + ((to - from) * k) / steps))
const lowest = edges => edges.reduce((low, e) => (between(...e)[1] > between(...low)[1] ? e : low))

// ---- paths ----

const pt = ([x, y]) => `${r1(x)},${r1(y)}`
const line = points => `M${points.map(pt).join('L')}`
const closed = points => `${line(points)}z`
const circle = (c, r) => closed(sweep(0, 2 * PI, t => onCircle(c, r, t), 72).slice(0, -1))
const arc = (r, to, big, turn) => `A${r},${r} 0 ${big} ${turn} ${pt(to)}`

/** A circle lying flat, from its centre and its half-width. */
function ring([x, y], rx, ry = rx * FLAT) {
  const left = [x - rx, y]
  const right = [x + rx, y]
  const [a, b] = [r1(rx), r1(ry)]
  return {
    left, right, a, b, ry,
    front: `M${pt(left)}A${a},${b} 0 0 0 ${pt(right)}`,
    back: `M${pt(left)}A${a},${b} 0 0 1 ${pt(right)}`,
    whole: `M${pt(left)}A${a},${b} 0 1 0 ${pt(right)}A${a},${b} 0 1 0 ${pt(left)}z`,
  }
}

class Sketch {
  out = []

  draw(kind, d, style) { this.out.push(`<path class="${kind}" d="${d}"${style ? ` style="${style}"` : ''}/>`) }
  /** A region, tinted and outlined. */
  figure(d) { this.draw('skin', d); this.draw('rim', d) }
  skin(d, strength) { this.draw('skin', d, strength ? `fill-opacity:${strength.toFixed(2)}` : '') }
  rim(d) { this.draw('rim', d) }
  /** What the shape is a part of, such as the rest of a circle. */
  faint(d) { this.draw('faint', d) }
  /** An edge behind the solid. */
  hidden(d) { this.draw('hidden', d) }
  /** A length that isn't an edge, such as a height. */
  measure(p, q) { this.draw('measure', line([p, q])) }

  /** The square mark of a right angle at p, between the directions of q and r. */
  corner(p, q, r, size = 6) {
    const u = times(unit(minus(q, p)), size)
    const v = times(unit(minus(r, p)), size)
    this.draw('mark', line([plus(p, u), plus(plus(p, u), v), plus(p, v)]))
  }

  /** An arc at p, between the directions of q and r, and the angle's name beyond it. */
  angle(p, q, r, name, radius = 11) {
    const from = Math.atan2(q[1] - p[1], q[0] - p[0])
    let turn = Math.atan2(r[1] - p[1], r[0] - p[0]) - from
    if (turn > PI) turn -= 2 * PI
    if (turn < -PI) turn += 2 * PI
    const end = t => plus(p, times([Math.cos(from + t), Math.sin(from + t)], radius))
    this.draw('mark', `M${pt(end(0))}${arc(radius, end(turn), 0, turn > 0 ? 1 : 0)}`)
    this.text(name, plus(p, times([Math.cos(from + turn / 2), Math.sin(from + turn / 2)], radius + 8)))
  }

  /** Marks across the middle of a side: sides with the same marks are equal. */
  ticks(p, q, n = 1) {
    const along = unit(minus(q, p))
    const across = times([-along[1], along[0]], 3.5)
    for (let i = 0; i < n; i++) {
      const at = plus(between(p, q), times(along, (i - (n - 1) / 2) * 3))
      this.draw('mark', line([minus(at, across), plus(at, across)]))
    }
  }

  dot(p) { this.out.push(`<circle class="pivot" cx="${r1(p[0])}" cy="${r1(p[1])}" r="1.8"/>`) }

  /** A name, centred on a point. An underscore starts a subscript. */
  text(name, [x, y]) {
    const body = esc(name).replace(/_(.)/g, '<tspan class="sub" dy="3">$1</tspan><tspan dy="-3">​</tspan>')
    this.out.push(`<text x="${r1(x)}" y="${r1(y)}" dy="0.35em" text-anchor="middle">${body}</text>`)
  }

  /** A name beside the middle of the line from p to q: on the right, going from p to q. */
  side(p, q, name, gap = 9) {
    const along = unit(minus(q, p))
    this.text(name, plus(between(p, q), times([-along[1], along[0]], gap)))
  }

  /** A name below the middle of a line. */
  under(p, q, name, gap = 9) {
    if (p[0] < q[0]) this.side(p, q, name, gap)
    else this.side(q, p, name, gap)
  }

  /**
   * A convex solid: its faces towards us tinted, darker the further they turn from the light, and
   * an edge between two faces turned away from us dashed, unless there are too many of them to
   * follow. Returns the edges that can be seen.
   */
  solid({ points, faces }, at, showHidden = true) {
    const centre = middle(points)
    const light = unit([-0.35, -0.55, 0.75])
    const facing = new Map() // for each edge, how many of its two faces are towards us
    for (const face of faces) {
      const corners = face.map(i => points[i])
      const normal = cross(minus(corners[1], corners[0]), minus(corners[2], corners[0]))
      const out = unit(dot(normal, minus(corners[0], centre)) > 0 ? normal : times(normal, -1))
      const towards = dot(out, at.toward) > 0
      if (towards) this.skin(closed(corners.map(at)), 0.1 + 0.2 * (1 - Math.max(0, dot(out, light))))
      face.forEach((a, k) => {
        const b = face[(k + 1) % face.length]
        const key = a < b ? `${a} ${b}` : `${b} ${a}`
        facing.set(key, (facing.get(key) ?? 0) + (towards ? 1 : 0))
      })
    }
    const seen = []
    for (const [key, count] of facing) {
      const [p, q] = key.split(' ').map(i => at(points[i]))
      if (count) seen.push([p, q])
      else if (showHidden) this.hidden(line([p, q]))
    }
    for (const [p, q] of seen) this.rim(line([p, q]))
    return seen
  }
}

// ---- solids with flat faces ----

const ngon = (n, r = 1, turn = 0) => Array.from({ length: n }, (_, i) => [r * Math.cos(turn + (2 * PI * i) / n), r * Math.sin(turn + (2 * PI * i) / n)])
const square = (a = 1) => ngon(4, a / Math.SQRT2, PI / 4)

/** A prism on a polygon: its top shifted by `lean` and scaled by `scale`, which makes a frustum. */
function prism(base, height, lean = [0, 0], scale = 1) {
  const n = base.length
  const faces = [base.map((_, i) => i), base.map((_, i) => n + i)]
  base.forEach((_, i) => faces.push([i, (i + 1) % n, n + (i + 1) % n, n + i]))
  return { points: [...base.map(([x, y]) => [x, y, 0]), ...base.map(([x, y]) => [x * scale + lean[0], y * scale + lean[1], height])], faces }
}

function pyramid(base, height) {
  const n = base.length
  const faces = [base.map((_, i) => i)]
  base.forEach((_, i) => faces.push([i, (i + 1) % n, n]))
  return { points: [...base.map(([x, y]) => [x, y, 0]), [0, 0, height]], faces }
}

function octahedron() {
  const points = [[1, 0, 0], [0, 1, 0], [-1, 0, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]
  const faces = []
  for (const apex of [4, 5]) for (let i = 0; i < 4; i++) faces.push([i, (i + 1) % 4, apex])
  return { points, faces }
}

function icosahedron() {
  const points = []
  for (const a of [-1, 1]) for (const b of [-PHI, PHI]) points.push([0, a, b], [a, b, 0], [b, 0, a])
  const near = (i, j) => Math.abs(Math.hypot(...minus(points[i], points[j])) - 2) < 1e-9
  const faces = []
  points.forEach((_, i) => {
    for (let j = i + 1; j < 12; j++) for (let k = j + 1; k < 12; k++) if (near(i, j) && near(j, k) && near(i, k)) faces.push([i, j, k])
  })
  return { points, faces }
}

/** The solid with a corner for each face of this one, and a face for each corner. */
function dual({ points, faces }) {
  const corners = faces.map(f => middle(f.map(i => points[i])))
  return {
    points: corners,
    faces: points.map((p, v) => {
      const around = faces.flatMap((f, i) => (f.includes(v) ? [i] : []))
      const n = unit(p)
      const u = unit(cross(n, minus(corners[around[0]], p)))
      const w = cross(n, u)
      const turn = i => Math.atan2(dot(minus(corners[i], p), w), dot(minus(corners[i], p), u))
      return around.sort((a, b) => turn(a) - turn(b))
    }),
  }
}

/** How a point in space comes out in the box: from a turn about the upright, then a look down. */
function camera(points, { az = -0.6, el = 0.38, box = [18, 10, 94, 72] } = {}) {
  const [c, s] = [Math.cos(az), Math.sin(az)]
  const flat = ([x, y, z]) => [x * c - y * s, (x * s + y * c) * Math.sin(el) + z * Math.cos(el)]
  const seen = points.map(flat)
  const xs = seen.map(p => p[0])
  const ys = seen.map(p => p[1])
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
  const k = Math.min((box[2] - box[0]) / (x1 - x0), (box[3] - box[1]) / (y1 - y0))
  const at = p => {
    const [x, y] = flat(p)
    return [(box[0] + box[2]) / 2 + (x - (x0 + x1) / 2) * k, (box[1] + box[3]) / 2 - (y - (y0 + y1) / 2) * k]
  }
  at.toward = [-s * Math.cos(el), -c * Math.cos(el), Math.sin(el)]
  return at
}

/** A regular solid, with the letter under its lowest edge that can be seen. */
function platonic(s, solid, view, showHidden) {
  const at = camera(solid.points, { box: [22, 8, 90, 72], ...view })
  const [p, q] = lowest(s.solid(solid, at, showHidden))
  s.under(p, q, 'a', 8)
}

// ---- round solids ----

/** A cylinder standing upright. */
function drum(s, x, top, bottom, rx) {
  const high = ring([x, top], rx)
  const low = ring([x, bottom], rx)
  const [a, b] = [high.a, high.b]
  s.figure(`M${pt(high.left)}L${pt(low.left)}A${a},${b} 0 0 0 ${pt(low.right)}L${pt(high.right)}A${a},${b} 0 0 0 ${pt(high.left)}z`)
  s.hidden(low.back)
  s.skin(high.whole, 0.1)
  s.rim(high.whole)
}

/** Where the lines from a point on the axis of a flat circle touch it. */
function touching(x, y, rx, ry, apex) {
  const t = ry / (y - apex)
  const across = rx * Math.sqrt(1 - t * t)
  return [[x - across, y - ry * t], [x + across, y - ry * t]]
}

/** A circle of latitude on a ball of radius R, at the height z: what can be seen of it, and what can't. */
function latitude([x, y], R, z) {
  const a = Math.sqrt(R * R - z * z)
  const edge = Math.asin(Math.max(-1, Math.min(1, (z / a) * Math.tan(TILT))))
  const at = t => [x + a * Math.cos(t), y - z * TALL - a * Math.sin(t) * FLAT]
  return { shown: sweep(PI - edge, 2 * PI + edge, at), hidden: sweep(edge, PI - edge, at), centre: [x, y - z * TALL], right: [x + a, y - z * TALL], a }
}

// ---- the shapes ----

/** The corners of a regular polygon standing on a side, from that side round to the left. */
const standing = (n, c, R) => sweep(0, 2 * PI, t => onCircle(c, R, t - PI / 2 - PI / n), n).slice(0, -1)

function regular(n) {
  return s => {
    const corners = standing(n, [56, 42], 37)
    s.figure(closed(corners))
    s.under(corners[0], corners[1], 's')
  }
}

/** A polygon of no number of sides in particular: seven of them is one that isn't listed by name. */
function anyPolygon(s, c) {
  const corners = standing(7, c, 36)
  s.figure(closed(corners))
  s.dot(c)
  return corners
}

const SHAPES = {
  // Triangles

  triangle(s) {
    const [a, b, c, foot] = [[10, 70], [102, 70], [36, 12], [36, 70]]
    s.figure(closed([a, b, c]))
    s.measure(c, foot)
    s.corner(foot, b, c)
    s.text('h', [43, 47])
    s.under(a, b, 'b')
  },

  'right-triangle'(s) {
    const [a, b, c] = [[26, 70], [98, 70], [26, 14]]
    s.figure(closed([a, b, c]))
    s.corner(a, b, c)
    s.side(c, a, 'a')
    s.under(a, b, 'b')
  },

  'isosceles-triangle'(s) {
    const [a, b, c] = [[16, 70], [96, 70], [56, 10]]
    s.figure(closed([a, b, c]))
    s.ticks(a, c)
    s.ticks(b, c)
    s.side(c, a, 'a', 10)
    s.side(b, c, 'a', 10)
    s.under(a, b, 'b')
  },

  'equilateral-triangle'(s) {
    const [a, b, c] = [[18, 72], [94, 72], [56, 6.2]]
    s.figure(closed([a, b, c]))
    s.ticks(a, b)
    s.ticks(b, c)
    s.ticks(c, a)
    s.under(a, b, 'a')
  },

  'triangle-two-sides'(s) {
    const [c, b, a] = [[14, 70], [100, 70], [46, 14]]
    s.figure(closed([c, b, a]))
    s.angle(c, b, a, 'C', 13)
    s.side(a, c, 'a')
    s.under(c, b, 'b')
  },

  'triangle-two-angles'(s) {
    const [a, b, c] = [[14, 70], [98, 70], [66, 16]]
    s.figure(closed([a, b, c]))
    s.angle(a, b, c, 'A', 13)
    s.angle(b, c, a, 'B', 13)
    s.under(a, b, 'c')
  },

  'triangle-three-sides'(s) {
    const [a, b, c] = [[12, 70], [100, 70], [38, 14]]
    s.figure(closed([a, b, c]))
    s.under(a, b, 'c')
    s.side(c, a, 'b')
    s.side(b, c, 'a')
  },

  'triangle-vertices'(s) {
    const corners = [[24, 62], [92, 52], [50, 18]]
    s.figure(closed(corners))
    corners.forEach(p => s.dot(p))
    s.text('(x_1, y_1)', [26, 73])
    s.text('(x_2, y_2)', [86, 63])
    s.text('(x_3, y_3)', [50, 8])
  },

  'triangle-incircle'(s) {
    const [a, b, c] = [[8, 72], [104, 72], [40, 8]]
    const [la, lb, lc] = [Math.hypot(...minus(b, c)), Math.hypot(...minus(a, c)), Math.hypot(...minus(a, b))]
    const centre = times(plus(plus(times(a, la), times(b, lb)), times(c, lc)), 1 / (la + lb + lc))
    const r = 72 - centre[1]
    const foot = [centre[0], 72]
    s.figure(closed([a, b, c]))
    s.rim(circle(centre, r))
    s.dot(centre)
    s.measure(centre, foot)
    s.corner(foot, b, centre, 4)
    s.text('r', plus(centre, [-6, 8]))
    s.under(a, b, 'c', 8)
    s.side(c, a, 'b', 8)
    s.side(b, c, 'a', 8)
  },

  'triangle-circumcircle'(s) {
    const c = [56, 44]
    const R = 38
    const [p, q, t] = [212, 328, 98].map(d => onCircle(c, R, degrees(d)))
    s.rim(circle(c, R))
    s.figure(closed([p, q, t]))
    s.dot(c)
    s.measure(c, q)
    s.text('R', [64, 40])
    s.under(p, q, 'c', 9)
    s.side(t, p, 'b', 9)
    s.side(q, t, 'a', 9)
  },

  // Quadrilaterals

  square(s) {
    const [a, b, c, d] = [[28, 72], [88, 72], [88, 12], [28, 12]]
    s.figure(closed([a, b, c, d]))
    s.measure(a, c)
    s.corner(d, a, c)
    ;[[a, b], [b, c], [c, d], [d, a]].forEach(([p, q]) => s.ticks(p, q))
    s.under(a, b, 'a')
    s.text('d', [51, 37])
  },

  rectangle(s) {
    const [a, b, c, d] = [[12, 68], [90, 68], [90, 20], [12, 20]]
    s.figure(closed([a, b, c, d]))
    s.corner(a, b, d)
    s.under(a, b, 'l')
    s.side(b, c, 'w')
  },

  parallelogram(s) {
    const [a, b, c, d, foot] = [[8, 68], [76, 68], [104, 18], [36, 18], [36, 68]]
    s.figure(closed([a, b, c, d]))
    s.measure(d, foot)
    s.corner(foot, b, d)
    s.angle(a, b, d, 'θ', 10)
    s.under(a, b, 'b')
    s.side(d, a, 'a')
    s.text('h', [43, 42])
  },

  rhombus(s) {
    const [a, b, c, d] = [[10, 44], [56, 12], [102, 44], [56, 76]]
    const m = [56, 44]
    s.figure(closed([a, b, c, d]))
    s.measure(a, c)
    s.measure(b, d)
    s.corner(m, c, b)
    ;[[a, b], [b, c], [c, d], [d, a]].forEach(([p, q]) => s.ticks(p, q))
    s.text('d_1', [32, 37])
    s.text('d_2', [65, 62])
  },

  trapezoid(s) {
    const [a, b, c, d, foot] = [[8, 68], [104, 68], [78, 20], [32, 20], [32, 68]]
    s.figure(closed([a, b, c, d]))
    s.measure(d, foot)
    s.corner(foot, b, d)
    s.side(c, d, 'a')
    s.under(a, b, 'b')
    s.text('h', [39, 44])
  },

  kite(s) {
    const [t, r, b, l] = [[56, 8], [90, 32], [56, 80], [22, 32]]
    const m = [56, 32]
    s.figure(closed([t, r, b, l]))
    s.measure(t, b)
    s.measure(l, r)
    s.corner(m, r, b)
    s.ticks(t, r)
    s.ticks(l, t)
    s.ticks(r, b, 2)
    s.ticks(b, l, 2)
    s.text('d_1', [64, 54])
    s.text('d_2', [39, 40])
  },

  quadrilateral(s) {
    const [p, q, r, t] = [[10, 58], [46, 10], [104, 28], [78, 78]]
    const u = minus(r, p)
    const v = minus(t, q)
    const k = ((q[0] - p[0]) * v[1] - (q[1] - p[1]) * v[0]) / (u[0] * v[1] - u[1] * v[0])
    s.figure(closed([p, q, r, t]))
    s.measure(p, r)
    s.measure(q, t)
    s.angle(plus(p, times(u, k)), r, t, 'θ', 9)
    s.text('d_1', [30, 40])
    s.text('d_2', [50, 26])
  },

  'cyclic-quadrilateral'(s) {
    const c = [56, 44]
    const R = 37
    const [p, q, t, u] = [40, 140, 215, 320].map(d => onCircle(c, R, degrees(d)))
    s.rim(circle(c, R))
    s.figure(closed([p, q, t, u]))
    s.side(p, q, 'a', -8)
    s.side(q, t, 'b', -8)
    s.side(t, u, 'c', -8)
    s.side(u, p, 'd', -8)
  },

  // Regular polygons

  'regular-polygon-side': regular(7),

  'regular-polygon-apothem'(s) {
    const c = [56, 40]
    const corners = anyPolygon(s, c)
    const foot = between(corners[0], corners[1])
    s.measure(c, foot)
    s.corner(foot, c, corners[1], 5)
    s.under(corners[0], corners[1], 's')
    s.text('a', [c[0] + 7, 56])
  },

  'regular-polygon-radius'(s) {
    const c = [56, 42]
    const corners = anyPolygon(s, c)
    s.measure(c, corners[1])
    s.text('R', [c[0] + 3, 57])
  },

  pentagon: regular(5),
  hexagon: regular(6),
  octagon: regular(8),
  decagon: regular(10),
  dodecagon: regular(12),

  // Circles

  circle(s) {
    const c = [56, 44]
    const R = 37
    s.figure(circle(c, R))
    s.dot(c)
    s.measure(minus(c, [R, 0]), plus(c, [R, 0]))
    s.measure(c, onCircle(c, R, degrees(55)))
    s.text('d', [36, 51])
    s.text('r', [75, 28])
  },

  semicircle(s) {
    const c = [56, 66]
    const R = 46
    s.figure(`M${pt(minus(c, [R, 0]))}${arc(R, plus(c, [R, 0]), 0, 1)}z`)
    s.dot(c)
    s.measure(c, onCircle(c, R, degrees(60)))
    s.text('r', [80, 44])
  },

  sector(s) {
    const c = [18, 72]
    const R = 84
    const [p, q] = [8, 62].map(d => onCircle(c, R, degrees(d)))
    s.figure(`M${pt(c)}L${pt(p)}${arc(R, q, 0, 0)}z`)
    s.angle(c, p, q, 'θ', 16)
    s.under(c, p, 'r')
    s.side(q, c, 'r')
  },

  'circular-segment'(s) {
    const c = [56, 50]
    const R = 34
    const [p, q] = [25, 155].map(d => onCircle(c, R, degrees(d)))
    s.faint(circle(c, R))
    s.figure(`M${pt(p)}${arc(R, q, 0, 0)}z`)
    s.measure(c, p)
    s.measure(c, q)
    s.dot(c)
    s.angle(c, p, q, 'θ', 8)
    s.side(c, p, 'r')
  },

  annulus(s) {
    const c = [56, 44]
    const [R, r] = [37, 18]
    s.figure(circle(c, R) + circle(c, r))
    s.dot(c)
    s.measure(c, onCircle(c, R, degrees(30)))
    s.measure(c, onCircle(c, r, degrees(200)))
    s.text('R', [76, 25])
    s.text('r', [45, 35])
  },

  'annular-sector'(s) {
    const c = [56, 80]
    const [R, r] = [68, 30]
    const [p, q] = [30, 150].map(d => onCircle(c, R, degrees(d)))
    const [u, v] = [150, 30].map(d => onCircle(c, r, degrees(d)))
    s.figure(`M${pt(p)}${arc(R, q, 0, 0)}L${pt(u)}${arc(r, v, 0, 1)}z`)
    s.measure(c, u)
    s.measure(c, v)
    s.angle(c, v, u, 'θ', 10)
    s.side(u, c, 'r', 8)
    s.side(v, p, 'R', -9)
  },

  ellipse(s) {
    const c = [56, 44]
    const [a, b] = [46, 28]
    s.figure(ring(c, a, b).whole)
    s.dot(c)
    s.measure(c, [c[0] + a, c[1]])
    s.measure(c, [c[0], c[1] - b])
    s.text('a', [78, 51])
    s.text('b', [62, 30])
  },

  'parabolic-segment'(s) {
    const [left, right] = [[14, 72], [98, 72]]
    const peak = [56, 16]
    s.figure(`M${pt(left)}Q${peak[0]},${2 * peak[1] - left[1]} ${pt(right)}z`)
    s.measure(peak, [peak[0], 72])
    s.corner([peak[0], 72], right, peak)
    s.text('h', [63, 44])
    s.under(left, right, 'b')
  },

  // Prisms

  cube(s) { platonic(s, prism(square(), 1), {}) },

  box(s) {
    const [l, w, h] = [1.6, 1, 0.9]
    const solid = prism([[0, 0], [l, 0], [l, w], [0, w]], h)
    const at = camera(solid.points, { box: [16, 8, 98, 72] })
    s.solid(solid, at)
    const [a, b, c, top] = [at([0, 0, 0]), at([l, 0, 0]), at([l, w, 0]), at([0, 0, h])]
    s.under(a, b, 'l', 8)
    s.under(b, c, 'w', 8)
    s.side(a, top, 'h', -7)
  },

  prism(s) {
    const solid = prism(ngon(5, 1, 0.3), 1.3)
    const at = camera(solid.points)
    s.solid(solid, at)
    s.text('B', at([0, 0, 1.3]))
    const right = solid.points.slice(0, 5).reduce((best, p) => (at(p)[0] > at(best)[0] ? p : best))
    s.side(at(right), at([right[0], right[1], 1.3]), 'h', 7)
  },

  'triangular-prism'(s) {
    const [a, b, h] = [1.5, 1.7, 1]
    const solid = prism([[0, 0], [a, 0], [0, b]], h)
    const at = camera(solid.points, { az: -1.15, el: 0.4, box: [16, 14, 98, 72] })
    s.solid(solid, at)
    const [p, q, r] = [[0, 0], [a, 0], [0, b]].map(([x, y]) => at([x, y, h]))
    s.corner(p, q, r, 5)
    s.under(at([0, 0, 0]), at([a, 0, 0]), 'a', 8)
    s.side(p, r, 'b', -8)
    s.under(at([a, 0, 0]), at([0, b, 0]), 'c', 8)
    s.side(at([0, 0, 0]), p, 'h', -7)
  },

  'hexagonal-prism'(s) {
    const solid = prism(ngon(6, 1, 0.2), 1.2)
    const at = camera(solid.points)
    const [p, q] = lowest(s.solid(solid, at))
    s.under(p, q, 's', 8)
    const right = solid.points.slice(0, 6).reduce((best, u) => (at(u)[0] > at(best)[0] ? u : best))
    s.side(at(right), at([right[0], right[1], 1.2]), 'h', 7)
  },

  'oblique-prism'(s) {
    const height = 1.15
    const solid = prism(square(1), height, [0.65, 0])
    const at = camera(solid.points, { az: -0.3, el: 0.34, box: [18, 8, 98, 72] })
    s.solid(solid, at)
    const top = solid.points[6]
    const [a, b] = [at(top), at([top[0], top[1], 0])]
    s.measure(a, b)
    s.corner(b, at(solid.points[3]), a, 5)
    s.side(a, b, 'h', -6)
    s.side(at(solid.points[2]), at(solid.points[6]), 'l', -7)
    s.text('B', at([0.65, 0, height]))
  },

  // Cylinders

  cylinder(s) {
    const [x, top, bottom, rx] = [48, 18, 68, 32]
    drum(s, x, top, bottom, rx)
    s.dot([x, top])
    s.measure([x, top], [x + rx, top])
    s.text('r', [x + rx + 7, top])
    s.side([x + rx, bottom], [x + rx, top], 'h', 8)
  },

  'hollow-cylinder'(s) {
    const [x, top, bottom, R, r] = [48, 18, 68, 34, 16]
    drum(s, x, top, bottom, R)
    const hole = ring([x, top], r)
    const floor = ring([x, bottom], r)
    s.skin(hole.whole, 0.25)
    s.rim(hole.whole)
    s.hidden(floor.whole)
    s.hidden(line([hole.left, floor.left]) + line([hole.right, floor.right]))
    s.measure([x, top], [x - r, top])
    s.measure([x, top], [x + R, top])
    s.dot([x, top])
    s.side([x + R, bottom], [x + R, top], 'h', 8)
    s.text('R', [x + R + 8, top])
    s.text('r', [x - r / 2, top + 9])
  },

  'oblique-cylinder'(s) {
    const low = [32, 68]
    const rise = [36, -50]
    const high = plus(low, rise)
    const rx = 24
    const ry = rx * FLAT
    const rim = (c, t) => plus(c, [rx * Math.cos(t), ry * Math.sin(t)])
    // The sides touch the two ends where the ends run parallel to the lean.
    const edge = Math.atan2(-(ry * rise[0]), rx * rise[1])
    const start = dot(minus(rim(low, edge + PI / 2), low), rise) < 0 ? edge : edge + PI
    const near = sweep(start, start + PI, t => rim(low, t))
    const far = sweep(start + PI, start + 2 * PI, t => rim(high, t))
    const hiddenPart = sweep(start + PI, start + 2 * PI, t => rim(low, t))
    const lid = ring(high, rx, ry)
    s.figure(closed([...near, ...far]))
    s.hidden(line(hiddenPart))
    s.skin(lid.whole, 0.1)
    s.rim(lid.whole)
    const foot = [high[0], low[1]]
    s.measure(high, foot)
    s.measure(low, foot)
    s.corner(foot, low, high, 5)
    s.dot(low)
    s.dot(high)
    s.side(foot, high, 'h', -6)
    s.measure(high, lid.right)
    s.text('r', [lid.right[0] + 6, high[1]])
    s.side(near.at(-1), plus(near.at(-1), rise), 'l', -8)
  },

  // Pyramids and cones

  pyramid(s) {
    const height = 1.4
    const solid = pyramid(ngon(5, 1, 0.19), height)
    const at = camera(solid.points)
    const [apex, base] = [at([0, 0, height]), at([0, 0, 0])]
    const foot = between(at(solid.points[4]), at(solid.points[0]))
    s.skin(closed(solid.points.slice(0, 5).map(at)), 0.2)
    s.solid(solid, at)
    s.measure(apex, base)
    s.measure(apex, foot)
    s.text('h', plus(between(apex, base), [-7, 0]))
    s.text('B', plus(base, [-11, 3]))
    s.side(foot, apex, 'l', 7)
  },

  'square-pyramid'(s) {
    const height = 1.3
    const solid = pyramid(square(1.5), height)
    const at = camera(solid.points)
    const [apex, base] = [at([0, 0, height]), at([0, 0, 0])]
    const [left, front, right] = [2, 3, 0].map(i => at(solid.points[i]))
    const foot = between(front, right)
    s.solid(solid, at)
    s.measure(apex, base)
    s.measure(apex, foot)
    s.corner(foot, right, apex, 4)
    s.text('h', plus(between(apex, base), [-7, 0]))
    s.side(foot, apex, 'l', 7)
    s.under(left, front, 'a', 8)
  },

  cone(s) {
    const [x, y, rx, apex] = [50, 68, 36, 10]
    const base = ring([x, y], rx)
    const [l, r] = touching(x, y, rx, base.ry, apex)
    s.figure(`M${x},${apex}L${pt(l)}A${base.a},${base.b} 0 1 0 ${pt(r)}z`)
    s.hidden(`M${pt(l)}A${base.a},${base.b} 0 0 1 ${pt(r)}`)
    s.measure([x, apex], [x, y])
    s.measure([x, y], [x + rx, y])
    s.dot([x, y])
    s.corner([x, y], [x + rx, y], [x, apex], 5)
    s.text('h', [x - 7, 40])
    s.text('r', [x + rx + 7, y])
    s.side(r, [x, apex], 'l', 8)
  },

  'cone-frustum'(s) {
    const [x, y, R, r, top] = [50, 68, 38, 20, 20]
    const apex = y - ((y - top) * R) / (R - r)
    const base = ring([x, y], R)
    const lid = ring([x, top], r)
    const [l, m] = touching(x, y, R, base.ry, apex)
    const [p, q] = touching(x, top, r, lid.ry, apex)
    s.figure(`M${pt(p)}L${pt(l)}A${base.a},${base.b} 0 1 0 ${pt(m)}L${pt(q)}A${lid.a},${lid.b} 0 0 0 ${pt(p)}z`)
    s.hidden(`M${pt(l)}A${base.a},${base.b} 0 0 1 ${pt(m)}`)
    s.skin(lid.whole, 0.1)
    s.rim(lid.whole)
    s.measure([x, top], [x, y])
    s.measure([x, y], [x + R, y])
    s.measure([x, top], [x + r, top])
    s.dot([x, y])
    s.dot([x, top])
    s.text('r', [x + r + 7, top])
    s.text('R', [x + R + 8, y])
    s.text('h', [x - 7, 45])
    s.side(m, q, 'l', 8)
  },

  'pyramid-frustum'(s) {
    const height = 1.05
    const solid = prism(square(1.9), height, [0, 0], 0.5)
    const at = camera(solid.points)
    const [low, high] = [at([0, 0, 0]), at([0, 0, height])]
    const p = between(at(solid.points[3]), at(solid.points[0]))
    const q = between(at(solid.points[7]), at(solid.points[4]))
    s.skin(closed(solid.points.slice(0, 4).map(at)), 0.2)
    s.solid(solid, at)
    s.measure(high, low)
    s.measure(p, q)
    s.text('h', plus(between(high, low), [-7, 2]))
    s.text('B_1', plus(high, [0, -16]))
    s.text('B_2', plus(low, [-19, -1]))
    s.side(p, q, 'l', 7)
  },

  // Spheres

  sphere(s) {
    const c = [56, 44]
    const R = 37
    const equator = latitude(c, R, 0)
    s.figure(circle(c, R))
    s.rim(line(equator.shown))
    s.hidden(line(equator.hidden))
    s.dot(c)
    s.measure(c, equator.right)
    s.text('r', [74, 38])
  },

  hemisphere(s) {
    const c = [56, 64]
    const R = 46
    const equator = latitude(c, R, 0)
    s.figure(`${line(equator.shown)}${arc(R, equator.shown[0], 0, 0)}z`)
    s.hidden(line(equator.hidden))
    s.dot(c)
    s.measure(c, equator.right)
    s.text('r', [78, 58])
  },

  'spherical-cap'(s) {
    const c = [56, 52]
    const R = 34
    const cut = latitude(c, R, 12)
    s.faint(circle(c, R))
    s.figure(`${line(cut.shown)}${arc(R, cut.shown[0], 0, 0)}z`)
    s.hidden(line(cut.hidden))
    s.dot(c)
    s.measure(cut.centre, [c[0], c[1] - R * TALL])
    s.measure(cut.centre, cut.right)
    s.measure(c, cut.right)
    s.text('h', [c[0] - 7, cut.centre[1] - 11])
    s.text('a', [c[0] + 15, cut.centre[1] - 7])
    s.text('r', [c[0] + 8, c[1] + 3])
  },

  'spherical-segment'(s) {
    const c = [50, 44]
    const R = 38
    const high = latitude(c, R, 20)
    const low = latitude(c, R, -10)
    const onBall = onCircle(c, R, degrees(-52))
    s.faint(circle(c, R))
    s.figure(`${line(low.shown)}${arc(R, high.hidden[0], 0, 0)}${line(high.hidden.slice(1)).replace('M', 'L')}${arc(R, low.shown[0], 0, 0)}z`)
    s.skin(closed([...high.shown, ...high.hidden]), 0.1)
    s.rim(line(high.shown))
    s.hidden(line(low.hidden))
    s.dot(c)
    s.measure(high.centre, low.centre)
    s.measure(high.centre, high.right)
    s.measure(low.centre, low.right)
    s.measure(c, onBall)
    s.text('a', [c[0] + 15, high.centre[1] - 7])
    s.text('b', [c[0] + 17, low.centre[1] - 7])
    s.text('h', [c[0] - 7, c[1] - 3])
    s.text('r', plus(onBall, [8, 3]))
  },

  'spherical-sector'(s) {
    const c = [56, 62]
    const R = 42
    const cut = latitude(c, R, 22)
    // The cone below the cap shows beyond the lines from the centre that touch the circle.
    const [l, m] = touching(cut.centre[0], cut.centre[1], cut.a, cut.a * FLAT, c[1])
    const outer = cut.shown.filter(p => Math.abs(p[0] - c[0]) > m[0] - c[0])
    const [left, right] = [outer.filter(p => p[0] < c[0]), outer.filter(p => p[0] > c[0])]
    s.faint(circle(c, R))
    s.figure(`${closed([c, l, ...left.reverse()]).slice(0, -1)}${arc(R, right.at(-1), 0, 1)}${line([...right.reverse(), m, c]).replace('M', 'L')}z`)
    s.rim(line(cut.shown))
    s.hidden(line(cut.hidden))
    s.dot(c)
    s.measure(cut.centre, [c[0], c[1] - R * TALL])
    s.measure(cut.centre, cut.right)
    s.text('h', [c[0] - 7, cut.centre[1] - 11])
    s.text('a', [c[0] + 17, cut.centre[1] - 7])
    s.side(l, c, 'r', -8)
  },

  'spherical-shell'(s) {
    const c = [56, 44]
    const [R, r] = [37, 22]
    s.figure(circle(c, R))
    s.hidden(circle(c, r))
    s.dot(c)
    s.measure(c, onCircle(c, R, degrees(30)))
    s.measure(c, onCircle(c, r, degrees(205)))
    s.text('R', [79, 37])
    s.text('r', [43, 34])
  },

  // Other round solids

  ellipsoid(s) {
    const [a, b, c] = [1.5, 1, 1]
    const az = -0.55
    const el = 0.38
    const [cz, sz] = [Math.cos(az), Math.sin(az)]
    const view = [-sz * Math.cos(el), -cz * Math.cos(el), Math.sin(el)]
    // The outline lies in a plane through the centre, so it is a great circle of the sphere that
    // the ellipsoid is stretched from.
    const w = [view[0] / a, view[1] / b, view[2] / c]
    const e1 = unit(cross(w, [0, 0, 1]))
    const e2 = unit(cross(w, e1))
    const outline = sweep(0, 2 * PI, t => {
      const q = plus(times(e1, Math.cos(t)), times(e2, Math.sin(t)))
      return [a * q[0], b * q[1], c * q[2]]
    }, 96)
    const at = camera(outline, { az, el, box: [12, 8, 100, 80] })
    const onEquator = t => at([a * Math.cos(t), b * Math.sin(t), 0])
    const facing = Math.atan2(view[1] / b, view[0] / a)
    s.figure(closed(outline.map(at)))
    s.rim(line(sweep(facing - PI / 2, facing + PI / 2, onEquator)))
    s.hidden(line(sweep(facing + PI / 2, facing + (3 * PI) / 2, onEquator)))
    const o = at([0, 0, 0])
    const [pa, pb, pc] = [at([a, 0, 0]), at([0, -b, 0]), at([0, 0, c])]
    s.dot(o)
    s.measure(o, pa)
    s.measure(o, pb)
    s.measure(o, pc)
    s.text('a', plus(between(o, pa), [3, -7]))
    s.text('b', plus(between(o, pb), [-3, -7]))
    s.text('c', plus(between(o, pc), [6, 0]))
  },

  paraboloid(s) {
    const [x, y, r, h] = [50, 68, 38, 62]
    const base = ring([x, y], r)
    const behind = (r * r * Math.tan(TILT)) / (2 * h) // how far behind the axis the outline runs
    const across = Math.sqrt(r * r - behind * behind)
    const up = t => behind * FLAT + h * (1 - (t * t + behind * behind) / (r * r)) * TALL
    const curve = sweep(across, -across, t => [x + t, y - up(t)])
    s.figure(`${line(curve)}A${base.a},${base.b} 0 1 0 ${pt(curve[0])}z`)
    s.hidden(`M${pt(curve.at(-1))}A${base.a},${base.b} 0 0 1 ${pt(curve[0])}`)
    const peak = [x, y - h * TALL]
    s.measure(peak, [x, y])
    s.measure([x, y], [x + r, y])
    s.dot([x, y])
    s.corner([x, y], [x + r, y], peak, 5)
    s.text('h', [x - 7, 40])
    s.text('r', [x + r + 7, y])
  },

  torus(s) {
    const c = [56, 44]
    const [R, r] = [30, 12]
    const q = Math.sin(0.85)
    const offset = d => sweep(0, 2 * PI, t => {
      const n = unit([q * Math.cos(t), Math.sin(t)])
      return plus(c, plus([R * Math.cos(t), R * q * Math.sin(t)], times(n, d)))
    }, 96).slice(0, -1)
    s.figure(closed(offset(r)) + closed(offset(-r)))
    s.measure(c, [c[0] + R, c[1]])
    s.measure([c[0] + R, c[1]], [c[0] + R + r, c[1]])
    s.dot(c)
    s.dot([c[0] + R, c[1]])
    s.text('R', [c[0] + 12, c[1] - 7])
    s.text('r', [c[0] + R + 6, c[1] - 8])
  },

  // The regular solids, with the cube above

  tetrahedron(s) { platonic(s, pyramid(ngon(3, 1 / Math.sqrt(3), PI / 2), Math.sqrt(2 / 3)), { az: 0.12, el: 0.3 }) },
  octahedron(s) { platonic(s, octahedron(), { az: 0.35, el: 0.28 }) },
  dodecahedron(s) { platonic(s, dual(icosahedron()), { az: 0.5, el: 0.3 }, false) },
  icosahedron(s) { platonic(s, icosahedron(), { az: 0.5, el: 0.3 }, false) },
}

const r1 = v => Math.round(v * 10) / 10
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
