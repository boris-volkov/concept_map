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
  rank(atlas)
}

/**
 * The tiers of the ranking. A concept's score is a multiple of the average concept's, so 1 is
 * average; the last tier holds the concepts nothing builds on, whatever their score.
 */
export const TIERS = [
  { key: 's', mark: 'S', name: 'Super-concepts', note: 'four times the average or more', min: 4 },
  { key: 'a', mark: 'A', name: 'Tier A', note: 'twice the average or more', min: 2 },
  { key: 'b', mark: 'B', name: 'Tier B', note: 'above average', min: 1 },
  { key: 'c', mark: 'C', name: 'Tier C', note: 'half the average or more', min: 0.5 },
  { key: 'd', mark: 'D', name: 'Tier D', note: 'below half the average', min: 0 },
  { key: 'end', mark: '∅', name: 'Endpoints', note: 'nothing builds on these yet' },
]

// The ranking, found the way a search engine ranks pages (PageRank): each concept hands its
// score on to the concepts it directly builds on, split evenly between them, so a concept scores
// high when concepts that score high build on it. A topic named as a prerequisite shares its part
// among everything inside it. As in PageRank, 15% of every score, and everything that reaches a
// starting point such as Counting, is spread evenly over all the concepts. Nothing on the page
// shows the ranking for now.
function rank(atlas) {
  const concepts = [...atlas.nodes.values()].filter(n => !n.children.length)
  const N = concepts.length
  const index = new Map(concepts.map((n, i) => [n, i]))
  const links = concepts.map(n => {
    const on = [...n.directPrereqs, ...ancestors(n).flatMap(a => a.prereqs)]
    return on.flatMap(p => {
      const inside = leaves(p)
      return inside.map(l => [index.get(l), 1 / on.length / inside.length])
    })
  })
  const D = 0.85
  let s = new Float64Array(N).fill(1 / N)
  for (let step = 0; step < 300; step++) {
    const next = new Float64Array(N)
    let loose = 0 // held by concepts that build on nothing
    for (let i = 0; i < N; i++) {
      if (!links[i].length) loose += s[i]
      for (const [j, share] of links[i]) next[j] += D * s[i] * share
    }
    const even = (1 - D + D * loose) / N
    let change = 0
    for (let i = 0; i < N; i++) {
      next[i] += even
      change += Math.abs(next[i] - s[i])
    }
    s = next
    if (change < 1e-13) break
  }
  const builtOn = new Set(links.flat().map(([j]) => j))
  atlas.ranking = concepts.map((n, i) => {
    n.score = s[i] * N
    n.tier = builtOn.has(i) ? TIERS.find(t => n.score >= t.min) : TIERS.at(-1)
    return n
  }).sort((a, b) => b.score - a.score || a.order - b.order)
  // Equal scores share a rank.
  atlas.ranking.forEach((n, k, list) => {
    n.rank = k && list[k - 1].score - n.score < 1e-9 ? list[k - 1].rank : k + 1
  })
}

