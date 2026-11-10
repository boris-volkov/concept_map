// The cycles of addition modulo n, drawn on a circle of numbers from a ```cycles block in a
// concept's text, with both numbers there to be changed:
//
//   ```cycles
//   n: 12
//   add: 5
//   ```
//
// The residues 0, 1, …, n − 1 stand round a circle like the hours of a clock, with 0 at the top,
// and an arrow runs from each x to x + a. The arrows fall into gcd(a, n) cycles, each of length
// n / gcd(a, n), and each cycle has a colour of its own. `n:` and `add:` are the numbers the
// drawing starts with, `max:` the largest modulus that can be chosen (60 unless it says), and
// `size:` the width in pixels.
//
// This is the one drawing on the map that changes under the reader's hand. It keeps no state
// but its two inputs, and one listener on the page redraws whichever drawing an input belongs to,
// so it works the same in an entry on the map, in a popped-out copy and on a flashcard, and
// costs nothing until it is touched. Its size never changes, so the map never has to make room.

const SIZE = 320
const MAX = 60
const LIMIT = 120 // the largest `max:` that still leaves room for the numbers
const LISTED = 88 // about how many characters of cycles fit in the two lines under the drawing
// The colours of a colouring in network.js; with more cycles than these, hues spaced round the wheel.
const TONES = ['#b8433a', '#2f6fa8', '#d9a520', '#3d8a55', '#7a4f9e', '#c4702b']

const r1 = v => Math.round(v * 10) / 10
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a))

/** The drawing for a cycles block's text, or a message in red if it can't be read. */
export function cycles(src) {
  let c
  try {
    c = parse(src)
  } catch (e) {
    return `<p class="graph-error">Cycles: ${e.message}</p>`
  }
  const pair = (name, label, letter, min, max, value) =>
    `<label><span>${label} <i>${letter}</i></span>` +
    `<input type="range" class="cy-${name}" min="${min}" max="${max}" value="${value}" aria-label="${label} ${letter}">` +
    `<input type="number" class="cy-${name}" min="${min}" max="${max}" value="${value}" aria-label="${label} ${letter}"></label>`
  const d = draw(c.n, c.a, c.size)
  return `<figure class="graph cycles" data-size="${c.size}" style="width:${c.size}px">` +
    `<div class="cy-controls">${pair('n', 'modulus', 'n', 1, c.max, c.n)}${pair('a', 'add', 'a', 0, c.n - 1, c.a)}</div>` +
    `<svg viewBox="0 0 ${c.size} ${c.size}" width="${c.size}" height="${c.size}" role="img" aria-label="${d.about}">${d.svg}</svg>` +
    `<figcaption aria-live="polite">${d.caption}</figcaption></figure>`
}

/** What is wrong with a cycles block, if anything: for the list of content problems. */
export function cyclesError(src) {
  try {
    parse(src)
    return ''
  } catch (e) {
    return e.message
  }
}

function parse(src) {
  const c = { n: 12, a: 1, max: MAX, size: SIZE }
  const keys = { n: 'n', modulus: 'n', add: 'a', a: 'a', step: 'a', max: 'max', size: 'size' }
  for (const raw of src.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line) continue
    const m = /^([a-z]+)\s*:\s*(.*)$/i.exec(line)
    const key = m && keys[m[1].toLowerCase()]
    if (!key) throw new Error(`“${line}” is not one of n:, add:, max: or size:.`)
    if (!/^\d+$/.test(m[2].trim())) throw new Error(`“${m[1]}:” needs a whole number, not “${m[2].trim()}”.`)
    c[key] = +m[2]
  }
  if (c.max < 2 || c.max > LIMIT) throw new Error(`“max:” should be from 2 to ${LIMIT}.`)
  if (c.n < 1 || c.n > c.max) throw new Error(`The modulus n should be from 1 to ${c.max}.`)
  if (c.a >= c.n) throw new Error(`The number added should be from 0 to n − 1, which is ${c.n - 1}.`)
  if (c.size < 200 || c.size > 600) throw new Error('“size:” should be from 200 to 600.')
  return c
}

