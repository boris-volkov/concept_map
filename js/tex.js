// LaTeX → MathML.
//
// Browsers draw MathML natively, so the atlas needs no math library: this file
// translates the LaTeX written between $...$ in the content files into MathML.
// It covers the notation used from arithmetic through calculus. A command it
// does not know is drawn in red, so a gap is easy to spot (and to add below).

const GREEK = {
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ϵ', varepsilon: 'ε', zeta: 'ζ', eta: 'η',
  theta: 'θ', vartheta: 'ϑ', iota: 'ι', kappa: 'κ', lambda: 'λ', mu: 'μ', nu: 'ν', xi: 'ξ',
  omicron: 'ο', pi: 'π', varpi: 'ϖ', rho: 'ρ', varrho: 'ϱ', sigma: 'σ', varsigma: 'ς', tau: 'τ',
  upsilon: 'υ', phi: 'ϕ', varphi: 'φ', chi: 'χ', psi: 'ψ', omega: 'ω',
  Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Xi: 'Ξ', Pi: 'Π', Sigma: 'Σ', Upsilon: 'Υ',
  Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω',
}

// Commands drawn as operators, relations and arrows (<mo>).
const OPERATORS = {
  cdot: '⋅', cdotp: '⋅', times: '×', div: '÷', pm: '±', mp: '∓', ast: '∗', star: '⋆', circ: '∘',
  bullet: '∙', oplus: '⊕', otimes: '⊗', setminus: '∖', cup: '∪', cap: '∩', wedge: '∧', vee: '∨',
  land: '∧', lor: '∨', le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠', lt: '<', gt: '>',
  ll: '≪', gg: '≫', approx: '≈', equiv: '≡', sim: '∼', simeq: '≃', cong: '≅', propto: '∝',
  doteq: '≐', in: '∈', notin: '∉', ni: '∋', subset: '⊂', subseteq: '⊆', supset: '⊃', supseteq: '⊇',
  mid: '∣', nmid: '∤', parallel: '∥', perp: '⊥', to: '→', rightarrow: '→', leftarrow: '←',
  gets: '←', leftrightarrow: '↔', Rightarrow: '⇒', Leftarrow: '⇐', Leftrightarrow: '⇔',
  implies: '⟹', impliedby: '⟸', iff: '⟺', mapsto: '↦', longrightarrow: '⟶', longleftarrow: '⟵',
  longleftrightarrow: '⟷', Longrightarrow: '⟹', Longleftarrow: '⟸', Longleftrightarrow: '⟺',
  uparrow: '↑', downarrow: '↓', nearrow: '↗', searrow: '↘', swarrow: '↙', nwarrow: '↖',
  leqslant: '⩽', geqslant: '⩾', complement: '∁', forall: '∀', exists: '∃',
  nexists: '∄', neg: '¬', lnot: '¬', angle: '∠', measuredangle: '∡', triangle: '△', square: '□',
  cdots: '⋯', ldots: '…', dots: '…', vdots: '⋮', ddots: '⋱', colon: ':', therefore: '∴',
  because: '∵', prime: '′', vert: '|', Vert: '‖', '|': '‖',
}
const OPENERS = { langle: '⟨', lfloor: '⌊', lceil: '⌈', lbrace: '{', '{': '{', lvert: '|', lVert: '‖' }
const CLOSERS = { rangle: '⟩', rfloor: '⌋', rceil: '⌉', rbrace: '}', '}': '}', rvert: '|', rVert: '‖' }

// Commands drawn as upright symbols (<mi>).
const IDENTIFIERS = {
  infty: '∞', partial: '∂', nabla: '∇', emptyset: '∅', varnothing: '∅', ell: 'ℓ', hbar: 'ℏ',
  aleph: 'ℵ', Re: 'ℜ', Im: 'ℑ', degree: '°', '%': '%', $: '$', '#': '#', '&': '&', _: '_',
}

const BIG_OPERATORS = { sum: '∑', prod: '∏', coprod: '∐', bigcup: '⋃', bigcap: '⋂', bigoplus: '⨁' }
const INTEGRALS = { int: '∫', iint: '∬', iiint: '∭', oint: '∮' }
const FUNCTIONS = new Set(['sin', 'cos', 'tan', 'sec', 'csc', 'cot', 'arcsin', 'arccos', 'arctan',
  'sinh', 'cosh', 'tanh', 'coth', 'log', 'ln', 'lg', 'exp', 'det', 'gcd', 'deg', 'arg', 'dim',
  'ker', 'hom', 'Pr'])
