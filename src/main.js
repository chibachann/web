/* ============================================================
   CYBER//UI — main.js
   - Matrix rain canvas
   - Typewriter effect
   - Scroll-spy nav
   - Live card metrics
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


// ── Scroll-spy nav ────────────────────────────────────────────
const sections = document.querySelectorAll('.section[id]')
const navLinks  = document.querySelectorAll('.nav__link')

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const id = entry.target.id
      navLinks.forEach(a => {
        a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`)
      })
    })
  },
  { threshold: 0.45 }
)
sections.forEach(s => observer.observe(s))


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
