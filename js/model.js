// Questions about the concept graph: what contains what, what needs what, and
// which arrows to draw for the topics that are currently open.
//
// "Needs" has three sources: a concept's own prereqs, everything inside a topic
// (knowing Fractions means knowing what's in it), and the prereqs written on the
// topics around a concept (a prereq on Calculus applies to everything inside it).

export function ancestors(n) {
  const out = []
  for (let p = n.parent; p; p = p.parent) out.push(p)
  return out
}

export function isAncestor(a, n) {
  for (let p = n.parent; p; p = p.parent) if (p === a) return true
  return false
}

export function descendants(n, out = []) {
  for (const c of n.children) { out.push(c); descendants(c, out) }
  return out
}

export const leaves = n => (n.children.length ? descendants(n).filter(d => !d.children.length) : [n])

/** The top-level domain a node belongs to. */
export const domainOf = n => ancestors(n).at(-1) ?? n

/** Precomputes what the map needs; called once per load by buildAtlas. */
export function prepare(atlas) {
  const all = [...atlas.nodes.values()]
  for (const n of all) {
    n.requires = [...n.prereqs, ...n.children]
    for (const a of ancestors(n)) n.requires.push(...a.prereqs)
    n.requiredBy = []
  }
  for (const n of all) for (const r of n.requires) r.requiredBy.push(n)

  // The most direct prerequisites: those not already reached through another one. "Addition"
  // lists Counting and Place Value, but Place Value rests on Counting, so only the arrow from
  // Place Value is drawn. The full chain is unchanged; only the arrows are fewer.
  const reach = new Map()
  const reachOf = n => {
    let out = reach.get(n)
    if (out) return out
    out = new Set()
    reach.set(n, out)
    const todo = [...n.requires]
    while (todo.length) {
      const r = todo.pop()
      if (out.has(r)) continue
      out.add(r)
      todo.push(...r.requires)
    }
    return out
  }
  for (const n of all) {
    n.directPrereqs = n.prereqs.filter(p => !n.prereqs.some(q => q !== p && reachOf(q).has(p)))
    n.directDependents = []
  }
  for (const n of all) for (const p of n.directPrereqs) p.directDependents.push(n)

  // Each topic's prerequisite arrows, lifted to the children of the topic they run within:
  // LCM → Adding Fractions, inside Arithmetic, becomes Factors & Multiples → Fractions. The
  // layout orders a topic's children by these, and these are the arrows the map draws.
  for (const n of [atlas.root, ...all]) n.localEdges = new Map()
  for (const c of all) {
    for (const p of c.directPrereqs) {
      const lifted = liftToSiblings(p, c, atlas.root)
      if (!lifted) continue
      const [from, to, within] = lifted
      const key = from.id + '>' + to.id
      const e = within.localEdges.get(key) ?? { key, from, to, within: within.isRoot ? null : within, weight: 0, pairs: [] }
      e.weight++
      e.pairs.push([p, c])
      within.localEdges.set(key, e)
    }
  }
  for (const n of [atlas.root, ...all]) n.localEdges = [...n.localEdges.values()]
  for (const n of all) n.twins = []
  for (const n of [atlas.root, ...all]) markIntertwined(n)

  findLoops(atlas)
}

// Concepts never form a loop (findLoops reports one as an error), but topics can: Polynomials
// builds on Complex Numbers (the Fundamental Theorem of Algebra) and Complex Numbers on
// Polynomials (multiplying them). Topics that build on each other, directly or around a cycle,
// are intertwined: their arrows merge into one two-way link, and the layout keeps them together.
function markIntertwined(container) {
  const kids = container.children
  if (kids.length < 2) return
  const index = new Map(kids.map((k, i) => [k, i]))
  const out = kids.map(() => [])
  for (const e of container.localEdges) out[index.get(e.from)].push(index.get(e.to))
  const comp = components(out)
  for (const k of kids) k.twins = kids.filter(o => o !== k && comp[index.get(o)] === comp[index.get(k)])
  const merged = new Map()
  const edges = []
  for (const e of container.localEdges) {
    if (comp[index.get(e.from)] !== comp[index.get(e.to)]) { edges.push(e); continue }
    const [a, b] = index.get(e.from) < index.get(e.to) ? [e.from, e.to] : [e.to, e.from]
    const key = `${a.id}<>${b.id}`
    let t = merged.get(key)
    if (!t) {
      merged.set(key, (t = { key, from: a, to: b, within: e.within, weight: 0, pairs: [], twin: true }))
      edges.push(t)
    }
    t.weight += e.weight
    t.pairs.push(...e.pairs)
  }
  container.localEdges = edges
}

// Strongly connected components (Tarjan): comp[v] is the same for nodes that can reach each other.
function components(out) {
  const n = out.length
  const comp = new Array(n).fill(-1)
  const low = new Array(n)
  const num = new Array(n).fill(-1)
  const stack = []
  let counter = 0
  let found = 0
  const visit = v => {
    num[v] = low[v] = counter++
    stack.push(v)
    for (const w of out[v]) {
      if (num[w] === -1) { visit(w); low[v] = Math.min(low[v], low[w]) }
      else if (comp[w] === -1) low[v] = Math.min(low[v], num[w])
    }
    if (low[v] !== num[v]) return
    let w
    do { w = stack.pop(); comp[w] = found } while (w !== v)
    found++
  }
  for (let v = 0; v < n; v++) if (num[v] === -1) visit(v)
  return comp
}