const LIMIT_OPERATORS = { lim: 'lim', max: 'max', min: 'min', sup: 'sup', inf: 'inf',
  limsup: 'lim sup', liminf: 'lim inf', argmax: 'arg max', argmin: 'arg min' }
const SPACES = { ',': 0.1667, ':': 0.2222, '>': 0.2222, ';': 0.2778, ' ': 0.25, quad: 1, qquad: 2,
  enspace: 0.5, thinspace: 0.1667, medspace: 0.2222, thickspace: 0.2778 }

const ACCENTS = { hat: '^', check: 'ˇ', tilde: '~', acute: '´', grave: '`', dot: '˙', ddot: '¨',
  breve: '˘', bar: '¯', vec: '→', mathring: '˚' }
const WIDE_ACCENTS = { widehat: '^', widetilde: '~', overrightarrow: '→', overleftarrow: '←',
  overleftrightarrow: '↔', overbrace: '⏞' }
const UNDER_ACCENTS = { underbrace: '⏟', underrightarrow: '→', underleftarrow: '←' }

const DELIMITER_SIZES = { big: '1.2em', Big: '1.623em', bigg: '2.047em', Bigg: '2.470em' }

const NEGATIONS = { '=': '≠', '<': '≮', '>': '≯', '≤': '≰', '≥': '≱', '∈': '∉', '⊂': '⊄', '⊆': '⊈',
  '⊃': '⊅', '⊇': '⊉', '≡': '≢', '∼': '≁', '≈': '≉', '≅': '≇', '∥': '∦', '∣': '∤', '∃': '∄' }

