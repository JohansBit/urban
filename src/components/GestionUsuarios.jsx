import React from 'react';

export default function GestionUsuarios({ usuarios, onAbrirEdicion, onEliminarUsuario }) {
  return (
    <div className="admin-card bg-dark border border-secondary rounded p-3 table-responsive">
      <table className="admin-table table table-dark table-hover m-0 align-middle">
        <thead>
          <tr>
            <th>RUT</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Ubicación / Dirección</th>
            <th className="text-end">Acción</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-secondary py-4">
                No hay usuarios registrados en el sistema.
              </td>
            </tr>
          ) : (
            usuarios.map((u, i) => {
              let ubicacionTexto = 'Sin dirección';
              if (u?.direccion) {
                if (typeof u.direccion === 'string') {
                  ubicacionTexto = u.direccion;
                } else if (u.direccion.comuna || u.direccion.region) {
                  const comuna = u.direccion.comuna || '';
                  const region = u.direccion.region || '';
                  const calle = u.direccion.calle ? ` (${u.direccion.calle})` : '';
                  ubicacionTexto = `${comuna}${comuna && region ? ', ' : ''}${region}${calle}`;
                }
              }

              return (
                <tr key={u?.id || i}>
                  <td><span className="sku-badge">{u?.rut || 'Sin RUT'}</span></td>
                  <td className="fw-bold">{u?.nombre || 'Usuario'}</td>
                  <td className="text-secondary">{u?.email || 'S/C'}</td>
                  <td>
                    <span className={`badge-rol ${
                      u?.rol === 'Administrador' ? 'badge-admin' :
                      u?.rol === 'Vendedor' ? 'badge-vendedor' : 'badge-cliente'
                    }`}>
                      {u?.rol || 'Cliente'}
                    </span>
                  </td>
                  <td className="small text-secondary">{ubicacionTexto}</td>
                  <td className="text-end">
                    <button
                      type="button"
                      onClick={() => onAbrirEdicion(u, i)}
                      className="btn btn-outline-warning btn-sm py-1 px-2 me-1"
                      title="Editar"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => onEliminarUsuario(u, i)}
                      className="btn btn-outline-danger btn-sm py-1 px-2"
                      title="Eliminar"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}