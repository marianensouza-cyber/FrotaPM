import React, { useEffect, useRef } from 'react'
import '../styles/Map.css'

function Map({ vehicles }) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Carregar Leaflet dinamicamente
    if (!window.L) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/leaflet.min.css'
      document.head.appendChild(link)

      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/leaflet.min.js'
      script.onload = () => {
        initMap()
      }
      document.head.appendChild(script)
    } else {
      initMap()
    }

    function initMap() {
      const L = window.L
      if (!mapRef.current._leaflet_map) {
        const center = [-26.9197, -49.0646] // Blumenau, SC
        const map = L.map(mapRef.current).setView(center, 13)
        mapRef.current._leaflet_map = map

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map)
      }

      // Adicionar marcadores das viaturas
      vehicles.forEach((vehicle) => {
        if (vehicle.latitude && vehicle.longitude) {
          const L = window.L
          const map = mapRef.current._leaflet_map
          const color = vehicle.status === 'available' ? 'green' : vehicle.status === 'maintenance' ? 'orange' : 'red'
          
          L.circleMarker([vehicle.latitude, vehicle.longitude], {
            radius: 8,
            fillColor: color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
          })
            .bindPopup(`<strong>${vehicle.plate}</strong><br>${vehicle.model}<br>Status: ${vehicle.status}`)
            .addTo(map)
        }
      })
    }
  }, [vehicles])

  return (
    <div className="map-container">
      <h2>🗺️ Rastreamento em Tempo Real</h2>
      <div ref={mapRef} className="map" id="map" />
      <div className="map-legend">
        <h3>📍 Legenda</h3>
        <p><span className="legend-dot available"></span> Verde = Disponível</p>
        <p><span className="legend-dot maintenance"></span> Laranja = Em Manutenção</p>
        <p><span className="legend-dot inactive"></span> Vermelho = Inativa</p>
        <p style={{marginTop: '1rem', color: '#6b7280'}}>⚠️ Nota: Ative o GPS das viaturas para visualizar localização em tempo real</p>
      </div>
    </div>
  )
}

export default Map
