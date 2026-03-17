/* ============================================================
   GHOST.NET — Secure Terminal
   - Matrix rain canvas
   - Intel ticker
   - Typewriter + session timer + city clock
   - City network map (canvas)
   - Operations board interaction
   - Scroll-spy nav
   - Live card metrics
   - Swipe navigation (mobile)
   - BYPASS → VOID dimension
   ============================================================ */

// ── Matrix rain ───────────────────────────────────────────────
const canvas = document.getElementById('matrix-canvas')
const ctx    = canvas.getContext('2d')

const CHARS     = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@<>{}[]'
const FONT_SIZE = 13
let cols, drops

function initMatrix() {
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
  cols  = Math.floor(canvas.width / FONT_SIZE)
  drops = Array.from({ length: cols }, () => Math.random() * -50)
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(3, 3, 8, 0.08)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.font = `${FONT_SIZE}px "Space Mono", monospace`
  for (let i = 0; i < drops.length; i++) {
    const char = CHARS[Math.floor(Math.random() * CHARS.length)]
    ctx.fillStyle = drops[i] > 2 ? 'rgba(0,255,65,.55)' : '#fff'
    ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE)
    if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) drops[i] = 0
    drops[i] += 0.35 + Math.random() * 0.15
  }
}

initMatrix()
window.addEventListener('resize', initMatrix)
setInterval(drawMatrix, 50)


// ── Intel Ticker ──────────────────────────────────────────────
const TICKER_ITEMS = [
  { text: '▲ AXIOM CORP MEGABUILDING 07 — 不審なネットワーク活動を検出', cls: 'ticker-item--critical' },
  { text: 'SECTOR GAMMA — 工業地帯で爆発事故。原因不明',                  cls: 'ticker-item--warn' },
  { text: 'GHOST COLLECTIVE — 新たな潜伏ポイントを確立。THETA-09 稼働中', cls: '' },
  { text: '▲ NEON SYNDICATE — BETA セクター支配権を巡り衝突発生',         cls: 'ticker-item--warn' },
  { text: 'AXIOM CORP が新型 ICE プロトコルを展開。ネット接続に注意',      cls: 'ticker-item--critical' },
  { text: 'FREE CIRCUIT — 市民ネットワーク解放運動、ALPHA で抗議活動',     cls: '' },
  { text: '▲ SECTOR NULL — 新たな異常シグナルを複数確認。接近禁止',       cls: 'ticker-item--critical' },
  { text: 'GHOST.NET 稼働率: 99.7% — 全ノード正常',                       cls: '' },
  { text: 'オペレーター SPECTER — 本日47件目の作戦完了を記録',             cls: '' },
  { text: '▲ HARBOR FRONT (ZETA) — 密輸船が拿捕。積み荷の詳細は不明',    cls: 'ticker-item--warn' },
]

const tickerInner = document.getElementById('ticker-inner')
if (tickerInner) {
  // render items twice for seamless loop
  const renderItems = () => TICKER_ITEMS.map(item =>
    `<span class="ticker-item ${item.cls}">${item.text}</span><span class="ticker-sep" aria-hidden="true">◈</span>`
  ).join('')
  tickerInner.innerHTML = renderItems() + renderItems()

  let tickerX = 0
  const TICKER_SPEED = 0.6
  function animateTicker() {
    tickerX -= TICKER_SPEED
    const halfWidth = tickerInner.scrollWidth / 2
    if (Math.abs(tickerX) >= halfWidth) tickerX = 0
    tickerInner.style.transform = `translateX(${tickerX}px)`
    requestAnimationFrame(animateTicker)
  }
  animateTicker()
}


// ── Typewriter ────────────────────────────────────────────────
const typeEl = document.querySelector('.typewriter')
if (typeEl) {
  const text  = typeEl.dataset.text
  let   index = 0
  function type() {
    if (index <= text.length) {
      typeEl.textContent = text.slice(0, index++)
      setTimeout(type, 60 + Math.random() * 50)
    }
  }
  setTimeout(type, 800)
}


