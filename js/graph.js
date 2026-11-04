// Small graphs, drawn as SVG from a ```graph block in a concept's text:
//
//   ```graph
//   y = x^2
//   x: -2.5, 2.5
//   y: -1, 4
//   point: -1, 1 below-left
//   point: 0, 0 below-right
//   point: 1, 1 below-right
//   ```
//
// A line `y = …` is a curve; `| dashed` or `| faint` after it draws it lighter. `x: a, b` and
// `y: a, b` set the window, `grid: dx, dy` the spacing of the grid lines (or `grid: none`), and
// `size: w, h` the size in pixels. `point: x, y "label" place` marks a point; without a label it
// is labelled with its coordinates, and the place is one of right, left, above, below,
// above-right, above-left, below-right and below-left. `asymptote: x = a` or `y = b` draws a
// dashed line. For diagrams there are `circle: x, y, r`, `segment: x1, y1, x2, y2` (with
// `| dashed`), `arc: x, y, r, from, to`, angles in radians, and `label: x, y "text" place`.
// Every number may be an expression, such as pi/2 or sqrt(2).
//
// In a table, {{ y = x^2; x: -3, 3; y: -1, 5 }} draws a small one: the same lines, with ; between them.
//
// The graph is drawn once, when the entry holding it opens, so it costs the map nothing.

const W = 280 // the usual width; the height follows the window, so that x and y share a scale where they can
const SAMPLES = 480
const THUMB = 130 // a graph narrower than this is one in a table, such as those in Table of Parent Functions
export const PLACES = {
  right: [6, 4, 'start'], left: [-6, 4, 'end'], above: [0, -8, 'middle'], below: [0, 15, 'middle'],
  'above-right': [5, -6, 'start'], 'above-left': [-5, -6, 'end'],
  'below-right': [5, 14, 'start'], 'below-left': [-5, 14, 'end'],
}
let seq = 0

/** The SVG for a graph block's text, or a message in red if it can't be read. */
export function graph(src) {
  let g
  try {
    g = parse(src)
  } catch (e) {
    return `<p class="graph-error">Graph: ${esc(e.message)}</p>`
  }
  return draw(g)
}

/** What is wrong with a graph block, if anything: for the list of content problems. */
export function graphError(src) {
  try {
    parse(src)
    return ''
  } catch (e) {
    return e.message
  }
}

// ---- reading a block ----

function parse(src) {
  const g = { curves: [], points: [], asymptotes: [], circles: [], segments: [], arcs: [], labels: [], grid: [1, 1] }
  for (const raw of src.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    let m
    if ((m = /^y\s*=\s*(.+?)\s*(?:\|\s*(dashed|faint)\s*)?$/i.exec(line))) {
      g.curves.push({ src: m[1], f: compile(m[1]), style: m[2]?.toLowerCase() ?? '' })
      continue
    }
    m = /^([a-z]+)\s*:\s*(.*)$/i.exec(line)
    if (!m) throw new Error(`can't read "${line}"`)
    const [, key, rest] = m
    switch (key.toLowerCase()) {
      case 'x': g.x = range(rest); break
      case 'y': g.y = range(rest); break
      case 'grid': g.grid = /^none$/i.test(rest.trim()) ? null : numbers(rest, 2); break
      case 'size': g.size = numbers(rest, 2); break
      case 'point': g.points.push(marked(rest, 2, true)); break
      case 'label': g.labels.push(marked(rest, 2, false)); break
      case 'circle': g.circles.push(numbers(rest, 3)); break
      case 'arc': g.arcs.push(numbers(rest, 5)); break
      case 'segment': {
        const [, body, style] = /^(.*?)\s*(?:\|\s*(dashed|faint)\s*)?$/i.exec(rest)
        g.segments.push({ at: numbers(body, 4), style: style?.toLowerCase() ?? '' })
        break
      }
      case 'asymptote': {
        const a = /^([xy])\s*=\s*(.+)$/i.exec(rest.trim())
        if (!a) throw new Error(`an asymptote is "x = …" or "y = …", not "${rest}"`)
        g.asymptotes.push({ axis: a[1].toLowerCase(), at: value(a[2]) })
        break
      }
      default: throw new Error(`unknown line "${key}:"`)
    }
  }
  if (!g.x) throw new Error('it needs a window across, such as "x: -3, 3"')
  if (!g.y) throw new Error('it needs a window up, such as "y: -1, 9"')
  return g
}

