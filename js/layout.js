// Where everything goes on the map.
//
// The domains make a small layered drawing of their own, in rows: each domain a row
// below the furthest of those it builds on, so that going down the map is going
// deeper into mathematics, and domains that don't build on one another side by side.
// An open domain keeps its card in place and floats its frame out to the right of all
// the cards, level with its row, so the arrows between domains never cross a frame.
//
// Inside a domain, each open topic lays out its own children, inside out. Topics
// holding topics fill columns across the page, in the order written (see placeColumns).
// Topics holding concepts make a layered (or "Sugiyama") drawing, prerequisites first
// and what builds on them after, running across.
//
// The order of a topic's children, and how they wrap, depend only on the arrows among
// them and how many there are, not on what is open. Boxes line up at the start of their
// rows and columns, so whatever opens pushes only what lies after it, right and down.

export const FRAME_PAD = { top: 54, right: 22, bottom: 22, left: 22 }
/**
 * The domains' rows: between rows, from the cards to the frames that float out beside them,
 * between frames that float out of one row, between cards side by side, and between an arrow
 * passing a row and whatever is next to it.
 */
export const DOMAINS = { gap: 64, float: 72, stack: 30, card: 44, pass: 20 }
const README_GAP = 22 // between an open topic's README and its contents
const GAP = {
  right: { layer: 78, wrap: 22, card: 14 }, // layer: between the columns an arrow runs across
  down: { layer: 58, wrap: 26, card: 18 },
}
const ASPECT = 1.5 // a crowded layer down the page wraps until its topic is about this wide for its height
const ASPECT_ACROSS = 3 // a crowded column wraps sooner, as an open file makes it far taller than wide
const NOMINAL = { w: 190, h: 64 } // what a box counts as when wrapping, open or not
const COLUMN_ASPECT = 1.6 // the more of this, the more columns a topic of topics gets
const FEW = 12 // a topic in rows by kind with no more cards than this runs on, without a row for each kind
const COLUMN_GAP = 32 // between the columns of a topic of topics, and the boxes in them
// The rows of a topic marked "rows: kinds": what is proved, what is true of the thing, how it is written, what to do with it.
const KIND_ROW = { axiom: 0, theorem: 0, rule: 0, formula: 2, form: 2, skill: 3, technique: 3 }
const kindRow = n => KIND_ROW[n.kind] ?? 1

const holdsTopics = node => node.children.some(k => k.children.length)

/** Whether a topic lays its contents out in columns: one holding topics, or concepts with no arrows to follow. */
const inColumns = node => !node.wrap && !node.rowsByKind && (holdsTopics(node) ? !node.flow : !node.localEdges.length)

/** The way a topic's contents flow. "wrap:" always means so many to a row, across the page. */
const plannedFlow = node => (node.wrap ? 'down' : node.flow ?? (holdsTopics(node) ? 'down' : 'right'))
export const flowOf = node => (node.balanced ? 'down' : plannedFlow(node))

/**
 * root: the atlas root; isOpen(node); cardSize(node) → {w, h}, with `file: true` for an open
 * file (a domain's is the size of its card, open or not); headerWidth(node) → minimum frame
 * width; readmeSize(node) → {w, h} of an open topic's README, or null when it has none showing.
 * Returns absolute boxes {x, y, w, h} by node id (an open domain's is its frame), each domain
 * card's place by id (`spine`), the route of each arrow between domains by key (see
 * layoutDomains), and the overall size.
 */
