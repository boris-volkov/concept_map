// Where everything goes on the map.
//
// The domains make a small layered drawing of their own, in rows: each domain a row
// below the furthest of those it builds on, so that going down the map is going
// deeper into mathematics, and domains that don't build on one another side by side.
// An open domain keeps its card in place and floats its frame out to the right of all
// the cards, level with its row, so the arrows between domains never cross a frame.
//
// Inside a domain, each open topic lays out its own children, inside out, as a
// layered (or "Sugiyama") drawing: prerequisites first, what builds on them after.
// The flow alternates with depth: each domain's topics run down, each topic's
// concepts run across, and so on.
//
// The order of a topic's children depends only on the arrows among them, not on
// what else is open, so opening a topic makes room for it without reshuffling
// the rest of the map.

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
const GAP_FRAME = 26 // beside an open topic or an open file
const ASPECT = 1.5 // a crowded layer wraps until its topic is about this wide for its height
const TALL = 1600 // a column of boxes taller than this, as one of open files soon is, wraps into another beside it

/** Which way a topic's contents flow, by its depth: domains (0) down, topics (1) across… (the domains themselves: see layoutDomains). */
export const direction = depth => (depth % 2 === 0 ? 'down' : 'right')

/** The way a topic's contents flow: its own "flow:" if it has one, otherwise by depth. */
export const flowOf = node => node.flow ?? direction(node.depth)

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

  // A frame wider than what it holds, for its title or its README, centres what it holds.
  const indent = new Map()
  const measure = n => {
    if (!open(n)) return cardSize(n)
    const inner = arrange(n)
    const r = readmeSize(n)
    const w = Math.max(inner.w + FRAME_PAD.left + FRAME_PAD.right, headerWidth(n), r ? r.w + FRAME_PAD.left + FRAME_PAD.right : 0)
    indent.set(n, (w - inner.w - FRAME_PAD.left - FRAME_PAD.right) / 2)
    return { w, h: inner.h + top(n) + FRAME_PAD.bottom, frame: true }
  }

  const arrange = container => {
    const kids = container.children
    const size = kids.map(measure)
    const at = new Map(kids.map((k, i) => [k, i]))
    const edges = container.localEdges.map(e => ({ a: at.get(e.from), b: at.get(e.to), w: e.weight, twin: e.twin }))
    const pos = placeLayered(size, edges, flowOf(container), container.wrap)
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
      if (open(k)) place(k, box.x + FRAME_PAD.left + indent.get(k), box.y + top(k))
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
 * all the cards, level with its row; frames out of one row stack, the rightmost card's first,
 * so the lines that tie them to their cards don't cross. A row is as tall as its cards, or as
 * the frames beside it.
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
  // connects to, sweeping down and up a few times; ties keep the order of index.md. An open
  // domain's card goes to the end of its row, next to the frames, so the line tying it to its
  // frame passes nothing on the way.
  const layers = Array.from({ length: rows }, () => [])
  items.forEach((it, i) => layers[it.row].push(i))
  const pos = new Array(items.length)
  layers.forEach(list => list.forEach((i, j) => { pos[i] = (j + 0.5) / list.length }))
  const last = i => isCard(i) && frames.has(kids[items[i].card])
  const sortBy = (list, nbrs) => {
    const key = new Map(list.map(i => {
      const total = nbrs[i].reduce((s, t) => s + t.w, 0)
      return [i, total ? nbrs[i].reduce((s, t) => s + pos[t.v] * t.w, 0) / total : pos[i]]
    }))
    list.sort((p, q) => last(p) - last(q) || key.get(p) - key.get(q) || pos[p] - pos[q])
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

  // 5. Down: each row as tall as its cards, or as the frames floating out beside it, stacked.
  const fx = right + DOMAINS.float
  const places = new Map()
  const boxes = new Map()
  const top = []
  const tall = []
  let y = 0
  for (let r = 0; r < rows; r++) {
    const cards = layers[r].filter(isCard)
    let fy = y
    for (const i of [...cards].reverse()) {
      const k = kids[items[i].card]
      const f = frames.get(k)
      if (!f) continue
      boxes.set(k, { x: fx, y: fy, w: f.w, h: f.h })
      fy += f.h + DOMAINS.stack
    }
    for (const i of cards) places.set(kids[items[i].card].id, { x: px[i], y, w: slot.w, h: slot.h })
    top.push(y)
    tall.push(Math.max(slot.h, fy - DOMAINS.stack - y))
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

// Lays out boxes of the given sizes, with weighted arrows a → b between them, flowing `dir`.
// Positions are worked out as u (along the flow) and v (across it), then turned into x and y.
function placeLayered(size, edges, dir, wrap = 0) {
  const n = size.length
  if (!n) return { x: [], y: [], w: 0, h: 0 }
  const across = dir === 'right'
  const length = k => (across ? size[k].w : size[k].h) // along the flow
  const breadth = k => (across ? size[k].h : size[k].w) // across the flow
  const gap = GAP[dir]
  const big = k => size[k].frame || size[k].file
  const between = (p, q) => (big(p) || big(q) ? GAP_FRAME : gap.card)

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
  const layer = new Array(n).fill(0)
  for (const v of topo) for (const { v: u } of preds[v]) layer[v] = Math.max(layer[v], layer[u] + 1)
  // ...then boxes with more arrows out than in slide forward, toward what they lead to.
  for (const v of [...topo].reverse()) {
    if (!succs[v].length || succs[v].length <= preds[v].length) continue
    layer[v] = Math.min(...succs[v].map(s => layer[s.v])) - 1
  }
  const used = [...new Set(layer)].sort((p, q) => p - q)
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
  const stack = list => list.reduce((s, v, i) => s + breadth(v) + (i ? between(list[i - 1], v) : 0), 0)
  const area = size.reduce((s, z) => s + (z.w + gap.wrap) * (z.h + gap.card), 0)
  const limit = Math.max(across ? Math.sqrt(area / ASPECT) : Math.sqrt(area * ASPECT), ...size.map((_, k) => breadth(k)))
  // Splits boxes, in order, into `parts` lanes of about equal length.
  const split = (list, parts) => {
    const share = stack(list) / parts
    const out = []
    let lane = []
    for (const v of list) {
      if (lane.length && out.length < parts - 1 && stack([...lane, v]) > share * 1.08) {
        out.push(lane)
        lane = []
      }
      lane.push(v)
    }
    out.push(lane)
    return out
  }
  const lanes = [] // a layer's boxes, split into one or more lanes side by side
  layers.forEach((list, l) => {
    // A topic's "wrap: n" fixes the length of a line, keeping its authors' order (CANI / CANI / D).
    const lines = []
    if (wrap) for (let i = 0; i < list.length; i += wrap) lines.push(list.slice(i, i + wrap))
    else lines.push(...split(list, Math.max(1, Math.round(stack(list) / limit))))
    // A line down the page that has grown too tall, as a column of open files soon does, wraps
    // again into columns side by side, still in order. Lines across the page are left to use the width.
    for (const line of lines) {
      const parts = across ? Math.ceil(stack(line) / TALL) : 1
      for (const nodes of parts > 1 ? split(line, parts) : [line]) lanes.push({ layer: l, nodes })
    }
  })

  // 5. Coordinates: lanes one after another along the flow, the boxes of each lined up at its
  // start, so that a card beside an open frame stays level with the frame's head and the arrows
  // into a lane all arrive at one line; each box then nudged toward the boxes it connects to.
  const u = new Array(n)
  const v = new Array(n)
  let cu = 0
  lanes.forEach((lane, i) => {
    if (i) cu += lanes[i - 1].layer === lane.layer ? gap.wrap : gap.layer
    const extent = Math.max(...lane.nodes.map(length))
    for (const k of lane.nodes) u[k] = cu
    cu += extent
    let cv = -stack(lane.nodes) / 2
    lane.nodes.forEach((k, j) => {
      if (j) cv += between(lane.nodes[j - 1], k)
      v[k] = cv
      cv += breadth(k)
    })
  })
  const middle = k => v[k] + breadth(k) / 2
  const settle = (lane, nbrs) => {
    const want = lane.nodes.map(k => {
      const ns = nbrs[k]
      if (!ns.length) return v[k]
      const total = ns.reduce((s, e) => s + e.w, 0)
      return ns.reduce((s, e) => s + middle(e.v) * e.w, 0) / total - breadth(k) / 2
    })
    stackNear(lane.nodes, want, v, breadth, between)
  }
  for (let pass = 0; pass < 3; pass++) {
    for (const lane of lanes) settle(lane, preds)
    for (const lane of [...lanes].reverse()) settle(lane, succs)
  }
  for (const lane of lanes) settle(lane, preds)

  const lo = Math.min(...v)
  const hi = Math.max(...v.map((t, k) => t + breadth(k)))
  for (let k = 0; k < n; k++) v[k] -= lo
  return across ? { x: u, y: v, w: cu, h: hi - lo } : { x: v, y: u, w: hi - lo, h: cu }
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
