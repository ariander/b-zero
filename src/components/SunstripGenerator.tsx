'use client'

import { useEffect, useMemo, useState } from 'react'
import { Download, SunHorizon } from '@phosphor-icons/react'

const LOGO_PATHS = [
  "M137.821 0C146.186 0 150.412 2.57598 150.412 8.19103C150.412 16.1505 145.144 20 134.29 20C125.926 20 121.7 17.3951 121.7 11.78C121.7 3.82055 126.968 0 137.821 0ZM135.159 14.9638C142.944 14.9638 144.392 13.7482 144.392 8.79884C144.392 5.67294 142.192 5.03618 136.924 5.03618C129.138 5.03618 127.72 6.22287 127.72 11.2012C127.72 14.3271 129.949 14.9638 135.159 14.9638Z",
  "M116.432 15.9188L119.355 19.6815H111.338L107.923 14.5585H98.7187L97.8214 19.6815H91.8301L93.5667 9.78278H110.412C112.409 9.78278 114.146 8.82764 114.146 7.26469C114.146 5.99118 113.046 5.35442 111.193 5.35442H94.3482L99.1528 0.318237H111.599C115.651 0.318237 120.455 1.56281 120.455 6.19378C120.455 9.69595 117.937 12.6482 114.203 13.3718C114.753 13.8638 115.361 14.5585 116.432 15.9188Z",
  "M74.2429 14.7032H90.7408L85.994 19.6815H67.3544L70.7987 0.318237H93.201L88.4253 5.35442H75.8927L75.4875 7.6699H90.7987L86.6308 12.0693H74.706L74.2429 14.7032Z",
  "M66.1564 14.7032L61.6701 19.6815H43.3199C41.9885 19.6815 40.9176 18.9289 40.9176 17.6265C40.9176 16.5556 41.6412 15.6004 42.7121 14.8479L50.7295 9.29074C54.4053 6.74371 55.9393 5.73068 56.7787 5.23864C55.7078 5.32547 53.9422 5.35442 50.0927 5.35442H42.3358L47.0536 0.318237H64.9118C66.2722 0.318237 67.3141 1.04183 67.3141 2.37323C67.3141 3.44414 66.6195 4.39928 65.5486 5.12287L57.3865 10.7958C53.7685 13.3139 52.2635 14.298 51.4241 14.819C52.3793 14.7611 56.113 14.7032 59.1521 14.7032H66.1564Z",
  "M31.486 8.01709H41.1531L37.5641 11.7508H27.897L31.486 8.01709Z",
  "M23.589 9.72489C24.9783 10.1301 25.9913 11.3747 25.9913 13.256C25.9913 16.4109 24.3994 19.6815 17.0188 19.6815H0L2.08394 7.90145H19.2185C20.2026 7.90145 21.1288 7.52518 21.1288 6.36744C21.1288 5.61491 20.4052 5.35442 19.6527 5.35442H2.51809L7.49638 0.318237H20.3184C24.4862 0.318237 27.0333 1.88119 27.0333 4.86238C27.0333 7.64096 25.2677 9.17497 23.589 9.72489ZM18.3792 12.0404H7.35166L6.88857 14.7032H17.9161C19.3922 14.7032 20.0579 14.1243 20.0579 13.1402C20.0579 12.4166 19.5369 12.0404 18.3792 12.0404Z",
]

// Strip dimensions — 5000×1000 matches print format 1250×250mm (5:1)
const W = 5000
const H = 1000
const RED_Y = 893
const RED_H = 107
const NUM_SIZE = 555
const GAP = 300          // fixed gap between number and logo
const MIN_NUM_W = 700    // minimum number width (~2 digits) so single digits don't look narrow

// Logo: scale uniformly by target height
const LOGO_TARGET_H = 390
const LOGO_SCALE = LOGO_TARGET_H / 20        // source viewBox height = 20
const LOGO_RENDER_W = Math.round(151 * LOGO_SCALE)  // rendered logo width
const LOGO_H = LOGO_TARGET_H

