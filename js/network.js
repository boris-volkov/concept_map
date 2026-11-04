// Small diagrams of graphs in the sense of graph theory, vertices and edges, drawn as SVG from a
// ```network block in a concept's text. (A ```graph block, in graph.js, is the graph of a function.)
//
//   ```network
//   K5
//   ```
//
//   ```network
//   edges: a-b-c-a c-d
//   heavy: a-b b-c
//   ```
//
// A line that is only a name is a family: K5, K3,3, K2,2,2, C6, P4, W6 (a wheel of 6 vertices),
// E4 (four vertices and no edges), Q3, grid 3,4, Petersen, tetrahedron, cube, octahedron,
// dodecahedron, icosahedron. Its vertices are numbered from 1; `names:` renames them in order.
//
// `edges:` lists edges: a-b is an edge, a>b an arc, a-b-c a path of them, a-a a loop, and a-b:4 or
// a>b:4 carries a weight. An edge listed twice is drawn twice, so multigraphs need nothing special.
// `vertices:` adds vertices with no edges, and `remove:` takes edges out of a family.
//
// `layout:` is circle (the usual one), line, tree (the first vertex at the root), two-rows (the two
// sides of a bipartite graph) or spring. `at: a(0,0) b(2,0) c(1,sqrt(3))` puts vertices exactly
// where they are wanted, with y upwards, and overrides the layout.
//
// `heavy:` draws edges in the colour of the domain, and all the others lighter; `path: a b c a`
// does the same along a walk. `dashed:` draws edges dashed. `mark:` picks out vertices, `classes:
// a c / b d` colours them class by class, and `edge-classes:` does the same for edges.
//
// `labels: none` or `labels: all` hides or shows the names of the vertices: shown for an edge list
// and for `names:`, hidden for a family. `label: x, y "text" place` writes text on the diagram, such
// as the name of a face. `size: w, h` sets the size, and `caption:` a line under it, which may hold
// $math$. A line of three dashes starts another diagram beside the first.
//
// In a table, {{ network: K5 }} draws a small one: the same lines, with ; between them.
//
// Like a graph, it is drawn once, when the entry holding it opens, so it costs the map nothing.

import { numbers, marked, PLACES } from './graph.js'
import { texToMathML } from './tex.js'

const LONGEST = 150 // pixels across the longest side of a drawing
const EDGE = 72 // and along a typical edge, so that a small graph isn't drawn huge
const SMALL = 130 // a diagram narrower than this is one in a table
const FAN = 15 // pixels between edges that join the same two vertices
const CLASSES = 6 // the colours in atlas.css

/** The SVG for a network block's text, or a message in red if it can't be read. */
export function network(src) {
  let panels
  try {
    panels = readNetwork(src)
  } catch (e) {
    return `<p class="graph-error">Network: ${esc(e.message)}</p>`
  }
  const drawn = panels.map(draw)
  return drawn.length > 1 ? `<div class="network-row">${drawn.join('')}</div>` : drawn[0]
}

/** What is wrong with a network block, if anything: for the list of content problems. */
export function networkError(src) {
  try {
    readNetwork(src)
    return ''
  } catch (e) {
    return e.message
  }
}

// ---- reading a block ----

/** The diagrams in a block: each its vertices, its edges {a, b, arc, weight}, and how to draw them. */
export function readNetwork(src) {
  const panels = [[]]
  for (const raw of src.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    if (/^-{3,}$/.test(line)) panels.push([])
    else panels.at(-1).push(line)
  }
  return panels.map(panel)
}

