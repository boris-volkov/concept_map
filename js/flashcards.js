// The deck of flashcards, opened from the button at the top right: one card at a time, the
// concept's name on the front and its entry, as the map shows it, on the back. Click the card or
// press Space to turn it over, and the arrow keys to move through the deck.
//
// A deck can be shared as a link, or as the QR code of that link: the address of the atlas with the
// concepts' ids after it, as in #deck=adding-fractions,lcm. Nothing is stored anywhere but the link, so
// no one signs in to anything. Opening such a link shows that deck here, apart from the student's own,
// with a button that adds it to theirs.

import * as deck from './deck.js'
import { cardFront, cardBack } from './docs.js'
import { esc } from './markdown.js'
import { qrSvg } from './qr.js'

const PREFIX = '#deck='

/** The ids in a link to a shared deck, if the address is one; otherwise null. */
export function sharedIds(hash = location.hash) {
  if (!hash.startsWith(PREFIX)) return null
  let text = hash.slice(PREFIX.length)
  try { text = decodeURIComponent(text) } catch { /* use it as it is */ }
  const ids = text.split(',').map(id => id.trim().toLowerCase()).filter(Boolean)
  return [...new Set(ids)]
}

/** The link to a deck of these concepts. */
export function shareLink(ids) {
  return `${location.origin}${location.pathname}${PREFIX}${ids.join(',')}`
}

// Served from this computer, where a link would lead nowhere for anyone else.
const LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$|\.localhost$/.test(location.hostname) || location.protocol === 'file:'

export class Flashcards {
  constructor(root, button) {
    this.root = root
    this.button = button
    this.card = root.querySelector('.deck-card')
    this.order = [] // the ids in the order they are shown; shuffling changes only this
    this.at = 0
    this.back = false
    this.shared = null // the ids of a deck opened from a link, while it is shown; null for the student's own
    this.sharing = false // the link and QR code are shown instead of the cards
    this.share = root.querySelector('.deck-share')
    this.banner = root.querySelector('.deck-shared')
    root.querySelector('.deck-prev').onclick = () => this.move(-1)
    root.querySelector('.deck-next').onclick = () => this.move(1)
    root.querySelector('.deck-flip').onclick = () => this.flip()
    root.querySelector('.deck-shuffle').onclick = () => this.shuffle()
    root.querySelector('.deck-remove').onclick = () => this.removeCurrent()
    root.querySelector('.deck-share-btn').onclick = () => this.showShare(!this.sharing)
    this.banner.querySelector('.deck-keep').onclick = () => this.keepShared()
    root.querySelector('.shut').onclick = () => this.close()
    // A click on the card turns it over, unless it was on a link in the entry, which goes to the map.
    this.card.addEventListener('click', e => { if (!e.target.closest('a, .cy-controls')) this.flip() })
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
    this.sharing = false
    this.root.hidden = false
    this.button.setAttribute('aria-expanded', 'true')
    this.render()
    this.card.focus({ preventScroll: true })
  }

  /** Shows the deck in a link someone shared, in place of the student's own. */
  openShared(ids) {
    this.shared = ids
    this.open()
  }

  close() {
    this.root.hidden = true
    this.button.setAttribute('aria-expanded', 'false')
    if (!this.shared) return
    // The student's own deck is what the button opens from now on, and the address stops pointing at the shared one.
    this.shared = null
    if (location.hash.startsWith(PREFIX)) history.replaceState(null, '', location.pathname + location.search)
  }

  toggle() {
    if (this.isOpen) this.close()
    else this.open()
  }

  flip() {
    if (!this.order.length || this.sharing) return
    this.back = !this.back
    this.render()
  }

  move(step) {
    if (!this.order.length || this.sharing) return
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
    if (id && !this.shared) deck.remove(id)
  }

  // Adds the shared deck's cards to the student's own.
  keepShared() {
    if (this.shared) deck.addAll(this.cards())
    this.render()
  }

  // The link to the deck being shown, its QR code, and a way to copy each; or the cards again.
  showShare(on) {
    this.sharing = on && this.order.length > 0
    if (this.sharing) {
      // In the order the deck was made, whatever the shuffle.
      const ids = this.cards()
      const link = shareLink(ids)
      const svg = qrSvg(link, { label: 'QR code of the link to these flashcards' })
      const n = ids.length
      this.share.innerHTML = `
        <button type="button" class="deck-qr" title="Make the code bigger or smaller, to show a class">${svg}</button>
        <div class="deck-share-text">
          <p>Scanning the code, or opening the link, shows ${n === 1 ? 'this card' : `these ${n} cards`} in any browser,
            with nothing to sign in to. A student can then add them to their own deck.</p>
          <div class="deck-link">
            <input type="text" readonly value="${esc(link)}" aria-label="The link to these flashcards">
            <button type="button" class="deck-copy">Copy link</button>
          </div>
          <p><a class="deck-save" href="data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}" download="flashcards-qr.svg">Save the QR code</a>,
            to put on a worksheet or a slide.</p>
          <p class="deck-share-note">The link holds the cards as they are now: if the deck changes, share it again.</p>
          ${LOCAL ? '<p class="deck-share-warn">This atlas is running on this computer, so the link only works here. Share from the published atlas instead.</p>' : ''}
        </div>`
      const input = this.share.querySelector('input')
      input.onfocus = () => input.select()
      this.share.querySelector('.deck-qr').onclick = () => this.share.classList.toggle('is-large')
      const copy = this.share.querySelector('.deck-copy')
      copy.onclick = async () => {
        try {
          await navigator.clipboard.writeText(link)
        } catch {
          input.select()
          document.execCommand?.('copy') // an older browser, or a page not served over https
        }
        copy.textContent = 'Copied'
        setTimeout(() => { copy.textContent = 'Copy link' }, 1600)
      }
    }
    this.share.classList.remove('is-large')
    this.render()
  }

