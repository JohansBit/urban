import React, { useState } from 'react';

const PRODUCTOS_BASE = [
  // POLERAS & POLERONES
  {
    id: 1,
    nombre: "Polerón Adidas",
    categoria: "poleras-polerones",
    genero: "hombre",
    precio: 39990,
    imagen: "/img/polerondidas.jpg",
    descripcion: "Polerón urbano cómodo de alta calidad."
  },
  {
    id: 10,
    nombre: "Polera Crop",
    categoria: "poleras-polerones",
    genero: "mujer",
    precio: 24990,
    imagen: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
    descripcion: "Polera estilo crop de algodón orgánico con estampado gráfico."
  },
  {
    id: 11,
    nombre: "Polerón niño",
    categoria: "poleras-polerones",
    genero: "niño",
    precio: 29990,
    imagen: "/img/poleronniño.jpg",
    descripcion: "Polerón urbano cómodo y resistente para niños."
  },

  // PANTALONES
  {
    id: 2,
    nombre: "Pantalón Cargo",
    categoria: "pantalones",
    genero: "hombre",
    precio: 45990,
    imagen: "/img/cargo.jpg",
    descripcion: "Pantalón cargo con bolsillos múltiples y ajuste en tobillos."
  },
  {
    id: 20,
    nombre: "Jeans",
    categoria: "pantalones",
    genero: "mujer",
    precio: 42990,
    imagen: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=600&q=80",
    descripcion: "Jogger de tiro alto con detalles y ajuste cómodo."
  },
  {
    id: 21,
    nombre: "Pantalón Cargo Street Kids",
    categoria: "pantalones",
    genero: "niño",
    precio: 28990,
    imagen: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80",
    descripcion: "Pantalón cargo infantil reforzado para máxima durabilidad."
  },

  // ZAPATILLAS
  {
    id: 3,
    nombre: "Zapatillas Urban Runner Retro '88",
    categoria: "zapatillas",
    genero: "hombre",
    precio: 89990,
    imagen: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80",
    descripcion: "Zapatillas exclusivas con suela de alta tracción."
  },
  {
    id: 30,
    nombre: "Zapatillas Air Max 90",
    categoria: "zapatillas",
    genero: "mujer",
    precio: 95990,
    imagen: "/img/airmax.jpg",
    descripcion: "Sneakers de caña alta con combinación de tonos urbanos."
  },
  {
    id: 31,
    nombre: "Zapatillas Gold Kids 2.0",
    categoria: "zapatillas",
    genero: "niño",
    precio: 59990,
    imagen: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80",
    descripcion: "Zapatillas urbanas infantiles con cierre de velcro."
  },

  // ACCESORIOS
  {
    id: 4,
    nombre: "Jockey rojo Jordan",
    categoria: "accesorios",
    genero: "hombre",
    precio: 45000,
    imagen: "/img/jockey.jpg",
    descripcion: "Jockey de 5 paneles con bordado frontal en relieve."
  },
  {
    id: 40,
    nombre: "Mochila Urban",
    categoria: "accesorios",
    genero: "mujer",
    precio: 22990,
    imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    descripcion: "Mochila urbana con compartimentos con cierre."
  },
  {
    id: 41,
    nombre: "Gorro Jordan",
    categoria: "accesorios",
    genero: "niño",
    precio: 12990,
    imagen: "/img/jordan.jpg",
    descripcion: "Gorro/Jockey suave para niños con diseño Jordan."
  }
];