export function computeLayout(root, isOpen, cardSize, headerWidth, readmeSize = () => null) {
  const rel = new Map()
  const open = n => n.children.length > 0 && isOpen(n)
  // An open topic's contents start under its head, and under its README when that is open.
  const top = n => {
    const r = readmeSize(n)
    return FRAME_PAD.top + (r ? r.h + README_GAP : 0)
  }

  const measure = n => {
    if (!open(n)) return cardSize(n)
    const inner = arrange(n)
    const r = readmeSize(n)
    const w = Math.max(inner.w + FRAME_PAD.left + FRAME_PAD.right, headerWidth(n), r ? r.w + FRAME_PAD.left + FRAME_PAD.right : 0)
    return { w, h: inner.h + top(n) + FRAME_PAD.bottom, frame: true }
  }

  const arrange = container => {
    const kids = container.children
    const size = kids.map(measure)
    const at = new Map(kids.map((k, i) => [k, i]))
    // Rows by kind leave the arrows out of it: the cards keep the order they are written in. A
    // small topic has too few of each kind to fill a row, so it runs on, in balanced rows.
    const bands = container.rowsByKind && kids.length > FEW
    const rows = container.rowsByKind ? kids.map(k => (bands ? kindRow(k) : 0)) : null
    const line = container.rowsByKind && !bands ? columnCount(kids.length) : container.wrap
    const edges = rows ? [] : container.localEdges.map(e => ({ a: at.get(e.from), b: at.get(e.to), w: e.weight, twin: e.twin }))
    const pos = inColumns(container)
      ? placeColumns(size, kids.map(k => k.leafCount))
      : placeLayered(size, edges, plannedFlow(container), line, rows)
    container.balanced = !!pos.balanced
    kids.forEach((k, i) => rel.set(k, { x: pos.x[i], y: pos.y[i], w: size[i].w, h: size[i].h }))
    return { w: pos.w, h: pos.h }
  }

  // The domains: every card takes a place of one size, so the rows are even, and an open domain's
  // frame floats out to the right of them all, level with its row.
  const kids = root.children
  const slot = {
    w: Math.max(0, ...kids.map(k => cardSize(k).w)),
    h: Math.max(0, ...kids.map(k => cardSize(k).h)),
  }
  const frames = new Map(kids.filter(open).map(k => [k, measure(k)]))
  const d = layoutDomains(root, slot, frames)
  for (const k of kids) rel.set(k, d.frames.get(k) ?? d.places.get(k.id))

  const boxes = new Map()
  const place = (container, ox, oy) => {
    for (const k of container.children) {
      const r = rel.get(k)
      const box = { x: ox + r.x, y: oy + r.y, w: r.w, h: r.h }
      boxes.set(k.id, box)
      if (open(k)) place(k, box.x + FRAME_PAD.left, box.y + top(k))
    }
  }
  place(root, 0, 0)
  return { boxes, spine: d.places, routes: d.routes, width: d.width, height: d.height }
}

/**
 * The domains, as a small layered drawing (placeLayered does the same inside a topic). Each
 * domain goes a row below the furthest of those it builds on, after the few arrows that close a
 * loop are turned round, so that going down is going deeper into mathematics and domains that
 * don't build on one another stand side by side. An arrow that skips rows passes each row
 * between at a point of its own, set into the row like a very narrow card, so it runs down a gap
 * between the cards rather than behind one. An open domain's frame floats out to the right of
 * all the cards, level with its row; frames out of one row stand side by side, the rightmost card's first,
 * so that the page stays wide. A row is as tall as its cards, or as
 * the tallest frame beside it.
 * slot: {w, h}, the size of a domain's card; frames: domain → {w, h} of its open frame.
 * Returns { places: id → card box, frames: domain → frame box, routes: edge key → { upper,
 * lower, pass: [{x, y0, y1}], back }, width, height }. An arrow runs from the bottom of its upper
 * card to the top of its lower one, straight down through each passing point from y0 to y1;
 * `back` marks one that points up, closing a loop.
 */
