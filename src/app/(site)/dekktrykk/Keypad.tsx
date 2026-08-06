'use client'

import { Backspace } from '@phosphor-icons/react'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del']

export default function Keypad({ onDigit, onBackspace }: { onDigit: (d: string) => void; onBackspace: () => void }) {
  return (
    <div className="grid grid-cols-3 gap-1.5 p-2 bg-neutral-950 border-t border-neutral-800 shrink-0">
      {KEYS.map((key, i) => {
        if (key === '') return <div key={i} />
        if (key === 'del') {
          return (
            <button
              key={i}
              type="button"
              onClick={onBackspace}
              className="h-12 rounded-xl bg-neutral-800 active:bg-neutral-700 text-white flex items-center justify-center text-2xl"
              aria-label="Slett siffer"
            >
              <Backspace size={22} weight="bold" />
            </button>
          )
        }
        return (
          <button
            key={i}
            type="button"
            onClick={() => onDigit(key)}
            className="h-12 rounded-xl bg-neutral-800 active:bg-neutral-700 text-white text-2xl font-bold"
          >
            {key}
          </button>
        )
      })}
    </div>
  )
}