// ↕ Juster denne for å flytte alt opp (negativt) eller ned (positivt)
const VERTICAL_OFFSET = 80

const LOGO_Y = Math.round((RED_Y - LOGO_H) / 2) + VERTICAL_OFFSET
const NUM_Y = LOGO_Y + LOGO_H  // baseline følger alltid bunn av logo

// skewX angle for italic simulation (Archivo Black has no true italic)
const SKEW = -12  // degrees
const FONT_NAME = 'ArchivoBlack'
const FONT_URL = '/fonts/ArchivoBlack-Regular.ttf'
const FONT_SPEC = `900 ${NUM_SIZE}px '${FONT_NAME}', 'Archivo Black', Arial Black`

// Load & cache the font for canvas use
let fontFaceCache: FontFace | null = null
async function ensureFont(): Promise<void> {
  if (fontFaceCache) return
  const face = new FontFace(FONT_NAME, `url(${FONT_URL})`)
  await face.load()
  document.fonts.add(face)
  fontFaceCache = face
}

/** Measure text width using an offscreen canvas (runs only in browser) */
function measureText(text: string): number {
  if (typeof window === 'undefined') return NUM_SIZE * 0.63 * text.length
  const c = document.createElement('canvas').getContext('2d')!
  c.font = FONT_SPEC
  // account for skew: skewed text occupies extra horizontal space
  const w = c.measureText(text || '0').width
  return w + Math.abs(Math.tan((SKEW * Math.PI) / 180) * NUM_SIZE)
}

/** Compute group start X so (number + gap + logo) is centered in the strip */
function computePositions(numWidth: number) {
  const effectiveW = Math.max(numWidth, MIN_NUM_W)  // enforce minimum width
  const totalW = effectiveW + GAP + LOGO_RENDER_W
  const groupX = Math.round((W - totalW) / 2)
  return {
    numX: groupX + effectiveW / 2,   // textAnchor="middle"
    logoX: groupX + effectiveW + GAP,
  }
}

interface SunstripSVGProps {
  number: string
  color: string
  numX: number
  logoX: number
}

