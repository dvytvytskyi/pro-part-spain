"use client"

import { useEffect, useRef, useState } from "react"
import type { Map } from "leaflet" // Import the Map type from Leaflet

interface ProjectMapProps {
  latitude: number
  longitude: number
  projectName: string
}

export function ProjectMap({ latitude, longitude, projectName }: ProjectMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  // Use the specific Leaflet Map type for better type safety
  const mapInstanceRef = useRef<Map | null>(null)

  useEffect(() => {
    // Prevent map from initializing multiple times
    if (mapRef.current && !mapInstanceRef.current) {
      // Dynamically import Leaflet to ensure it's only loaded on the client-side
      import("leaflet").then((L) => {
        // Since we're in this block, mapRef.current is guaranteed to be non-null
        // and the map instance hasn't been created yet.
        const map = L.map(mapRef.current!).setView([latitude, longitude], 15)
        mapInstanceRef.current = map

        // Add the OpenStreetMap tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        // Create a custom SVG icon.
        // This is a great way to create markers without external image files.
        const customIcon = L.divIcon({
          html: `
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#C9A77C" stroke="white" stroke-width="3"/>
              <circle cx="16" cy="16" r="4" fill="white"/>
            </svg>
          `,
          className: "", // No extra classes needed, styling is in the SVG
          iconSize: [32, 32],
          iconAnchor: [16, 16], // Anchor point of the icon (center)
        })

        // Add the marker to the map
        L.marker([latitude, longitude], { icon: customIcon })
          .addTo(map)
          .bindPopup(`<b>${projectName}</b>`) // Add a popup with the project name

        setMapLoaded(true)
      })
    }
  }, [latitude, longitude, projectName]) // Re-run if coordinates change

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-gray-900">Location</h3>
      <div className="relative h-64 rounded-xl overflow-hidden bg-gray-100">
        {/* We need to include Leaflet's CSS for it to display correctly */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <div ref={mapRef} className="h-full w-full" />
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  )
}