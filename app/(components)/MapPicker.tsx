// app/(components)/MapPicker.tsx
'use client'
import dynamic from 'next/dynamic'
import type { LatLng } from '@/lib/types'

const DynamicMap = dynamic(() => import('./MapClient'), { ssr: false })

export function MapPicker({ position, onPick }: { 
  position?: LatLng; 
  onPick?: (p: LatLng) => void 
}) {
  return <DynamicMap position={position} onPick={onPick} />
}