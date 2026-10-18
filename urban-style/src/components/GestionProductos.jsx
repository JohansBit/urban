import React, { useState } from 'react';

export default function GestionProductos({ productos, onActualizarProductos, onAbrirEdicion }) {
  const [skuNuevo, setSkuNuevo] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('Hombre');
  const [stock, setStock] = useState('');
  const [descripcionNueva, setDescripcionNueva] = useState('');
  const [imagen, setImagen] = useState('');

  const handleCrearProducto = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !precio || !stock) return;

    const skuFinal = skuNuevo.trim() || `URB-${Date.now().toString().slice(-4)}`;

    const nuevo = {
      id: Date.now(),
      sku: skuFinal,
      nombre: nombre.trim(),
      precio: Number(precio) || 0,
      categoria,
      stock: Number(stock) || 0,
      descripcion: descripcionNueva.trim() || 'Sin descripción',
      imagen: imagen.trim() || 'https://placehold.co/100x100/1a1a1a/d4af37?text=UrbanStyle'
    };

    onActualizarProductos([...productos, nuevo]);
    setSkuNuevo('');
    setNombre('');
    setPrecio('');
    setStock('');
    setDescripcionNueva('');
    setImagen('');
  };

  const handleStockRapido = (id, delta) => {
    const actualizados = productos.map((p) => {
      if (p.id === id) {
        return { ...p, stock: Math.max(0, (Number(p.stock) || 0) + delta) };
      }
      return p;
    });
    onActualizarProductos(actualizados);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Deseas eliminar este producto?')) {
      onActualizarProductos(productos.filter((p) => p.id !== id));
    }
  };

  return (
    <>
      <div className="admin-card bg-dark border border-secondary rounded p-3 mb-4">
        <h5 className="text-warning fw-bold mb-3">Agregar Nuevo Producto</h5>
        <form onSubmit={handleCrearProducto} className="row g-2">
          <div className="col-12 col-md-3">
            <input
              type="text"
              className="modal-input"
              placeholder="SKU (ej: URB-101)"
              value={skuNuevo}
              onChange={(e) => setSkuNuevo(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-5">
            <input
              type="text"
              className="modal-input"
              placeholder="Nombre de prenda"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="col-6 col-md-2">
            <input
              type="number"
              className="modal-input"
              placeholder="Precio ($)"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>
          <div className="col-6 col-md-2">
            <input
              type="number"
              className="modal-input"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          <div className="col-12 col-md-3 mt-2">
            <select
              className="modal-input"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
          <div className="col-12 col-md-6 mt-2">
            <input
              type="text"
              className="modal-input"
              placeholder="Descripción de la prenda"
              value={descripcionNueva}
              onChange={(e) => setDescripcionNueva(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-3 mt-2">
            <button type="submit" className="btn btn-warning w-100 fw-bold">
              + Agregar
            </button>
          </div>

          <div className="col-12 mt-2">
            <input
              type="text"
              className="modal-input"
              placeholder="URL de imagen (opcional)"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="admin-card bg-dark border border-secondary rounded p-3 table-responsive">
        <table className="admin-table table table-dark table-hover m-0 align-middle">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Foto</th>
              <th>Nombre & Descripción</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock Rápido</th>
              <th className="text-end">Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td><span className="sku-badge">{prod.sku || `URB-${prod.id}`}</span></td>
                <td>
                  <img 
                    src={prod.imagen} 
                    alt={prod.nombre} 
                    className="admin-thumb"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/100x100/1a1a1a/d4af37?text=UrbanStyle';
                    }} 
                  />
                </td>
                <td>
                  <div className="fw-bold">{prod.nombre}</div>
                  <div className="small text-secondary text-truncate" style={{ maxWidth: '220px' }}>
                    {prod.descripcion || 'Sin descripción'}
                  </div>
                </td>
                <td><span className="badge bg-secondary">{prod.categoria}</span></td>
                <td>${(Number(prod.precio) || 0).toLocaleString('es-CL')}</td>
                <td>
                  <div className="stock-counter-group">
                    <button type="button" className="stock-btn" onClick={() => handleStockRapido(prod.id, -1)}>-</button>
                    <span className="stock-display">{prod.stock ?? 0}</span>
                    <button type="button" className="stock-btn" onClick={() => handleStockRapido(prod.id, 1)}>+</button>
                  </div>
                </td>
                <td className="text-end">
                  <button
                    type="button"
                    onClick={() => onAbrirEdicion(prod)}
                    className="btn btn-outline-warning btn-sm py-1 px-2 me-1"
                    title="Editar"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEliminar(prod.id)}
                    className="btn btn-outline-danger btn-sm py-1 px-2"
                    title="Eliminar"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}