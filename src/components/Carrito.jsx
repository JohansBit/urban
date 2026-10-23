import React from 'react';
import { Link } from 'react-router-dom';

export default function Carrito({ 
  items = [], 
  onActualizarCantidad, 
  onEliminar, 
  onProcesarPago 
}) {
  // Cálculo dinámico del total acumulado
  const total = items.reduce(
    (acc, item) => acc + (item.precio * (item.cantidad || 1)), 
    0
  );

  return (
    <main className="container my-5 flex-grow-1">
      <h2 className="fw-bold mb-4 text-warning text-uppercase">Carrito de Compras</h2>

      <div className="row g-4">
        {/* Tabla de Productos */}
        <div className="col-lg-8">
          <div className="card bg-dark text-white p-3 border-secondary table-responsive">
            <table className="table table-dark table-hover align-middle m-0">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th className="text-center">Cantidad</th>
                  <th>Subtotal</th>
                  <th className="text-end">Acción</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((prod) => {
                    const cantidad = prod.cantidad || 1;
                    const subtotal = prod.precio * cantidad;

                    return (
                      <tr key={prod.id}>
                        <td>
                          <div className="fw-bold">{prod.nombre}</div>
                        </td>
                        <td>${prod.precio ? prod.precio.toLocaleString('es-CL') : '0'}</td>
                        <td className="text-center">
                          <div className="btn-group btn-group-sm" role="group">
                            <button
                              type="button"
                              className="btn btn-outline-light"
                              onClick={() => onActualizarCantidad && onActualizarCantidad(prod.id, cantidad - 1)}
                            >
                              -
                            </button>
                            <span className="btn btn-dark disabled text-white px-3">
                              {cantidad}
                            </span>
                            <button
                              type="button"
                              className="btn btn-outline-light"
                              onClick={() => onActualizarCantidad && onActualizarCantidad(prod.id, cantidad + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>${subtotal.toLocaleString('es-CL')}</td>
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => onEliminar && onEliminar(prod.id)}
                          >
                            <i className="bi bi-trash me-1"></i> Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      El carrito está vacío.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumen del Pedido */}
        <div className="col-lg-4">
          <div className="card bg-dark text-white p-4 border-secondary">
            <h4 className="fw-bold mb-3 text-warning">Resumen del Pedido</h4>
            <hr className="border-secondary" />

            <div className="d-flex justify-content-between align-items-center fs-5 fw-bold mb-4">
              <span>Total:</span>
              <span className="text-warning fs-4">${total.toLocaleString('es-CL')}</span>
            </div>

            <button
              onClick={() => onProcesarPago && onProcesarPago()}
              className="btn btn-warning w-100 fw-bold text-dark py-2"
              disabled={items.length === 0}
            >
              Ir al Pago / Checkout
            </button>

            <div className="mt-3 text-center">
              <Link to="/productos" className="text-decoration-none text-light opacity-75">
                ← Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}