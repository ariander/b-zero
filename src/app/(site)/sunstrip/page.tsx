import type { Metadata } from 'next'
import { SunstripClientWrapper } from '@/components/SunstripClientWrapper'

export const metadata: Metadata = {
  title: 'Sunstrip Generator | B-Zero Racing',
  description: 'Lag din egen B-Zero solskjerm med startnummer og farge. Last ned som PDF klar til print.',
}

export default function SunstripPage() {
  return <SunstripClientWrapper />
}
