'use client'

import { Backspace } from '@phosphor-icons/react'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del']

export default function Keypad({ onDigit, onBackspace }: { onDigit: (d: string) => void; onBackspace: () => void }) {
  return (
    <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-950 border-t border-neutral-800">
      {KEYS.map((key, i) => {
        if (key === '') return <div key={i} />
        if (key === 'del') {
          return (
            <button
              key={i}
              type="button"
              onClick={onBackspace}
              className="h-16 rounded-xl bg-neutral-800 active:bg-neutral-700 text-white flex items-center justify-center text-2xl"
              aria-label="Slett siffer"
            >
              <Backspace size={26} weight="bold" />
            </button>
          )
        }
        return (
          <button
            key={i}
            type="button"
            onClick={() => onDigit(key)}
            className="h-16 rounded-xl bg-neutral-800 active:bg-neutral-700 text-white text-3xl font-bold"
          >
            {key}
          </button>
        )
      })}
    </div>
  )
}
