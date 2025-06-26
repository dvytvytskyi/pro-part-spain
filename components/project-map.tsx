"use client";

import { useEffect, useRef, useState } from "react";
import type { Map } from "leaflet"; // Import the Map type from Leaflet

interface ProjectMapProps {
  latitude: number;
  longitude: number;
  projectName: string;
}

export function ProjectMap({
  latitude,
  longitude,
  projectName,
}: ProjectMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  // Use the specific Leaflet Map type for better type safety
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    let map: Map | null = null;

    if (mapRef.current && !mapInstanceRef.current) {
      import("leaflet").then((L) => {
        // 🧹 Перевіряємо, чи вже є карта в контейнері
        if (mapRef.current && mapRef.current._leaflet_id != null) {
          // @ts-ignore — приватна властивість, але ми її видаляємо
          delete mapRef.current._leaflet_id;
        }

        map = L.map(mapRef.current!).setView([latitude, longitude], 15);
        mapInstanceRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const customIcon = L.divIcon({
          html: `
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="12" fill="#C9A77C" stroke="white" stroke-width="3"/>
            <circle cx="16" cy="16" r="4" fill="white"/>
          </svg>
        `,
          className: "",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        L.marker([latitude, longitude], { icon: customIcon })
          .addTo(map)
          .bindPopup(`<b>${projectName}</b>`);

        setMapLoaded(true);
      });
    }

    // 🧹 Очищення (cleanup)
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove(); // знищити карту
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, projectName]);

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
  );
}
