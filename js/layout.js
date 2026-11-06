// Where everything goes on the map.
//
// One rule, at every depth: going down the page is going deeper into mathematics. Each thing goes a
// level below the furthest of those beside it that it builds on, and a level keeps the order
// written. Nothing else decides where a box goes, so that how the page is organized says what
// comes before what.
//
// The domains make a small layered drawing of their own, in rows: each domain a row below the
// furthest of those it builds on, and domains that don't build on one another side by side, with
// lines between them running down the gaps. An open domain keeps its card in place and floats its
// frame out to the right of all the cards, level with its row, so the lines never cross a frame.
//
// Inside a domain there are no lines. Folders open wide, so they stand one under another, a level
// at a time, those of a level close together, and opening one moves only what is below it.
// Concepts are small, so they stand in rows, a row to each level, what stands together being at
// the same level, unless their topic is marked "rows: kinds". Each open folder lays out its own
// contents, inside out.
//
// How a row wraps depends only on how many boxes it holds, never on what is open. Boxes line up at
// the start of their rows, so whatever opens pushes only what lies after it, right and down.

export const FRAME_PAD = { top: 66, right: 22, bottom: 22, left: 22 }
/**
 * The domains' rows: between rows, from the cards to the frames that float out beside them,
 * between frames that float out of one row, between cards side by side, and between a line
 * passing a row and whatever is next to it.
 */
export const DOMAINS = { gap: 64, float: 72, stack: 30, card: 44, pass: 20 }
const SHEET = { gap: 52, card: 22, pass: 12 } // a sheet (see layoutSheet): between rows, cards, and a line and what it passes
const README_GAP = 22 // between an open topic's README and its contents
const GAP = { level: 44, wrap: 16, card: 14 } // between levels, the lines of a level that wraps, and boxes side by side
const ASPECT = 1.5 // a crowded level wraps until its folder is about this wide for its height
const NOMINAL = { w: 210, h: 68 } // what a box counts as when wrapping, open or not
const COLUMN_ASPECT = 1.6 // the more of this, the more columns a topic of topics gets
const FEW = 12 // a topic in rows by kind with no more cards than this runs on, without a row for each kind
// The rows of a topic marked "rows: kinds": what is proved, what is true of the thing, how it is written, what to do with it.
const KIND_ROW = { axiom: 0, theorem: 0, rule: 0, formula: 2, form: 2, skill: 3, technique: 3 }
const kindRow = n => KIND_ROW[n.kind] ?? 1

/**
 * root: the atlas root; isOpen(node); cardSize(node) → {w, h}, with `file: true` for an open
 * file (a domain's is the size of its card, open or not); headerWidth(node) → minimum frame
 * width; readmeSize(node, width) → {w, h} of an open topic's README at the width its frame has to
 * give, or null when it has none showing.
 * Returns absolute boxes {x, y, w, h} by node id (an open domain's is its frame), each domain
 * card's place by id (`spine`), the route of each line between domains by key (see layoutDomains),
 * and the overall size.
 */