export default function Catalogo({ productos = [], onAgregarAlCarrito }) {
  const [filtros, setFiltros] = useState({
    zapatillas: 'todos',
    'poleras-polerones': 'todos',
    pantalones: 'todos',
    accesorios: 'todos'
  });

  // Si productos viene vacío desde App.jsx, usamos la lista de respaldo PRODUCTOS_BASE
  const listaProductos = productos && productos.length > 0 ? productos : PRODUCTOS_BASE;

  const cambiarFiltro = (categoriaKey, genero) => {
    setFiltros(prev => ({ ...prev, [categoriaKey]: genero }));
  };

  const obtenerProductosFiltrados = (categoriaKey) => {
    const generoSeleccionado = filtros[categoriaKey];

    return listaProductos.filter(p => {
      const cat = (p.categoria || '').toLowerCase().trim();
      const gen = (p.genero || '').toLowerCase().trim();

      let coincideCat = false;
      if (categoriaKey === 'zapatillas') {
        coincideCat = cat.includes('zapatilla') || cat.includes('sneaker');
      } else if (categoriaKey === 'poleras-polerones') {
        coincideCat = cat.includes('polera') || cat.includes('poleron') || cat.includes('polerón');
      } else if (categoriaKey === 'pantalones') {
        coincideCat = cat.includes('pantalon') || cat.includes('pantalón') || cat.includes('jean') || cat.includes('cargo');
      } else if (categoriaKey === 'accesorios') {
        coincideCat = cat.includes('accesorio') || cat.includes('jockey') || cat.includes('gorro') || cat.includes('mochila');
      }

      let coincideGen = generoSeleccionado === 'todos';
      if (!coincideGen) {
        if (generoSeleccionado === 'hombre') coincideGen = gen.includes('hombre');
        if (generoSeleccionado === 'mujer') coincideGen = gen.includes('mujer');
        if (generoSeleccionado === 'niño') coincideGen = gen.includes('niño') || gen.includes('nino') || gen.includes('kids');
      }

      return coincideCat && coincideGen;
    });
  };

  // Función para normalizar cualquier ruta de imagen
  const limpiarRutaImagen = (ruta) => {
    if (!ruta) return 'https://via.placeholder.com/300x300?text=UrbanStyle';
    if (ruta.startsWith('http')) return ruta;

    // Asegura que empiece por / para buscar en public/
    let limpia = ruta.startsWith('/') ? ruta : `/${ruta}`;
    return limpia.toLowerCase();
  };

  const secciones = [
    { key: 'zapatillas', titulo: 'ZAPATILLAS' },
    { key: 'poleras-polerones', titulo: 'POLERAS & POLERONES' },
    { key: 'pantalones', titulo: 'PANTALONES' },
    { key: 'accesorios', titulo: 'ACCESORIOS' }
  ];

  const generos = [
    { label: 'Todas', value: 'todos' },
    { label: 'Hombre', value: 'hombre' },
    { label: 'Mujer', value: 'mujer' },
    { label: 'Niños', value: 'niño' }
  ];

  return (
    <div className="container my-4">
      {secciones.map(sec => {
        const productosSeccion = obtenerProductosFiltrados(sec.key);

        return (
          <section
            key={sec.key}
            className="mb-5 p-4 rounded"
            style={{ backgroundColor: '#18181c', border: '1px solid #6a1b9a' }}
          >
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
              <h2 className="fw-bold m-0 fs-3" style={{ color: '#d4af37' }}>{sec.titulo}</h2>
              <div className="btn-group" role="group">
                {generos.map(gen => {
                  const activo = filtros[sec.key] === gen.value;
                  return (
                    <button
                      key={gen.value}
                      type="button"
                      className="btn btn-sm fw-semibold"
                      style={{
                        backgroundColor: activo ? '#6a1b9a' : '#18181c',
                        color: '#ffffff',
                        borderColor: '#6a1b9a',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => cambiarFiltro(sec.key, gen.value)}
                    >
                      {gen.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="row g-4">
              {productosSeccion.length > 0 ? (
                productosSeccion.map(p => {
                  const imgPath = limpiarRutaImagen(p.imagen || p.img);

                  return (
                    <div key={p.id} className="col-12 col-sm-6 col-md-4">
                      <div
                        className="product-card h-100 p-3 rounded d-flex flex-column justify-content-between"
                        style={{ backgroundColor: '#18181c', border: '1px solid #333' }}
                      >
                        <div>
                          <div
                            className="bg-black rounded mb-3 overflow-hidden d-flex align-items-center justify-content-center"
                            style={{ height: '220px' }}
                          >
                            <img
                              src={imgPath}
                              alt={p.nombre}
                              className="w-100 h-100"
                              style={{ objectFit: 'cover' }}
                              onError={(e) => {
                                // Si falla por mayúsculas/minúsculas o nombre distinto, muestra placeholder
                                e.target.src = 'https://via.placeholder.com/300x300?text=UrbanStyle';
                              }}
                            />
                          </div>
                          <h5 className="fw-bold text-light mt-2">{p.nombre}</h5>
                          <p className="text-uppercase small m-0 fw-bold" style={{ color: '#d4af37' }}>
                            {p.genero || 'Unisex'}
                          </p>
                          {p.descripcion && (
                            <p className="text-secondary small mt-1 mb-2">
                              {p.descripcion}
                            </p>
                          )}
                          <p className="fs-5 fw-bold mb-3" style={{ color: '#d4af37' }}>
                            ${p.precio ? p.precio.toLocaleString('es-CL') : '0'}
                          </p>
                        </div>

                        <button
                          onClick={() => onAgregarAlCarrito && onAgregarAlCarrito(p)}
                          className="btn btn-sm w-100 fw-bold py-2"
                          style={{ backgroundColor: '#d4af37', color: '#000' }}
                        >
                          Añadir
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-12">
                  <p className="text-center text-muted py-4 m-0">
                    No hay productos disponibles para este género.
                  </p>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}