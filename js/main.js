// Starts the atlas: loads the content, builds the map, and wires up the controls.

import { loadSources, buildAtlas } from './content.js'
import { AtlasMap } from './map.js'
import { Search } from './search.js'
import { esc } from './markdown.js'
import { index } from './docs.js'

const CONTENT = 'content/'
const VIEW_KEY = 'concept-atlas:view'
const HINT_KEY = 'concept-atlas:hinted'
const $ = id => document.getElementById(id)
// Served from this computer: watch the content files and redraw when one is saved.
const LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$|\.localhost$/.test(location.hostname)
// A phone, where the index covers the map rather than standing beside it (see the stylesheet).
const NARROW = matchMedia('(max-width: 760px)')

let atlas, map, search, sourceKey

start()

async function start() {
  let sources
  try {
    sources = await loadSources(CONTENT)
  } catch (e) {
    return fail(e)
  }
  sourceKey = keyOf(sources)
  atlas = buildAtlas(sources)
  const view = readView()
  // Before the map is made, so that it starts out the size it keeps.
  if (view?.index) showIndex(true)
  map = new AtlasMap({ viewport: $('viewport'), world: $('world'), svg: $('edges'), grid: $('grid'), atlas, onSelect: selected, onView: saveView })
  search = new Search($('search'), $('search-results'), { onPick: n => go(n.id) })
  search.setAtlas(atlas)
  wire()
  titles()
  issues()

  if (view?.open) map.restore(view)
  map.relayout()
  await map.camera.ready()
  if (view?.camera) map.camera.set(view.camera.x, view.camera.y, view.camera.k)
  else map.fitAll()
  $('loading').remove()
  const n = atlas.nodes.get(hashId())
  if (n) map.reveal(n)
  hint()
  if (LOCAL) watch()
}

// The map selected something (or nothing): show it in the address bar, and the key to its colours.
function selected(n) {
  $('key').hidden = !n
  const id = n ? n.id : ''
  if (hashId() !== id) history.replaceState(null, '', id ? `#${encodeURIComponent(id)}` : location.pathname + location.search)
}

// Navigation that should be undoable with the back button: links, search results.
function go(id) {
  const n = atlas.nodes.get(id)
  if (!n) return
  if (hashId() !== id) history.pushState(null, '', `#${encodeURIComponent(id)}`)
  if (NARROW.matches) showIndex(false) // it would hide what it went to
  map.reveal(n)
}

function hashId() {
  try { return decodeURIComponent(location.hash.slice(1)) } catch { return '' }
}

function wire() {
  $('btn-overview').onclick = () => map.overview()
  $('btn-expand').onclick = () => map.openAll()
  $('btn-index').onclick = () => showIndex($('panel').hidden)
  $('panel').querySelector('.shut').onclick = () => showIndex(false)
  $('btn-zoom-in').onclick = () => map.zoomBy(1.3)
  $('btn-zoom-out').onclick = () => map.zoomBy(1 / 1.3)
  $('btn-fit').onclick = () => map.fitAll()
  window.addEventListener('popstate', () => {
    const n = atlas.nodes.get(hashId())
    if (n) map.reveal(n)
    else map.select(null)
  })
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]')
    if (!a || e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey || e.button) return
    let id = ''
    try { id = decodeURIComponent(a.getAttribute('href').slice(1)) } catch { return }
    if (!atlas.nodes.has(id)) return
    e.preventDefault()
    go(id)
  })
  document.addEventListener('keydown', e => {
    if (e.target.closest?.('input, textarea, select, [contenteditable]') || e.ctrlKey || e.metaKey || e.altKey) return
    const actions = {
      '/': () => $('search').focus(),
      escape: () => {
        $('issues-list').hidden = true
        map.escape()
      },
      '+': () => map.zoomBy(1.3),
      '=': () => map.zoomBy(1.3),
      '-': () => map.zoomBy(1 / 1.3),
      0: () => map.fitAll(),
      h: () => map.overview(),
      i: () => showIndex($('panel').hidden),
    }
    const action = actions[e.key.toLowerCase()]
    if (!action) return
    e.preventDefault()
    action()
  })
}

function titles() {
  $('atlas-title').textContent = atlas.title
  document.title = atlas.title
}

// The index, in a panel beside the map; the map makes room for it. It is written when it first
// opens, and again when it is open and the content changes, with the same domains unfolded.
let indexed = null // the atlas it was written for

