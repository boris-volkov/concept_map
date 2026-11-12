// Starts the atlas: loads the content, builds the map, and wires up the controls.

import { loadSources, buildAtlas, fetchText, KINDS } from './content.js'
import { AtlasMap } from './map.js'
import { Search } from './search.js'
import { esc, renderMarkdown } from './markdown.js'
import { index } from './docs.js'
import { Flashcards, sharedIds } from './flashcards.js'
import { popOut, showSheets, redrawSheets } from './sheet.js'

const CONTENT = 'content/'
const VIEW_KEY = 'concept-atlas:view'
const HINT_KEY = 'concept-atlas:hinted'
const $ = id => document.getElementById(id)
// Served from this computer: watch the content files and redraw when one is saved.
const LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$|\.localhost$/.test(location.hostname)
// A phone, where the index covers the map rather than standing beside it (see the stylesheet).
const NARROW = matchMedia('(max-width: 760px)')

let atlas, map, search, cards, sources, sourceKey
let lastUsed // the map, or the sheet, where something was last selected: Esc goes to it

start()

async function start() {
  const shared = sharedIds() // read now: the map rewrites the address as it selects things
  try {
    sources = await loadSources(CONTENT)
  } catch (e) {
    return fail(e)
  }
  sourceKey = keyOf(sources)
  atlas = buildAtlas(sources)
  const view = readView()
  const editing = LOCAL && await canSave()
  // Before the map is made, so that it starts out the size it keeps.
  if (view?.index) showIndex(true)
  map = new AtlasMap({
    viewport: $('viewport'), world: $('world'), svg: $('edges'), atlas,
    onSelect: selected, onView: saveView, onPop: n => popOut(map, n, $('pop')),
    ...(editing ? { onEdit: n => editor().then(e => e.edit(n)), onAdd: n => editor().then(e => e.add(n)) } : {}),
  })
  search = new Search($('search'), $('search-results'), { onPick: n => go(n.id) })
  search.setAtlas(atlas)
  cards = new Flashcards($('deck'), $('btn-deck'))
  cards.setAtlas(atlas)
  wire()
  titles()
  issues()

  if (view?.open) map.restore(view)
  map.relayout()
  showSheets(map, view?.sheets)
  await map.camera.ready()
  if (view?.camera) map.camera.set(view.camera.x, view.camera.y, view.camera.k)
  else map.fitAll()
  $('loading').remove()
  const n = atlas.nodes.get(hashId())
  if (n) map.reveal(n)
  if (shared) cards.openShared(shared)
  else hint()
  if (LOCAL) watch()
}

// The map or a sheet selected something (or nothing): show the key to its colours, and on the map
// show it in the address bar too.
function selected(n, board = map) {
  if (n) lastUsed = board
  $('key').hidden = !boards().some(b => b.selected)
  if (board !== map || cards?.shared) return // the address is the shared deck's while it is shown
  const id = n ? n.id : ''
  if (hashId() !== id) history.replaceState(null, '', id ? `#${encodeURIComponent(id)}` : location.pathname + location.search)
}

const boards = () => [map, ...map.sheets]

