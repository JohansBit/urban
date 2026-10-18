import React, { useState, useEffect } from 'react';
import productosBase from '../data/productos.json';
import AdminSide from './AdminSide';
import GestionProductos from './GestionProductos';
import GestionUsuarios from './GestionUsuarios';
import EditProducto from './EditProducto';
import EditUsuario from './EditUsuario';
import './AdminPanel.css';

const USUARIOS_DEMO = [
  {
    id: 1,
    rut: '12.345.678-5',
    nombre: 'Administrador General',
    email: 'admin@urban.cl',
    rol: 'Administrador',
    direccion: { calle: 'Av. Providencia 1234', comuna: 'Providencia', region: 'Metropolitana de Santiago' }
  },
  {
    id: 2,
    rut: '20.987.654-3',
    nombre: 'Johans',
    email: 'johans@urban.cl',
    rol: 'Vendedor',
    direccion: { calle: 'Gran Avenida 567', comuna: 'San Miguel', region: 'Metropolitana de Santiago' }
  },
  {
    id: 3,
    rut: '19.876.543-2',
    nombre: 'Carlos Santana',
    email: 'carlos.santana@duocuc.cl',
    rol: 'Cliente',
    direccion: { calle: 'Av. Concha y Toro 1400', comuna: 'Puente Alto', region: 'Metropolitana de Santiago' }
  }
];

export default function AdminPanel({ onVolverTienda }) {
  const [tabActiva, setTabActiva] = useState('productos');

  const [usuarioActual] = useState(() => {
    try {
      const sesion = localStorage.getItem('sesionActiva');
      return sesion ? JSON.parse(sesion) : null;
    } catch {
      return null;
    }
  });

  const [productos, setProductos] = useState(() => {
    try {
      const guardados = localStorage.getItem('urban_productos');
      if (guardados) {
        const parsed = JSON.parse(guardados);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { console.error(e); }
    return Array.isArray(productosBase) ? productosBase : [];
  });

  const [usuarios, setUsuarios] = useState(() => {
    try {
      const raw = localStorage.getItem('urban_usuarios');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { console.error(e); }
    return USUARIOS_DEMO;
  });

  useEffect(() => {
    if (!localStorage.getItem('urban_usuarios')) {
      localStorage.setItem('urban_usuarios', JSON.stringify(USUARIOS_DEMO));
    }
  }, []);

  const actualizarProductos = (nuevos) => {
    setProductos(nuevos);
    localStorage.setItem('urban_productos', JSON.stringify(nuevos));
  };

  const actualizarUsuarios = (nuevos) => {
    setUsuarios(nuevos);
    localStorage.setItem('urban_usuarios', JSON.stringify(nuevos));
  };

  const [productoEnEdicion, setProductoEnEdicion] = useState(null);
  const [usuarioEnEdicion, setUsuarioEnEdicion] = useState(null);

  const handleGuardarEdicionProducto = (prod, cerrar = true) => {
    setProductoEnEdicion(prod);
    if (cerrar) {
      actualizarProductos(productos.map((p) => p.id === prod.id ? prod : p));
      setProductoEnEdicion(null);
    }
  };

  const handleAbrirEdicionUsuario = (usr, index) => {
    setUsuarioEnEdicion({
      ...usr,
      id: usr.id ?? index,
      _index: index,
      rut: usr.rut || '11.111.111-1',
      rol: usr.rol || 'Cliente',
      direccion: typeof usr.direccion === 'object' && usr.direccion !== null
        ? usr.direccion
        : { calle: usr.direccion || '', comuna: '', region: '' }
    });
  };

  const handleGuardarEdicionUsuario = (usr, cerrar = true) => {
    setUsuarioEnEdicion(usr);
    if (cerrar) {
      const { _index, ...datosGuardar } = usr;
      const actualizados = usuarios.map((u, i) => (u.id === usr.id || i === _index ? datosGuardar : u));
      actualizarUsuarios(actualizados);

      if (usuarioActual && (usuarioActual.email === usr.email || usuarioActual.id === usr.id)) {
        localStorage.setItem('sesionActiva', JSON.stringify({ ...usuarioActual, ...datosGuardar }));
      }
      setUsuarioEnEdicion(null);
    }
  };

  const handleEliminarUsuario = (usr, index) => {
    if (window.confirm(`¿Deseas eliminar al usuario ${usr.nombre || usr.email}?`)) {
      actualizarUsuarios(usuarios.filter((u, i) => (usr.id ? u.id !== usr.id : i !== index)));
    }
  };

  return (
    <section className="admin-container text-white py-4 px-3">
      <div className="admin-header mb-4 pb-3 border-bottom border-secondary">
        <h2 className="admin-title text-warning fw-bold m-0">PANEL DE ADMINISTRACIÓN</h2>
        <span className="text-secondary small">Gestión modular de catálogo y cuentas</span>
      </div>

      <div className="admin-layout-grid">
        <div className="admin-main-content">
          <div className="admin-tabs d-flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setTabActiva('productos')}
              className={`admin-tab-btn ${tabActiva === 'productos' ? 'active' : ''}`}
            >
              <i className="bi bi-box-seam me-1"></i> Productos ({productos.length})
            </button>
            <button
              type="button"
              onClick={() => setTabActiva('usuarios')}
              className={`admin-tab-btn ${tabActiva === 'usuarios' ? 'active' : ''}`}
            >
              <i className="bi bi-people me-1"></i> Usuarios ({usuarios.length})
            </button>
          </div>

          {tabActiva === 'productos' ? (
            <GestionProductos
              productos={productos}
              onActualizarProductos={actualizarProductos}
              onAbrirEdicion={setProductoEnEdicion}
            />
          ) : (
            <GestionUsuarios
              usuarios={usuarios}
              onAbrirEdicion={handleAbrirEdicionUsuario}
              onEliminarUsuario={handleEliminarUsuario}
            />
          )}
        </div>

        <AdminSide
          usuarioActual={usuarioActual}
          totalProductos={productos.length}
          totalUsuarios={usuarios.length}
          onVolverTienda={onVolverTienda}
        />
      </div>

      <EditProducto
        producto={productoEnEdicion}
        onClose={() => setProductoEnEdicion(null)}
        onGuardar={handleGuardarEdicionProducto}
      />

      <EditUsuario
        usuario={usuarioEnEdicion}
        onClose={() => setUsuarioEnEdicion(null)}
        onGuardar={handleGuardarEdicionUsuario}
      />
    </section>
  );
}