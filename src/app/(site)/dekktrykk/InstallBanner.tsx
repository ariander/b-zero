'use client'

import { useEffect, useState } from 'react'
import { X, ShareNetwork, DownloadSimple } from '@phosphor-icons/react'

const STORAGE_KEY = 'dekktrykk-banner-dismissed'

export default function InstallBanner() {
  const [state, setState] = useState<{ visible: boolean; isIos: boolean } | null>(null)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser-only storage, must run client-side after mount
      setState({ visible: false, isIos: false })
      return
    }
    setState({ visible: true, isIos: /iPad|iPhone|iPod/.test(navigator.userAgent) })
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1')
    setState((s) => (s ? { ...s, visible: false } : s))
  }

  if (!state?.visible) return null
  const { isIos } = state

  return (
    <div className="absolute inset-x-0 top-0 z-20 bg-neutral-900 border-b border-neutral-700 p-4 text-sm text-neutral-200">
      <button type="button" onClick={dismiss} className="absolute top-3 right-3 text-neutral-400" aria-label="Lukk">
        <X size={20} weight="bold" />
      </button>
      <p className="pr-6 mb-2">
        Alle målinger lagres kun lokalt på denne enheten — ingen server, ingen innlogging.
      </p>
      {isIos ? (
        <p className="pr-6 mb-2 flex items-start gap-1">
          <ShareNetwork size={16} weight="bold" className="mt-0.5 shrink-0" />
          Legg til på Hjem-skjerm (Del-ikon → &quot;Legg til på Hjem-skjerm&quot;) — ellers kan Safari slette dataen etter 7 dagers inaktivitet.
        </p>
      ) : (
        <p className="pr-6 mb-2 flex items-start gap-1">
          <DownloadSimple size={16} weight="bold" className="mt-0.5 shrink-0" />
          Legg appen til på hjemskjermen for rask, offline tilgang.
        </p>
      )}
      <p className="pr-6 text-neutral-400">Bruk &quot;Eksporter CSV&quot; i Historikk som backup av og til.</p>
      <button
        type="button"
        onClick={dismiss}
        className="mt-2 h-9 px-4 rounded-lg bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider"
      >
        Skjønner
      </button>
    </div>
  )
}