// Unicode's mathematical alphabets stand in for \mathbb, \mathbf and friends.
const ALPHABETS = {
  bold: { upper: 0x1d400, lower: 0x1d41a, digit: 0x1d7ce },
  bb: { upper: 0x1d538, lower: 0x1d552, digit: 0x1d7d8,
    except: { C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ' } },
  cal: { upper: 0x1d49c, lower: 0x1d4b6,
    except: { B: 'ℬ', E: 'ℰ', F: 'ℱ', H: 'ℋ', I: 'ℐ', L: 'ℒ', M: 'ℳ', R: 'ℛ', e: 'ℯ', g: 'ℊ', o: 'ℴ' } },
  frak: { upper: 0x1d504, lower: 0x1d51e, except: { C: 'ℭ', H: 'ℌ', I: 'ℑ', R: 'ℜ', Z: 'ℨ' } },
  sf: { upper: 0x1d5a0, lower: 0x1d5ba, digit: 0x1d7e2 },
  tt: { upper: 0x1d670, lower: 0x1d68a, digit: 0x1d7f6 },
}

/** Every unknown command seen so far, for the curious (and for debugging content). */
export const unknownCommands = new Set()

const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

function styled(ch, variant) {
  const a = ALPHABETS[variant]
  if (!a) return ch
  if (a.except?.[ch]) return a.except[ch]
  const c = ch.charCodeAt(0)
  if (c >= 65 && c <= 90) return String.fromCodePoint(a.upper + c - 65)
  if (c >= 97 && c <= 122 && a.lower) return String.fromCodePoint(a.lower + c - 97)
  if (c >= 48 && c <= 57 && a.digit) return String.fromCodePoint(a.digit + c - 48)
  return ch
}

const space = em => ({ ml: `<mspace width="${em}em"></mspace>`, kind: 'space' })
const THIN = '<mspace width="0.1667em"></mspace>'

// Atoms are {ml, kind}: kind drives TeX's few spacing rules that MathML does not apply itself.
function join(atoms) {
  let out = ''
  atoms.forEach((a, i) => {
    const next = atoms[i + 1]
    const prev = atoms[i - 1]
    // A sign after "=", a comma or a bracket is a sign, not a subtraction: "c = −2", not "c = − 2".
    out += a.sign && prev && (prev.kind === 'op' || prev.kind === 'open') ? a.ml.replace('<mo>', '<mo form="prefix">') : a.ml
    if (!next) return
    if (a.kind === 'fn' && next.kind !== 'open' && next.kind !== 'op' && next.kind !== 'space') out += THIN
    else if (a.kind === 'ord' && next.kind === 'fn') out += THIN
  })
  return out
}
const row = atoms => (atoms.length === 1 ? atoms[0].ml : `<mrow>${join(atoms)}</mrow>`)

class TexParser {
  constructor(src) {
    this.src = src
    this.pos = 0
    this.variant = null
  }

  atEnd() { return this.pos >= this.src.length }
  skipSpace() { while (!this.atEnd() && /\s/.test(this.src[this.pos])) this.pos++ }
  lookingAt(s) { return this.src.startsWith(s, this.pos) }
  lookingAtCommand(name) {
    return this.src.startsWith('\\' + name, this.pos) &&
      !/[a-zA-Z]/.test(this.src[this.pos + name.length + 1] ?? '')
  }

  // Atoms up to (not including) whatever `stop` recognises, or a closing brace.
  parseList(stop) {
    const atoms = []
    for (;;) {
      this.skipSpace()
      if (this.atEnd() || stop() || this.lookingAt('}')) break
      const sw = /^\\(color|displaystyle|textstyle|scriptstyle)(?![a-zA-Z])/.exec(this.src.slice(this.pos))
      if (sw) {
        // These switch style for the rest of the group, so they wrap everything after them.
        this.pos += sw[0].length
        const attrs = sw[1] === 'color' ? ` mathcolor="${esc(this.readGroupRaw())}"`
          : sw[1] === 'displaystyle' ? ' displaystyle="true" scriptlevel="0"'
          : sw[1] === 'textstyle' ? ' displaystyle="false" scriptlevel="0"'
          : ' displaystyle="false" scriptlevel="1"'
        atoms.push({ ml: `<mstyle${attrs}>${join(this.parseList(stop))}</mstyle>`, kind: 'ord' })
        break
      }
      const atom = this.parseAtom(false)
      if (atom) atoms.push(this.parseScripts(atom))
    }
    return atoms
  }

  // One argument: a {group} or a single token, as in \frac12.
  parseArg() {
    this.skipSpace()
    return this.parseAtom(true)?.ml ?? '<mrow></mrow>'
  }

  parseAtom(single) {
    this.skipSpace()
    const c = this.src[this.pos]
    if (c === undefined) return null
    if (c === '{') {
      this.pos++
      const atoms = this.parseList(() => false)
      if (this.lookingAt('}')) this.pos++
      return { ml: row(atoms), kind: 'ord' }
    }
    if (c === '\\') return this.parseCommand()
    if (c === '^' || c === '_') return { ml: '<mrow></mrow>', kind: 'ord' }
    if (c === '~') { this.pos++; return space(0.25) }
    if (c === '&' || c === '}') { this.pos++; return null }
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(this.src[this.pos + 1] ?? ''))) {
      const m = single ? [c] : /^(?:\d+(?:\.\d+)?|\.\d+)/.exec(this.src.slice(this.pos))
      this.pos += m[0].length
      return { ml: `<mn>${[...m[0]].map(d => styled(d, this.variant)).join('')}</mn>`, kind: 'ord' }
    }
    if (/[a-zA-Z]/.test(c)) {
      this.pos++
      if (this.variant === 'normal' && !single) {
        // \mathrm{cm}: one upright word rather than separate letters.
        const rest = /^[a-zA-Z]*/.exec(this.src.slice(this.pos))[0]
        this.pos += rest.length
        const word = c + rest
        return { ml: word.length > 1 ? `<mi>${word}</mi>` : `<mi mathvariant="normal">${word}</mi>`, kind: 'ord' }
      }
      return { ml: this.mi(c), kind: 'ord' }
    }
    const ch = String.fromCodePoint(this.src.codePointAt(this.pos))
    this.pos += ch.length
    if (/\p{L}/u.test(ch)) return { ml: this.mi(ch), kind: 'ord' }
    return operator(ch)
  }

  mi(ch) {
    if (this.variant === 'normal') return `<mi mathvariant="normal">${esc(ch)}</mi>`
    if (this.variant && this.variant !== 'italic') return `<mi>${styled(ch, this.variant)}</mi>`
    return `<mi>${esc(ch)}</mi>`
  }

  parseScripts(base) {
    let sub = null
    let sup = null
    for (;;) {
      this.skipSpace()
      if (this.lookingAtCommand('limits')) { this.pos += 7; base.limits = true; continue }
      if (this.lookingAtCommand('nolimits')) { this.pos += 9; base.limits = false; continue }
      const c = this.src[this.pos]
      if (c === "'" && sup === null) {
        let n = 0
        while (this.src[this.pos] === "'") { n++; this.pos++ }
        sup = `<mo>${['′', '″', '‴', '⁗'][Math.min(n, 4) - 1]}</mo>`
        continue
      }
      if (c === '^' && sup === null) { this.pos++; sup = this.parseArg(); continue }
      if (c === '_' && sub === null) { this.pos++; sub = this.parseArg(); continue }
      break
    }
    if (sub === null && sup === null) return base
    const tag = base.limits
      ? (sub && sup ? 'munderover' : sub ? 'munder' : 'mover')
      : (sub && sup ? 'msubsup' : sub ? 'msub' : 'msup')
    return { ml: `<${tag}>${base.ml}${sub ?? ''}${sup ?? ''}</${tag}>`, kind: base.kind === 'fn' ? 'fn' : 'ord' }
  }

  parseCommand() {
    this.pos++
    const m = /^[a-zA-Z]+/.exec(this.src.slice(this.pos))
    const name = m ? m[0] : (this.src[this.pos] ?? '')
    this.pos += name.length || 1

    if (name in GREEK) {
      const upright = /^[A-Z]/.test(name) ? ' mathvariant="normal"' : ''
      return { ml: `<mi${upright}>${GREEK[name]}</mi>`, kind: 'ord' }
    }
    if (name in OPENERS) return { ml: `<mo stretchy="false">${esc(OPENERS[name])}</mo>`, kind: 'open' }
    if (name in CLOSERS) return { ml: `<mo stretchy="false">${esc(CLOSERS[name])}</mo>`, kind: 'close' }
    if (name in OPERATORS) return { ml: `<mo>${esc(OPERATORS[name])}</mo>`, kind: 'op', sign: name === 'pm' || name === 'mp' }
    if (name in IDENTIFIERS) return { ml: `<mi mathvariant="normal">${esc(IDENTIFIERS[name])}</mi>`, kind: 'ord' }
    if (name in SPACES) return space(SPACES[name])
    if (FUNCTIONS.has(name)) return { ml: `<mi>${name}</mi>`, kind: 'fn' }
    if (name in LIMIT_OPERATORS) {
      return { ml: `<mo movablelimits="true" form="prefix">${LIMIT_OPERATORS[name]}</mo>`, kind: 'fn', limits: true }
    }
    if (name in BIG_OPERATORS) {
      return { ml: `<mo largeop="true" movablelimits="true">${BIG_OPERATORS[name]}</mo>`, kind: 'op', limits: true }
    }
    if (name in INTEGRALS) return { ml: `<mo largeop="true">${INTEGRALS[name]}</mo>`, kind: 'op', limits: false }
    if (name in ACCENTS) {
      return { ml: `<mover accent="true">${this.parseArg()}<mo stretchy="false">${esc(ACCENTS[name])}</mo></mover>`, kind: 'ord' }
    }
    if (name in WIDE_ACCENTS) {
      return { ml: `<mover accent="true">${this.parseArg()}<mo stretchy="true">${WIDE_ACCENTS[name]}</mo></mover>`,
        kind: 'ord', limits: name === 'overbrace' }
    }
    if (name in UNDER_ACCENTS) {
      return { ml: `<munder accentunder="true">${this.parseArg()}<mo stretchy="true">${UNDER_ACCENTS[name]}</mo></munder>`,
        kind: 'ord', limits: name === 'underbrace' }
    }

    switch (name) {
      case 'frac': case 'dfrac': case 'tfrac': case 'cfrac': {
        const f = `<mfrac>${this.parseArg()}${this.parseArg()}</mfrac>`
        if (name === 'dfrac' || name === 'cfrac') return { ml: `<mstyle displaystyle="true" scriptlevel="0">${f}</mstyle>`, kind: 'ord' }
        if (name === 'tfrac') return { ml: `<mstyle displaystyle="false">${f}</mstyle>`, kind: 'ord' }
        return { ml: f, kind: 'ord' }
      }
      case 'binom': case 'dbinom': case 'tbinom':
        return { ml: `<mrow><mo>(</mo><mfrac linethickness="0">${this.parseArg()}${this.parseArg()}</mfrac><mo>)</mo></mrow>`, kind: 'ord' }
      case 'sqrt': {
        this.skipSpace()
        const index = this.lookingAt('[') ? subParse(this.readBalanced('[', ']')) : null
        const arg = this.parseArg()
        return { ml: index ? `<mroot>${arg}${index}</mroot>` : `<msqrt>${arg}</msqrt>`, kind: 'ord' }
      }
      case 'overline':
        return { ml: `<mrow class="tex-overline">${this.parseArg()}</mrow>`, kind: 'ord' }
      case 'underline':
        return { ml: `<mrow class="tex-underline">${this.parseArg()}</mrow>`, kind: 'ord' }
      case 'left': return this.parseLeftRight()
      case 'right': case 'middle': this.readDelimiter(); return null
      case 'text': case 'textrm': case 'textnormal': case 'textup': case 'mbox': case 'textit':
      case 'emph': case 'textbf': case 'textsf': case 'texttt': {
        const style = name === 'textit' || name === 'emph' ? ' style="font-style:italic"'
          : name === 'textbf' ? ' style="font-weight:bold"' : ''
        // MathML trims spaces at the ends of text, but "\text{ if }" needs them.
        const t = this.readGroupRaw().replace(/^ +| +$/g, s => ' '.repeat(s.length))
        return { ml: `<mtext${style}>${esc(t)}</mtext>`, kind: 'ord' }
      }
      case 'operatorname': {
        const star = this.lookingAt('*') ? (this.pos++, true) : false
        const t = esc(this.readGroupRaw())
        if (star) return { ml: `<mo movablelimits="true" form="prefix">${t}</mo>`, kind: 'fn', limits: true }
        return { ml: t.length > 1 ? `<mi>${t}</mi>` : `<mi mathvariant="normal">${t}</mi>`, kind: 'fn' }
      }
      case 'mathrm': case 'mathup': return this.withVariant('normal')
      case 'mathit': return this.withVariant('italic')
      case 'mathbf': case 'boldsymbol': case 'bm': case 'mathbfit': return this.withVariant('bold')
      case 'mathbb': return this.withVariant('bb')
      case 'mathcal': case 'mathscr': return this.withVariant('cal')
      case 'mathfrak': return this.withVariant('frak')
      case 'mathsf': return this.withVariant('sf')
      case 'mathtt': return this.withVariant('tt')
      case 'overset': case 'stackrel': {
        const over = this.parseArg()
        return { ml: `<mover>${this.parseArg()}${over}</mover>`, kind: 'op' }
      }
      case 'underset': {
        const under = this.parseArg()
        return { ml: `<munder>${this.parseArg()}${under}</munder>`, kind: 'op' }
      }
      case 'textcolor': {
        const color = esc(this.readGroupRaw())
        return { ml: `<mstyle mathcolor="${color}">${this.parseArg()}</mstyle>`, kind: 'ord' }
      }
      case 'boxed': return { ml: `<mrow class="tex-boxed">${this.parseArg()}</mrow>`, kind: 'ord' }
      case 'cancel': case 'bcancel': case 'xcancel':
        return { ml: `<mrow class="tex-${name}">${this.parseArg()}</mrow>`, kind: 'ord' }
      case 'phantom': case 'hphantom': case 'vphantom':
        return { ml: `<mphantom>${this.parseArg()}</mphantom>`, kind: 'ord' }
      case 'not': {
        const next = this.parseAtom(true)
        const ch = (next?.ml ?? '').replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        return { ml: `<mo>${esc(NEGATIONS[ch] ?? ch + '̸')}</mo>`, kind: 'op' }
      }
      case 'mod': case 'bmod': return { ml: '<mo lspace="0.2222em" rspace="0.2222em">mod</mo>', kind: 'op' }
      case 'pmod':
        return { ml: `<mrow><mspace width="0.4em"></mspace><mo stretchy="false">(</mo><mi>mod</mi>${THIN}${THIN}${this.parseArg()}<mo stretchy="false">)</mo></mrow>`, kind: 'ord' }
      case 'big': case 'Big': case 'bigg': case 'Bigg': case 'bigl': case 'Bigl': case 'biggl':
      case 'Biggl': case 'bigr': case 'Bigr': case 'biggr': case 'Biggr': case 'bigm': case 'Bigm':
      case 'biggm': case 'Biggm': {
        const size = DELIMITER_SIZES[name.replace(/[lrm]$/, '')]
        const d = this.readDelimiter()
        const kind = name.endsWith('l') ? 'open' : name.endsWith('r') ? 'close' : 'ord'
        return { ml: `<mo stretchy="true" symmetric="true" minsize="${size}" maxsize="${size}">${esc(d)}</mo>`, kind }
      }
      case 'begin': return this.parseEnvironment()
      case 'hspace': case 'hskip': case 'kern': case 'mkern': case 'mspace': {
        this.skipSpace()
        let len = ''
        if (this.lookingAt('{')) len = this.readGroupRaw()
        else {
          len = (/^-?[\d.]+\s*[a-z]{2}/.exec(this.src.slice(this.pos)) ?? [''])[0]
          this.pos += len.length
        }
        const em = parseLength(len)
        return em > 0 ? space(em) : null
      }
      case 'label': case 'tag': this.readGroupRaw(); return null
      case 'end': case 'nonumber': case 'notag': case 'limits': case 'nolimits': case '!':
      case '\\': case 'newline': case 'cr': case 'displaystyle': case 'textstyle': case 'scriptstyle':
        return null
      case 'color': this.readGroupRaw(); return null
    }
    unknownCommands.add('\\' + name)
    return { ml: `<merror><mtext>\\${esc(name)}</mtext></merror>`, kind: 'ord' }
  }

  withVariant(v) {
    const prev = this.variant
    this.variant = v
    const ml = this.parseArg()
    this.variant = prev
    return { ml, kind: 'ord' }
  }

  // The raw text of a {group}, braces balanced; or one character if there are no braces.
  readGroupRaw() {
    this.skipSpace()
    if (!this.lookingAt('{')) return this.atEnd() ? '' : this.src[this.pos++]
    return this.readBalanced('{', '}')
  }

  readBalanced(open, close) {
    let depth = 0
    const start = this.pos + 1
    for (; !this.atEnd(); this.pos++) {
      const c = this.src[this.pos]
      if (c === '\\') { this.pos++; continue }
      if (c === open) depth++
      else if (c === close && --depth === 0) { this.pos++; return this.src.slice(start, this.pos - 1) }
    }
    return this.src.slice(start)
  }

  readDelimiter() {
    this.skipSpace()
    if (this.atEnd()) return ''
    if (this.lookingAt('\\')) {
      this.pos++
      const m = /^[a-zA-Z]+/.exec(this.src.slice(this.pos))
      const name = m ? m[0] : this.src[this.pos]
      this.pos += name.length
      return OPENERS[name] ?? CLOSERS[name] ?? OPERATORS[name] ?? (name === '|' ? '‖' : name)
    }
    const c = this.src[this.pos++]
    return c === '.' ? '' : c
  }

  parseLeftRight() {
    const open = this.readDelimiter()
    let inner = ''
    for (;;) {
      inner += join(this.parseList(() => this.lookingAtCommand('right') || this.lookingAtCommand('middle')))
      if (!this.lookingAtCommand('middle')) break
      this.pos += 7
      inner += `<mo stretchy="true" symmetric="true">${esc(this.readDelimiter())}</mo>`
    }
    let close = ''
    if (this.lookingAtCommand('right')) { this.pos += 6; close = this.readDelimiter() }
    const fence = (d, form) => (d ? `<mo fence="true" stretchy="true" symmetric="true" form="${form}">${esc(d)}</mo>` : '')
    return { ml: `<mrow>${fence(open, 'prefix')}${inner}${fence(close, 'postfix')}</mrow>`, kind: 'open' }
  }

  parseEnvironment() {
    const name = this.readGroupRaw().trim()
    const spec = name === 'array' ? this.readGroupRaw().replace(/[^lcr]/g, '') : null
    const rows = []
    let cells = []
    for (;;) {
      cells.push(join(this.parseList(() => this.lookingAt('&') || this.lookingAt('\\\\') || this.lookingAtCommand('end'))))
      if (this.lookingAt('&')) { this.pos++; continue }
      if (this.lookingAt('\\\\')) {
        this.pos += 2
        this.skipSpace()
        if (this.lookingAt('[')) this.readBalanced('[', ']')
        rows.push(cells)
        cells = []
        continue
      }
      if (this.lookingAtCommand('end')) { this.pos += 4; this.readGroupRaw() }
      break
    }
    if (cells.length > 1 || cells[0]) rows.push(cells)
    return { ml: table(name.replace(/\*$/, ''), rows, spec), kind: 'ord' }
  }
}