function panel(lines) {
  const n = { vertices: [], edges: [], places: new Map(), marks: new Set(), classes: new Map(), notes: [], labels: null, family: null }
  const add = v => { if (!n.vertices.includes(v)) n.vertices.push(v); return v }
  const said = []
  for (const line of lines) {
    const m = /^([a-z][a-z-]*)\s*:\s*(.*)$/i.exec(line)
    if (m) said.push([m[1].toLowerCase(), m[2].trim()])
    else family(line, n)
  }
  const get = key => said.filter(s => s[0] === key).map(s => s[1])

  // What the graph is, then what is said about it, so that the lines can come in any order.
  for (const v of get('vertices')) v.split(/[\s,]+/).filter(Boolean).forEach(add)
  for (const list of get('edges')) readEdges(list).forEach(e => { add(e.a); add(e.b); n.edges.push(e) })
  for (const names of get('names')) rename(n, names.split(/[\s,]+/).filter(Boolean))
  for (const list of get('remove')) {
    for (const e of readEdges(list)) n.edges.splice(n.edges.indexOf(find(n, e)), 1)
  }

  for (const [key, rest] of said) {
    switch (key) {
      case 'vertices': case 'edges': case 'names': case 'remove': break
      case 'layout':
        if (!LAYOUTS[rest]) throw new Error(`there is no layout "${rest}": try ${Object.keys(LAYOUTS).join(', ')}`)
        n.layout = rest
        break
      case 'at': readPlaces(rest, n); break
      case 'heavy': readEdges(rest).forEach(e => { find(n, e).heavy = true }); break
      case 'dashed': readEdges(rest).forEach(e => { find(n, e).dashed = true }); break
      case 'path': {
        const walk = rest.split(/[\s,]+/).filter(Boolean)
        if (walk.length < 2) throw new Error(`a path needs at least two vertices, not "${rest}"`)
        for (let i = 1; i < walk.length; i++) find(n, { a: walk[i - 1], b: walk[i] }).heavy = true
        break
      }
      case 'mark': rest.split(/[\s,]+/).filter(Boolean).forEach(v => n.marks.add(known(n, v))); break
      case 'classes':
        rest.split('/').forEach((part, c) => part.trim().split(/[\s,]+/).filter(Boolean).forEach(v => n.classes.set(known(n, v), c)))
        break
      case 'edge-classes':
        rest.split('/').forEach((part, c) => readEdges(part).forEach(e => { find(n, e).tone = c }))
        break
      case 'labels':
        if (rest !== 'all' && rest !== 'none') throw new Error(`labels are "all" or "none", not "${rest}"`)
        n.labels = rest === 'all'
        break
      case 'label': n.notes.push(marked(rest, 2, false)); break
      case 'size': n.size = numbers(rest, 2); break
      case 'caption': n.caption = rest; break
      default: throw new Error(`unknown line "${key}:"`)
    }
  }
  if (!n.vertices.length) throw new Error('it has no vertices: name a family such as K5, or list its edges')
  return n
}

// "a-b-c a>b b-c:4": edges, arcs, paths of them, and weights.
function readEdges(s) {
  const edges = []
  for (const token of s.split(/\s+/).filter(Boolean)) {
    const colon = token.indexOf(':')
    const body = colon === -1 ? token : token.slice(0, colon)
    const parts = body.split(/(-|>)/)
    if (parts.length < 3 || parts.some(p => !p)) throw new Error(`can't read the edge "${token}"`)
    if (colon !== -1 && parts.length > 3) throw new Error(`a weight goes on one edge, not on "${token}"`)
    for (let i = 1; i < parts.length; i += 2) {
      edges.push({ a: parts[i - 1], b: parts[i + 1], arc: parts[i] === '>', weight: colon === -1 ? null : token.slice(colon + 1) })
    }
  }
  return edges
}

// "a(0,0) b(2,cos(1))": names, then numbers in brackets that may hold brackets of their own.
function readPlaces(s, n) {
  let i = 0
  while (i < s.length) {
    if (/[\s,]/.test(s[i])) { i++; continue }
    const open = s.indexOf('(', i)
    if (open === -1) throw new Error(`"${s.slice(i)}" needs a place, such as a(0,1)`)
    let depth = 0
    let close = open
    for (; close < s.length; close++) {
      if (s[close] === '(') depth++
      else if (s[close] === ')' && --depth === 0) break
    }
    if (close === s.length) throw new Error(`a bracket is left open in "${s.slice(i)}"`)
    n.places.set(known(n, s.slice(i, open).trim()), numbers(s.slice(open + 1, close), 2))
    i = close + 1
  }
}

