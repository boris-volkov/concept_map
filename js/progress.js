// Which concepts this student has mastered, kept in this browser only.

import { leaves } from './model.js'

const KEY = 'concept-atlas:mastered'
const listeners = new Set()

let mastered = new Set(read())

function read() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? [] } catch { return [] }
}

function write() {
  try { localStorage.setItem(KEY, JSON.stringify([...mastered])) } catch { /* private mode: progress lasts until the tab closes */ }
}

export const isMastered = id => mastered.has(id)

export function setMastered(id, on) {
  if (on === mastered.has(id)) return
  if (on) mastered.add(id)
  else mastered.delete(id)
  write()
  listeners.forEach(f => f())
}

export function clearAll() {
  mastered = new Set()
  write()
  listeners.forEach(f => f())
}

export const count = () => mastered.size

/** {done, total} over the concepts inside a topic. */
export function countIn(node) {
  const all = leaves(node)
  return { done: all.filter(n => mastered.has(n.id)).length, total: all.length }
}

/** Not yet mastered, but everything it directly needs is. */
export const isReady = node => !node.children.length && !mastered.has(node.id) &&
  node.prereqs.length > 0 && node.prereqs.every(p => leaves(p).every(l => mastered.has(l.id)))

/** Calls `f` on every change, until the function it returns is called. */
export function onChange(f) {
  listeners.add(f)
  return () => listeners.delete(f)
}

window.addEventListener('storage', e => {
  if (e.key !== KEY) return
  mastered = new Set(read())
  listeners.forEach(f => f())
})