function layoutDomains(root, slot, frames) {
  const kids = root.children
  const n = kids.length
  const at = new Map(kids.map((k, i) => [k, i]))
  const edges = root.localEdges.map(e => ({ e, a: at.get(e.from), b: at.get(e.to), w: e.weight }))

  // 1. Rows: each domain one below the furthest it builds on.
  const rank = linearOrder(n, edges)
  const preds = Array.from({ length: n }, () => [])
  for (const t of edges) {
    [t.upper, t.lower] = rank[t.a] < rank[t.b] ? [t.a, t.b] : [t.b, t.a]
    preds[t.lower].push(t.upper)
  }
  const row = new Array(n).fill(0)
  for (const v of [...Array(n).keys()].sort((p, q) => rank[p] - rank[q])) {
    for (const u of preds[v]) row[v] = Math.max(row[v], row[u] + 1)
  }
  const rows = n ? Math.max(...row) + 1 : 0

  // 2. The things in each row: its cards, and a passing point for each arrow that skips it.
  const items = kids.map((_, i) => ({ card: i, row: row[i] }))
  const above = items.map(() => [])
  const below = items.map(() => [])
  const join = (p, q, w) => { below[p].push({ v: q, w }); above[q].push({ v: p, w }) }
  for (const t of edges) {
    t.pass = []
    let prev = t.upper
    for (let r = row[t.upper] + 1; r < row[t.lower]; r++) {
      const i = items.push({ row: r }) - 1
      above.push([])
      below.push([])
      t.pass.push(i)
      join(prev, i, t.w)
      prev = i
    }
    join(prev, t.lower, t.w)
  }
  const isCard = i => items[i].card !== undefined

  // 3. Order each row to uncross the arrows: by the weighted average place of what each thing
  // connects to, sweeping down and up a few times; ties keep the order of index.md.
  const layers = Array.from({ length: rows }, () => [])
  items.forEach((it, i) => layers[it.row].push(i))
  const pos = new Array(items.length)
  layers.forEach(list => list.forEach((i, j) => { pos[i] = (j + 0.5) / list.length }))
  const sortBy = (list, nbrs) => {
    const key = new Map(list.map(i => {
      const total = nbrs[i].reduce((s, t) => s + t.w, 0)
      return [i, total ? nbrs[i].reduce((s, t) => s + pos[t.v] * t.w, 0) / total : pos[i]]
    }))
    list.sort((p, q) => key.get(p) - key.get(q) || pos[p] - pos[q])
    list.forEach((i, j) => { pos[i] = (j + 0.5) / list.length })
  }
  for (let sweep = 0; sweep < 4; sweep++) {
    for (let r = 1; r < rows; r++) sortBy(layers[r], above)
    for (let r = rows - 2; r >= 0; r--) sortBy(layers[r], below)
  }

  // 4. Across: each row's cards and passing points side by side, each then nudged toward what it
  // connects to, as close as the things beside it allow (as in placeLayered).
  const breadth = i => (isCard(i) ? slot.w : 0)
  const between = (p, q) => (isCard(p) && isCard(q) ? DOMAINS.card : DOMAINS.pass)
  const px = new Array(items.length)
  for (const list of layers) {
    let cx = 0
    list.forEach((i, j) => {
      if (j) cx += between(list[j - 1], i)
      px[i] = cx
      cx += breadth(i)
    })
    for (const i of list) px[i] -= cx / 2
  }
  const middle = i => px[i] + breadth(i) / 2
  const settle = (list, nbrs) => {
    const want = list.map(i => {
      const total = nbrs[i].reduce((s, t) => s + t.w, 0)
      return total ? nbrs[i].reduce((s, t) => s + middle(t.v) * t.w, 0) / total - breadth(i) / 2 : px[i]
    })
    stackNear(list, want, px, breadth, between)
  }
  for (let pass = 0; pass < 4; pass++) {
    for (const list of layers) settle(list, above)
    for (const list of [...layers].reverse()) settle(list, below)
  }
  for (const list of layers) settle(list, above)
  const lo = Math.min(...items.map((_, i) => px[i]))
  const right = Math.max(...items.map((_, i) => px[i] + breadth(i))) - lo
  for (let i = 0; i < items.length; i++) px[i] -= lo

  // 5. Down: each row as tall as its cards, or as the frames floating out beside it, side by side.
  const fx = right + DOMAINS.float
  const places = new Map()
  const boxes = new Map()
  const top = []
  const tall = []
  let y = 0
  for (let r = 0; r < rows; r++) {
    const cards = layers[r].filter(isCard)
    let cx = fx
    let high = slot.h
    for (const i of [...cards].reverse()) {
      const k = kids[items[i].card]
      const f = frames.get(k)
      if (!f) continue
      boxes.set(k, { x: cx, y, w: f.w, h: f.h })
      cx += f.w + DOMAINS.stack
      high = Math.max(high, f.h)
    }
    for (const i of cards) places.set(kids[items[i].card].id, { x: px[i], y, w: slot.w, h: slot.h })
    top.push(y)
    tall.push(high)
    y += tall[r] + DOMAINS.gap
  }
  const routes = new Map(edges.map(t => [t.e.key, {
    upper: kids[t.upper],
    lower: kids[t.lower],
    pass: t.pass.map(i => ({ x: px[i], y0: top[items[i].row], y1: top[items[i].row] + tall[items[i].row] })),
    back: !t.e.twin && t.upper !== t.a,
  }]))
  const width = Math.max(right, ...[...boxes.values()].map(b => b.x + b.w))
  return { places, frames: boxes, routes, width, height: rows ? y - DOMAINS.gap : 0 }
}

// How many columns, or cards to a row, keep n boxes about as wide as a screen.
const columnCount = n => Math.max(1, Math.round(Math.sqrt(n * COLUMN_ASPECT)))