function known(n, v) {
  if (!n.vertices.includes(v)) throw new Error(`there is no vertex "${v}"`)
  return v
}

function find(n, e) {
  known(n, e.a)
  known(n, e.b)
  const same = x => (x.a === e.a && x.b === e.b) || (!x.arc && !e.arc && x.a === e.b && x.b === e.a)
  const hit = n.edges.find(same)
  if (!hit) throw new Error(`there is no edge ${e.a}${e.arc ? '>' : '-'}${e.b}`)
  return hit
}

function rename(n, names) {
  if (names.length !== n.vertices.length) throw new Error(`there are ${n.vertices.length} vertices, so "names:" needs ${n.vertices.length} names`)
  if (new Set(names).size !== names.length) throw new Error('two vertices have the same name')
  const to = new Map(n.vertices.map((v, i) => [v, names[i]]))
  n.vertices = names
  for (const e of n.edges) { e.a = to.get(e.a); e.b = to.get(e.b) }
  n.spots = n.spots && new Map([...n.spots].map(([v, p]) => [to.get(v), p]))
  if (n.labels === null) n.labels = true
}

// ---- the families ----

const count = k => Array.from({ length: k }, (_, i) => String(i + 1))

// Points evenly round a circle, clockwise from the top: a point at the top when their number is
// odd, and when it is even a flat side, so that C4 is a square and not a diamond.
function ring(k, r = 1, turn = 0) {
  if (k === 1) return [[0, 0]]
  return Array.from({ length: k }, (_, i) => {
    const a = Math.PI / 2 - (2 * Math.PI * i) / k + (k % 2 ? 0 : Math.PI / k) + turn
    return [r * Math.cos(a), r * Math.sin(a)]
  })
}

// Vertices 1…k at the given places, and edges between them as pairs of numbers from 1.
function build(n, places, pairs) {
  n.family = true
  const names = count(places.length)
  n.vertices = names
  n.edges = pairs.map(([a, b]) => ({ a: String(a), b: String(b), arc: false, weight: null }))
  n.spots = new Map(names.map((v, i) => [v, places[i]]))
}

const cycleOf = (from, k) => Array.from({ length: k }, (_, i) => [from + i, from + ((i + 1) % k)])
const zip = (from, to, k) => Array.from({ length: k }, (_, i) => [from + i, to + i])

function family(line, n) {
  if (n.family) throw new Error(`a diagram has one family, and "${line}" is a second`)
  const text = line.toLowerCase()
  let m
  if ((m = /^k_?\{?(\d+(?:\s*,\s*\d+)*)\}?$/.exec(text))) return complete(n, m[1].split(',').map(Number))
  if ((m = /^c_?\{?(\d+)\}?$/.exec(text))) {
    const k = +m[1]
    if (k < 3) throw new Error('a cycle has at least 3 vertices')
    return build(n, ring(k), cycleOf(1, k))
  }
  if ((m = /^p_?\{?(\d+)\}?$/.exec(text))) {
    const k = +m[1]
    return build(n, count(k).map((_, i) => [i, 0]), Array.from({ length: k - 1 }, (_, i) => [i + 1, i + 2]))
  }
  if ((m = /^w_?\{?(\d+)\}?$/.exec(text))) {
    const rim = +m[1] - 1
    if (rim < 3) throw new Error('a wheel has at least 4 vertices')
    return build(n, [[0, 0], ...ring(rim)], [...cycleOf(2, rim), ...count(rim).map(i => [1, +i + 1])])
  }
  if ((m = /^e_?\{?(\d+)\}?$/.exec(text))) return build(n, ring(+m[1]), [])
  if ((m = /^q_?\{?(\d+)\}?$/.exec(text))) return hypercube(n, +m[1])
  if ((m = /^grid\s*(\d+)\s*[,x×]\s*(\d+)$/.exec(text))) return grid(n, +m[1], +m[2])
  const named = SOLIDS[text]
  if (named) return named(n)
  throw new Error(`"${line}" is not a family the atlas knows, and an edge list starts "edges:"`)
}

