// Where everything goes on the map.
//
// The domains stand in one column, the spine, prerequisites first, so that going
// down the map is going deeper into mathematics. An open domain keeps its card in
// the spine and floats its frame out to the right, in a row of its own; the arrows
// between domains run down the left of the spine, so they never cross a frame.
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
/** The spine: between its rows, between a card and the frame it floats out into, and the lanes of its arrows. */
export const SPINE = { gap: 30, float: 64, lane0: 26, lane: 14 }
const README_GAP = 22 // between an open topic's README and its contents
const GAP = {
  right: { layer: 78, wrap: 22, card: 14 }, // layer: between the columns an arrow runs across
  down: { layer: 58, wrap: 26, card: 18 },
}
const GAP_FRAME = 26 // beside an open topic or an open file
const ASPECT = 1.5 // a crowded layer wraps until its topic is about this wide for its height

/** Which way a topic's contents flow, by its depth: domains (0) down, topics (1) across… (the map itself is the spine). */
export const direction = depth => (depth % 2 === 0 ? 'down' : 'right')

/** The way a topic's contents flow: its own "flow:" if it has one, otherwise by depth. */
export const flowOf = node => node.flow ?? direction(node.depth)

/**
 * root: the atlas root; isOpen(node); cardSize(node) → {w, h}, with `file: true` for an open
 * file (a domain's is the size of its card, open or not); headerWidth(node) → minimum frame
 * width; readmeSize(node) → {w, h} of an open topic's README, or null when it has none showing.
 * Returns absolute boxes {x, y, w, h} by node id (an open domain's is its frame), each domain's
 * place in the spine by id, the domains in their order down it, and the overall size.
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
    return {
      w: Math.max(inner.w + FRAME_PAD.left + FRAME_PAD.right, headerWidth(n), r ? r.w + FRAME_PAD.left + FRAME_PAD.right : 0),
      h: inner.h + top(n) + FRAME_PAD.bottom,
      frame: true,
    }
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

  // The spine: every domain's card takes a place of one size, so the column is even, and an open
  // domain's frame sits to the right of its place, its row as tall as the frame.
  const order = spineOrder(root)
  const slot = {
    w: Math.max(0, ...order.map(k => cardSize(k).w)),
    h: Math.max(0, ...order.map(k => cardSize(k).h)),
  }
  const spine = new Map()
  let y = 0
  let width = slot.w
  for (const k of order) {
    const frame = open(k) ? measure(k) : null
    spine.set(k.id, { x: 0, y, w: slot.w, h: slot.h })
    rel.set(k, frame ? { x: slot.w + SPINE.float, y, w: frame.w, h: frame.h } : { x: 0, y, w: slot.w, h: slot.h })
    if (frame) width = Math.max(width, slot.w + SPINE.float + frame.w)
    y += Math.max(slot.h, frame ? frame.h : 0) + SPINE.gap
  }

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
  return { boxes, spine, order, width, height: Math.max(0, y - SPINE.gap) }
}

// The domains in an order that keeps every arrow between them pointing down: intertwined
// domains (each building on part of the other) side by side, and otherwise in the order the
// content files are listed in (Kahn's algorithm, taking the first listed of those ready).
function spineOrder(root) {
  const kids = root.children
  const at = new Map(kids.map((k, i) => [k, i]))
  const group = kids.map((_, i) => i)
  const find = v => (group[v] === v ? v : (group[v] = find(group[v])))
  for (const e of root.localEdges) if (e.twin) group[find(at.get(e.from))] = find(at.get(e.to))
  const groups = [...new Set(kids.map((_, i) => find(i)))]
  const next = new Map(groups.map(g => [g, new Set()]))
  const waits = new Map(groups.map(g => [g, 0]))
  for (const e of root.localEdges) {
    const a = find(at.get(e.from))
    const b = find(at.get(e.to))
    if (e.twin || a === b || next.get(a).has(b)) continue
    next.get(a).add(b)
    waits.set(b, waits.get(b) + 1)
  }
  const first = g => kids.findIndex((_, i) => find(i) === g)
  const ready = groups.filter(g => !waits.get(g))
  const out = []
  while (ready.length) {
    ready.sort((p, q) => first(p) - first(q))
    const g = ready.shift()
    out.push(...kids.filter((_, i) => find(i) === g))
    for (const h of next.get(g)) {
      waits.set(h, waits.get(h) - 1)
      if (!waits.get(h)) ready.push(h)
    }
  }
  return out.length === kids.length ? out : [...out, ...kids.filter(k => !out.includes(k))]
}

/**
 * The arrows between domains run down the left of the spine, each in a lane of its own, so none
 * crosses a card or a frame. A longer arrow takes a lane outside the shorter ones beside it, so
 * they nest like brackets. Along a card's left side, the arrows coming from above enter over
 * the ones leaving for below; arrows from nearer domains enter above those from further off, and
 * arrows to further domains leave above those to nearer ones, so that none crosses another
 * there either. Intertwined domains side by side are joined by a short link between them
 * instead (see map.js).
 * Returns { e, a, b, out, in, lane } for each arrow: a and b are the upper and lower places in
 * the spine, and out and in where along those cards it leaves and enters, as fractions of
 * their height.
 */
