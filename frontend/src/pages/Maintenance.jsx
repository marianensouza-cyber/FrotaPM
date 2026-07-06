import React, { useState } from 'react'
import '../styles/Maintenance.css'

function Maintenance({ vehicles }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [records, setRecords] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    maintenance_type: '',
    description: '',
    cost: '',
    performed_by: '',
    notes: '',
  })

  const handleVehicleSelect = (vehicleId) => {
    setSelectedVehicle(vehicleId)
    fetchMaintenanceRecords(vehicleId)
  }

  const fetchMaintenanceRecords = async (vehicleId) => {
    try {
      const response = await fetch(`/api/maintenance/records/${vehicleId}`)
      if (response.ok) {
        const data = await response.json()
        setRecords(data || [])
      }
    } catch (error) {
      console.error('Error fetching maintenance records:', error)
    }
  }

  const handleAddRecord = () => {
    setFormData({
      maintenance_type: '',
      description: '',
      cost: '',
      performed_by: '',
      notes: '',
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/maintenance/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicle_id: selectedVehicle,
          ...formData,
          cost: parseFloat(formData.cost) || 0,
        }),
      })
      
      if (response.ok) {
        alert('✅ Registro de manutenção criado com sucesso')
        setShowModal(false)
        fetchMaintenanceRecords(selectedVehicle)
      } else {
        alert('❌ Erro ao salvar')
      }
    } catch (error) {
      console.error('Error saving record:', error)
      alert('❌ Erro ao salvar registro')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDelete = async (recordId) => {
    if (!confirm('Tem certeza que deseja deletar este registro?')) return
    
    try {
      const response = await fetch(`/api/maintenance/records/${recordId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        alert('✅ Registro deletado com sucesso')
        fetchMaintenanceRecords(selectedVehicle)
      }
    } catch (error) {
      console.error('Error deleting record:', error)
      alert('❌ Erro ao deletar')
    }
  }

  return (
    <div className="maintenance">
      <h2>🔧 Histórico de Manutenção</h2>
      
      <div className="vehicle-selector">
        <label>Selecione uma viatura:</label>
        <select onChange={(e) => handleVehicleSelect(e.target.value)} value={selectedVehicle || ''}>
          <option value="">-- Escolha uma viatura --</option>
          {vehicles && vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.plate} - {vehicle.model}
            </option>
          ))}
        </select>
      </div>

      {selectedVehicle && (
        <div className="card">
          <div className="maintenance-header">
            <h3>📋 Registros de Manutenção</h3>
            <button className="btn-primary" onClick={handleAddRecord}>
              ➕ Adicionar Registro
            </button>
          </div>

          {records.length > 0 ? (
            <table className="maintenance-table">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Descrição</th>
                  <th>Custo</th>
                  <th>Realizado por</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.maintenance_type}</td>
                    <td>{record.description}</td>
                    <td>R$ {record.cost?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}</td>
                    <td>{record.performed_by || '-'}</td>
                    <td>{new Date(record.performed_at).toLocaleDateString('pt-BR')}</td>
                    <td>
                      <button className="btn-delete" onClick={() => handleDelete(record.id)}>
                        🗑️ Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>📭 Nenhum registro de manutenção para esta viatura.</p>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal open">
          <div className="modal-content">
            <div className="modal-header">
              <h2>➕ Adicionar Registro de Manutenção</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tipo de Manutenção *</label>
                <input
                  type="text"
                  name="maintenance_type"
                  value={formData.maintenance_type}
                  onChange={handleChange}
                  placeholder="Ex: Troca de óleo"
                  required
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detalhes da manutenção"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Custo (R$)</label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label>Realizado por</label>
                <input
                  type="text"
                  name="performed_by"
                  value={formData.performed_by}
                  onChange={handleChange}
                  placeholder="Nome do técnico"
                />
              </div>
              <div className="form-group">
                <label>Notas Adicionais</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Observações"
                  rows="2"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Maintenance
