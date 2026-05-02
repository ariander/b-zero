'use client'

import dynamic from 'next/dynamic'

const SunstripGenerator = dynamic(
  () => import('@/components/SunstripGenerator'),
  { ssr: false }
)

export function SunstripClientWrapper() {
  return <SunstripGenerator />
}
