// The concepts in this student's deck of flashcards, in the order they were added, kept in this browser only.

const KEY = 'concept-atlas:deck'
const listeners = new Set()

let ids = read()

function read() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

function write() {
  try { localStorage.setItem(KEY, JSON.stringify(ids)) } catch { /* private mode: the deck lasts until the tab closes */ }
}

const changed = () => listeners.forEach(f => f())

export const has = id => ids.includes(id)

/** The ids in the deck, oldest first. */
export const list = () => [...ids]

export function toggle(id) {
  ids = has(id) ? ids.filter(x => x !== id) : [...ids, id]
  write()
  changed()
}

/** Adds every one of `list` not in the deck already, at the end, in the order given. */
export function addAll(list) {
  const fresh = list.filter((id, i) => !has(id) && list.indexOf(id) === i)
  if (!fresh.length) return
  ids = [...ids, ...fresh]
  write()
  changed()
}

export function remove(id) {
  if (!has(id)) return
  ids = ids.filter(x => x !== id)
  write()
  changed()
}

/** Calls `f` on every change, until the function it returns is called. */
export function onChange(f) {
  listeners.add(f)
  return () => listeners.delete(f)
}

// Another tab of the atlas changed the deck.
window.addEventListener('storage', e => {
  if (e.key !== KEY) return
  ids = read()
  changed()
})