// Concepts never form a loop (findLoops reports one as an error), but topics can: Polynomials
// builds on Complex Numbers (the Fundamental Theorem of Algebra) and Complex Numbers on
// Polynomials (multiplying them). Topics that build on each other, directly or around a loop,
// are intertwined, and list each other as twins. Two that each build directly on the other
// get one two-way arrow instead of two: it counts, for the layout, as running from the one
// built on more (or, if neither is, the one listed first) to the other.
function markIntertwined(container) {
  const kids = container.children
  if (kids.length < 2) return
  const index = new Map(kids.map((k, i) => [k, i]))
  const out = kids.map(() => [])
  for (const e of container.localEdges) out[index.get(e.from)].push(index.get(e.to))
  const comp = components(out)
  for (const k of kids) k.twins = kids.filter(o => o !== k && comp[index.get(o)] === comp[index.get(k)])
  const byKey = new Map(container.localEdges.map(e => [e.key, e]))
  const edges = []
  for (const e of container.localEdges) {
    const back = byKey.get(`${e.to.id}>${e.from.id}`)
    if (!back) { edges.push(e); continue }
    if (e.weight < back.weight || (e.weight === back.weight && index.get(e.from) > index.get(e.to))) continue
    edges.push({ key: `${e.from.id}<>${e.to.id}`, from: e.from, to: e.to, within: e.within,
      weight: e.weight + back.weight, pairs: [...e.pairs, ...back.pairs], twin: true })
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

/** Finds a concept by id. A sheet holds only a few, and what they say can link to any on the map. */
export const finder = atlas => id => atlas.nodes.get(id) ?? atlas.whole?.nodes.get(id)

// The concepts `c` needs directly: a topic stands for what it holds, and for what it needs itself.
function conceptsNeeded(c) {
  const out = new Set()
  const seen = new Set()
  const todo = [...c.requires]
  while (todo.length) {
    const r = todo.pop()
    if (seen.has(r)) continue
    seen.add(r)
    if (r.children.length) todo.push(...r.requires)
    else out.add(r)
  }
  out.delete(c)
  return [...out]
}

/**
 * An atlas of its own for `n` and the concepts that lead up to it, for a sheet to draw (see
 * sheet.js). They are copies: each reads through to its original for all that it says, but
 * stands in no topic and is joined only to the other copies, so that everything which walks the
 * graph stays among them. What the topics around a concept need counts for the concept, as does
 * everything in a topic it names. Arrows run between concepts, wherever those stand on the map,
 * one being left out when another of the same concept's prerequisites already leads to it.
 * `whole` is the atlas they came from.
 */
export function sheetAtlas(whole, n) {
  const concepts = [...learningPath(n), n].sort((a, b) => a.order - b.order)
  const copies = new Map(concepts.map(c => [c, Object.create(c)]))
  const needs = new Map(concepts.map(c => [c, conceptsNeeded(c).filter(p => copies.has(p))]))
  const behind = new Map()
  const reach = c => {
    let out = behind.get(c)
    if (out) return out
    out = new Set()
    behind.set(c, out)
    for (const p of needs.get(c)) {
      out.add(p)
      for (const q of reach(p)) out.add(q)
    }
    return out
  }
  for (const [c, copy] of copies) {
    copy.parent = null
    copy.home = c.parent // where the original stands, to say so in the copy's links
    copy.directDependents = []
    copy.requiredBy = copy.directDependents
  }
  const localEdges = []
  for (const [c, copy] of copies) {
    const direct = needs.get(c).filter(p => !needs.get(c).some(q => q !== p && reach(q).has(p)))
    copy.directPrereqs = direct.map(p => copies.get(p))
    copy.requires = copy.directPrereqs // what these need follows from them
    for (const from of copy.directPrereqs) {
      from.directDependents.push(copy)
      localEdges.push({ key: `${from.id}>${copy.id}`, from, to: copy, within: null, weight: 1, pairs: [[from, copy]] })
    }
  }
  const roots = [...copies.values()]
  return { root: { isRoot: true, children: roots, localEdges }, roots, nodes: new Map(roots.map(c => [c.id, c])), whole }
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
 * A topic in rows by kind is laid out as a reference sheet, not by its arrows, so it draws none.
 * `focus`, a selected concept, also gets its own direct links drawn, wherever they lead.
 */
export function visibleEdges(atlas, isOpen, focus = null) {
  const edges = new Map()
  const add = e => edges.set(e.key, e)
  const walk = container => {
    if (!container.rowsByKind) container.localEdges.forEach(add)
    for (const k of container.children) if (isOpen(k)) walk(k)
  }
  walk(atlas.root)
  if (focus) {
    const link = (p, c) => {
      const from = visibleRep(p, isOpen)
      const to = visibleRep(c, isOpen)
      if (from === to || isAncestor(from, to) || isAncestor(to, from)) return
      const key = from.id + '>' + to.id
      // An arrow between neighbours already carries it, one way or both.
      if (edges.has(key) || edges.has(`${from.id}<>${to.id}`) || edges.has(`${to.id}<>${from.id}`)) return
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
