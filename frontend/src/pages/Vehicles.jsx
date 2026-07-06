import React, { useState } from 'react'
import '../styles/Vehicles.css'

function Vehicles({ vehicles, onVehicleUpdate }) {
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    plate: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: 0,
    status: 'available',
  })

  const handleAddVehicle = () => {
    setEditingId(null)
    setFormData({
      plate: '',
      model: '',
      year: new Date().getFullYear(),
      mileage: 0,
      status: 'available',
    })
    setShowModal(true)
  }

  const handleEditVehicle = (vehicle) => {
    setEditingId(vehicle.id)
    setFormData(vehicle)
    setShowModal(true)
  }

  const handleDeleteVehicle = async (id) => {
    if (!confirm('Tem certeza que deseja deletar esta viatura?')) return
    
    try {
      const response = await fetch(`/api/vehicles/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        alert('✅ Viatura deletada com sucesso')
        onVehicleUpdate()
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      alert('❌ Erro ao deletar')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const url = editingId ? `/api/vehicles/${editingId}` : '/api/vehicles'
      const method = editingId ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        alert(editingId ? '✅ Viatura atualizada com sucesso' : '✅ Viatura criada com sucesso')
        setShowModal(false)
        onVehicleUpdate()
      } else {
        alert('❌ Erro ao salvar')
      }
    } catch (error) {
      console.error('Error saving vehicle:', error)
      alert('❌ Erro ao salvar viatura')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'mileage' ? parseInt(value) || 0 : value
    }))
  }

  return (
    <div className="vehicles">
      <div className="vehicles-header">
        <h2>🚗 Gestão de Viaturas</h2>
        <button className="btn-primary" onClick={handleAddVehicle}>
          ➕ Adicionar Viatura
        </button>
      </div>

      {vehicles && vehicles.length > 0 ? (
        <div className="card">
          <table className="vehicles-table">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Km</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td><strong>{vehicle.plate}</strong></td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.mileage?.toLocaleString('pt-BR') || 0}</td>
                  <td>
                    <span className={`status-badge status-${vehicle.status}`}>
                      {vehicle.status === 'available' ? '✅ Disponível' : vehicle.status === 'maintenance' ? '🔧 Manutenção' : '⛔ Inativa'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEditVehicle(vehicle)}>
                      ✏️ Editar
                    </button>
                    <button className="btn-delete" onClick={() => handleDeleteVehicle(vehicle.id)}>
                      🗑️ Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card">
          <p>📭 Nenhuma viatura cadastrada. Clique em "Adicionar Viatura" para começar.</p>
        </div>
      )}

      {showModal && (
        <div className="modal open">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingId ? '✏️ Editar Viatura' : '➕ Adicionar Viatura'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Placa *</label>
                <input
                  type="text"
                  name="plate"
                  value={formData.plate}
                  onChange={handleChange}
                  placeholder="Ex: ABC-1234"
                  required
                />
              </div>
              <div className="form-group">
                <label>Modelo *</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="Ex: Fiat Toro"
                  required
                />
              </div>
              <div className="form-group">
                <label>Ano</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Quilometragem</label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="available">✅ Disponível</option>
                  <option value="maintenance">🔧 Em Manutenção</option>
                  <option value="inactive">⛔ Inativa</option>
                </select>
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

export default Vehicles
