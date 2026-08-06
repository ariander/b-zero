'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUp, CaretDown } from '@phosphor-icons/react'
import Keypad from './Keypad'
import type { HotCold, WheelKey } from './types'

const WHEEL_ORDER: WheelKey[] = ['fl', 'fr', 'rl', 'rr']

const WHEEL_POSITION: Record<WheelKey, string> = {
  fl: 'left-[6%] top-[8%]',
  fr: 'right-[6%] top-[8%]',
  rl: 'left-[6%] bottom-[10%]',
  rr: 'right-[6%] bottom-[10%]',
}

export type WheelValues = Partial<Record<WheelKey, number>>

interface Props {
  track: string
  onTrackChange: (track: string) => void
  tracks: string[]
  hotCold: HotCold | null
  onHotColdChange: (v: HotCold) => void
  values: WheelValues
  onValuesChange: (v: WheelValues) => void
  onSubmit: () => void
}

export default function NewReading({
  track,
  onTrackChange,
  tracks,
  hotCold,
  onHotColdChange,
  values,
  onValuesChange,
  onSubmit,
}: Props) {
  const [active, setActive] = useState<WheelKey | null>(null)
  const [buffer, setBuffer] = useState('')
  const [showTrackList, setShowTrackList] = useState(false)
  const [trackSearch, setTrackSearch] = useState('')

  const filteredTracks = tracks.filter((t) => t.toLowerCase().includes(trackSearch.toLowerCase()))

  const allFilled = WHEEL_ORDER.every((w) => values[w] !== undefined)
  const readyToSave = allFilled && hotCold !== null

  function activate(wheel: WheelKey) {
    setActive(wheel)
    const existing = values[wheel]
    setBuffer(existing !== undefined ? String(Math.round(existing * 10)) : '')
  }

  function commitBuffer(wheel: WheelKey, digits: string) {
    if (digits.length === 0) {
      const next = { ...values }
      delete next[wheel]
      onValuesChange(next)
      return
    }
    const num = parseInt(digits.padStart(2, '0'), 10) / 10
    onValuesChange({ ...values, [wheel]: num })
  }

  function handleDigit(d: string) {
    if (!active) return
    const next = (buffer + d).slice(-3) // max 3 digits -> ##.#
    setBuffer(next)
    commitBuffer(active, next)

    if (next.length === 3) {
      const idx = WHEEL_ORDER.indexOf(active)
      const nextWheel = WHEEL_ORDER.slice(idx + 1).find((w) => values[w] === undefined) ?? WHEEL_ORDER.find((w, i) => i !== idx && values[w] === undefined)
      if (nextWheel) {
        activate(nextWheel)
      } else {
        setActive(null)
        setBuffer('')
      }
    }
  }

  function handleBackspace() {
    if (!active) return
    const next = buffer.slice(0, -1)
    setBuffer(next)
    commitBuffer(active, next)
  }

  function formatValue(n: number | undefined): string {
    if (n === undefined) return ''
    return n.toFixed(1)
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="px-4 pt-3 pb-1 flex gap-2">
        <div className="relative flex-1 min-w-0">
          <label className="block text-neutral-400 text-xs font-bold uppercase tracking-wider mb-1">Bane</label>
          <div className="flex gap-2">
            <input
              value={track}
              onChange={(e) => {
                onTrackChange(e.target.value)
                setTrackSearch(e.target.value)
                setShowTrackList(true)
              }}
              onFocus={() => {
                setTrackSearch(track)
                setShowTrackList(true)
              }}
              onBlur={() => setTimeout(() => setShowTrackList(false), 150)}
              placeholder="Skriv bane"
              className="flex-1 min-w-0 h-11 rounded-lg bg-neutral-900 border border-neutral-700 px-3 text-white text-base focus:border-brand-red focus:outline-none"
            />
            <button
              type="button"
              onClick={() =>
                setShowTrackList((s) => {
                  const next = !s
                  if (next) setTrackSearch('')
                  return next
                })
              }
              className="w-11 h-11 shrink-0 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-400"
              aria-label="Vis baner"
            >
              <CaretDown size={20} weight="bold" />
            </button>
          </div>
          {showTrackList && filteredTracks.length > 0 && (
            <div className="absolute z-30 top-full mt-1 left-0 right-0 rounded-lg border border-neutral-700 bg-neutral-900 max-h-52 overflow-y-auto shadow-lg">
              {filteredTracks.map((t) => (
                <button
                  key={t}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onTrackChange(t)
                    setTrackSearch(t)
                    setShowTrackList(false)
                  }}
                  className="block w-full text-left px-3 py-3 text-white text-base border-b border-neutral-800 last:border-b-0 active:bg-neutral-800"
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="shrink-0">
          <span className="block text-neutral-400 text-xs font-bold uppercase tracking-wider mb-1">Temp</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onHotColdChange('hot')}
              className={`h-11 px-3 rounded-lg font-bold text-base border transition-colors ${
                hotCold === 'hot' ? 'bg-brand-red border-brand-red text-white' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
              }`}
            >
              Varm
            </button>
            <button
              type="button"
              onClick={() => onHotColdChange('cold')}
              className={`h-11 px-3 rounded-lg font-bold text-base border transition-colors ${
                hotCold === 'cold' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
              }`}
            >
              Kald
            </button>
          </div>
        </div>
      </div>

      <div className="relative flex-1 min-h-[220px] mx-4">
        <Image src="/c1-top.avif" alt="" fill className="object-contain opacity-90 pointer-events-none select-none" priority />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
          <ArrowUp size={40} weight="bold" className="text-neutral-500" />
        </div>
        {WHEEL_ORDER.map((wheel) => {
          const filled = values[wheel] !== undefined
          const isActive = active === wheel
          return (
            <button
              key={wheel}
              type="button"
              onClick={() => activate(wheel)}
              className={`absolute w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold border-4 transition-colors ${WHEEL_POSITION[wheel]} ${
                isActive
                  ? 'bg-white border-blue-500 text-black'
                  : filled
                    ? 'bg-green-500 border-green-500 text-black'
                    : 'bg-white border-white text-black'
              }`}
            >
              {isActive ? (
                <span className="text-2xl">{buffer ? formatValue(parseInt(buffer.padStart(2, '0'), 10) / 10) : ''}<span className="animate-pulse">|</span></span>
              ) : filled ? (
                <>
                  <span className="text-xl leading-tight">{formatValue(values[wheel])}</span>
                  <span className="text-[10px] uppercase">PSI</span>
                </>
              ) : (
                <span className="text-lg uppercase">{wheel}</span>
              )}
            </button>
          )
        })}
      </div>

      {active ? (
        <Keypad onDigit={handleDigit} onBackspace={handleBackspace} />
      ) : (
        <div className="p-4 pb-2">
          <button
            type="button"
            disabled={!readyToSave}
            onClick={onSubmit}
            className={`w-full h-14 rounded-xl font-conthrax uppercase tracking-wider text-lg transition-colors ${
              readyToSave ? 'bg-green-500 text-black active:bg-green-400' : 'bg-neutral-800 text-neutral-500'
            }`}
          >
            Lagre måling
          </button>
        </div>
      )}
    </div>
  )
}