function operator(ch) {
  switch (ch) {
    case '(': case '[': return { ml: `<mo stretchy="false">${ch}</mo>`, kind: 'open' }
    case ')': case ']': return { ml: `<mo stretchy="false">${ch}</mo>`, kind: 'close' }
    case '|': return { ml: '<mo stretchy="false">|</mo>', kind: 'ord' }
    case '-': return { ml: '<mo>−</mo>', kind: 'op', sign: true }
    case '+': return { ml: '<mo>+</mo>', kind: 'op', sign: true }
    case '*': return { ml: '<mo>∗</mo>', kind: 'op' }
    case '/': return { ml: '<mo lspace="0" rspace="0">/</mo>', kind: 'op' }
    case "'": return { ml: '<mo>′</mo>', kind: 'ord' }
    default: return { ml: `<mo>${esc(ch)}</mo>`, kind: 'op' }
  }
}

const FENCES = { pmatrix: ['(', ')'], bmatrix: ['[', ']'], Bmatrix: ['{', '}'], vmatrix: ['|', '|'],
  Vmatrix: ['‖', '‖'], cases: ['{', ''], rcases: ['', '}'] }
const ALIGNED = new Set(['aligned', 'align', 'alignat', 'alignedat', 'split', 'eqnarray', 'flalign'])

