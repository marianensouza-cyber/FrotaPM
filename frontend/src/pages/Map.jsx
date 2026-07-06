import React, { useEffect, useRef } from 'react'
import '../styles/Map.css'

function Map({ vehicles }) {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize Leaflet map
    const L = window.L
    if (L) {
      if (!mapInstance.current) {
        // Default center: Blumenau, SC, Brazil
        const center = [-26.9197, -49.0646]
        mapInstance.current = L.map(mapRef.current).setView(center, 13)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(mapInstance.current)
      }

      // Add vehicle markers
      vehicles.forEach((vehicle) => {
        if (vehicle.latitude && vehicle.longitude) {
          const L = window.L
          const marker = L.marker([vehicle.latitude, vehicle.longitude])
            .bindPopup(`<strong>${vehicle.plate}</strong><br>${vehicle.model}<br>Status: ${vehicle.status}`)
            .addTo(mapInstance.current)
        }
      })
    }
  }, [vehicles])

  return (
    <div className="map-container">
      <h2>Rastreamento em Tempo Real</h2>
      <div ref={mapRef} className="map" id="map" />
      <div className="map-legend">
        <h3>Legenda</h3>
        <p>📍 Clique nos marcadores para ver detalhes da viatura</p>
        <p>⚠️ Nota: Ative o GPS das viaturas para visualizar localização em tempo real</p>
      </div>
    </div>
  )
}

export default Map