function showIndex(on) {
  const panel = $('panel')
  panel.hidden = !on
  $('btn-index').setAttribute('aria-expanded', on)
  saveView()
  if (!on || indexed === atlas) return
  const body = panel.querySelector('.panel-body')
  const unfolded = new Set([...body.querySelectorAll('details[open]')].map(d => d.dataset.domain))
  body.innerHTML = index(atlas)
  for (const d of body.querySelectorAll('details')) d.open = unfolded.has(d.dataset.domain)
  indexed = atlas
}

function issues() {
  const button = $('issues')
  const box = $('issues-list')
  const list = atlas.issues
  button.hidden = !list.length
  box.hidden = true
  if (!list.length) return
  button.textContent = `${list.length} content ${list.length === 1 ? 'problem' : 'problems'}`
  button.classList.toggle('has-errors', list.some(i => i.level === 'error'))
  button.onclick = () => { box.hidden = !box.hidden }
  box.innerHTML = `<div class="issues-head"><strong>Content problems</strong>
      <button type="button" aria-label="Close">×</button></div>
    <p>Fix these in the content files; the map ${LOCAL ? 'redraws as soon as you save' : 'picks the fixes up when the page reloads'}.</p>
    <ol>${list.map(i => `<li class="${i.level}"><code>${esc(i.file ?? '')}${i.line ? `:${i.line}` : ''}</code> ${esc(i.message)}` +
      `${i.id && atlas.nodes.has(i.id) ? ` <a href="#${esc(i.id)}">Show</a>` : ''}</li>`).join('')}</ol>`
  box.querySelector('button').onclick = () => { box.hidden = true }
  console.groupCollapsed(`Concept atlas: ${list.length} content problem${list.length === 1 ? '' : 's'}`)
  for (const i of list) console[i.level === 'error' ? 'error' : 'warn'](`${i.file}${i.line ? `:${i.line}` : ''}  ${i.message}`)
  console.groupEnd()
}

const keyOf = s => s.indexText + '\u0000' + s.files.map(f => `${f.path}\n${f.text ?? f.error}`).join('\u0000')

function watch() {
  let busy = false
  setInterval(async () => {
    if (document.hidden || busy) return
    busy = true
    try {
      const sources = await loadSources(CONTENT)
      const key = keyOf(sources)
      if (key === sourceKey) return
      sourceKey = key
      atlas = buildAtlas(sources)
      map.setAtlas(atlas)
      map.relayout()
      search.setAtlas(atlas)
      titles()
      issues()
      if (!$('panel').hidden) showIndex(true)
      toast('Redrawn from the content files')
    } catch {
      // A file mid-save or the server restarting: try again on the next tick.
    } finally {
      busy = false
    }
  }, 1500)
}

function toast(text) {
  const t = document.createElement('div')
  t.className = 'toast'
  t.textContent = text
  document.body.append(t)
  setTimeout(() => t.remove(), 2000)
}

let saveTimer
function saveView() {
  clearTimeout(saveTimer)
  saveTimer = setTimeout(writeView, 300)
}

function writeView() {
  clearTimeout(saveTimer)
  try {
    const { x, y, k } = map.camera
    localStorage.setItem(VIEW_KEY, JSON.stringify({ open: [...map.open], readmes: [...map.readmes], camera: { x, y, k }, index: !$('panel').hidden }))
  } catch { /* storage unavailable: the view just isn't remembered */ }
}

// A change made just before the page closes is kept too.
window.addEventListener('pagehide', () => { if (map) writeView() })

function readView() {
  try { return JSON.parse(localStorage.getItem(VIEW_KEY)) } catch { return null }
}

function hint() {
  const h = $('hint')
  let seen = null
  try { seen = localStorage.getItem(HINT_KEY) } catch { /* show it */ }
  if (seen) return h.remove()
  h.classList.add('is-shown')
  const dismiss = () => {
    h.remove()
    try { localStorage.setItem(HINT_KEY, '1') } catch { /* fine */ }
  }
  $('viewport').addEventListener('click', dismiss, { once: true })
  setTimeout(dismiss, 15000)
}

function fail(e) {
  const box = $('loading')
  box.classList.add('is-error')
  box.innerHTML = location.protocol === 'file:'
    ? 'The map reads its <code>content</code> folder, which browsers only allow over the web. ' +
      'In this folder run <code>python -m http.server</code>, then open <a href="http://localhost:8000">localhost:8000</a>.'
    : `The content files could not be loaded: ${esc(e.message)}`
}