function table(name, rows, spec) {
  const cols = Math.max(1, ...rows.map(r => r.length))
  const aligned = ALIGNED.has(name)
  const cls = aligned ? 'tex-aligned' : name === 'cases' || name === 'rcases' ? 'tex-cases'
    : name === 'array' ? 'tex-array' : 'tex-matrix'
  const alignOf = j => (spec ? { l: 'left', r: 'right' }[spec[j]]
    : aligned ? (j % 2 ? 'left' : 'right')
    : name === 'cases' || name === 'rcases' ? 'left' : null)
  const body = rows.map(r => '<mtr>' + Array.from({ length: cols }, (_, j) => {
    // In "a &= b" the second cell starts with "=", which needs something in front of it to keep its spacing.
    const cell = (aligned && j % 2 ? '<mi></mi>' : '') + (r[j] ?? '')
    // Firefox and Safari read columnalign; Chrome ignores it and plain text-align, but honours -webkit-left/right.
    const al = alignOf(j)
    return `<mtd${al ? ` columnalign="${al}" style="text-align:-webkit-${al}"` : ''}>${cell}</mtd>`
  }).join('') + '</mtr>').join('')
  const display = aligned || name === 'gathered' || name === 'gather' ? ' displaystyle="true"' : ''
  const small = name === 'smallmatrix' ? ' scriptlevel="1"' : ''
  const t = `<mtable class="${cls}"${display}${small}>${body}</mtable>`
  const f = FENCES[name]
  if (!f) return t
  const fence = d => (d ? `<mo fence="true" stretchy="true" symmetric="true">${esc(d)}</mo>` : '')
  return `<mrow>${fence(f[0])}${t}${fence(f[1])}</mrow>`
}

function parseLength(s) {
  const m = /(-?[\d.]+)\s*(em|ex|pt|mu|px)?/.exec(s ?? '')
  if (!m) return 0
  const n = parseFloat(m[1])
  return { em: n, ex: n * 0.43, pt: n / 10, mu: n / 18, px: n / 16 }[m[2] ?? 'em'] ?? n
}

function subParse(src) {
  const p = new TexParser(src)
  return row(p.parseList(() => false))
}

/** Translates LaTeX math to a MathML string. `display` makes it a centred block, as $$...$$ does. */
export function texToMathML(tex, display = false) {
  let body
  try {
    const p = new TexParser(tex)
    const atoms = []
    while (!p.atEnd()) {
      atoms.push(...p.parseList(() => false))
      if (!p.atEnd()) p.pos++ // a stray closing brace
    }
    body = join(atoms)
  } catch (e) {
    return `<code class="tex-error" title="${esc(String(e.message))}">${esc(tex)}</code>`
  }
  return `<math${display ? ' display="block"' : ''}><semantics><mrow>${body}</mrow>` +
    `<annotation encoding="application/x-tex">${esc(tex)}</annotation></semantics></math>`
}
