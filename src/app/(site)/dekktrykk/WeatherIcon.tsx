import { Sun, CloudSun, Cloud, CloudRain, CloudSnow, CloudFog } from '@phosphor-icons/react'
import { weatherCategory } from './weather'

const ICONS = {
  sun: Sun,
  partly: CloudSun,
  cloud: Cloud,
  rain: CloudRain,
  snow: CloudSnow,
  fog: CloudFog,
} as const

export default function WeatherIcon({ symbolCode, size = 18, className }: { symbolCode: string; size?: number; className?: string }) {
  const Icon = ICONS[weatherCategory(symbolCode)]
  return <Icon size={size} weight="fill" className={className} />
}