// ── City clock & session timer ────────────────────────────────
const cityTimeEl  = document.getElementById('city-time')
const sessionEl   = document.getElementById('session-timer')
const sessionStart = Date.now()

// NEON CITY runs 4 hours ahead of local time (fictional offset)
function updateClocks() {
  const now     = new Date(Date.now() + 4 * 3600 * 1000)
  const hh      = String(now.getUTCHours()).padStart(2, '0')
  const mm      = String(now.getUTCMinutes()).padStart(2, '0')
  const ss      = String(now.getUTCSeconds()).padStart(2, '0')
  if (cityTimeEl) cityTimeEl.textContent = `${hh}:${mm}:${ss}`

  const elapsed = Math.floor((Date.now() - sessionStart) / 1000)
  const sh = String(Math.floor(elapsed / 3600)).padStart(2, '0')
  const sm = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0')
  const ssc = String(elapsed % 60).padStart(2, '0')
  if (sessionEl) sessionEl.textContent = `${sh}:${sm}:${ssc}`
}
setInterval(updateClocks, 1000)
updateClocks()


// ── Operator avatar (pixel art style) ────────────────────────
const avatarCanvas = document.getElementById('avatar-canvas')
if (avatarCanvas) {
  const ac  = avatarCanvas.getContext('2d')
  const W   = avatarCanvas.width
  const H   = avatarCanvas.height
  // draw a stylized pixel silhouette + scanlines
  function drawAvatar() {
    ac.fillStyle = '#0a0a14'
    ac.fillRect(0, 0, W, H)

    // pixelated "figure" silhouette
    const pixels = [
      [3,1],[4,1],[3,2],[4,2],              // head
      [2,3],[3,3],[4,3],[5,3],              // neck/shoulder
      [2,4],[3,4],[4,4],[5,4],              // chest
      [1,5],[2,5],[3,5],[4,5],[5,5],[6,5],  // body
      [2,6],[3,6],[4,6],[5,6],
      [2,7],[5,7],                          // legs split
      [2,8],[5,8],
      [1,9],[2,9],[5,9],[6,9],              // feet
    ]
    const sz = 8
    pixels.forEach(([px, py]) => {
      const t = Date.now() / 800
      const glitch = Math.random() > 0.97 ? (Math.random() - 0.5) * 2 : 0
      const alpha  = 0.6 + 0.4 * Math.sin(t + px + py)
      ac.fillStyle = `rgba(0, 245, 255, ${alpha})`
      ac.fillRect(px * sz + glitch, py * sz, sz - 1, sz - 1)
    })

    // scanline overlay
    for (let y = 0; y < H; y += 4) {
      ac.fillStyle = 'rgba(0,0,0,0.25)'
      ac.fillRect(0, y, W, 2)
    }
  }
  setInterval(drawAvatar, 120)
  drawAvatar()
}


// ── City Network Map ──────────────────────────────────────────
const cityCanvas = document.getElementById('city-canvas')
const cityTooltip = document.getElementById('city-tooltip')