// Navigation that should be undoable with the back button: links, search results.
function go(id) {
  const n = atlas.nodes.get(id)
  if (!n) return
  if (hashId() !== id) history.pushState(null, '', `#${encodeURIComponent(id)}`)
  if (NARROW.matches) showIndex(false) // it would hide what it went to
  cards.close() // a link on the back of a card goes to the map
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
  $('btn-deck').onclick = () => cards.toggle()
  $('btn-zoom-in').onclick = () => map.zoomBy(1.3)
  $('btn-zoom-out').onclick = () => map.zoomBy(1 / 1.3)
  $('btn-fit').onclick = () => map.fitAll()
  document.querySelector('.kinds-key').onclick = e => {
    const b = e.target.closest('[data-kind]')
    if (b) explainKind(b.dataset.kind)
  }
  // A click on the dimmed map around it closes it.
  $('kinds').onclick = e => { if (e.target === $('kinds')) $('kinds').close() }
  window.addEventListener('popstate', () => {
    const shared = sharedIds()
    if (shared) return cards.openShared(shared) // a link to a deck, pasted into this tab
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
    if (e.target.closest?.('input, textarea, select, [contenteditable], dialog') || e.ctrlKey || e.metaKey || e.altKey) return
    if (cards.key(e)) return e.preventDefault()
    const actions = {
      '/': () => $('search').focus(),
      escape: () => {
        $('issues-list').hidden = true
        const board = lastUsed?.selected ? lastUsed : boards().find(b => b.selected)
        board?.escape()
      },
      '+': () => map.zoomBy(1.3),
      '=': () => map.zoomBy(1.3),
      '-': () => map.zoomBy(1 / 1.3),
      0: () => map.fitAll(),
      h: () => map.overview(),
      i: () => showIndex($('panel').hidden),
      f: () => cards.toggle(),
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

// What each kind of card is, from content/kinds.md, opened at the kind asked about. It is read
// each time it opens, so that an edit to it shows at once.
async function explainKind(kind) {
  const box = $('kinds')
  const body = box.querySelector('.kinds-body')
  try {
    body.innerHTML = kindsPage(await fetchText(CONTENT + 'kinds.md'))
  } catch (e) {
    body.innerHTML = `<p>The kinds could not be loaded: ${esc(e.message)}</p>`
  }
  if (!box.open) box.showModal()
  const at = body.querySelector(`section[data-kind="${kind}"]`)
  for (const s of body.querySelectorAll('section')) s.classList.toggle('is-on', s === at)
  body.scrollTop = at ? at.offsetTop - body.offsetTop : 0
}

// The page: a "# " title (the dialog has its own), an introduction, and a section to each "## " heading.
function kindsPage(text) {
  const parts = text.replace(/^# .*\r?\n/, '').split(/^## +(.+?)\s*$/m)
  let html = `<div class="kinds-intro">${renderMarkdown(parts[0])}</div>`
  for (let i = 1; i < parts.length; i += 2) {
    const name = parts[i].toLowerCase()
    const kind = name in KINDS ? name : ''
    html += `<section class="kind-${kind || 'none'}" data-kind="${kind}">
      <h3>${esc(parts[i])}</h3>${renderMarkdown(parts[i + 1])}</section>`
  }
  return html
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

// Whether this page can save a content file: only when serve.py is what serves it (see edit.js).
async function canSave() {
  try {
    const res = await fetch('api/edit', { cache: 'no-store' })
    return res.ok && (await res.json()).ok === true
  } catch {
    return false
  }
}

// The editor is fetched the first time it is asked for, so the published page never loads it.
let editorMade
function editor() {
  editorMade ??= import('./edit.js').then(({ Editor }) => new Editor({
    getAtlas: () => atlas, getSources: () => sources, search,
    onSaved: async id => {
      await reload()
      go(id)
    },
  }))
  return editorMade
}

const keyOf = s => s.indexText + '\u0000' + s.files.map(f => `${f.path}\n${f.text ?? f.error}`).join('\u0000')

// Reads the content files again and, if any has changed, redraws everything from them.
async function reload() {
  const fresh = await loadSources(CONTENT)
  const key = keyOf(fresh)
  if (key === sourceKey) return
  sources = fresh
  sourceKey = key
  atlas = buildAtlas(sources)
  map.setAtlas(atlas)
  map.relayout()
  redrawSheets(map)
  search.setAtlas(atlas)
  cards.setAtlas(atlas)
  titles()
  issues()
  if (!$('panel').hidden) showIndex(true)
  toast('Redrawn from the content files')
}

function watch() {
  let busy = false
  setInterval(async () => {
    if (document.hidden || busy) return
    busy = true
    try {
      await reload()
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
    localStorage.setItem(VIEW_KEY, JSON.stringify({
      open: [...map.open], readmes: [...map.readmes], camera: { x, y, k }, index: !$('panel').hidden, sheets: map.sheets.map(s => s.saved()),
    }))
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