function complete(n, parts) {
  const total = parts.reduce((a, b) => a + b, 0)
  const pairs = []
  if (parts.length === 1) {
    for (let a = 1; a <= total; a++) for (let b = a + 1; b <= total; b++) pairs.push([a, b])
    return build(n, ring(total), pairs)
  }
  const side = []
  parts.forEach((size, p) => { for (let i = 0; i < size; i++) side.push(p) })
  for (let a = 0; a < total; a++) for (let b = a + 1; b < total; b++) if (side[a] !== side[b]) pairs.push([a + 1, b + 1])
  if (parts.length > 2) return build(n, ring(total), pairs)
  const [p, q] = parts
  if (p === 1 || q === 1) { // a star, with its centre in the middle
    const leaves = ring(total - 1)
    return build(n, p === 1 ? [[0, 0], ...leaves] : [...leaves, [0, 0]], pairs)
  }
  const row = (size, y) => count(size).map((_, i) => [i - (size - 1) / 2, y])
  build(n, [...row(p, 0.7), ...row(q, -0.7)], pairs)
}

function hypercube(n, d) {
  if (d < 1 || d > 5) throw new Error('Q1 to Q5 can be drawn')
  const turn = k => [Math.cos((Math.PI * k) / d), Math.sin((Math.PI * k) / d)]
  const steps = d === 3 ? [[1, 0], [0, 1], [0.45, 0.32]] : count(d).map((_, k) => turn(k))
  const places = []
  const pairs = []
  for (let v = 0; v < 2 ** d; v++) {
    places.push(steps.reduce(([x, y], [dx, dy], bit) => (v >> bit) & 1 ? [x + dx, y + dy] : [x, y], [0, 0]))
    for (let bit = 0; bit < d; bit++) if (!((v >> bit) & 1)) pairs.push([v + 1, (v | (1 << bit)) + 1])
  }
  build(n, places, pairs)
}

function grid(n, rows, cols) {
  const places = []
  const pairs = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = r * cols + c + 1
      places.push([c, rows - 1 - r])
      if (c + 1 < cols) pairs.push([v, v + 1])
      if (r + 1 < rows) pairs.push([v, v + cols])
    }
  }
  build(n, places, pairs)
}

// Rings of vertices, one inside the next: the Platonic solids flattened through one face (Schlegel
// diagrams), which is what shows that they are planar, and the Petersen graph.
const SOLIDS = {
  petersen: n => build(n, [...ring(5), ...ring(5, 0.52)],
    [...cycleOf(1, 5), ...zip(1, 6, 5), ...count(5).map((_, i) => [6 + i, 6 + ((i + 2) % 5)])]),
  tetrahedron: n => build(n, [...ring(3), [0, 0]], [...cycleOf(1, 3), [1, 4], [2, 4], [3, 4]]),
  cube: n => build(n, [...ring(4), ...ring(4, 0.45)], [...cycleOf(1, 4), ...cycleOf(5, 4), ...zip(1, 5, 4)]),
  octahedron: n => build(n, [...ring(3), ...ring(3, 0.4, Math.PI)],
    [...cycleOf(1, 3), ...cycleOf(4, 3), [1, 5], [1, 6], [2, 6], [2, 4], [3, 4], [3, 5]]),
  dodecahedron: n => build(n, [...ring(5), ...ring(5, 0.68), ...ring(5, 0.46, Math.PI / 5), ...ring(5, 0.28, Math.PI / 5)],
    [...cycleOf(1, 5), ...zip(1, 6, 5), ...zip(6, 11, 5), ...count(5).map((_, i) => [6 + i, 11 + ((i + 1) % 5)]),
      ...zip(11, 16, 5), ...cycleOf(16, 5)]),
  icosahedron: n => {
    const pairs = [...cycleOf(1, 3), ...cycleOf(4, 6), ...cycleOf(10, 3)]
    for (let i = 0; i < 3; i++) {
      // Outer vertex i is over every other vertex of the hexagon, and joins it and the two beside it.
      pairs.push([1 + i, 4 + 2 * i], [1 + i, 4 + ((2 * i + 1) % 6)], [1 + i, 4 + ((2 * i + 5) % 6)])
      // The inner vertices are over the other three, and each joins one of them and the two beside it.
      const under = 2 * i + 3
      pairs.push([10 + i, 4 + (under % 6)], [10 + i, 4 + ((under + 1) % 6)], [10 + i, 4 + ((under + 5) % 6)])
    }
    build(n, [...ring(3), ...ring(6, 0.5, -Math.PI / 6), ...ring(3, 0.2, Math.PI)], pairs)
  },
}