if (cityCanvas) {
  const cityCtx = cityCanvas.getContext('2d')

  const THREAT_COLOR = {
    0: '#00f5ff', // safe   - cyan
    1: '#00ff41', // clear  - green
    2: '#ff6600', // caution - orange
    3: '#ff3333', // danger - red
    4: '#cc00ff', // void   - purple
  }
  const THREAT_LABEL = { 0:'SAFE', 1:'CLEAR', 2:'CAUTION', 3:'DANGER', 4:'VOID' }
  const THREAT_GLOW  = {
    0: 'rgba(0,245,255,.7)',
    1: 'rgba(0,255,65,.7)',
    2: 'rgba(255,102,0,.7)',
    3: 'rgba(255,51,51,.7)',
    4: 'rgba(204,0,255,.7)',
  }

  const NODES = [
    { id:'ALPHA', name:'Corporate District', rx:.38, ry:.16, threat:2, pop:'2.4M', ctrl:'AXIOM CORP' },
    { id:'SIGMA', name:'Financial Core',     rx:.62, ry:.20, threat:1, pop:'0.8M', ctrl:'AXIOM CORP' },
    { id:'BETA',  name:'Neon Markets',       rx:.16, ry:.42, threat:1, pop:'4.1M', ctrl:'NEON SYN' },
    { id:'DELTA', name:'Central Hub',        rx:.42, ry:.46, threat:2, pop:'3.2M', ctrl:'CONTESTED' },
    { id:'GAMMA', name:'Industrial Zone',    rx:.76, ry:.38, threat:3, pop:'1.1M', ctrl:'AXIOM CORP' },
    { id:'ETA',   name:'Slum District',      rx:.16, ry:.70, threat:3, pop:'6.8M', ctrl:'FREE CIRCUIT' },
    { id:'THETA', name:'Underground',        rx:.40, ry:.74, threat:0, pop:'???',  ctrl:'GHOST COL' },
    { id:'ZETA',  name:'Harbor Front',       rx:.74, ry:.68, threat:2, pop:'0.9M', ctrl:'NEON SYN' },
    { id:'NULL',  name:'VOID SECTOR',        rx:.40, ry:.92, threat:4, pop:'NULL', ctrl:'UNKNOWN' },
  ]
  const EDGES = [
    ['ALPHA','SIGMA'],['ALPHA','DELTA'],['ALPHA','BETA'],
    ['SIGMA','GAMMA'],['SIGMA','DELTA'],
    ['BETA','DELTA'],['BETA','ETA'],
    ['DELTA','GAMMA'],['DELTA','ETA'],['DELTA','THETA'],['DELTA','ZETA'],
    ['GAMMA','ZETA'],
    ['ETA','THETA'],
    ['THETA','ZETA'],['THETA','NULL'],
  ]

  // animated data packets per edge
  const packets = EDGES.map(([from, to]) => ({
    from, to, progress: Math.random(), speed: 0.004 + Math.random() * 0.004
  }))

  let hoveredNode = null
  let W, H, nodeR

  function resizeCityCanvas() {
    const rect = cityCanvas.parentElement.getBoundingClientRect()
    W = cityCanvas.width  = rect.width
    H = cityCanvas.height = cityCanvas.offsetHeight || 320
    nodeR = Math.min(W, H) * 0.038
  }
  resizeCityCanvas()
  window.addEventListener('resize', resizeCityCanvas)

  function getNodePos(node) {
    return { x: node.rx * W, y: node.ry * H }
  }

  function drawCity() {
    cityCtx.clearRect(0, 0, W, H)

    // faint grid
    cityCtx.strokeStyle = 'rgba(0,245,255,.04)'
    cityCtx.lineWidth   = 1
    for (let gx = 0; gx < W; gx += 44) {
      cityCtx.beginPath(); cityCtx.moveTo(gx, 0); cityCtx.lineTo(gx, H); cityCtx.stroke()
    }
    for (let gy = 0; gy < H; gy += 44) {
      cityCtx.beginPath(); cityCtx.moveTo(0, gy); cityCtx.lineTo(W, gy); cityCtx.stroke()
    }

    // edges
    EDGES.forEach(([fromId, toId]) => {
      const a = NODES.find(n => n.id === fromId)
      const b = NODES.find(n => n.id === toId)
      if (!a || !b) return
      const pa = getNodePos(a)
      const pb = getNodePos(b)
      const isHovered = hoveredNode && (hoveredNode.id === fromId || hoveredNode.id === toId)

      cityCtx.beginPath()
      cityCtx.moveTo(pa.x, pa.y)
      cityCtx.lineTo(pb.x, pb.y)
      cityCtx.strokeStyle = isHovered
        ? `rgba(0,245,255,.4)`
        : `rgba(0,245,255,.1)`
      cityCtx.lineWidth = isHovered ? 1.5 : 1
      cityCtx.setLineDash([4, 6])
      cityCtx.stroke()
      cityCtx.setLineDash([])
    })

    // data packets
    packets.forEach(pkt => {
      pkt.progress += pkt.speed
      if (pkt.progress > 1) pkt.progress = 0

      const a  = NODES.find(n => n.id === pkt.from)
      const b  = NODES.find(n => n.id === pkt.to)
      if (!a || !b) return
      const pa = getNodePos(a)
      const pb = getNodePos(b)
      const px = pa.x + (pb.x - pa.x) * pkt.progress
      const py = pa.y + (pb.y - pa.y) * pkt.progress

      cityCtx.beginPath()
      cityCtx.arc(px, py, 3, 0, Math.PI * 2)
      cityCtx.fillStyle = 'rgba(0,245,255,.8)'
      cityCtx.shadowBlur  = 8
      cityCtx.shadowColor = '#00f5ff'
      cityCtx.fill()
      cityCtx.shadowBlur  = 0
    })

    // nodes
    NODES.forEach(node => {
      const { x, y }  = getNodePos(node)
      const color      = THREAT_COLOR[node.threat]
      const glow       = THREAT_GLOW[node.threat]
      const isHov      = hoveredNode && hoveredNode.id === node.id
      const pulse      = 1 + 0.08 * Math.sin(Date.now() / 600 + node.rx * 10)
      const r          = nodeR * (isHov ? 1.25 : pulse)
      const isVoid     = node.threat === 4

      // outer ring (void nodes pulse bigger)
      cityCtx.beginPath()
      cityCtx.arc(x, y, r + 5, 0, Math.PI * 2)
      cityCtx.strokeStyle = isVoid
        ? `rgba(204,0,255,${0.15 + 0.15 * Math.sin(Date.now()/400)})`
        : (isHov ? `${color}55` : `${color}22`)
      cityCtx.lineWidth = 1
      cityCtx.stroke()

      // glow shadow
      cityCtx.shadowBlur  = isHov ? 24 : 12
      cityCtx.shadowColor = glow

      // fill
      cityCtx.beginPath()
      cityCtx.arc(x, y, r, 0, Math.PI * 2)
      cityCtx.fillStyle = isVoid
        ? `rgba(204,0,255,0.25)`
        : `rgba(0,0,0,0.7)`
      cityCtx.fill()

      // border circle
      cityCtx.strokeStyle = color
      cityCtx.lineWidth   = isHov ? 2 : 1.5
      cityCtx.stroke()
      cityCtx.shadowBlur = 0

      // center dot
      cityCtx.beginPath()
      cityCtx.arc(x, y, r * 0.3, 0, Math.PI * 2)
      cityCtx.fillStyle = color
      cityCtx.fill()

      // label
      cityCtx.font         = `bold ${Math.round(nodeR * 0.58)}px "Orbitron", monospace`
      cityCtx.textAlign    = 'center'
      cityCtx.textBaseline = 'middle'
      cityCtx.fillStyle    = isHov ? '#fff' : color
      cityCtx.shadowBlur   = isHov ? 8 : 0
      cityCtx.shadowColor  = glow
      cityCtx.fillText(node.id, x, y + r + nodeR * 0.75)
      cityCtx.shadowBlur = 0
    })

    requestAnimationFrame(drawCity)
  }
  drawCity()

  // hover detection
  cityCanvas.addEventListener('mousemove', e => {
    const rect = cityCanvas.getBoundingClientRect()
    const mx   = (e.clientX - rect.left) / rect.width
    const my   = (e.clientY - rect.top)  / (rect.height || 1)

    hoveredNode = null
    for (const node of NODES) {
      const dx   = mx - node.rx
      const dy   = my - (node.ry * (H / (rect.height || H)))
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 0.055) { hoveredNode = node; break }
    }

    if (hoveredNode && cityTooltip) {
      const n  = hoveredNode
      const cx = n.rx * rect.width
      const cy = n.ry * rect.height

      cityTooltip.innerHTML = `
        <div class="city-tooltip__name">${n.id} — ${n.name}</div>
        <div class="city-tooltip__row">
          <span class="city-tooltip__key">THREAT</span>
          <span class="city-tooltip__val" style="color:${THREAT_COLOR[n.threat]}">${THREAT_LABEL[n.threat]}</span>
        </div>
        <div class="city-tooltip__row">
          <span class="city-tooltip__key">POPULATION</span>
          <span class="city-tooltip__val">${n.pop}</span>
        </div>
        <div class="city-tooltip__row">
          <span class="city-tooltip__key">CONTROL</span>
          <span class="city-tooltip__val">${n.ctrl}</span>
        </div>`

      // after innerHTML, measure the tooltip to avoid overflow
      const tipW = cityTooltip.offsetWidth  || 180
      const tipH = cityTooltip.offsetHeight || 100
      const isMobile = rect.width < 500

      let tipX, tipY
      if (isMobile) {
        // on mobile: center horizontally, position above node
        tipX = Math.max(4, Math.min(cx - tipW / 2, rect.width - tipW - 4))
        tipY = Math.max(4, cy - tipH - 14)
      } else {
        tipX = cx + 16
        tipY = cy + 8
        if (tipX + tipW > rect.width  - 4) tipX = cx - tipW - 8
        if (tipY + tipH > rect.height - 4) tipY = cy - tipH - 8
      }

      cityTooltip.style.left = `${tipX}px`
      cityTooltip.style.top  = `${tipY}px`
      cityTooltip.classList.add('is-visible')
    } else if (cityTooltip) {
      cityTooltip.classList.remove('is-visible')
    }
  })

  cityCanvas.addEventListener('mouseleave', () => {
    hoveredNode = null
    cityTooltip?.classList.remove('is-visible')
  })

  // touch tap on mobile
  cityCanvas.addEventListener('click', e => {
    const rect = cityCanvas.getBoundingClientRect()
    const mx   = (e.clientX - rect.left) / rect.width
    const my   = (e.clientY - rect.top)  / (rect.height || 1)
    for (const node of NODES) {
      const dx   = mx - node.rx
      const dy   = my - node.ry
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 0.07) { hoveredNode = node; break }
    }
  })
}


