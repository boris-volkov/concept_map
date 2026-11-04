// QR codes, drawn here rather than fetched from a library: text in, an SVG of the code out. Byte mode
// only (any text, as UTF-8), the smallest version that holds it, and then as much error correction as
// still fits in that version. Follows ISO/IEC 18004.

// Error correction levels, weakest first, with the two bits each is written as in the format area.
const LEVELS = [{ name: 'L', bits: 1 }, { name: 'M', bits: 0 }, { name: 'Q', bits: 3 }, { name: 'H', bits: 2 }]

// Per level and version (1 to 40): error correction codewords in each block, and the number of blocks.
const ECC_PER_BLOCK = [
  [7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  [10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
  [13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  [17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
]
const BLOCKS = [
  [1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
  [1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
  [1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
  [1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81],
]

/** The QR code for `text`, as a square of booleans (true is dark), without the quiet zone around it. */
export function qrMatrix(text) {
  const bytes = new TextEncoder().encode(text)
  const bitsNeeded = v => 4 + (v < 10 ? 8 : 16) + 8 * bytes.length
  let version = 1
  while (version <= 40 && bitsNeeded(version) > dataCodewords(version, 0) * 8) version++
  if (version > 40) throw new RangeError('Too long for a QR code')
  let level = 0
  while (level < 3 && bitsNeeded(version) <= dataCodewords(version, level + 1) * 8) level++

  // The data: byte mode, the length, the bytes, then a terminator and padding to fill the version.
  const bits = []
  const put = (value, n) => { for (let i = n - 1; i >= 0; i--) bits.push((value >>> i) & 1) }
  put(0b0100, 4)
  put(bytes.length, version < 10 ? 8 : 16)
  for (const b of bytes) put(b, 8)
  const capacity = dataCodewords(version, level) * 8
  put(0, Math.min(4, capacity - bits.length))
  put(0, (8 - bits.length % 8) % 8)
  for (let pad = 0xEC; bits.length < capacity; pad ^= 0xEC ^ 0x11) put(pad, 8)
  const data = []
  for (let i = 0; i < bits.length; i += 8) data.push(bits.slice(i, i + 8).reduce((a, b) => a << 1 | b, 0))

  const code = new Grid(version)
  code.drawFunctionPatterns(level)
  code.drawCodewords(withErrorCorrection(data, version, level))
  // Of the eight masks, keep the one that leaves the fewest patterns a scanner could misread.
  let best, bestPenalty = Infinity
  for (let mask = 0; mask < 8; mask++) {
    const trial = code.copy()
    trial.applyMask(mask)
    trial.drawFormatBits(level, mask)
    const p = trial.penalty()
    if (p < bestPenalty) { best = trial; bestPenalty = p }
  }
  return best.dark
}

/** The QR code for `text` as an SVG: black on white, with the quiet zone the standard asks for. */
export function qrSvg(text, { label = '' } = {}) {
  const m = qrMatrix(text)
  const quiet = 4
  const size = m.length + 2 * quiet
  let d = ''
  m.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (!row[x]) continue
      let run = 1
      while (row[x + run]) run++
      d += `M${x + quiet} ${y + quiet}h${run}v1h-${run}z`
      x += run
    }
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"` +
    `${label ? ` role="img" aria-label="${label.replace(/[&<>"]/g, c => `&#${c.charCodeAt(0)};`)}"` : ''}>` +
    `<rect width="${size}" height="${size}" fill="#fff"/><path d="${d}" fill="#000"/></svg>`
}

// ---------- sizes ----------

function rawDataModules(version) {
  let n = (16 * version + 128) * version + 64
  if (version >= 2) {
    const align = Math.floor(version / 7) + 2
    n -= (25 * align - 10) * align - 55
    if (version >= 7) n -= 36
  }
  return n
}

function dataCodewords(version, level) {
  return Math.floor(rawDataModules(version) / 8) - ECC_PER_BLOCK[level][version - 1] * BLOCKS[level][version - 1]
}

function alignmentPositions(version) {
  if (version === 1) return []
  const size = version * 4 + 17
  const count = Math.floor(version / 7) + 2
  const step = Math.floor((version * 8 + count * 3 + 5) / (count * 4 - 4)) * 2
  const result = [6]
  for (let pos = size - 7; result.length < count; pos -= step) result.splice(1, 0, pos)
  return result
}

// ---------- error correction: Reed–Solomon over GF(256) ----------

function gfMultiply(x, y) {
  let z = 0
  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >>> 7) * 0x11D)
    z ^= ((y >>> i) & 1) * x
  }
  return z
}