// The pair of siblings that contain p and c, and the topic they sit in.
function liftToSiblings(p, c, root) {
  const chainP = [p, ...ancestors(p)]
  const chainC = [c, ...ancestors(c)]
  const inP = new Set(chainP)
  const i = chainC.findIndex(x => inP.has(x))
  if (i === -1) return [chainP.at(-1), chainC.at(-1), root]
  const j = chainP.indexOf(chainC[i])
  if (i === 0 || j === 0) return null
  return [chainP[j - 1], chainC[i - 1], chainC[i]]
}

function findLoops(atlas) {
  const state = new Map()
  const stack = []
  const loops = []
  const visit = n => {
    state.set(n, 1)
    stack.push(n)
    for (const r of n.requires) {
      const s = state.get(r)
      if (s === 1) { if (loops.length < 10) loops.push(stack.slice(stack.indexOf(r)).concat(r)) }
      else if (!s) visit(r)
    }
    stack.pop()
    state.set(n, 2)
  }
  for (const n of atlas.nodes.values()) if (!state.get(n)) visit(n)
  for (const loop of loops) {
    const n = loop[0]
    atlas.issues.push({
      level: 'error', file: n.file, line: n.line, id: n.id,
      message: `Prerequisite loop: ${loop.map(x => `“${x.plainTitle}”`).join(' needs ')}. Something in this chain has to come first.`,
    })
  }
}

/** Everything `n` builds on, directly or not (excluding what contains it or is inside it). */
export function prerequisitesOf(n) {
  const out = new Set()
  const todo = [...n.requires]
  while (todo.length) {
    const r = todo.pop()
    if (out.has(r)) continue
    out.add(r)
    todo.push(...r.requires)
  }
  out.delete(n)
  for (const a of ancestors(n)) out.delete(a)
  for (const d of descendants(n)) out.delete(d)
  return out
}

/** Everything that builds on `n`, directly or not. */
export function dependentsOf(n) {
  const out = new Set()
  const todo = [n, ...descendants(n)].flatMap(x => x.requiredBy)
  while (todo.length) {
    const r = todo.pop()
    if (out.has(r)) continue
    out.add(r)
    todo.push(...r.requiredBy)
  }
  out.delete(n)
  for (const a of ancestors(n)) out.delete(a)
  for (const d of descendants(n)) out.delete(d)
  return out
}

/** For a topic: the direct prerequisites of anything inside it that come from outside it. */
export function externalPrereqs(topic) {
  const inside = new Set([topic, ...descendants(topic)])
  const out = new Set()
  for (const d of inside) for (const p of d.directPrereqs) if (!inside.has(p)) out.add(p)
  return out
}

/** For a topic: whatever outside it builds directly on something inside it. */
export function externalDependents(topic) {
  const inside = new Set([topic, ...descendants(topic)])
  const out = new Set()
  for (const d of inside) for (const c of d.directDependents) if (!inside.has(c)) out.add(c)
  return out
}

/** The concepts `n` builds on, in an order they could be learned in. */
export function learningPath(n) {
  const need = prerequisitesOf(n)
  const path = []
  const seen = new Set()
  const visit = m => {
    if (seen.has(m)) return
    seen.add(m)
    for (const r of m.requires) visit(r)
    if (!m.children.length && need.has(m)) path.push(m)
  }
  for (const r of n.requires) visit(r)
  return path
}

/** The node that stands for `n` on screen: `n` itself, or the closed topic it's hidden in. */
export function visibleRep(n, isOpen) {
  const chain = [n, ...ancestors(n)]
  for (let i = chain.length - 1; i > 0; i--) if (!isOpen(chain[i])) return chain[i]
  return n
}

/**
 * The arrows to draw. Arrows only join neighbours: the children of each open topic, and the
 * domains themselves. A prerequisite in another topic shows as one arrow between the two topics,
 * whose weight is how many prerequisites it carries, so no arrow ever crosses a topic's border.
 * `focus`, a selected concept, also gets its own direct links drawn, wherever they lead.
 */
export function visibleEdges(atlas, isOpen, focus = null) {
  const edges = new Map()
  const add = e => edges.set(e.key, e)
  const walk = container => {
    container.localEdges.forEach(add)
    for (const k of container.children) if (isOpen(k)) walk(k)
  }
  walk(atlas.root)
  if (focus) {
    const link = (p, c) => {
      const from = visibleRep(p, isOpen)
      const to = visibleRep(c, isOpen)
      if (from === to || isAncestor(from, to) || isAncestor(to, from)) return
      const key = from.id + '>' + to.id
      if (edges.has(key)) return // an arrow between neighbours already carries it
      add({ key: 'focus:' + key, from, to, within: commonContainer(from, to), pairs: [[p, c]], focus: true })
    }
    for (const p of focus.directPrereqs) link(p, focus)
    for (const c of focus.directDependents) link(focus, c)
  }
  return edges
}

// The innermost topic containing both nodes, or null when that is the map itself.
function commonContainer(a, b) {
  const up = new Set(ancestors(a))
  for (let p = b.parent; p; p = p.parent) if (up.has(p)) return p
  return null
}
