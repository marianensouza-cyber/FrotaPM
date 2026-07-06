import React, { useState, useEffect } from 'react'
import '../styles/Reports.css'

function Reports() {
  const [reportType, setReportType] = useState('maintenance-csv')
  const [fleetStatus, setFleetStatus] = useState([])
  const [upcomingMaintenance, setUpcomingMaintenance] = useState([])

  useEffect(() => {
    fetchReportData()
  }, [])

  const fetchReportData = async () => {
    try {
      const fleetResponse = await fetch('/api/reports/fleet-status')
      const upcomingResponse = await fetch('/api/reports/upcoming')
      
      if (fleetResponse.ok) {
        const data = await fleetResponse.json()
        setFleetStatus(data || [])
      }
      
      if (upcomingResponse.ok) {
        const data = await upcomingResponse.json()
        setUpcomingMaintenance(data || [])
      }
    } catch (error) {
      console.error('Error fetching report data:', error)
    }
  }

  const handleDownloadCSV = async () => {
    try {
      const response = await fetch('/api/reports/maintenance-csv')
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'relatorio-manutencao.csv'
        a.click()
        window.URL.revokeObjectURL(url)
        alert('✅ Relatório baixado com sucesso')
      }
    } catch (error) {
      console.error('Error downloading CSV:', error)
      alert('❌ Erro ao baixar relatório')
    }
  }

  return (
    <div className="reports">
      <h2>📋 Relatórios</h2>
      
      <div className="reports-tabs">
        <button
          className={`tab ${reportType === 'maintenance-csv' ? 'active' : ''}`}
          onClick={() => setReportType('maintenance-csv')}
        >
          📥 Baixar Manutenção
        </button>
        <button
          className={`tab ${reportType === 'fleet-status' ? 'active' : ''}`}
          onClick={() => setReportType('fleet-status')}
        >
          🚗 Status da Frota
        </button>
        <button
          className={`tab ${reportType === 'upcoming' ? 'active' : ''}`}
          onClick={() => setReportType('upcoming')}
        >
          📅 Manutenção Próxima
        </button>
      </div>

      {reportType === 'maintenance-csv' && (
        <div className="card">
          <h3>📥 Relatório de Manutenção</h3>
          <p>Baixe todos os registros de manutenção em formato CSV para análise em planilha.</p>
          <button className="btn-primary" onClick={handleDownloadCSV}>
            📥 Baixar CSV
          </button>
        </div>
      )}

      {reportType === 'fleet-status' && (
        <div className="card">
          <h3>🚗 Status da Frota</h3>
          {fleetStatus.length > 0 ? (
            <div className="table-responsive">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Modelo</th>
                    <th>Ano</th>
                    <th>km</th>
                    <th>Status</th>
                    <th>Total Manutenções</th>
                    <th>Total Gasto</th>
                    <th>Última Manutenção</th>
                  </tr>
                </thead>
                <tbody>
                  {fleetStatus.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td><strong>{vehicle.plate}</strong></td>
                      <td>{vehicle.model}</td>
                      <td>{vehicle.year}</td>
                      <td>{vehicle.mileage?.toLocaleString('pt-BR') || 0}</td>
                      <td>{vehicle.status}</td>
                      <td>{vehicle.total_maintenances || 0}</td>
                      <td>R$ {(vehicle.total_spent || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      <td>{vehicle.last_maintenance ? new Date(vehicle.last_maintenance).toLocaleDateString('pt-BR') : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>📭 Nenhum dado disponível</p>
          )}
        </div>
      )}

      {reportType === 'upcoming' && (
        <div className="card">
          <h3>📅 Próximas Manutenções Programadas</h3>
          {upcomingMaintenance.length > 0 ? (
            <div className="table-responsive">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Modelo</th>
                    <th>Tipo de Manutenção</th>
                    <th>Data Programada</th>
                    <th>Dias até Vencer</th>
                    <th>Prioridade</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingMaintenance.map((item, idx) => (
                    <tr key={idx}>
                      <td><strong>{item.plate}</strong></td>
                      <td>{item.model}</td>
                      <td>{item.maintenance_type}</td>
                      <td>{new Date(item.next_due).toLocaleDateString('pt-BR')}</td>
                      <td>{Math.ceil(item.days_until_due || 0)}</td>
                      <td>
                        <span className={`priority-badge priority-${item.priority}`}>
                          {item.priority === 'high' ? '⚠️ ALTA' : item.priority === 'normal' ? '📌 Normal' : '✅ Baixa'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>✅ Nenhuma manutenção programada</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Reports