function rsDivisor(degree) {
  const result = new Array(degree).fill(0)
  result[degree - 1] = 1
  let root = 1
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < degree; j++) {
      result[j] = gfMultiply(result[j], root)
      if (j + 1 < degree) result[j] ^= result[j + 1]
    }
    root = gfMultiply(root, 0x02)
  }
  return result
}

function rsRemainder(data, divisor) {
  const result = divisor.map(() => 0)
  for (const b of data) {
    const factor = b ^ result.shift()
    result.push(0)
    divisor.forEach((coef, i) => { result[i] ^= gfMultiply(coef, factor) })
  }
  return result
}

// Splits the data into blocks, adds each block's error correction, and interleaves them.
function withErrorCorrection(data, version, level) {
  const blockCount = BLOCKS[level][version - 1]
  const eccLength = ECC_PER_BLOCK[level][version - 1]
  const raw = Math.floor(rawDataModules(version) / 8)
  const shortBlocks = blockCount - raw % blockCount
  const shortLength = Math.floor(raw / blockCount)
  const divisor = rsDivisor(eccLength)
  const blocks = []
  for (let i = 0, k = 0; i < blockCount; i++) {
    const dat = data.slice(k, k + shortLength - eccLength + (i < shortBlocks ? 0 : 1))
    k += dat.length
    const ecc = rsRemainder(dat, divisor)
    if (i < shortBlocks) dat.push(0) // a place holder, skipped below, so that every block is as long
    blocks.push(dat.concat(ecc))
  }
  const result = []
  for (let i = 0; i < blocks[0].length; i++) {
    blocks.forEach((block, j) => { if (i !== shortLength - eccLength || j >= shortBlocks) result.push(block[i]) })
  }
  return result
}

// ---------- the grid of modules ----------

class Grid {
  constructor(version) {
    if (!version) return
    this.version = version
    this.size = version * 4 + 17
    this.dark = Array.from({ length: this.size }, () => new Array(this.size).fill(false))
    this.fixed = Array.from({ length: this.size }, () => new Array(this.size).fill(false))
  }

  copy() {
    const g = new Grid()
    g.version = this.version
    g.size = this.size
    g.dark = this.dark.map(r => [...r])
    g.fixed = this.fixed
    return g
  }

  set(x, y, dark) {
    this.dark[y][x] = dark
    this.fixed[y][x] = true
  }

