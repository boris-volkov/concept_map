// Quizzes: written as ```quiz blocks inside a concept, drawn as small interactive cards.
//
//   Q: What is $\operatorname{lcm}(4, 6)$?
//   - 2
//   + 12
//   - 24
//   Why: 12 is the first number on both lists of multiples.
//
//   Q: Add: $\frac14 + \frac16$
//   A: 5/12
//
// "-" marks a wrong choice and "+" the right one. "A:" asks for a typed answer; a
// numeric answer also accepts equivalent forms (10/24, 0.4167). "Hint:" is shown
// after a wrong try, "Why:" after the right answer.

import { renderInline, renderMarkdown, esc } from './markdown.js'

const KEYWORD = /^(Q|A|Hint|Why|Explanation)\s*:\s?(.*)$/i
const CHOICE = /^([+-])\s+(.*)$/

/** Parses the lines of a ```quiz block. lines: [{text, line}]; report(line, message) collects problems. */
export function parseQuiz(lines, report) {
  const questions = []
  let q = null
  let field = null
  for (const { text, line } of lines) {
    const t = text.trim()
    const k = KEYWORD.exec(t)
    if (k) {
      const key = k[1].toLowerCase()
      if (key === 'q') {
        q = { prompt: k[2], choices: [], answerText: null, answer: null, hint: '', why: '', line }
        questions.push(q)
        field = 'prompt'
      } else if (!q) {
        report(line, `“${k[1]}:” comes before the first “Q:” line.`)
      } else if (key === 'a') {
        q.answerText = k[2]
        q.answerLine = line
        field = 'answer'
      } else if (key === 'hint') {
        q.hint = k[2]
        field = 'hint'
      } else {
        q.why = k[2]
        field = 'why'
      }
      continue
    }
    const c = CHOICE.exec(t)
    if (c && q && (field === 'prompt' || field === 'choice')) {
      q.choices.push({ text: c[2], right: c[1] === '+' })
      field = 'choice'
      continue
    }
    if (!t) {
      if (q && (field === 'why' || field === 'hint' || field === 'prompt')) q[field] += '\n\n'
      continue
    }
    if (!q) { report(line, 'Text before the first “Q:” line.'); continue }
    if (field === 'choice') q.choices.at(-1).text += ' ' + t
    else if (field === 'answer') report(line, 'Put any explanation on a “Why:” line rather than under “A:”.')
    else q[field] += '\n' + text
  }

  return questions.filter(q => {
    if (!q.prompt.trim()) { report(q.line, 'A question has no text after “Q:”.'); return false }
    if (q.choices.length) {
      if (q.answerText !== null) report(q.answerLine, 'This question has both choices and an “A:” line; the choices are used.')
      if (q.choices.length < 2) { report(q.line, 'A multiple-choice question needs at least two choices.'); return false }
      if (!q.choices.some(ch => ch.right)) {
        report(q.line, 'No choice is marked right: start the right one with “+” instead of “-”.')
        return false
      }
      return true
    }
    if (q.answerText === null) {
      report(q.line, 'This question has neither choices (lines starting “-” or “+”) nor an answer (“A: …”).')
      return false
    }
    q.answer = parseAnswer(q.answerText)
    if (!q.answer) { report(q.answerLine, '“A:” has nothing after it.'); return false }
    return true
  })
}

function parseAnswer(raw) {
  let s = raw.trim()
  if (!s) return null
  let tol = null
  const pm = /\s*(?:±|\+-|\+\/-)\s*([\d.]+)\s*$/.exec(s)
  if (pm) { tol = parseFloat(pm[1]); s = s.slice(0, pm.index).trim() }
  const alts = s.split(/\s*\|\s*/).filter(Boolean)
  const numbers = alts.map(parseNumber)
  if (numbers.every(Boolean)) return { kind: 'number', values: numbers, tol, shown: alts[0] }
  return { kind: 'text', values: alts.map(normalize), shown: alts[0] }
}

/** Reads 3, -2.5, 5/12, 1 1/2, 1,000 or "x = 3". Returns {value, decimals} or null. */
export function parseNumber(s) {
  const t = String(s).trim().replace(/[−–]/g, '-').replace(/(\d),(?=\d{3}\b)/g, '$1').replace(/^[a-z]\s*=\s*/i, '')
  let m
  if ((m = /^([+-]?)(\d+)\s+(\d+)\s*\/\s*(\d+)$/.exec(t))) {
    const v = +m[2] + +m[3] / +m[4]
    return { value: m[1] === '-' ? -v : v, decimals: null }
  }
  if ((m = /^([+-]?(?:\d+\.?\d*|\.\d+))\s*\/\s*([+-]?(?:\d+\.?\d*|\.\d+))$/.exec(t))) {
    const d = parseFloat(m[2])
    return d ? { value: parseFloat(m[1]) / d, decimals: null } : null
  }
  if (/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(t)) {
    const dot = t.indexOf('.')
    return { value: parseFloat(t), decimals: dot === -1 ? 0 : t.length - dot - 1 }
  }
  return null
}

const normalize = s => s.toLowerCase().replace(/\$/g, '').replace(/\s+/g, ' ').replace(/[.!]+$/, '').trim()

