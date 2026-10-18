import React from 'react';

export default function AdminSidebar({ usuarioActual, totalProductos, totalUsuarios, onVolverTienda }) {
  return (
    <aside className="admin-profile-sidebar">
      <div className="admin-profile-card">
        <div className="admin-avatar-lg">
          <i className="bi bi-person-fill"></i>
        </div>
        <div className="admin-user-title">{usuarioActual?.nombre || 'Administrador'}</div>
        <div className="admin-user-email">{usuarioActual?.email || 'admin@urban.cl'}</div>

        {usuarioActual?.rut && (
          <div className="mb-2">
            <span className="sku-badge">{usuarioActual.rut}</span>
          </div>
        )}

        <div className="mb-3">
          <span className={`badge-rol ${
            usuarioActual?.rol === 'Vendedor' ? 'badge-vendedor' :
            usuarioActual?.rol === 'Cliente' ? 'badge-cliente' : 'badge-admin'
          }`}>
            {usuarioActual?.rol || 'Administrador'}
          </span>
        </div>

        <div className="admin-profile-divider"></div>

        <div className="admin-profile-stat text-secondary">
          <span>Total Catálogo</span>
          <strong className="text-warning">{totalProductos} items</strong>
        </div>
        <div className="admin-profile-stat text-secondary">
          <span>Usuarios Sistema</span>
          <strong className="text-white">{totalUsuarios}</strong>
        </div>

        <div className="admin-profile-divider"></div>

        <button 
          type="button" 
          onClick={onVolverTienda} 
          className="btn btn-outline-warning w-100 fw-bold py-2 mt-2"
        >
          <i className="bi bi-arrow-left me-1"></i> Volver a la Tienda
        </button>
      </div>
    </aside>
  );
}