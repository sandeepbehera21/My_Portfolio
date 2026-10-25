/**
 * Screenshot + diagnostics via the Chrome DevTools Protocol.
 *
 * Unlike `chrome --screenshot`, this drives a real page lifecycle: the tab is
 * marked active (headless otherwise reports `document.hidden === true`, which
 * parks any render loop waiting on visibility), timing is real rather than
 * virtual, and console output — including three.js shader compile errors — is
 * collected instead of discarded.
 *
 * Usage: node shoot.mjs <url> <out.png> <width> <height> <waitMs> [probeJs]
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const [, , url, out, wArg, hArg, waitArg, probe] = process.argv
const width = Number(wArg || 1600)
const height = Number(hArg || 1000)
const waitMs = Number(waitArg || 4000)
const PORT = Number(process.env.CDP_PORT || 9222)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function findPageTarget() {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      const targets = await res.json()
      const page = targets.find((t) => t.type === 'page' && t.webSocketDebuggerUrl)
      if (page) return page
    } catch {
      /* devtools endpoint not up yet */
    }
    await sleep(250)
  }
  throw new Error('No page target appeared on the debugging port')
}

const target = await findPageTarget()
const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve, reject) => {
  socket.onopen = resolve
  socket.onerror = () => reject(new Error('DevTools socket failed'))
})

let nextId = 0
const pending = new Map()
const logs = []

socket.onmessage = (event) => {
  const msg = JSON.parse(event.data)
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id)
    pending.delete(msg.id)
    if (msg.error) reject(new Error(`${msg.error.message}`))
    else resolve(msg.result)
    return
  }
  if (msg.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(msg.params.type)) {
    logs.push(`[${msg.params.type}] ` + msg.params.args.map((a) => a.value ?? a.description ?? a.type).join(' '))
  }
  if (msg.method === 'Runtime.exceptionThrown') {
    const d = msg.params.exceptionDetails
    logs.push(`[exception] ${d.text} ${d.exception?.description ?? ''}`)
  }
}

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++nextId
    pending.set(id, { resolve, reject })
    socket.send(JSON.stringify({ id, method, params }))
  })

await send('Page.enable')
await send('Runtime.enable')
await send('Log.enable')
await send('Emulation.setDeviceMetricsOverride', {
  width,
  height,
  deviceScaleFactor: Number(process.env.DPR || 1),
  // Reporting a touch device is what makes the capability gate see a coarse
  // pointer, which is how a real phone is turned away from the 3D layer.
  mobile: !!process.env.MOBILE,
})
// Make the tab report itself as foreground, so visibility-gated work runs.
// Reporting a touch device is what makes the capability gate see a coarse
// pointer, which is how a real phone is turned away from the 3D layer. Touch
// emulation is what actually makes `pointer: coarse` report as such.
if (process.env.MOBILE) {
  await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 })
}

await send('Emulation.setFocusEmulationEnabled', { enabled: true })
await send('Page.setWebLifecycleState', { state: 'active' }).catch(() => {})
// Lets a capture exercise the reduced-motion path without changing the source.
if (process.env.EMULATE_MEDIA) {
  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: process.env.EMULATE_MEDIA }],
  })
}

// Makes the page look like a device without WebGL, so the plain cut-out path
// can be captured without touching the capability gate.
if (process.env.DISABLE_WEBGL) {
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `{
      const real = HTMLCanvasElement.prototype.getContext
      HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
        if (String(type).includes('webgl')) return null
        return real.call(this, type, ...rest)
      }
    }`,
  })
}

await send('Page.navigate', { url })

// Poll rather than sleep a fixed amount: navigation replaces the execution
// context, and evaluating too early reads the previous document.
const evaluateIn = async (expression) => {
  const res = await send('Runtime.evaluate', { returnByValue: true, expression })
  return res.result?.value
}
let mounted = false
for (let attempt = 0; attempt < 60; attempt++) {
  await sleep(250)
  try {
    mounted = await evaluateIn("!!document.querySelector('#root')?.children.length")
    if (mounted) break
  } catch {
    /* context not ready yet */
  }
}
await sleep(Number(process.env.SETTLE_MS || 2500))

// Walks the cursor to a point in steps, so anything that eases towards the
// pointer has actually arrived by the time the shot is taken.
if (process.env.MOVE_POINTER) {
  const [tx, ty] = process.env.MOVE_POINTER.split(',').map(Number)
  for (let step = 1; step <= 12; step++) {
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: Math.round((tx * step) / 12),
      y: Math.round((ty * step) / 12),
      buttons: 0,
    })
    await sleep(40)
  }
  await sleep(700)
}

const state = await send('Runtime.evaluate', {
  returnByValue: true,
  awaitPromise: true,
  expression: `(() => {
    const el = (sel) => document.querySelector(sel)
    const wrap = el('.landing-wrap')
    const canvasLayer = el('.hero-canvas')
    const canvas = el('.hero-canvas canvas')
    const portrait = el('.landing-portrait')
    return {
      hidden: document.hidden,
      visibilityState: document.visibilityState,
      hasFocus: document.hasFocus(),
      wrapClass: wrap ? wrap.className : null,
      canvasLayerClass: canvasLayer ? canvasLayer.className : null,
      canvasSize: canvas ? canvas.width + 'x' + canvas.height : null,
      canvasLayerOpacity: canvasLayer ? getComputedStyle(canvasLayer).opacity : null,
      nameLines: [...document.querySelectorAll('.hero-name-line')].map((n) => n.textContent),
      nameLineBoxes: [...document.querySelectorAll('.hero-name-line')].map((n) => {
        const r = n.getBoundingClientRect()
        return Math.round(r.width) + 'x' + Math.round(r.height) + '@' + Math.round(r.left)
      }),
      portraitOpacity: portrait ? getComputedStyle(portrait).opacity : null,
      docHeight: document.documentElement.scrollHeight,
      errorCount: 0,
    }
  })()`,
})

if (state.result?.value === undefined) {
  console.error('evaluate failed:', JSON.stringify(state, null, 2))
}


const shot = await send('Page.captureScreenshot', { format: 'png' })
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, Buffer.from(shot.data, 'base64'))

if (probe) {
  const extra = await send('Runtime.evaluate', {
    returnByValue: true,
    awaitPromise: true,
    expression: probe,
  })
  console.log('probe:', JSON.stringify(extra.result?.value ?? extra.result, null, 2))
}

console.log('state:', JSON.stringify(state.result.value, null, 2))
console.log('logs:', logs.length ? '\n  ' + logs.join('\n  ') : '(none)')
console.log('wrote', out)
socket.close()
