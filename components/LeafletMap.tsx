'use client'

import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

interface LeafletMapProps {
  center: [number, number];
  zoom: number;
  onMapClick: (coordinates: [number, number]) => void;
}


export default function LeafletMap({ center, onMapClick }: LeafletMapProps) {
  const [markerPosition, setMarkerPosition] = useState<
    [number, number] | null
  >(center[0] !== 0 && center[1] !== 0 ? center : null)

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        setMarkerPosition([lat, lng])
        onMapClick([lat, lng])
      },
    })

    return markerPosition ? (
      <Marker position={markerPosition}>
        <Popup>Property Location</Popup>
      </Marker>
    ) : null
  }

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  )
}