function range(s) {
  const [a, b] = numbers(s, 2)
  if (!(b > a)) throw new Error(`the window "${s}" should run from smaller to larger`)
  return [a, b]
}

// Expressions separated by commas, outside brackets.
export function numbers(s, count) {
  const parts = []
  let depth = 0
  let start = 0
  for (let i = 0; i <= s.length; i++) {
    const c = s[i]
    if (c === '(') depth++
    else if (c === ')') depth--
    else if ((c === ',' && depth === 0) || i === s.length) {
      parts.push(s.slice(start, i).trim())
      start = i + 1
    }
  }
  if (parts.length !== count) throw new Error(`"${s}" should be ${count} numbers, separated by commas`)
  return parts.map(value)
}

// "x, y", then an optional "label" and an optional place.
const MARKED = new RegExp(`^(.*?)\\s*(?:"([^"]*)")?\\s*(${Object.keys(PLACES).sort((a, b) => b.length - a.length).join('|')})?\\s*$`, 'i')
export function marked(s, count, point) {
  const [, coords, text, place = 'right'] = MARKED.exec(s)
  if (!point && text === undefined) throw new Error('a label needs its text in quotes: label: x, y "text"')
  const at = numbers(coords, count)
  const label = text ?? `(${coords.split(/,(?![^(]*\))/).map(pretty).join(', ')})`
  return { at, label, place: place.toLowerCase() }
}

// Coordinates as they were written, set like mathematics: −1, π/2, 3π/2.
const pretty = s => s.trim().replace(/(?<![a-z])pi(?![a-z])/gi, 'π').replace(/\*/g, '').replace(/-/g, '−').replace(/\bsqrt\(([^)]*)\)/g, '√$1')

function value(s) {
  const v = compile(s)({})
  if (!Number.isFinite(v)) throw new Error(`"${s}" is not a number`)
  return v
}

// ---- expressions: numbers, x, pi and e, + − × ÷ and ^, brackets and functions ----

const FUNCTIONS = {
  sqrt: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs, exp: Math.exp, ln: Math.log, log: Math.log10, log2: Math.log2,
  sin: Math.sin, cos: Math.cos, tan: Math.tan, arcsin: Math.asin, arccos: Math.acos, arctan: Math.atan,
  asin: Math.asin, acos: Math.acos, atan: Math.atan, sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
  floor: Math.floor, ceil: Math.ceil,
}
const CONSTANTS = { pi: Math.PI, e: Math.E }

