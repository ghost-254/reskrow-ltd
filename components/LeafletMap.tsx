"use client"

import type React from "react"
import { useState, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { OpenStreetMapProvider } from "leaflet-geosearch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface LeafletMapProps {
  center: [number, number]
  zoom: number
  showSearch: boolean | true
  onMapClick?: (coordinates: [number, number]) => void | null
  markerPosition?: [number, number] | null
  addressInput: React.ReactElement | null
  onAddressChange?: (newAddress: string) => void
}

interface SearchResult {
  x: number
  y: number
  label: string
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  center,
  zoom,
  onMapClick,
  showSearch,
  markerPosition,
  addressInput,
  onAddressChange,
}) => {
  const [searchText, setSearchText] = useState<string>("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [mapZoom, setMapZoom] = useState<number>(zoom)
  const [mapCenter, setMapCenter] = useState<[number, number]>(center)

  const provider = new OpenStreetMapProvider()
  const mapRef = useRef<any>(null)

  const handleSearch = async () => {
    const results = await provider.search({ query: searchText })
    setSearchResults(
      results.map((result: any) => ({
        x: result.x,
        y: result.y,
        label: result.label,
      })),
    )
  }

  const handleResultClick = (result: SearchResult) => {
    const newCenter: [number, number] = [result.y, result.x]
    setMapCenter(newCenter)
    setMapZoom(15)
    onMapClick!(newCenter)
    setSearchText(result.label)
    onAddressChange!(result.label)
    setSearchResults([])
    if (mapRef.current) {
      mapRef.current.flyTo(newCenter, 15)
    }
  }

  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click: (e) => {
        onMapClick!([e.latlng.lat, e.latlng.lng])
      },
    })
    return null
  }

  return (
    <div className="w-full">
      {showSearch ? (
        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <Input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search location"
            className="flex-1 text-sm"
          />
          <Button onClick={handleSearch} size="sm" className="whitespace-nowrap">
            Search
          </Button>
        </div>
      ) : null}

      {searchResults.length > 0 && (
        <div className="mb-3 max-h-32 overflow-y-auto">
          {searchResults.map((result) => (
            <div
              key={result.x}
              onClick={() => handleResultClick(result)}
              className="cursor-pointer p-2 text-sm border-b border-gray-200 bg-gray-50 hover:bg-gray-100 rounded-sm mb-1 transition-colors"
            >
              {result.label}
            </div>
          ))}
        </div>
      )}

      <div className="w-full h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden border">
        <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "100%", width: "100%" }} ref={mapRef}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markerPosition && (
            <Marker position={markerPosition}>
              <Popup>{searchText || "Selected Location"}</Popup>
            </Marker>
          )}
          <MapClickHandler />
        </MapContainer>
      </div>

      {addressInput && <div className="mt-3">{addressInput}</div>}
    </div>
  )
}

export default LeafletMap
