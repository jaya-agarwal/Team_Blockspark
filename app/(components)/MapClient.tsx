// app/(components)/MapClient.tsx
'use client'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet'
import type { LatLng } from '@/lib/types'

function Clicker({ onPick }: { onPick: (p: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onPick({ lat: e.latlng.lat, lng: e.latlng.lng })
    }
  })
  return null
}

export default function MapClient({ 
  position, 
  onPick, 
  markers = [] 
}: { 
  position?: LatLng; 
  onPick?: (p: LatLng) => void;
  markers?: { id: string; lat: number; lng: number; title?: string }[]
}) {
  const center = position ?? { lat: 20.5937, lng: 78.9629 }
  
  return (
    <MapContainer 
      center={[center.lat, center.lng]} 
      zoom={5} 
      scrollWheelZoom 
      className="h-96 w-full mt-2 rounded-lg border"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Render all markers from the markers prop */}
      {markers.map(marker => (
        <Marker key={marker.id} position={[marker.lat, marker.lng]}>
          <Popup>
            <div className="text-sm font-medium">{marker.title ?? 'Report'}</div>
            <div className="text-xs text-gray-600">
              {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
            </div>
          </Popup>
        </Marker>
      ))}
      
      {/* Show current position marker if no other markers are present */}
      {position && markers.length === 0 && (
        <Marker position={[position.lat, position.lng]} />
      )}
      
      {/* Enable click-to-pick if onPick callback provided */}
      {onPick && <Clicker onPick={onPick} />}
    </MapContainer>
  )
}