function SunstripSVG({ number, color, numX, logoX }: SunstripSVGProps) {
  const skewRad = (SKEW * Math.PI) / 180
  // SVG transform: skewX skews X axis — skewX(angle) where angle in degrees
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${W} ${H}`}
      style={{ display: 'block', width: '100%', height: '100%' }}>
      <rect width={W} height={H} fill="#0a0a0a" />
      <rect x="0" y={RED_Y} width={W} height={RED_H} fill="#e8140a" />
      {/* Skew group for italic simulation */}
      <g transform={`skewX(${SKEW}) translate(${Math.abs(Math.tan(skewRad) * NUM_SIZE / 2)}, 0)`}>
        <text x={numX} y={NUM_Y} textAnchor="middle"
          fontSize={NUM_SIZE} fontFamily={`'${FONT_NAME}', 'Archivo Black', Arial Black, sans-serif`}
          fontWeight="900" fill={color}>
          {number || '0'}
        </text>
      </g>
      <g transform={`translate(${logoX}, ${LOGO_Y}) scale(${LOGO_SCALE})`}>
        {LOGO_PATHS.map((d, i) => <path key={i} d={d} fill="white" fillRule="nonzero" />)}
      </g>
    </svg>
  )
}

export default function SunstripGenerator() {
  const [number, setNumber] = useState('42')
  const [color, setColor] = useState('#e8140a')
  const [loading, setLoading] = useState(false)
  const [numWidth, setNumWidth] = useState(() => measureText('42'))

  // Re-measure whenever number changes
  useEffect(() => {
    setNumWidth(measureText(number))
  }, [number])

  const { numX, logoX } = useMemo(() => computePositions(numWidth), [numWidth])

  const handleDownload = async () => {
    setLoading(true)
    try {
      // Load all deps in parallel
      const [{ jsPDF }, { svg2pdf }, opentype] = await Promise.all([
        import('jspdf'),
        import('svg2pdf.js'),
        import('opentype.js'),
      ])

      // Parse font to get vector glyph outlines
      const fontRes = await fetch(FONT_URL)
      const fontBuf = await fontRes.arrayBuffer()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const font = (opentype as any).parse(fontBuf)

      // --- Compute positions ---
      // Measure using opentype's own advance width for accuracy
      const advanceWidth = font.getAdvanceWidth(number || '0', NUM_SIZE)
      const effectiveW = Math.max(advanceWidth, MIN_NUM_W)
      const totalW = effectiveW + GAP + LOGO_RENDER_W
      const groupX = Math.round((W - totalW) / 2)
      const dlNumX = groupX + effectiveW / 2       // center x for number
      const dlLogoX = groupX + effectiveW + GAP    // logo left edge

      // --- Convert number text to SVG path outline ---
      // opentype: getPath(str, x, y, fontSize) — x=left baseline
      const startX = dlNumX - advanceWidth / 2
      const glyphPath = font.getPath(number || '0', startX, NUM_Y, NUM_SIZE)
      const pathD: string = glyphPath.toPathData(3)

      // --- Build SVG element with pure paths (no text, no font needed) ---
      const NS = 'http://www.w3.org/2000/svg'
      const svgEl = document.createElementNS(NS, 'svg')
      svgEl.setAttribute('xmlns', NS)
      svgEl.setAttribute('viewBox', `0 0 ${W} ${H}`)
      svgEl.setAttribute('width', `${W}`)
      svgEl.setAttribute('height', `${H}`)

      // Black background
      const bg = document.createElementNS(NS, 'rect')
      bg.setAttribute('width', String(W))
      bg.setAttribute('height', String(H))
      bg.setAttribute('fill', '#0a0a0a')
      svgEl.appendChild(bg)

      // Red stripe
      const stripe = document.createElementNS(NS, 'rect')
      stripe.setAttribute('x', '0')
      stripe.setAttribute('y', String(RED_Y))
      stripe.setAttribute('width', String(W))
      stripe.setAttribute('height', String(RED_H))
      stripe.setAttribute('fill', '#e8140a')
      svgEl.appendChild(stripe)

      // Number as path outline (shear = italic simulation)
      const skewRad = (SKEW * Math.PI) / 180
      const shearX = Math.tan(skewRad)
      const numGroup = document.createElementNS(NS, 'g')
      // matrix(a,b,c,d,e,f): shear in X, compensate horizontal shift
      numGroup.setAttribute('transform', `matrix(1,0,${shearX.toFixed(4)},1,${(-NUM_Y * shearX).toFixed(1)},0)`)
      const numPath = document.createElementNS(NS, 'path')
      numPath.setAttribute('d', pathD)
      numPath.setAttribute('fill', color)
      numGroup.appendChild(numPath)
      svgEl.appendChild(numGroup)

      // B-ZERO logo paths (already vectors)
      const logoGroup = document.createElementNS(NS, 'g')
      logoGroup.setAttribute('transform', `translate(${dlLogoX},${LOGO_Y}) scale(${LOGO_SCALE})`)
      for (const d of LOGO_PATHS) {
        const p = document.createElementNS(NS, 'path')
        p.setAttribute('d', d)
        p.setAttribute('fill', 'white')
        p.setAttribute('fill-rule', 'nonzero')
        logoGroup.appendChild(p)
      }
      svgEl.appendChild(logoGroup)

      // Temporarily mount off-screen (svg2pdf.js needs a DOM element)
      svgEl.style.cssText = 'position:fixed;left:-99999px;top:0'
      document.body.appendChild(svgEl)

      // Convert SVG → vector PDF
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [1250, 250] })
      await svg2pdf(svgEl, pdf, { x: 0, y: 0, width: 1250, height: 250 })

      document.body.removeChild(svgEl)
      
      const filename = `bzero-solskjerm-${number || '0'}.pdf`
      pdf.setProperties({ title: filename })
      pdf.save(filename)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-neutral-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12 pb-24">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-red/20 text-brand-red border border-brand-red/40 rounded-full px-4 py-1 text-xs font-conthrax uppercase tracking-widest mb-6">
            <SunHorizon size={14} weight="fill" />
            Kjøretøy-utstyr
          </div>
          <h1 className="text-3xl md:text-4xl font-conthrax text-slate-100 mb-4 uppercase tracking-wider">
            Sunstrip <span className="text-brand-red block">Generator</span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed">
            Lag din egen B-Zero solskjerm med startnummer. Velg farge, forhåndsvis og last ned
            som trykkeklar PDF (1250 × 250 mm, ~305 DPI).
          </p>
        </header>

        {/* Controls */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 mb-8 flex flex-col sm:flex-row gap-6 items-start sm:items-end">
          <div className="flex-1">
            <label className="block text-xs font-conthrax text-neutral-400 uppercase tracking-widest mb-2">
              Startnummer (maks 3 siffer)
            </label>
            <input type="text" value={number} maxLength={3}
              onChange={e => setNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 3))}
              className="w-full bg-neutral-800 border border-neutral-700 text-white text-4xl font-conthrax rounded-xl px-6 py-4 focus:outline-none focus:border-brand-red transition-colors placeholder:text-neutral-600"
              placeholder="42" />
          </div>

          <div>
            <label className="block text-xs font-conthrax text-neutral-400 uppercase tracking-widest mb-2">
              Nummerfarge
            </label>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-14 h-14 rounded-xl border-2 border-neutral-700 overflow-hidden cursor-pointer relative" style={{ backgroundColor: color }}>
                <input type="color" value={color} onChange={e => setColor(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
              </div>
              <input type="text" value={color.toUpperCase()}
                onChange={e => { if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) setColor(e.target.value) }}
                className="bg-neutral-800 border border-neutral-700 text-white font-mono text-sm rounded-xl px-4 py-4 w-32 focus:outline-none focus:border-brand-red transition-colors" />
              <div className="flex gap-2">
                {['#e8140a', '#f97316', '#f59e0b', '#3b82f6', '#22c55e'].map(c => (
                  <button key={c} onClick={() => setColor(c)}
                    className="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
                    style={{ backgroundColor: c, borderColor: color === c ? 'white' : 'transparent' }} />
                ))}
              </div>
            </div>
          </div>

          <button onClick={handleDownload} disabled={loading || !number}
            className="shrink-0 inline-flex items-center gap-3 bg-brand-red hover:bg-white disabled:bg-neutral-700 disabled:text-neutral-500 text-white hover:text-brand-red font-conthrax uppercase tracking-widest py-4 px-8 rounded-full text-sm transition-all duration-300 shadow-lg border-2 border-brand-red disabled:border-neutral-700 whitespace-nowrap">
            <Download size={18} weight="bold" />
            {loading ? 'Genererer...' : 'Last ned PDF'}
          </button>
        </section>

        {/* Preview */}
        <section>
          <p className="text-xs font-conthrax text-neutral-500 uppercase tracking-widest mb-3">Forhåndsvisning</p>
          <div className="w-full rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl"
            style={{ aspectRatio: `${W} / ${H}` }}>
            <SunstripSVG number={number} color={color} numX={numX} logoX={logoX} />
          </div>
          <p className="text-xs text-neutral-600 mt-3 text-center">
            Faktisk format: 1250 × 250 mm · 15 000 × 3 000 px · ~305 DPI · trykkeklar PDF
          </p>
        </section>

        <section className="mt-12 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6">
          <h2 className="text-sm font-conthrax text-white uppercase tracking-widest mb-4">Tips til utskrift</h2>
          <ul className="text-sm text-neutral-400 space-y-2 list-disc list-inside leading-relaxed">
            <li>Print i originalstørrelse — ikke &quot;tilpass til side&quot;</li>
            <li>Anbefalt: plotterprint på vinylfolie for utendørs bruk</li>
            <li>Filen er ~305 DPI — tilstrekkelig for profesjonell trykk</li>
            <li>Farger er RGB — konverter til CMYK i Acrobat ved behov</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