export function planSpine(order, edges) {
  const row = new Map(order.map((k, i) => [k, i]))
  const arcs = []
  for (const e of edges) {
    const [p, q] = [row.get(e.from), row.get(e.to)]
    if (p === undefined || q === undefined || (e.twin && Math.abs(p - q) === 1)) continue
    arcs.push({ e, a: Math.min(p, q), b: Math.max(p, q), out: 0.5, in: 0.5, lane: 0 })
  }
  const sides = order.map(() => [])
  for (const arc of arcs) {
    sides[arc.a].push({ arc, end: 'out', other: arc.b })
    sides[arc.b].push({ arc, end: 'in', other: arc.a })
  }
  sides.forEach((list, k) => {
    list.sort((p, q) => (p.other > k) - (q.other > k) || q.other - p.other)
    list.forEach((s, i) => { s.arc[s.end] = 0.2 + (0.6 * (i + 0.5)) / list.length })
  })
  const span = arc => [arc.a + arc.out, arc.b + arc.in]
  const placed = []
  for (const arc of [...arcs].sort((p, q) => span(p)[1] - span(p)[0] - (span(q)[1] - span(q)[0]))) {
    const [s, t] = span(arc)
    for (const o of placed) {
      const [s2, t2] = span(o)
      if (s < t2 && s2 < t) arc.lane = Math.max(arc.lane, o.lane + 1)
    }
    placed.push(arc)
  }
  return arcs
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

  // Intertwined boxes (a two-way link) go in the same layer, side by side: union them into groups.
  const group = Array.from({ length: n }, (_, i) => i)
  const find = v => (group[v] === v ? v : (group[v] = find(group[v])))
  for (const e of edges) if (e.twin) group[find(e.a)] = find(e.b)
  const arrows = edges.filter(e => !e.twin)

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
  // ...and an intertwined group shares one layer, its latest member's, with what follows pushed on.
  for (let changed = true; changed;) {
    changed = false
    const latest = new Map()
    for (let v = 0; v < n; v++) latest.set(find(v), Math.max(latest.get(find(v)) ?? 0, layer[v]))
    for (let v = 0; v < n; v++) {
      if (layer[v] !== latest.get(find(v))) { layer[v] = latest.get(find(v)); changed = true }
      for (const { v: u } of preds[v]) if (layer[v] <= layer[u]) { layer[v] = layer[u] + 1; changed = true }
    }
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
    // Intertwined boxes share their average key, so they stay next to each other.
    const mean = new Map()
    for (const v of list) {
      const m = mean.get(find(v)) ?? { sum: 0, count: 0 }
      m.sum += key.get(v)
      m.count++
      mean.set(find(v), m)
    }
    for (const v of list) key.set(v, mean.get(find(v)).sum / mean.get(find(v)).count)
    list.sort((p, q) => key.get(p) - key.get(q) || find(p) - find(q) || position[p] - position[q])
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
  const lanes = [] // a layer's boxes, split into one or more lanes side by side
  layers.forEach((list, l) => {
    // A topic's "wrap: n" fixes the length of a line, keeping its authors' order (CANI / CANI / D).
    const parts = wrap ? Math.ceil(list.length / wrap) : Math.max(1, Math.round(stack(list) / limit))
    const share = stack(list) / parts
    let lane = []
    let made = 0
    for (const v of list) {
      const full = wrap ? lane.length >= wrap : stack([...lane, v]) > share * 1.08
      if (lane.length && made < parts - 1 && full) {
        lanes.push({ layer: l, nodes: lane })
        lane = []
        made++
      }
      lane.push(v)
    }
    lanes.push({ layer: l, nodes: lane })
  })

  // 5. Coordinates: lanes one after another along the flow; each box then nudged toward the boxes it connects to.
  const u = new Array(n)
  const v = new Array(n)
  let cu = 0
  lanes.forEach((lane, i) => {
    if (i) cu += lanes[i - 1].layer === lane.layer ? gap.wrap : gap.layer
    const extent = Math.max(...lane.nodes.map(length))
    for (const k of lane.nodes) u[k] = cu + (extent - length(k)) / 2
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
