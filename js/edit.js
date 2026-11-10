// The editor: adding a card, or changing one, from the map instead of in the Markdown.
//
// It is only ever loaded on the author's own computer, when the page is served by serve.py,
// which is what can save a file (see main.js). A pencil on an open card, or the Add button on an
// open topic, opens a dialog: the form on the left, and on the right the card as the map will
// draw it, redrawn as it is typed. Saving rewrites only that card's lines in its content file
// (see source.js), after the same checks that fill "content problems" have passed on the result.

import { fetchText, buildAtlas, slugify, KINDS } from './content.js'
import { readSection, blankSection, replaceSection, appendSections } from './source.js'
import { draftDoc } from './docs.js'
import { renderInline, esc } from './markdown.js'

const CONTENT = 'content/'
const CARD_KINDS = ['theorem', 'definition', 'property', 'formula', 'form', 'skill', 'technique', 'heuristic', 'rule', 'axiom', 'concept']
const lf = s => s.replace(/\r\n/g, '\n')
const blankQuestion = () => ({ prompt: '', choices: [{ text: '', right: true }, { text: '', right: false }], answer: '', hint: '', why: '' })

export class Editor {
  /** getAtlas(), getSources(): what the page has loaded; search: its Search; onSaved(id) once a file is written. */
  constructor({ getAtlas, getSources, search, onSaved }) {
    Object.assign(this, { getAtlas, getSources, search, onSaved })
    const d = this.dialog = document.createElement('dialog')
    d.className = 'editor'
    d.innerHTML = `<header class="ed-head"><h2></h2><button type="button" class="ed-shut" title="Close without saving (Esc)" aria-label="Close">×</button></header>
      <div class="ed-main"><form class="ed-form" autocomplete="off"></form>
        <div class="ed-side"><div class="ed-side-label">As it will read on the map</div><div class="ed-card node leaf doc"></div></div></div>
      <footer class="ed-foot"><ul class="ed-problems" aria-live="polite"></ul>
        <span class="ed-where"></span>
        <button type="button" class="ed-cancel">Cancel</button>
        <button type="button" class="ed-save" title="Save (Ctrl+Enter)">Save</button></footer>`
    document.body.append(d)
    this.form = d.querySelector('.ed-form')
    this.form.addEventListener('submit', e => e.preventDefault())
    this.form.addEventListener('input', e => this.typed(e))
    this.form.addEventListener('click', e => this.clicked(e))
    this.form.addEventListener('keydown', e => this.picking(e))
    d.querySelector('.ed-shut').onclick = d.querySelector('.ed-cancel').onclick = () => this.close()
    d.querySelector('.ed-save').onclick = () => this.save()
    d.querySelector('.ed-card').addEventListener('click', e => e.preventDefault()) // a link in it goes nowhere from here
    d.addEventListener('cancel', e => { e.preventDefault(); this.close() }) // Esc
    d.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) this.save() })
  }

  /** Opens the editor on a card, or on a topic's own title and text. */
  async edit(n) {
    await this.begin(n.file, text => {
      this.node = n
      this.parent = null
      this.card = readSection(text, n)
      this.topic = null
      this.isTopic = n.children.length > 0
    }, `Edit: ${n.plainTitle}`, n)
  }

  /** Opens the editor on a new card inside a subject or topic. */
  async add(parent) {
    await this.begin(parent.file, () => {
      this.node = null
      this.parent = parent
      this.card = blankSection('theorem')
      this.topic = null
      this.isTopic = false
    }, `Add to ${parent.plainTitle}`, parent)
  }

  async begin(file, set, title, colored) {
    if (this.dialog.open) return
    let text
    try {
      text = lf(await fetchText(CONTENT + file)) // as it is on disk now, which is what a save is checked against
      this.file = file
      this.base = text
      set(text)
    } catch (e) {
      return alert(e.message)
    }
    this.started = this.snapshot()
    this.dialog.style.setProperty('--c', colored.color)
    this.dialog.querySelector('.ed-head h2').textContent = title
    this.dialog.querySelector('.ed-where').textContent = `content/${file}`
    this.draw()
    this.dialog.showModal()
    this.form.querySelector('[data-f="title"]')?.focus()
  }

  snapshot() {
    const strip = s => s && { ...s, from: null }
    return JSON.stringify([strip(this.card), strip(this.topic)])
  }

  close() {
    if (this.snapshot() !== this.started && !confirm('Close without saving what you have written?')) return
    this.dialog.close()
  }

  // ---- the form ----

  draw() {
    const adding = !this.node
    const kinds = (part, chosen, withTopic) => `<div class="ed-kinds" data-part="${part}" role="group" aria-label="Kind">
        ${[...CARD_KINDS, ...(withTopic ? ['topic'] : [])].map(k =>
          `<button type="button" data-kind="${k}" class="kind-${k}${k === chosen ? ' is-on' : ''}" aria-pressed="${k === chosen}">${KINDS[k]}</button>`).join('')}</div>`
    const cardFields = c => `
      ${field('Title', `<input type="text" data-f="title" value="${esc(c.title)}" placeholder="Mean Value Theorem">`)}
      ${field('Id', `<input type="text" data-f="id" value="${esc(c.id)}" placeholder="${esc(this.autoId(c))}" spellcheck="false">`,
        'Its web address and what other cards call it. Leave empty to make it from the title.')}
      ${field('Prerequisites', this.chips('prereqs', c.prereqs), 'Only what this cannot be stated, done or proved without.', 'div')}
      ${field('Content', `<textarea data-f="body" rows="14" spellcheck="true" placeholder="The formal statement, with no blank line inside it.\n\nThen proofs, examples and remarks.">${esc(c.body)}</textarea>`,
        'Markdown, with math between $ signs. The first paragraph is the statement, set in the box.')}
      ${c.quiz === null
        ? '<p class="ed-note">This card’s quizzes are not one block at the end of its text, so they are edited in the text above.</p>'
        : `<div class="ed-field"><span class="ed-label">Quiz</span>${c.quiz.map((q, i) => this.question(q, i, c.quiz.length)).join('')}
            <button type="button" class="ed-plain" data-do="add-question">Add a question</button></div>`}`

    let html
    if (this.isTopic) {
      html = `<div data-part="card">
        ${field('Title', `<input type="text" data-f="title" value="${esc(this.card.title)}">`)}
        ${field('Id', `<input type="text" data-f="id" value="${esc(this.card.id)}" placeholder="${esc(this.autoId(this.card))}" spellcheck="false">`)}
        ${field('Text', `<textarea data-f="body" rows="16">${esc(this.card.body)}</textarea>`,
          'The first paragraph is the summary on its card. The rest is its README, under the i on its open frame.')}</div>`
    } else if (this.topic) {
      html = `<div class="ed-label">What to add</div>${kinds('new', 'topic', true)}
        <div data-part="topic">
          ${field('Topic title', `<input type="text" data-f="title" value="${esc(this.topic.title)}" placeholder="Quadratics">`)}
          ${field('Summary', `<textarea data-f="body" rows="3" placeholder="One paragraph: what the topic holds.">${esc(this.topic.body)}</textarea>`)}
          ${field('Built on', this.chips('builtOn', this.topic.builtOn), 'The topics beside it that it could not be learned without.', 'div')}
        </div>
        <h3 class="ed-sub">Its first card</h3>
        <p class="ed-note">A topic is a heading with cards under it, so it starts with one.</p>
        ${kinds('card', this.card.kind, false)}
        <div data-part="card">${cardFields(this.card)}</div>`
    } else {
      html = `${adding ? '<div class="ed-label">What to add</div>' : ''}${kinds(adding ? 'new' : 'card', this.card.kind, adding)}
        <div data-part="card">${cardFields(this.card)}</div>`
    }
    this.form.innerHTML = html
    this.changed()
  }

  autoId(s) {
    return s.from && slugify(s.title) !== s.from.autoId && !s.from.id ? s.from.autoId : slugify(s.title)
  }

  /** The id a section will have once saved. */
  idOf(s) {
    return s.id || this.autoId(s)
  }

  chips(list, ids) {
    const atlas = this.getAtlas()
    return `<div class="ed-chips" data-list="${list}">${ids.map(id => {
      const n = atlas.nodes.get(id)
      return `<span class="ed-chip${n ? '' : ' is-unknown'}" style="--c:${n?.color ?? 'var(--wrong)'}">${n ? renderInline(n.title) : esc(id)}` +
        `<button type="button" data-do="unpick" data-id="${esc(id)}" aria-label="Remove">×</button></span>`
    }).join('')}</div>
      <div class="ed-picker"><input type="text" data-pick="${list}" placeholder="Type a name to add one" aria-label="Add">
        <ul class="ed-results" hidden></ul></div>`
  }

  question(q, i, count) {
    const typed = !q.choices.length
    return `<fieldset class="ed-q" data-q="${i}">
      <legend>Question ${i + 1}</legend>
      <div class="ed-q-tools">
        <button type="button" class="ed-plain" data-do="q-up" ${i ? '' : 'disabled'} title="Move up">↑</button>
        <button type="button" class="ed-plain" data-do="q-down" ${i < count - 1 ? '' : 'disabled'} title="Move down">↓</button>
        <button type="button" class="ed-plain" data-do="q-remove">Remove</button>
      </div>
      <textarea data-qf="prompt" rows="2" placeholder="The question" aria-label="Question">${esc(q.prompt)}</textarea>
      <div class="ed-q-type">
        <label><input type="radio" name="qt${i}" data-do="q-choices" ${typed ? '' : 'checked'}> Choices</label>
        <label><input type="radio" name="qt${i}" data-do="q-typed" ${typed ? 'checked' : ''}> Typed answer</label>
      </div>
      ${typed
        ? `<input type="text" data-qf="answer" value="${esc(q.answer)}" placeholder="5/12   or   2.65   or   commutative | commutativity" aria-label="Answer">`
        : `${q.choices.map((c, k) => `<div class="ed-choice" data-c="${k}">
            <label title="The right answer"><input type="checkbox" data-cf="right" ${c.right ? 'checked' : ''}> right</label>
            <input type="text" data-cf="text" value="${esc(c.text)}" placeholder="A choice" aria-label="Choice ${k + 1}">
            <button type="button" class="ed-plain" data-do="c-remove" aria-label="Remove this choice">×</button></div>`).join('')}
          <button type="button" class="ed-plain" data-do="c-add">Add a choice</button>`}
      <input type="text" data-qf="hint" value="${esc(q.hint)}" placeholder="Hint, shown after a wrong try (optional)" aria-label="Hint">
      <textarea data-qf="why" rows="2" placeholder="Why, shown after the right answer (optional)" aria-label="Why">${esc(q.why)}</textarea>
    </fieldset>`
  }

  // Reads what is in the form's boxes into the sections.
  collect() {
    for (const part of this.form.querySelectorAll('[data-part="card"], [data-part="topic"]')) {
      if (part.classList.contains('ed-kinds')) continue
      const s = part.dataset.part === 'topic' ? this.topic : this.card
      for (const el of part.querySelectorAll('[data-f]')) {
        s[el.dataset.f] = el.dataset.f === 'id' ? el.value.trim().toLowerCase() : el.dataset.f === 'title' ? el.value : lf(el.value)
      }
      for (const box of part.querySelectorAll('.ed-q')) {
        const q = s.quiz[+box.dataset.q]
        for (const el of box.querySelectorAll('[data-qf]')) q[el.dataset.qf] = lf(el.value).trim()
        for (const row of box.querySelectorAll('.ed-choice')) {
          const c = q.choices[+row.dataset.c]
          c.text = row.querySelector('[data-cf="text"]').value.trim()
          c.right = row.querySelector('[data-cf="right"]').checked
        }
      }
    }
  }

  typed(e) {
    if (e.target.dataset.pick) return this.suggest(e.target)
    this.collect()
    if (e.target.dataset.f === 'title') {
      const id = e.target.closest('[data-part]').querySelector('[data-f="id"]')
      if (id) id.placeholder = this.autoId(e.target.closest('[data-part]').dataset.part === 'topic' ? this.topic : this.card)
    }
    this.changed()
  }

  clicked(e) {
    const kind = e.target.closest('[data-kind]')
    const doer = e.target.closest('[data-do]')
    const pick = e.target.closest('[data-pick-id]')
    if (!kind && !doer && !pick) return
    this.collect()
    if (pick) return this.pick(pick.closest('.ed-picker').querySelector('[data-pick]').dataset.pick, pick.dataset.pickId)
    if (kind) {
      const k = kind.dataset.kind
      if (kind.parentElement.dataset.part === 'new') {
        // Choosing Topic asks for the topic and for its first card; choosing a kind goes back to one card.
        if (k === 'topic') this.topic ??= blankSection('topic')
        else { this.topic = null; this.card.kind = k }
      } else this.card.kind = k
      return this.draw()
    }
    const s = doer.closest('[data-part="topic"]') ? this.topic : this.card
    const q = doer.closest('.ed-q') && +doer.closest('.ed-q').dataset.q
    const swap = (a, b) => { [s.quiz[a], s.quiz[b]] = [s.quiz[b], s.quiz[a]] }
    switch (doer.dataset.do) {
      case 'unpick': {
        const list = doer.closest('[data-list]').dataset.list
        s[list] = s[list].filter(id => id !== doer.dataset.id)
        break
      }
      case 'add-question': s.quiz.push(blankQuestion()); break
      case 'q-remove': s.quiz.splice(q, 1); break
      case 'q-up': swap(q, q - 1); break
      case 'q-down': swap(q, q + 1); break
      case 'q-typed': s.quiz[q].choices = []; break
      case 'q-choices': if (!s.quiz[q].choices.length) s.quiz[q].choices = blankQuestion().choices; break
      case 'c-add': s.quiz[q].choices.push({ text: '', right: false }); break
      case 'c-remove': s.quiz[q].choices.splice(+doer.closest('.ed-choice').dataset.c, 1); break
      default: return
    }
    this.draw()
    if (doer.dataset.do === 'add-question') this.form.querySelector('.ed-q:last-of-type [data-qf="prompt"]')?.focus()
  }

  // ---- choosing prerequisites ----

  candidates(list, q) {
    const atlas = this.getAtlas()
    const s = list === 'builtOn' ? this.topic : this.card
    const taken = new Set([...s[list], this.node?.id])
    if (list === 'builtOn') {
      // A topic is built on topics beside it, and on nothing else.
      const words = q.toLowerCase().split(/\s+/)
      return this.parent.children.filter(n => !taken.has(n.id) && words.every(w => n.plainTitle.toLowerCase().includes(w) || n.id.includes(w)))
    }
    return this.search.find(q, 40).filter(n => atlas.nodes.get(n.id) === n && !taken.has(n.id) && n.depth > 0)
  }

  suggest(input) {
    const box = input.parentElement.querySelector('.ed-results')
    const found = input.value.trim() ? this.candidates(input.dataset.pick, input.value).slice(0, 8) : []
    box.hidden = !found.length
    box.innerHTML = found.map((n, i) => `<li data-pick-id="${esc(n.id)}" class="${i ? '' : 'is-active'}" style="--c:${n.color}">
        <span>${renderInline(n.title)}</span><small>${esc(n.parent && !n.parent.isRoot ? n.parent.plainTitle : '')} · ${esc(n.id)}</small></li>`).join('')
  }

  // In the box for adding one: the arrows move through the suggestions, and Enter takes one.
  picking(e) {
    const input = e.target.dataset?.pick && e.target
    if (!input) return
    const items = [...input.parentElement.querySelectorAll('[data-pick-id]')]
    const at = items.findIndex(li => li.classList.contains('is-active'))
    if (e.key === 'Enter') {
      e.preventDefault()
      if (items[at]) { this.collect(); this.pick(input.dataset.pick, items[at].dataset.pickId) }
    } else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && items.length) {
      e.preventDefault()
      items[at]?.classList.remove('is-active')
      items[(at + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].classList.add('is-active')
    } else if (e.key === 'Escape' && input.value) {
      e.stopPropagation()
      e.preventDefault()
      input.value = ''
      this.suggest(input)
    }
  }

  pick(list, id) {
    const s = list === 'builtOn' ? this.topic : this.card
    if (!s[list].includes(id)) s[list].push(id)
    this.draw()
    this.form.querySelector(`[data-pick="${list}"]`).focus()
  }

  // ---- the card as it will read, and what is wrong with it ----

  changed() {
    const card = this.dialog.querySelector('.ed-card')
    const kind = this.isTopic ? 'topic' : this.card.kind
    card.className = `ed-card node leaf doc is-open kind-${kind}`
    card.innerHTML = draftDoc({ ...this.card, kind }, this.getAtlas())
    clearTimeout(this.checking)
    this.checking = setTimeout(() => this.check(), 400)
  }

  /** The file as it would be saved. */
  result() {
    if (this.node) return replaceSection(this.base, this.card)
    return appendSections(this.base, this.parent, this.topic ? [this.topic, this.card] : [this.card])
  }

  /** Runs the atlas's own checks on the result, and lists what this edit would break. Returns the text, or null. */
  check() {
    clearTimeout(this.checking)
    const problems = []
    const error = message => problems.push({ level: 'error', message })
    let text = null
    if (this.topic && !this.topic.title.trim()) error('The topic needs a title.')
    if (!this.card.title.trim()) error(this.isTopic ? 'It needs a title.' : 'The card needs a title.')
    for (const s of [this.card, this.topic]) {
      if (s?.id && !/^[a-z0-9][a-z0-9-]*$/.test(s.id)) error(`The id “${s.id}” should use only lowercase letters, digits and dashes.`)
    }
    if (!problems.length) {
      try {
        text = this.result()
        const sources = this.getSources()
        const before = new Set(this.getAtlas().issues.map(i => `${i.file}\n${i.message}`))
        const after = buildAtlas({ ...sources, files: sources.files.map(f => (f.path === this.file ? { ...f, text } : f)) })
        for (const i of after.issues) if (!before.has(`${i.file}\n${i.message}`)) problems.push(i)
      } catch (e) {
        error(e.message)
      }
    }
    const blocked = problems.some(p => p.level === 'error')
    this.dialog.querySelector('.ed-problems').innerHTML = problems.map(p => `<li class="${p.level}">${esc(p.message)}</li>`).join('')
    this.dialog.querySelector('.ed-save').disabled = blocked
    return blocked ? null : text
  }

  async save() {
    if (!this.dialog.open) return
    this.collect()
    const text = this.check()
    if (text === null) return
    const button = this.dialog.querySelector('.ed-save')
    button.disabled = true
    let reply
    try {
      const res = await fetch(`/api/content/${this.file}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, base: this.base }),
      })
      reply = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(reply.error || `The save failed (${res.status}).`)
    } catch (e) {
      button.disabled = false
      this.dialog.querySelector('.ed-problems').innerHTML = `<li class="error">${esc(e.message)}</li>`
      return
    }
    const id = this.idOf(this.card)
    this.dialog.close()
    this.onSaved(id)
  }
}

// A label would pass a click on its words to the first button inside it, so a list of chips stands in a div.
const field = (label, control, note = '', tag = 'label') => `<${tag} class="ed-field"><span class="ed-label">${label}</span>${control}` +
  `${note ? `<span class="ed-hint">${note}</span>` : ''}</${tag}>`