/** Whether a typed response matches the expected answer. */
export function isRight(answer, response) {
  if (answer.kind === 'text') return answer.values.includes(normalize(response))
  const r = parseNumber(response)
  if (!r) return false
  return answer.values.some(v => {
    const diff = Math.abs(r.value - v.value)
    if (answer.tol !== null) return diff <= answer.tol + 1e-12
    // An answer written as a decimal is matched to the precision it is written with.
    if (v.decimals > 0) return diff <= 0.5 * 10 ** -v.decimals + 1e-12
    if (diff <= 1e-9 * Math.max(1, Math.abs(v.value))) return true
    // For a fraction answer like 5/12, a correctly rounded decimal (0.42, 0.417) also counts.
    return v.decimals === null && r.decimals >= 2 && diff <= 0.5 * 10 ** -r.decimals + 1e-12
  })
}

/**
 * Draws a quiz into `root`, one question at a time.
 * onFinish(rightFirstTime, total) runs when the last question is answered.
 */
export function mountQuiz(root, questions, { onFinish, resolve } = {}) {
  const opts = { resolve }
  let index = 0
  let firstTry = 0
  let tries = 0
  root.classList.add('quiz')

  const show = () => {
    const q = questions[index]
    tries = 0
    root.innerHTML = `
      <div class="quiz-meta">${questions.length > 1 ? `Question ${index + 1} of ${questions.length}` : 'Question'}</div>
      <div class="quiz-prompt">${renderMarkdown(q.prompt, opts)}</div>
      ${q.choices.length
        ? `<div class="quiz-choices">${q.choices.map((c, i) =>
          `<button type="button" class="quiz-choice" data-i="${i}">${renderInline(c.text, opts)}</button>`).join('')}</div>`
        : `<form class="quiz-form"><input type="text" autocomplete="off" spellcheck="false" placeholder="Your answer" aria-label="Your answer">` +
          '<button type="submit">Check</button></form>'}
      <div class="quiz-feedback" aria-live="polite"></div>`
    const feedback = root.querySelector('.quiz-feedback')

    const solved = () => {
      if (tries === 1) firstTry++
      const last = index === questions.length - 1
      feedback.className = 'quiz-feedback right'
      feedback.innerHTML = `<p><strong>Right.</strong> ${q.why ? renderMarkdown(q.why, opts).replace(/^<p>|<\/p>$/g, '') : ''}</p>` +
        `<button type="button" class="quiz-next">${last ? 'Finish' : 'Next question'}</button>`
      const next = feedback.querySelector('.quiz-next')
      next.onclick = () => (last ? finish() : (index++, show()))
      next.focus({ preventScroll: true })
    }
    const wrong = () => {
      feedback.className = 'quiz-feedback wrong'
      feedback.innerHTML = `<p><strong>Not quite.</strong> ${q.hint ? renderInline(q.hint, opts) : 'Have another go.'}</p>`
    }

    if (q.choices.length) {
      root.querySelectorAll('.quiz-choice').forEach(btn => {
        btn.onclick = () => {
          tries++
          const choice = q.choices[+btn.dataset.i]
          btn.classList.add(choice.right ? 'is-right' : 'is-wrong')
          btn.disabled = true
          if (!choice.right) return wrong()
          root.querySelectorAll('.quiz-choice').forEach(b => { b.disabled = true })
          solved()
        }
      })
    } else {
      const form = root.querySelector('.quiz-form')
      const input = form.querySelector('input')
      form.onsubmit = e => {
        e.preventDefault()
        if (!input.value.trim()) return
        tries++
        if (isRight(q.answer, input.value)) {
          input.classList.add('is-right')
          input.disabled = true
          form.querySelector('button').disabled = true
          return solved()
        }
        input.classList.add('is-wrong')
        setTimeout(() => input.classList.remove('is-wrong'), 600)
        wrong()
        if (tries >= 2) {
          const reveal = document.createElement('button')
          reveal.type = 'button'
          reveal.className = 'quiz-reveal'
          reveal.textContent = 'Show the answer'
          reveal.onclick = () => {
            input.value = q.answer.shown
            input.disabled = true
            form.querySelector('button').disabled = true
            tries = Infinity
            feedback.className = 'quiz-feedback shown'
            feedback.innerHTML = `<p>The answer is <strong>${renderInline(q.answer.shown, opts)}</strong>. ` +
              `${q.why ? renderInline(q.why, opts) : ''}</p><button type="button" class="quiz-next">` +
              `${index === questions.length - 1 ? 'Finish' : 'Next question'}</button>`
            feedback.querySelector('.quiz-next').onclick = () => (index === questions.length - 1 ? finish() : (index++, show()))
          }
          feedback.append(reveal)
        }
      }
    }
  }

  const finish = () => {
    const total = questions.length
    const all = firstTry === total
    root.innerHTML = `<div class="quiz-done">
      <div class="quiz-score">${firstTry}<span>/${total}</span></div>
      <p>${all ? 'All right on the first try. Marked as mastered.' : `${esc(String(firstTry))} of ${total} right on the first try.`}</p>
      <button type="button" class="quiz-again">Try again</button></div>`
    root.querySelector('.quiz-again').onclick = () => { index = 0; firstTry = 0; show() }
    onFinish?.(firstTry, total)
  }

  show()
}
