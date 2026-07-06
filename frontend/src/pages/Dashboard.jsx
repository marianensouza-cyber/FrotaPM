import React, { useState, useEffect } from 'react'
import '../styles/Dashboard.css'

function Dashboard({ vehicles }) {
  const [kpis, setKpis] = useState(null)
  const [upcomingMaintenance, setUpcomingMaintenance] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const kpiResponse = await fetch('/api/dashboard/kpis')
      const maintenanceResponse = await fetch('/api/dashboard/upcoming-maintenance')
      
      if (kpiResponse.ok) {
        const data = await kpiResponse.json()
        setKpis(data)
      }
      
      if (maintenanceResponse.ok) {
        const data = await maintenanceResponse.json()
        setUpcomingMaintenance(data.slice(0, 5))
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard">
      <h2>📊 Dashboard</h2>
      
      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <>
          {kpis && (
            <div className="kpis-grid">
              <div className="kpi">
                <h3>Total de Viaturas</h3>
                <div className="number">{kpis.total_vehicles || 0}</div>
              </div>
              <div className="kpi available">
                <h3>Disponíveis</h3>
                <div className="number">{kpis.available_vehicles || 0}</div>
              </div>
              <div className="kpi maintenance">
                <h3>Em Manutenção</h3>
                <div className="number">{kpis.in_maintenance || 0}</div>
              </div>
              <div className="kpi inactive">
                <h3>Inativas</h3>
                <div className="number">{kpis.inactive_vehicles || 0}</div>
              </div>
            </div>
          )}

          <div className="card">
            <h3>📅 Próximas Manutenções Programadas</h3>
            {upcomingMaintenance.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Modelo</th>
                    <th>Tipo de Manutenção</th>
                    <th>Próxima Data</th>
                    <th>Prioridade</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingMaintenance.map((item) => (
                    <tr key={item.id}>
                      <td><strong>{item.plate}</strong></td>
                      <td>{item.model}</td>
                      <td>{item.maintenance_type}</td>
                      <td>{new Date(item.next_due).toLocaleDateString('pt-BR')}</td>
                      <td>
                        <span className={`badge badge-${item.priority}`}>
                          {item.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>✅ Nenhuma manutenção programada próximo</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