// Lays boxes out in columns across the page, as text fills a newspaper, so that what they hold
// spreads wide rather than tall. Each box, in the order written, goes to the column holding the
// fewest concepts so far. That is reckoned from what the boxes hold, never from their sizes, so
// a box always keeps its column: opening one moves only what is below it, or in columns to its right.
function placeColumns(size, weight) {
  const n = size.length
  const load = new Array(columnCount(n)).fill(0)
  const columns = load.map(() => [])
  size.forEach((_, k) => {
    const c = load.indexOf(Math.min(...load))
    load[c] += weight[k]
    columns[c].push(k)
  })
  const x = new Array(n)
  const y = new Array(n)
  let cx = 0
  let h = 0
  for (const column of columns) {
    if (!column.length) continue
    let cy = 0
    for (const k of column) {
      x[k] = cx
      y[k] = cy
      cy += size[k].h + COLUMN_GAP
    }
    h = Math.max(h, cy - COLUMN_GAP)
    cx += Math.max(...column.map(k => size[k].w)) + COLUMN_GAP
  }
  return { x, y, w: cx - COLUMN_GAP, h }
}

// Lays out boxes of the given sizes, with weighted arrows a → b between them, flowing `dir`.
// `rows`, if given, says which layer each box starts in, for boxes with no arrows to place them.
// Positions are worked out as u (along the flow) and v (across it), then turned into x and y.
function placeLayered(size, edges, dir, wrap = 0, rows = null) {
  const n = size.length
  if (!n) return { x: [], y: [], w: 0, h: 0 }
  const across = dir === 'right'
  const length = k => (across ? size[k].w : size[k].h) // along the flow
  const breadth = k => (across ? size[k].h : size[k].w) // across the flow
  const gap = GAP[dir]

  // A two-way arrow counts as one from its first end to its second, like any other (see
  // markIntertwined in model.js), so two boxes that build on each other follow one another.
  const arrows = edges

  // 1. Turn the few arrows that close a loop around (the lightest ones), so every arrow points one way.
  const rank = linearOrder(n, arrows)
  const preds = Array.from({ length: n }, () => [])
  const succs = Array.from({ length: n }, () => [])
  for (const e of arrows) {
    if (e.a === e.b) continue
    const [a, b] = rank[e.a] < rank[e.b] ? [e.a, e.b] : [e.b, e.a]
    preds[b].push({ v: a, w: e.w })
    succs[a].push({ v: b, w: e.w })
  }
  const topo = [...Array(n).keys()].sort((p, q) => rank[p] - rank[q])

  // 2. Layers: each box goes one layer after its furthest prerequisite...
  const layer = rows ? [...rows] : new Array(n).fill(0)
  for (const v of topo) for (const { v: u } of preds[v]) layer[v] = Math.max(layer[v], layer[u] + 1)
  // ...then boxes with more arrows out than in slide forward, toward what they lead to.
  for (const v of [...topo].reverse()) {
    if (!succs[v].length || succs[v].length <= preds[v].length) continue
    layer[v] = Math.min(...succs[v].map(s => layer[s.v])) - 1
  }
  const used = [...new Set(layer)].sort((p, q) => p - q)
  // A long chain would run out in one thin line: it takes balanced rows instead, in the order written.
  if (across && !wrap && !rows && used.length > columnCount(n)) {
    return { ...placeLayered(size, [], 'down', columnCount(n), new Array(n).fill(0)), balanced: true }
  }
  const compact = new Map(used.map((l, i) => [l, i]))
  const layers = used.map(() => [])
  for (let v = 0; v < n; v++) layers[compact.get(layer[v])].push(v)

  // 3. Order each layer to uncross the arrows: sort by the average position of neighbours, sweeping both ways.
  const position = new Array(n)
  layers.forEach(list => list.forEach((v, i) => { position[v] = (i + 0.5) / list.length }))
  const sortBy = (list, nbrs) => {
    const key = new Map(list.map(v => {
      const ns = nbrs[v]
      const total = ns.reduce((s, x) => s + x.w, 0)
      return [v, ns.length ? ns.reduce((s, x) => s + position[x.v] * x.w, 0) / total : position[v]]
    }))
    list.sort((p, q) => key.get(p) - key.get(q) || position[p] - position[q])
    list.forEach((v, i) => { position[v] = (i + 0.5) / list.length })
  }
  for (let sweep = 0; sweep < 4; sweep++) {
    for (let l = 1; l < layers.length; l++) sortBy(layers[l], preds)
    for (let l = layers.length - 2; l >= 0; l--) sortBy(layers[l], succs)
  }

  // 4. Wrap crowded layers: a topic of twelve unconnected axioms becomes a grid, not a tower.
  // How is worked out from the number of boxes alone, never their sizes, so that opening one
  // leaves every other where it was: what grows only pushes what comes after it.
  const unit = across ? NOMINAL.h : NOMINAL.w
  const stack = list => list.reduce((s, k, i) => s + breadth(k) + (i ? gap.card : 0), 0)
  const area = n * (NOMINAL.w + gap.wrap) * (NOMINAL.h + gap.card)
  const limit = Math.max(across ? Math.sqrt(area / ASPECT_ACROSS) : Math.sqrt(area * ASPECT), unit)
  const lanes = [] // a layer's boxes, split into one or more lanes side by side
  layers.forEach((list, l) => {
    // A topic's "wrap: n" fixes the length of a line, keeping its authors' order (CANI / CANI / D).
    const parts = Math.max(1, Math.round(list.length * (unit + gap.card) / limit))
    const line = wrap || Math.ceil(list.length / parts)
    for (let i = 0; i < list.length; i += line) lanes.push({ layer: l, nodes: list.slice(i, i + line) })
  })

  // 5. Coordinates: lanes one after another along the flow, and the boxes of each from its start.
  // Nothing is centred, so a box that grows moves only what lies after it.
  const u = new Array(n)
  const v = new Array(n)
  let cu = 0
  lanes.forEach((lane, i) => {
    if (i) cu += lanes[i - 1].layer === lane.layer ? gap.wrap : gap.layer
    let cv = 0
    lane.nodes.forEach((k, j) => {
      if (j) cv += gap.card
      u[k] = cu
      v[k] = cv
      cv += breadth(k)
    })
    cu += Math.max(...lane.nodes.map(length))
  })

  const hi = Math.max(...v.map((t, k) => t + breadth(k)))
  return across ? { x: u, y: v, w: cu, h: hi } : { x: v, y: u, w: hi, h: cu }
}