// ── Operations board ──────────────────────────────────────────
const opModal     = document.getElementById('op-modal')
const opModalName = document.getElementById('op-modal-name')
const opModalSect = document.getElementById('op-modal-sector')

// color risk bars by fill amount
document.querySelectorAll('.op-item__risk').forEach(el => {
  const risk  = parseInt(el.dataset.risk)
  const bars  = el.querySelectorAll('.risk-bars span')
  const colors = ['','#00ff41','#00ff41','#ff6600','#ff6600','#ff3333']
  bars.forEach((b, i) => {
    if (i < risk) {
      b.style.background   = colors[risk] || '#ff3333'
      b.style.boxShadow    = `0 0 4px ${colors[risk]}`
    }
  })
})

document.querySelectorAll('.op-accept').forEach(btn => {
  btn.addEventListener('click', () => {
    const sector  = btn.dataset.sector
    const opName  = btn.dataset.name
    const opItem  = btn.closest('.op-item')

    if (opModalName) opModalName.textContent = opName
    if (opModalSect) opModalSect.textContent = `SECTOR ${sector}`
    opModal?.setAttribute('aria-hidden', 'false')
    opModal?.classList.add('is-visible')
    opItem?.classList.add('is-accepted')

    // auto-dismiss after 3s
    setTimeout(() => {
      opModal?.classList.remove('is-visible')
      opModal?.setAttribute('aria-hidden', 'true')
    }, 3000)
  })
})