/** Compiles an expression in x to a function of {x}. */
function compile(src) {
  const tokens = src.match(/\d+(?:\.\d+)?|\.\d+|[a-z_]\w*|\S/gi) ?? []
  let i = 0
  const peek = () => tokens[i]
  const take = t => {
    if (tokens[i] !== t) throw new Error(`expected "${t}" in "${src}"`)
    i++
  }
  const sum = () => {
    let f = product()
    while (peek() === '+' || peek() === '-') {
      const op = tokens[i++]
      const a = f
      const b = product()
      f = op === '+' ? v => a(v) + b(v) : v => a(v) - b(v)
    }
    return f
  }
  const product = () => {
    let f = unary()
    for (;;) {
      const t = peek()
      const a = f
      if (t === '*' || t === '/') {
        i++
        const b = unary()
        f = t === '*' ? v => a(v) * b(v) : v => a(v) / b(v)
      } else if (t !== undefined && /^[\w.(]/.test(t)) {
        // Written side by side: 2x, 3pi, 2(x + 1).
        const b = power()
        f = v => a(v) * b(v)
      } else return f
    }
  }
  const unary = () => {
    if (peek() === '-') { i++; const a = unary(); return v => -a(v) }
    if (peek() === '+') { i++; return unary() }
    return power()
  }
  const power = () => {
    const base = atom()
    if (peek() !== '^') return base
    i++
    const exp = unary()
    return v => base(v) ** exp(v)
  }
  const atom = () => {
    const t = tokens[i++]
    if (t === undefined) throw new Error(`"${src}" ends too soon`)
    if (/^[\d.]/.test(t)) { const n = parseFloat(t); return () => n }
    if (t === '(') { const f = sum(); take(')'); return f }
    const name = t.toLowerCase()
    if (FUNCTIONS[name]) {
      take('(')
      const a = sum()
      take(')')
      const fn = FUNCTIONS[name]
      return v => fn(a(v))
    }
    if (name in CONSTANTS) { const c = CONSTANTS[name]; return () => c }
    if (name === 'x') return v => v.x
    throw new Error(`"${t}" in "${src}" is not something a graph knows`)
  }
  const f = sum()
  if (i < tokens.length) throw new Error(`can't read "${tokens.slice(i).join(' ')}" in "${src}"`)
  return f
}

// ---- drawing ----

function draw(g) {
  const [x0, x1] = g.x
  const [y0, y1] = g.y
  const [w, h] = g.size ?? [W, Math.round(Math.min(1, Math.max(0.5, (y1 - y0) / (x1 - x0))) * W)]
  const X = x => r1(((x - x0) / (x1 - x0)) * w)
  const Y = y => r1(h - ((y - y0) / (y1 - y0)) * h)
  const id = `graph-clip-${++seq}`
  const small = w < THUMB // too small for the names of the axes
  const out = [`<rect class="plot" width="${w}" height="${h}"/>`]

  // Grid lines, then the axes with an arrowhead each and their names.
  if (g.grid) {
    const [dx, dy] = g.grid
    const lines = (lo, hi, step) => {
      const at = []
      for (let k = Math.ceil(lo / step - 1e-9); k * step <= hi + 1e-9 && at.length < 80; k++) if (k) at.push(k * step)
      return at
    }
    let d = ''
    for (const x of lines(x0, x1, dx)) d += `M${X(x)},0V${h}`
    for (const y of lines(y0, y1, dy)) d += `M0,${Y(y)}H${w}`
    if (d) out.push(`<path class="grid" d="${d}"/>`)
  }
  if (y0 < 0 && y1 > 0) {
    const y = Y(0)
    out.push(`<path class="axis" d="M0,${y}H${w}"/>`, `<path class="axis-head" d="M${w},${y}l-7,-3.5v7z"/>`,
      small ? '' : `<text class="axis-name" x="${w - 4}" y="${r1(y + 14)}" text-anchor="end">x</text>`)
  }
  if (x0 < 0 && x1 > 0) {
    const x = X(0)
    out.push(`<path class="axis" d="M${x},${h}V0"/>`, `<path class="axis-head" d="M${x},0l-3.5,7h7z"/>`,
      small ? '' : `<text class="axis-name" x="${r1(x + 8)}" y="11">y</text>`)
  }

  const shapes = []
  for (const a of g.asymptotes) {
    shapes.push(a.axis === 'x' ? `<path class="asymptote" d="M${X(a.at)},0V${h}"/>` : `<path class="asymptote" d="M0,${Y(a.at)}H${w}"/>`)
  }
  for (const [cx, cy, r] of g.circles) {
    shapes.push(`<ellipse class="curve" cx="${X(cx)}" cy="${Y(cy)}" rx="${r1((r / (x1 - x0)) * w)}" ry="${r1((r / (y1 - y0)) * h)}"/>`)
  }
  for (const [cx, cy, r, from, to] of g.arcs) {
    const pts = []
    for (let k = 0; k <= 40; k++) {
      const t = from + ((to - from) * k) / 40
      pts.push(`${X(cx + r * Math.cos(t))},${Y(cy + r * Math.sin(t))}`)
    }
    shapes.push(`<path class="arc" d="M${pts.join('L')}"/>`)
  }
  for (const s of g.segments) {
    const [ax, ay, bx, by] = s.at
    shapes.push(`<path class="segment ${s.style}" d="M${X(ax)},${Y(ay)}L${X(bx)},${Y(by)}"/>`)
  }
  // The main curve last, so that it lies on top of the others.
  for (const c of [...g.curves].reverse()) {
    shapes.push(`<path class="curve ${c.style}" d="${trace(c.f, g, X, Y)}"/>`)
  }
  out.push(`<g clip-path="url(#${id})">${shapes.join('')}</g>`)

  for (const p of g.points) out.push(`<circle class="dot" cx="${X(p.at[0])}" cy="${Y(p.at[1])}" r="3.4"/>`)
  for (const p of [...g.points, ...g.labels]) {
    const [dx, dy, anchor] = PLACES[p.place]
    out.push(`<text x="${r1(X(p.at[0]) + dx)}" y="${r1(Y(p.at[1]) + dy)}" text-anchor="${anchor}">${esc(p.label)}</text>`)
  }

  const name = g.curves.length ? g.curves.map(c => `y = ${c.src}`).join(', ') : 'a diagram'
  const marks = g.points.map(p => p.label).join(', ')
  return `<figure class="graph"><svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" ` +
    `aria-label="${esc(`Graph of ${name}${marks ? `, through ${marks}` : ''}`)}">` +
    `<defs><clipPath id="${id}"><rect width="${w}" height="${h}"/></clipPath></defs>${out.join('')}</svg></figure>`
}

// A curve as a path through many points. It breaks where the function is undefined, finding the
// edge of its domain exactly, so that √x starts at the origin; and where it leaps from far below
// the window to far above it or back, at a vertical asymptote. Values far outside the window are
// held just beyond it, and the clip hides the rest.
function trace(f, g, X, Y) {
  const [x0, x1] = g.x
  const [y0, y1] = g.y
  const span = y1 - y0
  const lo = y0 - span
  const hi = y1 + span
  const at = x => {
    try { return f({ x }) } catch { return NaN }
  }
  const ok = y => Number.isFinite(y)
  // Between a defined x and an undefined one, the last defined x.
  const edge = (a, b) => {
    for (let k = 0; k < 40; k++) {
      const m = (a + b) / 2
      if (ok(at(m))) a = m
      else b = m
    }
    return a
  }
  const runs = []
  let run = []
  let prev = null
  const step = (x1 - x0) / SAMPLES
  for (let k = 0; k <= SAMPLES; k++) {
    const x = x0 + k * step
    const y = at(x)
    if (!ok(y)) {
      if (prev) {
        const e = edge(prev.x, x)
        run.push([e, at(e)])
        runs.push(run)
        run = []
      }
      prev = null
      continue
    }
    if (!prev && k > 0) {
      const e = edge(x, x - step)
      run.push([e, at(e)])
    }
    if (prev && ((prev.y < lo && y > hi) || (prev.y > hi && y < lo))) {
      runs.push(run)
      run = []
    }
    run.push([x, y])
    prev = { x, y }
  }
  runs.push(run)
  const clamp = y => Math.min(hi, Math.max(lo, y))
  return runs.filter(r => r.length > 1).map(r => 'M' + r.map(([x, y]) => `${X(x)},${Y(clamp(y))}`).join('L')).join('')
}

const r1 = v => Math.round(v * 10) / 10
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
