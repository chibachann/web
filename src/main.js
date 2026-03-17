/* ============================================================
   CYBER//UI — main.js
   - Matrix rain canvas
   - Typewriter effect
   - Scroll-spy nav
   - Live card metrics
   - Swipe navigation (mobile)
   - BYPASS → VOID dimension
   ============================================================ */

// ── Matrix rain ───────────────────────────────────────────────
const canvas = document.getElementById('matrix-canvas')
const ctx    = canvas.getContext('2d')

const CHARS  = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@<>{}[]'
const FONT_SIZE = 13
let cols, drops

function initMatrix() {
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
  cols  = Math.floor(canvas.width / FONT_SIZE)
  drops = Array.from({ length: cols }, () => Math.random() * -50)
}

function drawMatrix() {
  // semi-transparent black to create fading trail
  ctx.fillStyle = 'rgba(3, 3, 8, 0.08)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#00ff41'
  ctx.font      = `${FONT_SIZE}px "Space Mono", monospace`

  for (let i = 0; i < drops.length; i++) {
    const char = CHARS[Math.floor(Math.random() * CHARS.length)]
    const x    = i * FONT_SIZE
    const y    = drops[i] * FONT_SIZE

    // brightest char at the head
    ctx.fillStyle = drops[i] > 2 ? 'rgba(0,255,65,.55)' : '#fff'
    ctx.fillText(char, x, y)

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0
    }
    drops[i] += 0.35 + Math.random() * 0.15
  }
}

initMatrix()
window.addEventListener('resize', initMatrix)
setInterval(drawMatrix, 50)


// ── Typewriter ────────────────────────────────────────────────
const typeEl = document.querySelector('.typewriter')
if (typeEl) {
  const text  = typeEl.dataset.text
  let   index = 0

  function type() {
    if (index <= text.length) {
      typeEl.textContent = text.slice(0, index)
      index++
      setTimeout(type, 80 + Math.random() * 60)
    }
  }

  // start after a short delay so page has settled
  setTimeout(type, 600)
}


// ── Scroll-spy nav + swipe indicator sync ─────────────────────
const sections   = Array.from(document.querySelectorAll('.section[id]'))
const navLinks   = document.querySelectorAll('.nav__link')
const indicator  = document.getElementById('swipe-indicator')
const swipeLabel = document.getElementById('swipe-label')
const swipeDots  = document.getElementById('swipe-dots')

// build dots
sections.forEach((_, i) => {
  const dot = document.createElement('div')
  dot.className = 'swipe-indicator__dot'
  if (i === 0) dot.classList.add('is-active')
  swipeDots.appendChild(dot)
})

let currentSectionIndex = 0

