import React, { useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";

export interface LeafletMapProps {
  center: [number, number];
  zoom: number;
  showSearch: boolean | true;
  onMapClick?: (coordinates: [number, number]) => void | null;
  markerPosition?: [number, number] | null;
  addressInput: React.ReactElement | null;
  onAddressChange?: (newAddress: string) => void;
}

interface SearchResult {
  x: number;
  y: number;
  label: string;
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
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [mapZoom, setMapZoom] = useState<number>(zoom);
  const [mapCenter, setMapCenter] = useState<[number, number]>(center);

  const provider = new OpenStreetMapProvider();
  const mapRef = useRef<any>(null);

  const handleSearch = async () => {
    const results = await provider.search({ query: searchText });
    setSearchResults(
      results.map((result: any) => ({
        x: result.x,
        y: result.y,
        label: result.label,
      }))
    );
  };

  const handleResultClick = (result: SearchResult) => {
    const newCenter: [number, number] = [result.y, result.x];
    setMapCenter(newCenter);
    setMapZoom(15);
    onMapClick!(newCenter);
    setSearchText(result.label);
    onAddressChange!(result.label);
    setSearchResults([]);
    if (mapRef.current) {
      mapRef.current.flyTo(newCenter, 15);
    }
  };

  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click: (e) => {
        onMapClick!([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    <div>
      {showSearch ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search location"
            style={{
              padding: "8px",
              marginRight: "5px",
              width: "70%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      ) : null}

      <div>
        {searchResults.map((result) => (
          <div
            key={result.x}
            onClick={() => handleResultClick(result)}
            style={{
              cursor: "pointer",
              padding: "5px",
              borderBottom: "1px solid #ccc",
              background: "#f9f9f9",
              borderRadius: "3px",
              marginBottom: "5px",
            }}
          >
            {result.label}
          </div>
        ))}
      </div>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "400px", width: "100%" }}
        ref={mapRef}
      >
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
      <div style={{ marginTop: "10px" }}>{addressInput}</div>
    </div>
  );
};

export default LeafletMap;