// Places a lane's boxes, in order and without overlap, as close as possible to where
// each wants to be (least squares, solved exactly by pooling adjacent violators).
function stackNear(nodes, want, v, breadth, between) {
  const offset = []
  let o = 0
  nodes.forEach((k, i) => {
    if (i) o += breadth(nodes[i - 1]) + between(nodes[i - 1], k)
    offset.push(o)
  })
  const blocks = []
  nodes.forEach((k, i) => {
    let b = { start: i, end: i, sum: want[i] - offset[i], count: 1 }
    while (blocks.length && blocks.at(-1).sum / blocks.at(-1).count > b.sum / b.count) {
      const prev = blocks.pop()
      b = { start: prev.start, end: b.end, sum: prev.sum + b.sum, count: prev.count + b.count }
    }
    blocks.push(b)
  })
  for (const b of blocks) for (let i = b.start; i <= b.end; i++) v[nodes[i]] = b.sum / b.count + offset[i]
}

// A linear order that puts as much arrow weight as possible pointing forward
// (the greedy heuristic of Eades, Lin and Smyth). Ties keep the authors' order.
function linearOrder(n, edges) {
  const out = Array.from({ length: n }, () => new Map())
  const inn = Array.from({ length: n }, () => new Map())
  for (const e of edges) {
    if (e.a === e.b) continue
    out[e.a].set(e.b, (out[e.a].get(e.b) ?? 0) + e.w)
    inn[e.b].set(e.a, (inn[e.b].get(e.a) ?? 0) + e.w)
  }
  const alive = new Set(Array.from({ length: n }, (_, i) => i))
  const weight = (m, v) => { let s = 0; for (const [u, w] of m[v]) if (alive.has(u)) s += w; return s }
  const front = []
  const back = []
  while (alive.size) {
    let changed = true
    while (changed) {
      changed = false
      for (const v of [...alive]) if (!weight(out, v)) { back.unshift(v); alive.delete(v); changed = true }
      for (const v of [...alive]) if (!weight(inn, v)) { front.push(v); alive.delete(v); changed = true }
    }
    if (!alive.size) break
    let best = -1
    let bestScore = -Infinity
    for (const v of alive) {
      const s = weight(out, v) - weight(inn, v)
      if (s > bestScore) { bestScore = s; best = v }
    }
    front.push(best)
    alive.delete(best)
  }
  const rank = new Array(n)
  ;[...front, ...back].forEach((v, i) => { rank[v] = i })
  return rank
}
