import React from 'react';

export default function EditUsuario({ usuario, onClose, onGuardar }) {
  if (!usuario) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(usuario);
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-warning fw-bold m-0">
            Editar Usuario <span className="sku-badge ms-2">{usuario.rut || `USR-${usuario.id}`}</span>
          </h5>
          <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSubmit} className="row g-2">
          <div className="col-12 col-md-6">
            <label className="form-label small text-secondary mb-1">RUT</label>
            <input
              type="text"
              className="modal-input"
              value={usuario.rut || ''}
              onChange={(e) => onGuardar({ ...usuario, rut: e.target.value }, false)}
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small text-secondary mb-1">Nombre Completo</label>
            <input
              type="text"
              className="modal-input"
              value={usuario.nombre || ''}
              onChange={(e) => onGuardar({ ...usuario, nombre: e.target.value }, false)}
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small text-secondary mb-1">Correo Electrónico</label>
            <input
              type="email"
              className="modal-input"
              value={usuario.email || ''}
              onChange={(e) => onGuardar({ ...usuario, email: e.target.value }, false)}
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small text-secondary mb-1">Rol de Usuario</label>
            <select
              className="modal-input"
              value={usuario.rol || 'Cliente'}
              onChange={(e) => onGuardar({ ...usuario, rol: e.target.value }, false)}
            >
              <option value="Cliente">Cliente</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small text-secondary mb-1">Calle / Pasaje</label>
            <input
              type="text"
              className="modal-input"
              value={usuario.direccion?.calle || ''}
              onChange={(e) => onGuardar({
                ...usuario,
                direccion: { ...usuario.direccion, calle: e.target.value }
              }, false)}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small text-secondary mb-1">Comuna</label>
            <input
              type="text"
              className="modal-input"
              value={usuario.direccion?.comuna || ''}
              onChange={(e) => onGuardar({
                ...usuario,
                direccion: { ...usuario.direccion, comuna: e.target.value }
              }, false)}
            />
          </div>

          <div className="col-12">
            <label className="form-label small text-secondary mb-1">Región</label>
            <input
              type="text"
              className="modal-input"
              value={usuario.direccion?.region || ''}
              onChange={(e) => onGuardar({
                ...usuario,
                direccion: { ...usuario.direccion, region: e.target.value }
              }, false)}
            />
          </div>

          <div className="col-12 d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-warning btn-sm fw-bold px-3">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}