function updateIndicator(index) {
  currentSectionIndex = index
  const section = sections[index]
  if (!section) return

  // label: use section title text or id
  const titleEl = section.querySelector('.section__title')
  const label   = titleEl
    ? titleEl.textContent.replace(/^\/\/\s*/, '').trim()
    : section.id.toUpperCase()
  if (swipeLabel) swipeLabel.textContent = label

  // dots
  document.querySelectorAll('.swipe-indicator__dot').forEach((dot, i) => {
    dot.classList.toggle('is-active', i === index)
  })
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const id    = entry.target.id
      const index = sections.findIndex(s => s.id === id)

      navLinks.forEach(a => {
        a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`)
      })
      // scroll active nav link into view on mobile
      const activeLink = document.querySelector('.nav__link.is-active')
      activeLink?.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' })

      updateIndicator(index)
    })
  },
  { threshold: 0.4 }
)
sections.forEach(s => observer.observe(s))


// ── Swipe navigation (mobile) ──────────────────────────────────
let touchStartX = 0
let touchStartY = 0
let indicatorTimer = null

function showIndicator() {
  if (!indicator) return
  indicator.classList.add('is-visible')
  clearTimeout(indicatorTimer)
  indicatorTimer = setTimeout(() => indicator.classList.remove('is-visible'), 1800)
}

document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}, { passive: true })

document.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX
  const dy = e.changedTouches[0].clientY - touchStartY

  // only trigger when horizontal swipe dominates (prevents fighting vertical scroll)
  if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return

  const direction = dx < 0 ? 1 : -1   // left = next, right = prev
  const nextIndex = Math.min(Math.max(currentSectionIndex + direction, 0), sections.length - 1)

  if (nextIndex === currentSectionIndex) return

  sections[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' })
  updateIndicator(nextIndex)
  showIndicator()
}, { passive: true })


// ── Live card metrics ─────────────────────────────────────────
function rand(min, max) { return (Math.random() * (max - min) + min) }

setInterval(() => {
  const cpu  = document.querySelector('.live-cpu')
  const mem  = document.querySelector('.live-mem')
  const port = document.querySelector('.live-port')
  const files = document.querySelector('.live-files')

  if (cpu)  cpu.textContent  = Math.round(rand(70, 99))
  if (mem)  mem.textContent  = rand(1.8, 3.9).toFixed(1)
  if (port) port.textContent = [8080, 4433, 3000, 9090, 1337][Math.floor(rand(0, 5))]
  if (files) files.textContent = Math.round(rand(3800, 5000)).toLocaleString()
}, 2200)


// ── Progress bar demo (cycles 0→100) ─────────────────────────
const bar  = document.getElementById('progress-bar')
const pval = document.getElementById('progress-val')
let pct    = 72

setInterval(() => {
  pct = pct >= 100 ? 0 : pct + Math.round(rand(1, 4))
  if (bar)  bar.style.width = `${pct}%`
  if (pval) pval.textContent = pct
}, 800)


// ── BYPASS → VOID dimension ────────────────────────────────────
const bypassBtn   = document.getElementById('btn-bypass')
const voidOverlay = document.getElementById('void-overlay')
const jackoutBtn  = document.getElementById('btn-jackout')
const rgbFlash    = document.getElementById('rgb-flash')
const voidWipe    = document.getElementById('void-wipe')
const voidLogEl   = document.getElementById('void-log')
const voidCoord   = document.getElementById('void-coord')
const voidReality = document.getElementById('void-reality')
const voidFragments = document.getElementById('void-fragments')

// -- Void noise canvas (TV static)
const voidCanvas  = document.getElementById('void-canvas')
const voidCtx     = voidCanvas.getContext('2d')
let voidNoiseActive = false

function resizeVoidCanvas() {
  voidCanvas.width  = window.innerWidth
  voidCanvas.height = window.innerHeight
}
resizeVoidCanvas()
window.addEventListener('resize', resizeVoidCanvas)

function drawNoise() {
  if (!voidNoiseActive) return
  const w = voidCanvas.width, h = voidCanvas.height
  const img = voidCtx.createImageData(w, h)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const v = Math.random() > 0.5 ? Math.floor(rand(0, 120)) : 0
    d[i]     = v * 0.6           // R (purple tint)
    d[i + 1] = 0                 // G
    d[i + 2] = v                 // B
    d[i + 3] = v > 0 ? 180 : 0  // A
  }
  voidCtx.putImageData(img, 0, 0)
  requestAnimationFrame(drawNoise)
}

// -- Void log messages
const LOG_MESSAGES = [
  { text: '> FIREWALL PROTOCOL... BYPASSED',        cls: 'is-warn' },
  { text: '> ENTERING UNREGISTERED SECTOR...',      cls: '' },
  { text: '> WARNING: REALITY MATRIX UNSTABLE',     cls: 'is-error' },
  { text: '> COORDINATES CANNOT BE RESOLVED',       cls: 'is-error' },
  { text: '> CONNECTION TO HOME SECTOR: LOST',      cls: 'is-error' },
  { text: '> VOID_OS v∞ — BOOTING...',              cls: '' },
  { text: '> DATA INTEGRITY: 0.0%',                 cls: 'is-warn' },
  { text: '> YOU ARE NOT SUPPOSED TO BE HERE',      cls: 'is-error' },
]

let logIndex = 0
let logTimer = null

function appendLog() {
  if (logIndex >= LOG_MESSAGES.length) return
  const { text, cls } = LOG_MESSAGES[logIndex++]
  const line = document.createElement('span')
  line.className = `void-log__line${cls ? ' ' + cls : ''}`
  line.textContent = text
  voidLogEl.appendChild(line)
  // keep only last 4 lines visible
  const lines = voidLogEl.querySelectorAll('.void-log__line')
  if (lines.length > 4) lines[0].remove()
  logTimer = setTimeout(appendLog, 480 + rand(0, 300))
}

// -- Floating fragments
const FRAG_TEXTS = [
  'NULL', 'VOID', '0x00', 'ERR', '∅', '???', 'LOST', 'SECTOR_NULL',
  '0xDEAD', 'NaN', 'UNDEFINED', '//BREACH', 'DATA:CORRUPT', '∞',
  'BYPASS_ACTIVE', '0xFF', 'UNKNOWN', 'REDACTED',
]
let fragInterval = null

function spawnFragment() {
  const el = document.createElement('div')
  el.className = 'void-fragment'
  el.textContent = FRAG_TEXTS[Math.floor(rand(0, FRAG_TEXTS.length))]
  el.style.left     = `${rand(2, 95)}%`
  el.style.bottom   = `-${rand(0, 20)}px`
  el.style.animationDuration  = `${rand(6, 14)}s`
  el.style.animationDelay     = `${rand(0, 2)}s`
  el.style.fontSize           = `${rand(0.5, 0.85)}rem`
  el.style.opacity            = String(rand(0.2, 0.5))
  voidFragments.appendChild(el)
  setTimeout(() => el.remove(), 16000)
}

// -- Coord scrambler
let coordTimer = null
function scrambleCoord() {
  if (!voidCoord) return
  const chars = '0123456789ABCDEF'
  voidCoord.textContent = Array.from({ length: 8 }, () =>
    chars[Math.floor(rand(0, chars.length))]
  ).join(':')
  coordTimer = setTimeout(scrambleCoord, 200 + rand(0, 400))
}

// -- Reality index decay
let realityVal  = 1.000
let realityTimer = null
function decayReality() {
  if (!voidReality) return
  realityVal = Math.max(0, realityVal - rand(0.001, 0.008))
  voidReality.textContent = realityVal.toFixed(3)
  realityTimer = setTimeout(decayReality, 120)
}

// -- Enter the void
function enterVoid() {
  // Phase 1: button burst
  bypassBtn.classList.add('btn--bypass-burst')

  setTimeout(() => {
    // Phase 2: RGB flash
    rgbFlash.classList.add('is-active')

    setTimeout(() => {
      rgbFlash.classList.remove('is-active')

      // Phase 3: show overlay (opaque, no content yet)
      voidOverlay.setAttribute('aria-hidden', 'false')
      voidOverlay.classList.add('is-visible')
      voidNoiseActive = true
      drawNoise()

      // wipe in
      voidWipe.classList.add('wipe-in')

      setTimeout(() => {
        voidWipe.classList.remove('wipe-in')

        // Phase 4: reveal content
        voidOverlay.classList.add('is-ready')

        // start live effects
        logIndex = 0
        if (voidLogEl) voidLogEl.innerHTML = ''
        appendLog()
        scrambleCoord()
        realityVal = 1.000
        decayReality()
        fragInterval = setInterval(spawnFragment, 1200)

      }, 500)
    }, 650)
  }, 500)
}

// -- Exit the void
function exitVoid() {
  // stop live effects
  clearTimeout(logTimer)
  clearTimeout(coordTimer)
  clearTimeout(realityTimer)
  clearInterval(fragInterval)
  voidNoiseActive = false
  if (voidFragments) voidFragments.innerHTML = ''
  if (voidLogEl)     voidLogEl.innerHTML     = ''

  // wipe out then hide
  voidWipe.classList.add('wipe-out')

  setTimeout(() => {
    voidOverlay.classList.remove('is-visible', 'is-ready')
    voidOverlay.setAttribute('aria-hidden', 'true')
    voidWipe.classList.remove('wipe-out')
    bypassBtn.classList.remove('btn--bypass-burst')
  }, 450)
}

bypassBtn?.addEventListener('click', enterVoid)
jackoutBtn?.addEventListener('click', exitVoid)
