'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/dekktrykk-sw.js', { scope: '/dekktrykk' }).catch(() => {
        // offline install failed silently — app still works online
      })
    }
  }, [])
  return null
}
