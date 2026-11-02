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

  // For the layout: each topic's prerequisite arrows, lifted to the children of the
  // topic they run within, so it can order its children before laying them out.
  for (const n of [atlas.root, ...all]) n.localEdges = new Map()
  for (const c of all) {
    for (const p of c.prereqs) {
      const lifted = liftToSiblings(p, c, atlas.root)
      if (!lifted) continue
      const [from, to, within] = lifted
      const key = from.id + '>' + to.id
      const e = within.localEdges.get(key) ?? { from, to, weight: 0 }
      e.weight++
      within.localEdges.set(key, e)
    }
  }
  for (const n of [atlas.root, ...all]) n.localEdges = [...n.localEdges.values()]

  findLoops(atlas)
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

/** For a topic: the prerequisites of anything inside it that come from outside it. */
export function externalPrereqs(topic) {
  const inside = new Set([topic, ...descendants(topic)])
  const out = new Set()
  for (const d of inside) for (const p of d.prereqs) if (!inside.has(p)) out.add(p)
  return out
}

/** For a topic: whatever outside it lists something inside it as a prerequisite. */
export function externalDependents(topic) {
  const inside = new Set([topic, ...descendants(topic)])
  const out = new Set()
  for (const d of inside) for (const c of d.dependents) if (!inside.has(c)) out.add(c)
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

/** The arrows to draw: every prerequisite, merged where closed topics hide its ends. */
export function visibleEdges(atlas, isOpen) {
  const edges = new Map()
  for (const c of atlas.nodes.values()) {
    for (const p of c.prereqs) {
      const from = visibleRep(p, isOpen)
      const to = visibleRep(c, isOpen)
      if (from === to || isAncestor(from, to) || isAncestor(to, from)) continue
      const key = from.id + '>' + to.id
      let e = edges.get(key)
      if (!e) edges.set(key, (e = { key, from, to, within: commonContainer(from, to), pairs: [] }))
      e.pairs.push([p, c])
    }
  }
  return edges
}

// The innermost topic containing both nodes, or null when that is the map itself.
function commonContainer(a, b) {
  const up = new Set(ancestors(a))
  for (let p = b.parent; p; p = p.parent) if (up.has(p)) return p
  return null
}