// ── Scroll-spy nav + swipe indicator sync ─────────────────────
const sections   = Array.from(document.querySelectorAll('.section[id]'))
const navLinks   = document.querySelectorAll('.nav__link')
const indicator  = document.getElementById('swipe-indicator')
const swipeLabel = document.getElementById('swipe-label')
const swipeDots  = document.getElementById('swipe-dots')

sections.forEach((_, i) => {
  const dot = document.createElement('div')
  dot.className = 'swipe-indicator__dot'
  if (i === 0) dot.classList.add('is-active')
  swipeDots?.appendChild(dot)
})

let currentSectionIndex = 0

function updateIndicator(index) {
  currentSectionIndex = index
  const section = sections[index]
  if (!section) return
  const titleEl = section.querySelector('.section__title')
  const label   = titleEl
    ? titleEl.textContent.replace(/^\/\/\s*/, '').trim()
    : section.id.toUpperCase()
  if (swipeLabel) swipeLabel.textContent = label
  document.querySelectorAll('.swipe-indicator__dot').forEach((dot, i) => {
    dot.classList.toggle('is-active', i === index)
  })
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    const id    = entry.target.id
    const index = sections.findIndex(s => s.id === id)
    navLinks.forEach(a => {
      a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`)
    })
    document.querySelector('.nav__link.is-active')
      ?.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' })
    updateIndicator(index)
  })
}, { threshold: 0.4 })
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

document.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}, { passive: true })

document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX
  const dy = e.changedTouches[0].clientY - touchStartY
  if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return
  const direction = dx < 0 ? 1 : -1
  const nextIndex = Math.min(Math.max(currentSectionIndex + direction, 0), sections.length - 1)
  if (nextIndex === currentSectionIndex) return
  sections[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' })
  updateIndicator(nextIndex)
  showIndicator()
}, { passive: true })


// ── Live card metrics ─────────────────────────────────────────
function rand(min, max) { return Math.random() * (max - min) + min }

setInterval(() => {
  const cpu   = document.querySelector('.live-cpu')
  const mem   = document.querySelector('.live-mem')
  const port  = document.querySelector('.live-port')
  const files = document.querySelector('.live-files')
  if (cpu)   cpu.textContent   = Math.round(rand(70, 99))
  if (mem)   mem.textContent   = rand(1.8, 3.9).toFixed(1)
  if (port)  port.textContent  = [8080, 4433, 3000, 9090, 1337][Math.floor(rand(0, 5))]
  if (files) files.textContent = Math.round(rand(3800, 5000)).toLocaleString()
}, 2200)


// ── Progress bar demo ─────────────────────────────────────────
const bar  = document.getElementById('progress-bar')
const pval = document.getElementById('progress-val')
let pct    = 72

setInterval(() => {
  pct = pct >= 100 ? 0 : pct + Math.round(rand(1, 4))
  if (bar)  bar.style.width  = `${pct}%`
  if (pval) pval.textContent = pct
}, 800)


// ── BYPASS → VOID dimension ────────────────────────────────────
const bypassBtn    = document.getElementById('btn-bypass')
const voidOverlay  = document.getElementById('void-overlay')
const jackoutBtn   = document.getElementById('btn-jackout')
const rgbFlash     = document.getElementById('rgb-flash')
const voidWipe     = document.getElementById('void-wipe')
const voidLogEl    = document.getElementById('void-log')
const voidCoord    = document.getElementById('void-coord')
const voidReality  = document.getElementById('void-reality')
const voidFragments = document.getElementById('void-fragments')

// Void noise canvas
const voidCanvas = document.getElementById('void-canvas')
const voidCtx    = voidCanvas?.getContext('2d')
let voidNoiseActive = false

function resizeVoidCanvas() {
  if (!voidCanvas) return
  voidCanvas.width  = window.innerWidth
  voidCanvas.height = window.innerHeight
}
resizeVoidCanvas()
window.addEventListener('resize', resizeVoidCanvas)

function drawNoise() {
  if (!voidNoiseActive || !voidCtx || !voidCanvas) return
  const w = voidCanvas.width, h = voidCanvas.height
  const img = voidCtx.createImageData(w, h)
  const d   = img.data
  for (let i = 0; i < d.length; i += 4) {
    const v = Math.random() > 0.5 ? Math.floor(rand(0, 120)) : 0
    d[i] = v * 0.6; d[i+1] = 0; d[i+2] = v; d[i+3] = v > 0 ? 180 : 0
  }
  voidCtx.putImageData(img, 0, 0)
  requestAnimationFrame(drawNoise)
}

const LOG_MESSAGES = [
  { text: '> FIREWALL PROTOCOL... BYPASSED',       cls: 'is-warn' },
  { text: '> ENTERING UNREGISTERED SECTOR...',     cls: '' },
  { text: '> WARNING: REALITY MATRIX UNSTABLE',    cls: 'is-error' },
  { text: '> COORDINATES CANNOT BE RESOLVED',      cls: 'is-error' },
  { text: '> CONNECTION TO HOME SECTOR: LOST',     cls: 'is-error' },
  { text: '> VOID_OS v∞ — BOOTING...',             cls: '' },
  { text: '> DATA INTEGRITY: 0.0%',                cls: 'is-warn' },
  { text: '> YOU ARE NOT SUPPOSED TO BE HERE',     cls: 'is-error' },
]

let logIndex = 0, logTimer = null

function appendLog() {
  if (logIndex >= LOG_MESSAGES.length) return
  const { text, cls } = LOG_MESSAGES[logIndex++]
  const line = document.createElement('span')
  line.className = `void-log__line${cls ? ' ' + cls : ''}`
  line.textContent = text
  voidLogEl?.appendChild(line)
  const lines = voidLogEl?.querySelectorAll('.void-log__line')
  if (lines?.length > 4) lines[0].remove()
  logTimer = setTimeout(appendLog, 480 + rand(0, 300))
}

const FRAG_TEXTS = ['NULL','VOID','0x00','ERR','∅','???','LOST','SECTOR_NULL','0xDEAD','NaN','UNDEFINED','//BREACH','DATA:CORRUPT','∞','BYPASS_ACTIVE','UNKNOWN']
let fragInterval = null

function spawnFragment() {
  if (!voidFragments) return
  const el = document.createElement('div')
  el.className     = 'void-fragment'
  el.textContent   = FRAG_TEXTS[Math.floor(rand(0, FRAG_TEXTS.length))]
  el.style.left    = `${rand(2, 95)}%`
  el.style.bottom  = `-${rand(0, 20)}px`
  el.style.animationDuration = `${rand(6, 14)}s`
  el.style.animationDelay    = `${rand(0, 2)}s`
  el.style.fontSize          = `${rand(0.5, 0.85)}rem`
  voidFragments.appendChild(el)
  setTimeout(() => el.remove(), 16000)
}

let coordTimer = null
function scrambleCoord() {
  if (!voidCoord) return
  const chars = '0123456789ABCDEF'
  voidCoord.textContent = Array.from({ length: 8 }, () =>
    chars[Math.floor(rand(0, chars.length))]
  ).join(':')
  coordTimer = setTimeout(scrambleCoord, 200 + rand(0, 400))
}

let realityVal = 1.000, realityTimer = null
function decayReality() {
  if (!voidReality) return
  realityVal = Math.max(0, realityVal - rand(0.001, 0.008))
  voidReality.textContent = realityVal.toFixed(3)
  realityTimer = setTimeout(decayReality, 120)
}

function enterVoid() {
  bypassBtn?.classList.add('btn--bypass-burst')
  setTimeout(() => {
    rgbFlash?.classList.add('is-active')
    setTimeout(() => {
      rgbFlash?.classList.remove('is-active')
      voidOverlay?.setAttribute('aria-hidden', 'false')
      voidOverlay?.classList.add('is-visible')
      voidNoiseActive = true
      drawNoise()
      voidWipe?.classList.add('wipe-in')
      setTimeout(() => {
        voidWipe?.classList.remove('wipe-in')
        voidOverlay?.classList.add('is-ready')
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

function exitVoid() {
  clearTimeout(logTimer)
  clearTimeout(coordTimer)
  clearTimeout(realityTimer)
  clearInterval(fragInterval)
  voidNoiseActive = false
  if (voidFragments) voidFragments.innerHTML = ''
  if (voidLogEl)     voidLogEl.innerHTML     = ''
  voidWipe?.classList.add('wipe-out')
  setTimeout(() => {
    voidOverlay?.classList.remove('is-visible', 'is-ready')
    voidOverlay?.setAttribute('aria-hidden', 'true')
    voidWipe?.classList.remove('wipe-out')
    bypassBtn?.classList.remove('btn--bypass-burst')
  }, 450)
}

bypassBtn?.addEventListener('click', enterVoid)
jackoutBtn?.addEventListener('click', exitVoid)
