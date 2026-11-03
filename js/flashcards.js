// The deck of flashcards, opened from the button at the top right: one card at a time, the
// concept's name on the front and its entry, as the map shows it, on the back. Click the card or
// press Space to turn it over, and the arrow keys to move through the deck.

import * as deck from './deck.js'
import { cardFront, cardBack } from './docs.js'

export class Flashcards {
  constructor(root, button) {
    this.root = root
    this.button = button
    this.card = root.querySelector('.deck-card')
    this.order = [] // the ids in the order they are shown; shuffling changes only this
    this.at = 0
    this.back = false
    root.querySelector('.deck-prev').onclick = () => this.move(-1)
    root.querySelector('.deck-next').onclick = () => this.move(1)
    root.querySelector('.deck-flip').onclick = () => this.flip()
    root.querySelector('.deck-shuffle').onclick = () => this.shuffle()
    root.querySelector('.deck-remove').onclick = () => this.removeCurrent()
    root.querySelector('.shut').onclick = () => this.close()
    // A click on the card turns it over, unless it was on a link in the entry, which goes to the map.
    this.card.addEventListener('click', e => { if (!e.target.closest('a')) this.flip() })
    root.addEventListener('click', e => { if (e.target === root) this.close() })
    deck.onChange(() => this.sync())
  }

  setAtlas(atlas) {
    this.atlas = atlas
    this.sync()
  }

  get isOpen() {
    return !this.root.hidden
  }

  open() {
    this.order = this.cards()
    this.at = 0
    this.back = false
    this.root.hidden = false
    this.button.setAttribute('aria-expanded', 'true')
    this.render()
    this.card.focus({ preventScroll: true })
  }

  close() {
    this.root.hidden = true
    this.button.setAttribute('aria-expanded', 'false')
  }

  toggle() {
    if (this.isOpen) this.close()
    else this.open()
  }

  flip() {
    if (!this.order.length) return
    this.back = !this.back
    this.render()
  }

  move(step) {
    if (!this.order.length) return
    this.at = (this.at + step + this.order.length) % this.order.length
    this.back = false
    this.render()
  }

  shuffle() {
    const a = this.order
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    this.at = 0
    this.back = false
    this.render()
  }

  removeCurrent() {
    const id = this.order[this.at]
    if (id) deck.remove(id)
  }

  /** Keys while the deck is open: Space or Enter turns the card, the arrows move, Esc closes. */
  key(e) {
    if (!this.isOpen) return false
    const actions = { ' ': () => this.flip(), Enter: () => this.flip(), ArrowRight: () => this.move(1),
      ArrowLeft: () => this.move(-1), Escape: () => this.close() }
    const action = actions[e.key]
    if (!action || (e.key === 'Enter' && e.target.closest?.('button, a'))) return false
    action()
    return true
  }

  // The deck's concepts that are still on the map, in the order they were added.
  cards() {
    return deck.list().filter(id => this.atlas?.nodes.get(id)?.children.length === 0)
  }

  // The deck changed, here or in another tab: keep the card in view if it is still there.
  sync() {
    const n = this.cards().length
    this.button.querySelector('.deck-n').textContent = n || ''
    if (!this.isOpen) return
    const current = this.order[this.at]
    const now = new Set(this.cards())
    this.order = [...this.order.filter(id => now.has(id)), ...[...now].filter(id => !this.order.includes(id))]
    const i = this.order.indexOf(current)
    this.at = i >= 0 ? i : Math.min(this.at, Math.max(0, this.order.length - 1))
    if (i < 0) this.back = false
    this.render()
  }

  render() {
    const total = this.order.length
    this.root.querySelector('.deck-count').textContent = total ? `${this.at + 1} of ${total}` : ''
    for (const b of this.root.querySelectorAll('.deck-foot button, .deck-shuffle')) b.disabled = !total
    const card = this.card
    if (!total) {
      card.className = 'deck-card is-empty'
      card.removeAttribute('style')
      card.innerHTML = '<p>No flashcards yet. Open a concept, and press the card button on its head to add it to your deck.</p>'
      return
    }
    const n = this.atlas.nodes.get(this.order[this.at])
    card.className = `deck-card kind-${n.kind}${this.back ? ' is-back' : ''}`
    card.style.setProperty('--c', n.color)
    card.innerHTML = this.back ? cardBack(n, this.atlas) : cardFront(n)
    card.setAttribute('aria-label', `${n.plainTitle}, ${this.back ? 'back' : 'front'}`)
    card.scrollTop = 0
    this.root.querySelector('.deck-flip').textContent = this.back ? 'Show the name' : 'Turn over'
  }
}
