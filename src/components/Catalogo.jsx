/** Renderiza el catálogo por categorías, con filtro de género, usando el componente Producto. */
import { useState } from 'react';
import productos from '../data/productos.json';
// Importar el JSON entrega datos locales; aquí no se hace una llamada HTTP.
import Producto from './Producto';
import './Catalogo.css';

// Cada sección se define como dato: agregar una categoría nueva no requiere tocar el JSX.
// "key" debe coincidir con el campo "categoria" de productos.json.
const SECCIONES = [
  { key: 'zapatillas', titulo: 'ZAPATILLAS' },
  { key: 'poleras-polerones', titulo: 'POLERAS & POLERONES' },
  { key: 'pantalones', titulo: 'PANTALONES' },
  { key: 'accesorios', titulo: 'ACCESORIOS' },
];

// "value" debe coincidir con el campo "genero" de productos.json ('todos' = sin filtro).
const GENEROS = [
  { label: 'Todas', value: 'todos' },
  { label: 'Hombre', value: 'hombre' },
  { label: 'Mujer', value: 'mujer' },
  { label: 'Niños', value: 'niño' },
];

// Los productos salen directo de productos.json; por props solo llega la función del carrito.
export default function Catalogo({ onAgregarAlCarrito }) {
  // Un estado por sección: filtrar zapatillas no cambia las otras secciones.
  // El setter provoca un nuevo render con las tarjetas filtradas.
  const [filtros, setFiltros] = useState({
    zapatillas: 'todos',
    'poleras-polerones': 'todos',
    pantalones: 'todos',
    accesorios: 'todos',
  });

  function cambiarFiltro(categoria, genero) {
    // El spread copia el estado anterior y solo reemplaza la categoría modificada.
    setFiltros((previo) => ({ ...previo, [categoria]: genero }));
  }

  function productosDe(categoria) {
    const genero = filtros[categoria];
    // filter conserva solo los productos de la categoría y del género elegido.
    return productos.filter(
      (p) => p.categoria === categoria && (genero === 'todos' || p.genero === genero)
    );
  }

  return (
    <div className="container my-4">
      {SECCIONES.map((seccion) => {
        const visibles = productosDe(seccion.key);

        return (
          <section key={seccion.key} className="catalogo-seccion mb-5 p-4">
            <div className="catalogo-encabezado">
              <h2 className="catalogo-titulo">{seccion.titulo}</h2>
              <div className="btn-group" role="group" aria-label={`Filtrar ${seccion.titulo} por género`}>
                {GENEROS.map((g) => (
                  <button
                    key={g.value}
                    type="button"
                    className={`btn btn-sm catalogo-filtro ${
                      filtros[seccion.key] === g.value ? 'activo' : ''
                    }`}
                    aria-pressed={filtros[seccion.key] === g.value}
                    onClick={() => cambiarFiltro(seccion.key, g.value)}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="row g-4 catalogo">
              {visibles.length > 0 ? (
                visibles.map((producto) => (
                  // El ID estable sirve como key; Bootstrap da 1, 2 o 3 columnas según el ancho.
                  <div className="col-12 col-sm-6 col-md-4" key={producto.id}>
                    {/* El spread pasa las propiedades del objeto como props a Producto. */}
                    <Producto {...producto} onAgregar={onAgregarAlCarrito} />
                  </div>
                ))
              ) : (
                <p className="catalogo-vacio" role="status">
                  No hay productos disponibles para este género.
                </p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}