// The picture and the lines under it, for x → x + a modulo n.
function draw(n, a, size) {
  const d = gcd(a, n) // the number of cycles: x and y share one exactly when d divides x − y
  const length = n / d
  const mid = size / 2
  const R = mid - 32
  const dot = n <= 24 ? 4 : n <= 48 ? 3 : 2.4
  const head = n <= 16 ? 9 : n <= 36 ? 7 : 5.5
  const at = (k, r = R) => {
    const t = (2 * Math.PI * k) / n - Math.PI / 2
    return [mid + r * Math.cos(t), mid + r * Math.sin(t)]
  }
  const tone = i => (d <= TONES.length ? TONES[i] : `hsl(${Math.round((360 * i) / d)} 55% 38%)`)

  let svg = `<circle class="cy-ring" cx="${mid}" cy="${mid}" r="${R}"/>`
  for (let i = 0; i < d; i++) {
    let lines = ''
    let heads = ''
    let dots = ''
    for (let x = i; x < n; x += d) {
      const [x0, y0] = at(x)
      dots += `<circle class="cy-dot" cx="${r1(x0)}" cy="${r1(y0)}" r="${dot}"/>`
      if (!a) {
        // Adding 0 leaves x where it is: a loop, drawn inside the ring.
        const r = Math.min(9, (Math.PI * R) / n * 0.8)
        const [cx, cy] = at(x, R - r)
        lines += `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}"/>`
        continue
      }
      const [x1, y1] = at(x + a)
      const len = Math.hypot(x1 - x0, y1 - y0) || 1
      const ux = (x1 - x0) / len
      const uy = (y1 - y0) / len
      const tip = [x1 - ux * (dot + 1), y1 - uy * (dot + 1)]
      const base = [tip[0] - ux * head, tip[1] - uy * head]
      const w = head * 0.38
      lines += `<path d="M${r1(x0)},${r1(y0)}L${r1(base[0] + ux)},${r1(base[1] + uy)}"/>`
      heads += `<path d="M${r1(tip[0])},${r1(tip[1])}L${r1(base[0] - uy * w)},${r1(base[1] + ux * w)}` +
        `L${r1(base[0] + uy * w)},${r1(base[1] - ux * w)}z"/>`
    }
    svg += `<g style="--k:${tone(i)}"><g class="cy-arrow">${lines}</g><g class="cy-head">${heads}</g>${dots}</g>`
  }
  const small = n > 36
  for (let k = 0; k < n; k++) {
    const [x, y] = at(k, R + (small ? 13 : 16))
    svg += `<text class="cy-num${small ? ' tiny' : ''}" x="${r1(x)}" y="${r1(y + (small ? 3.5 : 4.5))}" text-anchor="middle">${k}</text>`
  }

  // The cycles written out, as far as two lines hold them.
  let listed = ''
  let used = 0
  for (let i = 0; i < d; i++) {
    const members = []
    for (let k = 0, x = i; k < length; k++, x = (x + a) % n) members.push(x)
    let text = `(${members.join(' ')})`
    if (used + text.length > LISTED) {
      const room = LISTED - used - 4
      if (i > 0 || room < 8) { listed += ' …'; break }
      text = `${text.slice(0, text.lastIndexOf(' ', room))} …)`
    }
    used += text.length + 1
    listed += `${i ? ' ' : ''}<span style="color:color-mix(in srgb, ${tone(i)} 68%, black)">${text}</span>` // darker, to read as text
    if (text.endsWith('…)')) break
  }
  const count = `${d} cycle${d > 1 ? 's' : ''} of length ${length}`
  const caption = `<span class="cy-rule"><i>x</i> ↦ <i>x</i> + ${a} (mod ${n})</span>` +
    `<span class="cy-count">gcd(${a}, ${n}) = ${d}: <b>${count}</b></span>` +
    `<span class="cy-list">${listed}</span>`
  return { svg, caption, about: `Adding ${a} modulo ${n}: ${count}` }
}

// One listener for every drawing on the page: an input redraws the drawing it stands in.
function changed(e) {
  const input = e.target
  const fig = input.closest?.('.cycles')
  if (!fig || !input.matches('input')) return
  const read = name => {
    const own = input.classList.contains(`cy-${name}`) ? input : fig.querySelector(`input.cy-${name}`)
    return parseInt(own.value, 10)
  }
  const boxes = name => fig.querySelectorAll(`input.cy-${name}`)
  const max = +boxes('n')[0].max
  let n = read('n')
  let a = read('a')
  if (!Number.isFinite(n) || !Number.isFinite(a)) return // a number half typed
  n = Math.min(max, Math.max(1, n))
  a = ((a % n) + n) % n
  // The box being typed in is left alone until it is done with, so that it never fights the typing.
  const typing = e.type === 'input' && input.type === 'number' ? input : null
  for (const box of boxes('n')) if (box !== typing) box.value = n
  for (const box of boxes('a')) {
    box.max = n - 1
    if (box !== typing) box.value = a
  }
  const d = draw(n, a, +fig.dataset.size)
  const svg = fig.querySelector('svg')
  svg.innerHTML = d.svg
  svg.setAttribute('aria-label', d.about)
  fig.querySelector('figcaption').innerHTML = d.caption
}

if (typeof document !== 'undefined') {
  document.addEventListener('input', changed)
  document.addEventListener('change', changed)
}