export function computeLayout(root, isOpen, cardSize, headerWidth, readmeSize = () => null) {
  const rel = new Map()
  const notes = new Map() // open topic → the size of its README
  const open = n => n.children.length > 0 && isOpen(n)
  // An open topic's contents start under its head, and under its README when that is open.
  const top = n => {
    const r = notes.get(n)
    return FRAME_PAD.top + (r ? r.h + README_GAP : 0)
  }

  const measure = n => {
    if (!open(n)) return cardSize(n)
    const inner = arrange(n)
    const pad = FRAME_PAD.left + FRAME_PAD.right
    const wide = Math.max(inner.w + pad, headerWidth(n))
    // A README spans its frame, so it is sized after what the frame holds. It only widens a frame
    // too narrow to read it in.
    const r = readmeSize(n, wide - pad)
    if (r) notes.set(n, r)
    return { w: Math.max(wide, r ? r.w + pad : 0), h: inner.h + top(n) + FRAME_PAD.bottom, frame: true }
  }

  const arrange = container => {
    const kids = container.children
    const size = kids.map(measure)
    // Rows by kind leave the prerequisites out of it: the cards keep the order they are written in. A
    // small topic has too few of each kind to fill a row, so it runs on, in balanced rows.
    const bands = container.rowsByKind && kids.length > FEW
    const rows = container.rowsByKind ? kids.map(k => (bands ? kindRow(k) : 0)) : null
    const line = container.rowsByKind && !bands ? columnCount(kids.length) : container.wrap
    const level = rows ?? levelsOf(kids, container.localEdges)
    // A subject starts from its axioms, whatever they happen to build on.
    kids.forEach((k, i) => { if (k.children.length && k.title === 'Axioms') level[i] = -1 })
    // Folders open wide, so a folder of folders stands them one to a line.
    const pos = placeLevels(size, level, kids.some(k => k.children.length) ? 1 : line)
    kids.forEach((k, i) => rel.set(k, { x: pos.x[i], y: pos.y[i], w: size[i].w, h: size[i].h }))
    return { w: pos.w, h: pos.h }
  }

  // The domains: every card takes a place of one size, so that they stand on a grid.
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
 * The domains, as a small layered drawing (see drawRows). An open domain's frame floats out to
 * the right of all the cards, level with its row; frames out of one row stand side by side, the
 * rightmost card's first, so that the page stays wide. A row is as tall as its cards, or as the
 * tallest frame beside it.
 * slot: {w, h}, the size of a domain's card; frames: domain → {w, h} of its open frame.
 * Returns { places: id → card box, frames: domain → frame box, routes: edge key → { upper,
 * lower, pass: [{x, y0, y1}], back }, width, height }. A line runs from the bottom of its upper
 * card to the top of its lower one, straight down through each passing point from y0 to y1;
 * `back` marks one that points up, closing a loop.
 */
function layoutDomains(root, slot, frames) {
  const kids = root.children
  const { rows, items, layers, isCard, px, right, routes } = drawRows(kids, root.localEdges, slot.w, DOMAINS)

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
  const width = Math.max(right, ...[...boxes.values()].map(b => b.x + b.w))
  return { places, frames: boxes, routes: routes(top, tall), width, height: rows ? y - DOMAINS.gap : 0 }
}

/**
 * A sheet: the concepts that lead up to one concept, popped out of the map (see sheet.js). They
 * make a layered drawing, each row of cards resting on those above and the concept at
 * the bottom. Each card stands as low as it can, just above the first thing it leads to, so that
 * a foundation only one concept needs sits beside that concept and not at the top with the rest.
 * The cards' places are reckoned as if all were closed. A card that opens grows where it stands:
 * its row grows taller, and everything to the right of it, in every row, moves aside to clear
 * it, so that what opens pushes only right and down and the arrows stay in their gaps.
 * cardSize(node) → {w, h}, with `file: true` for an open file. Returns boxes by id, which stand
 * for the cards' places too, the routes of the arrows, and the overall size, inside a frame.
 */
export function layoutSheet(root, cardSize) {
  const kids = root.children
  const { items, layers, isCard, px, routes } = drawRows(kids, root.localEdges, NOMINAL.w, SHEET, true)
  const size = kids.map(cardSize)

  // Across: each place maps to one at least as far along. A grown card pushes what starts after
  // its closed right edge, so two grown cards one above the other share the room they make.
  const grown = size.flatMap((s, i) => (s.file ? [{ left: px[i], right: px[i] + NOMINAL.w, w: s.w }] : []))
  const marks = [...new Set(px)].sort((p, q) => p - q)
  const moved = new Map()
  marks.forEach((x, i) => {
    let to = i ? moved.get(marks[i - 1]) + x - marks[i - 1] : x
    for (const g of grown) if (g.right <= x) to = Math.max(to, moved.get(g.left) + g.w + x - g.right)
    moved.set(x, to)
  })
  px.forEach((x, i) => { px[i] = FRAME_PAD.left + moved.get(x) })

  // Down: each row as tall as its tallest card.
  const top = []
  const tall = []
  let y = FRAME_PAD.top
  for (const list of layers) {
    top.push(y)
    tall.push(Math.max(0, ...list.filter(isCard).map(i => size[i].h)))
    y += tall.at(-1) + SHEET.gap
  }
  const boxes = new Map(kids.map((k, i) => [k.id, { x: px[i], y: top[items[i].row], w: size[i].w, h: size[i].h }]))
  const right = Math.max(...[...boxes.values()].map(b => b.x + b.w))
  return { boxes, spine: boxes, routes: routes(top, tall), width: right + FRAME_PAD.right, height: y - SHEET.gap + FRAME_PAD.bottom }
}

/**
 * A small layered drawing of `kids`, across, which the domains and a sheet share. Each goes a row
 * below the furthest of those it builds on, after
 * the few arrows that close a loop are turned round, so that going down is going deeper into
 * mathematics and those that don't build on one another stand side by side. An arrow that skips
 * rows passes each row between at a point of its own, set into the row like a very narrow card,
 * so it runs down a gap between the cards rather than behind one.
 * cardWidth: how wide a card's place is; gaps: { card, pass }, as in DOMAINS; late: each then
 * slides down as far as it can, to stand just above the first thing it leads to.
 * Returns the rows and what is in them, each item's place `px` across, and `routes(top, tall)`,
 * which gives the routes of the arrows once the rows' tops and heights are known. The first
 * items are the cards, in the order of `kids`.
 */
function drawRows(kids, localEdges, cardWidth, gaps, late = false) {
  const n = kids.length
  const at = new Map(kids.map((k, i) => [k, i]))
  const edges = localEdges.map(e => ({ e, a: at.get(e.from), b: at.get(e.to), w: e.weight }))

  // 1. Rows: each one below the furthest it builds on.
  const rank = linearOrder(n, edges)
  const preds = Array.from({ length: n }, () => [])
  const succs = Array.from({ length: n }, () => [])
  for (const t of edges) {
    [t.upper, t.lower] = rank[t.a] < rank[t.b] ? [t.a, t.b] : [t.b, t.a]
    preds[t.lower].push(t.upper)
    succs[t.upper].push(t.lower)
  }
  const row = new Array(n).fill(0)
  const order = [...Array(n).keys()].sort((p, q) => rank[p] - rank[q])
  for (const v of order) {
    for (const u of preds[v]) row[v] = Math.max(row[v], row[u] + 1)
  }
  if (late) {
    for (const v of order.reverse()) {
      if (succs[v].length) row[v] = Math.min(...succs[v].map(s => row[s])) - 1
    }
  }
  const rows = n ? Math.max(...row) + 1 : 0

  // A line that another way down already implies says nothing: Arithmetic leads to Algebra, and
  // Algebra to Trigonometry, so Arithmetic has no line of its own to Trigonometry. Taking these out
  // leaves every row as it was, as a row is set by the longest way down.
  const reach = kids.map(() => new Set())
  for (const v of [...Array(n).keys()].sort((p, q) => rank[q] - rank[p])) {
    for (const s of succs[v]) {
      reach[v].add(s)
      for (const r of reach[s]) reach[v].add(r)
    }
  }
  const lines = edges.filter(t => !succs[t.upper].some(s => s !== t.lower && reach[s].has(t.lower)))

  // 2. The things in each row: its cards, and a passing point for each line that skips it.
  const items = kids.map((_, i) => ({ card: i, row: row[i] }))
  const above = items.map(() => [])
  const below = items.map(() => [])
  const join = (p, q, w) => { below[p].push({ v: q, w }); above[q].push({ v: p, w }) }
  for (const t of lines) {
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
  // connects to, as close as the things beside it allow.
  const breadth = i => (isCard(i) ? cardWidth : 0)
  const between = (p, q) => (isCard(p) && isCard(q) ? gaps.card : gaps.pass)
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

  const routes = (top, tall) => new Map(lines.map(t => [t.e.key, {
    upper: kids[t.upper],
    lower: kids[t.lower],
    pass: t.pass.map(i => ({ x: px[i], y0: top[items[i].row], y1: top[items[i].row] + tall[items[i].row] })),
    back: !t.e.twin && t.upper !== t.a,
  }]))
  return { rows, items, layers, isCard, px, right, routes }
}

// How many boxes to a row keep n of them about as wide as a screen.
const columnCount = n => Math.max(1, Math.round(Math.sqrt(n * COLUMN_ASPECT)))

/**
 * Each child's level: one below the furthest of its siblings that it builds on. The few links that
 * close a loop between topics are turned round first, so that every link points one way. A two-way
 * link counts as one from its first end to its second (see markIntertwined in model.js).
 */
function levelsOf(kids, links) {
  const at = new Map(kids.map((k, i) => [k, i]))
  const edges = links.map(e => ({ a: at.get(e.from), b: at.get(e.to), w: e.weight })).filter(e => e.a !== e.b)
  const rank = linearOrder(kids.length, edges)
  const before = kids.map(() => [])
  for (const e of edges) (rank[e.a] < rank[e.b] ? before[e.b] : before[e.a]).push(rank[e.a] < rank[e.b] ? e.a : e.b)
  const level = kids.map(() => 0)
  for (const v of [...kids.keys()].sort((p, q) => rank[p] - rank[q])) {
    for (const u of before[v]) level[v] = Math.max(level[v], level[u] + 1)
  }
  return level
}

/**
 * Lays out boxes of the given sizes in rows, a level at a time, each keeping the order written.
 * Levels stand further apart than the lines of one that wraps, so that what belongs together looks
 * it. A crowded level wraps, by the number of boxes alone, so that opening one leaves every other
 * where it was, or `wrap` boxes to a line. Nothing is centred: what grows moves only what lies
 * after it.
 */
function placeLevels(size, level, wrap) {
  const n = size.length
  if (!n) return { x: [], y: [], w: 0, h: 0 }
  const limit = Math.max(Math.sqrt(n * (NOMINAL.w + GAP.wrap) * (NOMINAL.h + GAP.card) * ASPECT), NOMINAL.w)
  const lanes = []
  for (const l of [...new Set(level)].sort((p, q) => p - q)) {
    const list = [...size.keys()].filter(k => level[k] === l)
    const parts = Math.max(1, Math.round((list.length * (NOMINAL.w + GAP.card)) / limit))
    const line = wrap || Math.ceil(list.length / parts)
    for (let i = 0; i < list.length; i += line) lanes.push({ level: l, boxes: list.slice(i, i + line) })
  }
  const x = new Array(n)
  const y = new Array(n)
  let top = 0
  let w = 0
  lanes.forEach((lane, i) => {
    if (i) top += lanes[i - 1].level === lane.level ? GAP.wrap : GAP.level
    let left = 0
    lane.boxes.forEach((k, j) => {
      if (j) left += GAP.card
      x[k] = left
      y[k] = top
      left += size[k].w
    })
    w = Math.max(w, left)
    top += Math.max(...lane.boxes.map(k => size[k].h))
  })
  return { x, y, w, h: top }
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
