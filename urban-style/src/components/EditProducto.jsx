import React from 'react';

export default function EditProducto({ producto, onClose, onGuardar }) {
  if (!producto) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(producto);
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-warning fw-bold m-0">
            Editar Producto <span className="sku-badge ms-2">{producto.sku || `URB-${producto.id}`}</span>
          </h5>
          <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSubmit} className="row g-2">
          <div className="col-12 col-md-8">
            <label className="form-label small text-secondary mb-1">Nombre</label>
            <input
              type="text"
              className="modal-input"
              value={producto.nombre || ''}
              onChange={(e) => onGuardar({ ...producto, nombre: e.target.value }, false)}
              required
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label small text-secondary mb-1">Precio ($)</label>
            <input
              type="number"
              className="modal-input"
              value={producto.precio || 0}
              onChange={(e) => onGuardar({ ...producto, precio: Number(e.target.value) || 0 }, false)}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label small text-secondary mb-1">Descripción</label>
            <textarea
              className="modal-input"
              rows="3"
              value={producto.descripcion || ''}
              onChange={(e) => onGuardar({ ...producto, descripcion: e.target.value }, false)}
            ></textarea>
          </div>

          <div className="col-12">
            <label className="form-label small text-secondary mb-1">URL de Imagen</label>
            <input
              type="text"
              className="modal-input"
              value={producto.imagen || ''}
              onChange={(e) => onGuardar({ ...producto, imagen: e.target.value }, false)}
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