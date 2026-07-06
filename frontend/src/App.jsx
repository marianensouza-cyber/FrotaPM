import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import Vehicles from './pages/Vehicles'
import Maintenance from './pages/Maintenance'
import Reports from './pages/Reports'
import Map from './pages/Map'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/vehicles')
      if (response.ok) {
        const data = await response.json()
        setVehicles(data)
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    }
  }

  return (
    <div className="app">
      <Header />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="container">
        {currentPage === 'dashboard' && <Dashboard vehicles={vehicles} />}
        {currentPage === 'vehicles' && <Vehicles vehicles={vehicles} onVehicleUpdate={fetchVehicles} />}
        {currentPage === 'maintenance' && <Maintenance vehicles={vehicles} />}
        {currentPage === 'reports' && <Reports />}
        {currentPage === 'map' && <Map vehicles={vehicles} />}
      </div>
    </div>
  )
}

export default App