// ---- layouts ----

const LAYOUTS = {
  circle: n => spread(n, ring(n.vertices.length)),
  line: n => spread(n, n.vertices.map((_, i) => [i, 0])),
  tree: n => tree(n),
  'two-rows': n => rows(n),
  spring: n => spring(n),
}

const spread = (n, places) => new Map(n.vertices.map((v, i) => [v, places[i]]))

function neighbours(n) {
  const near = new Map(n.vertices.map(v => [v, []]))
  for (const e of n.edges) {
    near.get(e.a).push(e.b)
    near.get(e.b).push(e.a)
  }
  return near
}

// Levels from the first vertex, each parent centred over its children.
function tree(n) {
  const near = neighbours(n)
  const seen = new Set()
  const places = new Map()
  let next = 0
  const visit = (v, depth) => {
    seen.add(v)
    const kids = near.get(v).filter(u => !seen.has(u))
    kids.forEach(u => seen.add(u))
    if (!kids.length) places.set(v, [next++, -depth])
    else {
      kids.forEach(u => visit(u, depth + 1))
      const xs = kids.map(u => places.get(u)[0])
      places.set(v, [(xs[0] + xs.at(-1)) / 2, -depth])
    }
  }
  for (const v of n.vertices) if (!seen.has(v)) visit(v, 0)
  return places
}

// The two sides of a bipartite graph, as `classes:` gives them, or else found by colouring outwards.
function rows(n) {
  const side = new Map(n.classes)
  if (!side.size) {
    const near = neighbours(n)
    for (const start of n.vertices) {
      if (side.has(start)) continue
      side.set(start, 0)
      const queue = [start]
      while (queue.length) {
        const v = queue.shift()
        for (const u of near.get(v)) {
          if (!side.has(u)) { side.set(u, 1 - side.get(v)); queue.push(u) }
        }
      }
    }
  }
  const row = c => n.vertices.filter(v => (side.get(v) ?? 0) === c)
  const places = new Map()
  for (const c of [0, 1]) row(c).forEach((v, i, all) => places.set(v, [i - (all.length - 1) / 2, c ? -0.7 : 0.7]))
  return places
}

// A force-directed drawing (Fruchterman and Reingold), starting from the circle, so that the same
// block always draws the same picture.
function spring(n) {
  const V = n.vertices
  const at = ring(V.length).map(p => [...p])
  const index = new Map(V.map((v, i) => [v, i]))
  const k = Math.sqrt(4 / V.length)
  let step = 0.25
  for (let round = 0; round < 400; round++) {
    const push = V.map(() => [0, 0])
    for (let i = 0; i < V.length; i++) {
      for (let j = i + 1; j < V.length; j++) {
        const dx = at[i][0] - at[j][0]
        const dy = at[i][1] - at[j][1]
        const d = Math.hypot(dx, dy) || 0.01
        const f = (k * k) / d / d
        push[i][0] += dx * f; push[i][1] += dy * f
        push[j][0] -= dx * f; push[j][1] -= dy * f
      }
    }
    for (const e of n.edges) {
      const i = index.get(e.a)
      const j = index.get(e.b)
      const dx = at[i][0] - at[j][0]
      const dy = at[i][1] - at[j][1]
      const d = Math.hypot(dx, dy) || 0.01
      const f = d / k
      push[i][0] -= dx * f; push[i][1] -= dy * f
      push[j][0] += dx * f; push[j][1] += dy * f
    }
    at.forEach((p, i) => {
      const d = Math.hypot(...push[i]) || 0.01
      const move = Math.min(d, step)
      p[0] += (push[i][0] / d) * move
      p[1] += (push[i][1] / d) * move
    })
    step *= 0.985
  }
  return spread(n, at)
}