  drawFunctionPatterns(level) {
    const s = this.size
    for (let i = 0; i < s; i++) {
      this.set(6, i, i % 2 === 0)
      this.set(i, 6, i % 2 === 0)
    }
    for (const [x, y] of [[3, 3], [s - 4, 3], [3, s - 4]]) {
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          const xx = x + dx, yy = y + dy
          const dist = Math.max(Math.abs(dx), Math.abs(dy))
          if (xx >= 0 && xx < s && yy >= 0 && yy < s) this.set(xx, yy, dist !== 2 && dist !== 4)
        }
      }
    }
    const pos = alignmentPositions(this.version)
    const last = pos.length - 1
    pos.forEach((x, i) => pos.forEach((y, j) => {
      if ((i === 0 && j === 0) || (i === 0 && j === last) || (i === last && j === 0)) return
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) this.set(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1)
      }
    }))
    this.drawFormatBits(level, 0) // reserves the format area; written again once the mask is chosen
    if (this.version >= 7) {
      let rem = this.version
      for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25)
      const bits = this.version << 12 | rem
      for (let i = 0; i < 18; i++) {
        const bit = ((bits >>> i) & 1) === 1
        const a = s - 11 + i % 3, b = Math.floor(i / 3)
        this.set(a, b, bit)
        this.set(b, a, bit)
      }
    }
  }

  drawFormatBits(level, mask) {
    const data = LEVELS[level].bits << 3 | mask
    let rem = data
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537)
    const bits = (data << 10 | rem) ^ 0x5412
    const bit = i => ((bits >>> i) & 1) === 1
    const s = this.size
    for (let i = 0; i <= 5; i++) this.set(8, i, bit(i))
    this.set(8, 7, bit(6))
    this.set(8, 8, bit(7))
    this.set(7, 8, bit(8))
    for (let i = 9; i < 15; i++) this.set(14 - i, 8, bit(i))
    for (let i = 0; i < 8; i++) this.set(s - 1 - i, 8, bit(i))
    for (let i = 8; i < 15; i++) this.set(8, s - 15 + i, bit(i))
    this.set(8, s - 8, true) // the module that is always dark
  }

  // The codewords, two columns at a time, zigzagging up and down from the bottom right.
  drawCodewords(codewords) {
    const s = this.size
    let i = 0
    for (let right = s - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5 // the vertical timing pattern
      const upward = ((right + 1) & 2) === 0
      for (let v = 0; v < s; v++) {
        const y = upward ? s - 1 - v : v
        for (let j = 0; j < 2; j++) {
          const x = right - j
          if (this.fixed[y][x] || i >= codewords.length * 8) continue
          this.dark[y][x] = ((codewords[i >>> 3] >>> (7 - (i & 7))) & 1) === 1
          i++
        }
      }
    }
  }

  applyMask(mask) {
    const test = [
      (x, y) => (x + y) % 2 === 0,
      (x, y) => y % 2 === 0,
      (x, y) => x % 3 === 0,
      (x, y) => (x + y) % 3 === 0,
      (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
      (x, y) => x * y % 2 + x * y % 3 === 0,
      (x, y) => (x * y % 2 + x * y % 3) % 2 === 0,
      (x, y) => ((x + y) % 2 + x * y % 3) % 2 === 0,
    ][mask]
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) if (!this.fixed[y][x] && test(x, y)) this.dark[y][x] = !this.dark[y][x]
    }
  }

  // The standard's score for a masked code: long runs, 2×2 blocks, look-alikes of the finder patterns,
  // and too much dark or light.
  penalty() {
    const s = this.size, m = this.dark
    let p = 0
    const finderLike = [true, false, true, true, true, false, true, false, false, false, false]
    const lines = []
    for (let i = 0; i < s; i++) {
      lines.push(m[i])
      lines.push(m.map(row => row[i]))
    }
    for (const line of lines) {
      let run = 1
      for (let i = 1; i <= s; i++) {
        if (i < s && line[i] === line[i - 1]) { run++; continue }
        if (run >= 5) p += run - 2
        run = 1
      }
      for (let i = 0; i + 11 <= s; i++) {
        if (finderLike.every((d, k) => line[i + k] === d) || finderLike.every((d, k) => line[i + 10 - k] === d)) p += 40
      }
    }
    for (let y = 0; y + 1 < s; y++) {
      for (let x = 0; x + 1 < s; x++) {
        const c = m[y][x]
        if (c === m[y][x + 1] && c === m[y + 1][x] && c === m[y + 1][x + 1]) p += 3
      }
    }
    const dark = m.reduce((n, row) => n + row.filter(Boolean).length, 0)
    const total = s * s
    p += (Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1) * 10
    return p
  }
}
