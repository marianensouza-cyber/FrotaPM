import React from 'react'
import '../styles/Navigation.css'

function Navigation({ currentPage, setCurrentPage }) {
  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'vehicles', label: '🚗 Viaturas', icon: '🚗' },
    { id: 'maintenance', label: '🔧 Manutenção', icon: '🔧' },
    { id: 'map', label: '📍 Mapa', icon: '📍' },
    { id: 'reports', label: '📄 Relatórios', icon: '📄' },
  ]

  return (
    <nav className="navigation">
      <div className="container">
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => setCurrentPage(item.id)}
              >
                {item.icon} {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