// ---- drawing ----

function draw(n) {
  const spots = n.layout ? LAYOUTS[n.layout](n) : n.spots ?? LAYOUTS.circle(n)
  const at = new Map([...spots, ...n.places])
  const named = n.labels ?? !n.family
  const loops = n.edges.some(e => e.a === e.b)

  const xs = n.vertices.map(v => at.get(v)[0])
  const ys = n.vertices.map(v => at.get(v)[1])
  const x0 = Math.min(...xs)
  const y0 = Math.min(...ys)
  const across = Math.max(...xs) - x0
  const up = Math.max(...ys) - y0

  const small = (n.size?.[0] ?? Infinity) < SMALL
  const r = named ? (small ? 7 : 10) : (small ? 2.4 : 4)
  const loopR = small ? 6 : 11
  const pad = r + 3 + (loops ? 2 * loopR : 0) + (n.notes.length ? 12 : 0)

  let w, h, scale
  if (n.size) {
    [w, h] = n.size
    scale = Math.min((w - 2 * pad) / (across || 1), (h - 2 * pad) / (up || 1))
  } else {
    const lengths = n.edges.filter(e => e.a !== e.b).map(e => Math.hypot(at.get(e.a)[0] - at.get(e.b)[0], at.get(e.a)[1] - at.get(e.b)[1])).sort((a, b) => a - b)
    const usual = lengths[lengths.length >> 1] || 1
    scale = Math.min(LONGEST / (Math.max(across, up) || 1), EDGE / usual)
    w = Math.ceil(across * scale + 2 * pad)
    h = Math.ceil(up * scale + 2 * pad)
  }
  const X = x => r1((w - across * scale) / 2 + (x - x0) * scale)
  const Y = y => r1(h - (h - up * scale) / 2 - (y - y0) * scale)
  const point = v => [X(at.get(v)[0]), Y(at.get(v)[1])]

  const out = []
  const quiet = n.edges.some(e => e.heavy) ? ' quiet' : ''
  const look = e => `tie${e.heavy ? ' heavy' : quiet}${e.dashed ? ' dashed' : ''}${e.tone === undefined ? '' : ` tone${(e.tone % CLASSES) + 1}`}`

  // Edges between the same two vertices fan out, and the others run straight.
  const pairs = new Map()
  for (const e of n.edges) {
    if (e.a === e.b) continue
    const [p, q] = n.vertices.indexOf(e.a) < n.vertices.indexOf(e.b) ? [e.a, e.b] : [e.b, e.a]
    const key = `${p}\u0000${q}`
    if (!pairs.has(key)) pairs.set(key, { p, q, edges: [] })
    pairs.get(key).edges.push(e)
  }
  for (const { p, q, edges } of pairs.values()) {
    const [px, py] = point(p)
    const [qx, qy] = point(q)
    const d = Math.hypot(qx - px, qy - py) || 1
    const nx = -(qy - py) / d
    const ny = (qx - px) / d
    edges.forEach((e, i) => {
      const off = (i - (edges.length - 1) / 2) * FAN
      const midX = (px + qx) / 2 + nx * off
      const midY = (py + qy) / 2 + ny * off
      const cx = (px + qx) / 2 + 2 * nx * off
      const cy = (py + qy) / 2 + 2 * ny * off
      const [ax, ay] = point(e.a)
      let [bx, by] = point(e.b)
      if (e.arc) {
        const from = off ? [cx, cy] : [ax, ay]
        const len = Math.hypot(bx - from[0], by - from[1]) || 1
        const ux = (bx - from[0]) / len
        const uy = (by - from[1]) / len
        const tip = [bx - ux * (r + 1.5), by - uy * (r + 1.5)]
        const size = e.heavy ? 10 : 8
        bx = r1(tip[0] - ux * size * 0.7)
        by = r1(tip[1] - uy * size * 0.7)
        const base = [tip[0] - ux * size, tip[1] - uy * size]
        const spread = size * 0.42
        out.push(`<path class="arc-head${e.heavy ? ' heavy' : quiet}" d="M${r1(tip[0])},${r1(tip[1])}` +
          `L${r1(base[0] - uy * spread)},${r1(base[1] + ux * spread)}L${r1(base[0] + uy * spread)},${r1(base[1] - ux * spread)}z"/>`)
      }
      out.push(`<path class="${look(e)}" d="M${ax},${ay}${off ? `Q${r1(cx)},${r1(cy)} ` : 'L'}${bx},${by}"/>`)
      if (e.weight !== null) out.push(`<text class="weight" x="${r1(midX)}" y="${r1(midY + 4)}" text-anchor="middle">${esc(e.weight)}</text>`)
    })
  }

  // A loop stands out from the middle of the drawing, and several at a vertex splay apart.
  const middle = [xs.reduce((a, b) => a + b, 0) / xs.length, ys.reduce((a, b) => a + b, 0) / ys.length]
  for (const v of n.vertices) {
    const own = n.edges.filter(e => e.a === v && e.b === v)
    const [vx, vy] = point(v)
    const away = Math.atan2(vy - Y(middle[1]), vx - X(middle[0])) || -Math.PI / 2
    own.forEach((e, i) => {
      const a = away + (i - (own.length - 1) / 2) * 0.9
      out.push(`<circle class="${look(e)}" cx="${r1(vx + Math.cos(a) * (r + loopR * 0.5))}" cy="${r1(vy + Math.sin(a) * (r + loopR * 0.5))}" r="${loopR}"/>`)
    })
  }

  for (const v of n.vertices) {
    const [vx, vy] = point(v)
    const tone = n.classes.has(v) ? ` tone${(n.classes.get(v) % CLASSES) + 1}` : ''
    const big = !named && (tone || n.marks.has(v)) ? 1.1 : 0
    out.push(`<circle class="vertex${named ? ' named' : ''}${n.marks.has(v) ? ' marked' : ''}${tone}" cx="${vx}" cy="${vy}" r="${r + big}"/>`)
    if (named) out.push(`<text class="name${n.marks.has(v) || tone ? ' on-fill' : ''}${small ? ' tiny' : ''}" x="${vx}" y="${r1(vy + (small ? 3 : 4))}" text-anchor="middle">${esc(v)}</text>`)
  }
  for (const note of n.notes) {
    const [dx, dy, anchor] = PLACES[note.place]
    out.push(`<text x="${r1(X(note.at[0]) + dx)}" y="${r1(Y(note.at[1]) + dy)}" text-anchor="${anchor}">${esc(note.label)}</text>`)
  }

  const edges = n.edges.length
  const about = `A graph with ${n.vertices.length} ${n.vertices.length === 1 ? 'vertex' : 'vertices'} and ${edges} ${edges === 1 ? 'edge' : 'edges'}`
  return `<figure class="graph network"><svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${about}">` +
    `${out.join('')}</svg>${n.caption ? `<figcaption>${caption(n.caption)}</figcaption>` : ''}</figure>`
}

const caption = s => esc(s).replace(/\$([^$]+)\$/g, (_, tex) => texToMathML(tex.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'), false))

const r1 = v => Math.round(v * 10) / 10
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