  /** Keys while the deck is open: Space or Enter turns the card, the arrows move, Esc closes. */
  key(e) {
    if (!this.isOpen || e.target.closest?.('.cy-controls')) return false // the arrows move a slider there
    if (this.sharing && e.key === 'Escape') { this.showShare(false); return true }
    const actions = { ' ': () => this.flip(), Enter: () => this.flip(), ArrowRight: () => this.move(1),
      ArrowLeft: () => this.move(-1), Escape: () => this.close() }
    const action = actions[e.key]
    if (!action || (e.key === 'Enter' && e.target.closest?.('button, a'))) return false
    action()
    return true
  }

  // The deck's concepts that are still on the map, in the order they were added.
  cards() {
    return (this.shared ?? deck.list()).filter(id => this.atlas?.nodes.get(id)?.children.length === 0)
  }

  // The deck changed, here or in another tab: keep the card in view if it is still there.
  sync() {
    this.button.querySelector('.deck-n').textContent = deck.list().filter(id => this.atlas?.nodes.get(id)?.children.length === 0).length || ''
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
    if (!total) this.sharing = false
    this.root.querySelector('#deck-title').textContent = this.shared ? 'Shared flashcards' : 'Flashcards'
    this.root.querySelector('.deck-count').textContent = total && !this.sharing ? `${this.at + 1} of ${total}` : ''
    for (const b of this.root.querySelectorAll('.deck-foot button, .deck-shuffle, .deck-share-btn')) b.disabled = !total
    this.root.querySelector('.deck-shuffle').hidden = this.sharing
    const shareBtn = this.root.querySelector('.deck-share-btn')
    shareBtn.textContent = this.sharing ? 'Back to the cards' : 'Share'
    shareBtn.setAttribute('aria-expanded', this.sharing)
    this.share.hidden = !this.sharing
    this.card.hidden = this.sharing
    this.root.querySelector('.deck-foot').hidden = this.sharing
    this.root.querySelector('.deck-remove').hidden = !!this.shared
    this.renderBanner()
    const card = this.card
    if (!total) {
      card.className = 'deck-card is-empty'
      card.removeAttribute('style')
      card.innerHTML = this.shared
        ? '<p>None of the cards in this link are on the map any more.</p>'
        : '<p>No flashcards yet. Open a concept, and press the card button on its head to add it to your deck.</p>'
      return
    }
    const n = this.atlas.nodes.get(this.order[this.at])
    card.className = `deck-card kind-${n.kind}${this.back ? ' is-back' : ''}`
    card.style.setProperty('--c', n.color)
    card.innerHTML = this.back ? cardBack(n, this.atlas) : cardFront(n)
    card.setAttribute('aria-label', `${n.plainTitle}, ${this.back ? 'back' : 'front'}`)
    card.scrollTop = 0
    this.fit()
    this.root.querySelector('.deck-flip').textContent = this.back ? 'Show the name' : 'Turn over'
  }

  // A formula or table too wide for a card widens the card, as far as the screen allows, rather
  // than give it a scroll bar.
  fit() {
    const box = this.card.parentElement
    box.style.width = ''
    const extra = this.card.scrollWidth - this.card.clientWidth
    if (extra > 0) box.style.width = `${box.offsetWidth + extra + 1}px`
  }

  // Over a shared deck: where it came from, and whether its cards are in the student's own deck yet.
  renderBanner() {
    const b = this.banner
    b.hidden = !this.shared
    if (!this.shared) return
    const ids = this.cards()
    const missing = this.shared.length - ids.length
    const fresh = ids.filter(id => !deck.has(id)).length
    b.querySelector('.deck-shared-text').textContent =
      `Someone shared ${ids.length === 1 ? 'this card' : `these ${ids.length} cards`} with you.` +
      (missing ? ` ${missing === 1 ? 'One card' : `${missing} cards`} in the link ${missing === 1 ? 'is' : 'are'} no longer on the map.` : '')
    const keep = b.querySelector('.deck-keep')
    keep.hidden = !ids.length
    keep.disabled = !fresh
    keep.textContent = fresh ? (fresh === ids.length ? 'Add them to my deck' : `Add the ${fresh} new ${fresh === 1 ? 'one' : 'ones'} to my deck`) : 'All in your deck'
  }
}
