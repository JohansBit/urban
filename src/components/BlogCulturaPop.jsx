import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../services/blogService';
import './Blogs.css';
import street from '../img/street.png';
import moda1 from '../img/moda1.jpg';
import anime from '../img/anime.jpg';

const historiaBase = [
  { icono: '🗽', titulo: 'De los callejones de Nueva York...', texto: 'Ahí nació todo — funcionalidad, identidad y actitud, mucho antes de las pasarelas.' },
  { icono: '💡', titulo: '...a las luces de neón de hoy', texto: 'El streetwear cambió de forma, pero nunca de esencia.' },
  { icono: '🧬', titulo: 'Cada colección cuenta una historia', texto: 'Identidad, resistencia y estilo propio en cada prenda.' },
  { icono: '✍️', titulo: 'Y esa historia sigue escribiéndose', texto: 'La calle sigue marcando el ritmo — nosotros solo la seguimos de cerca.' },
];

const gamerBase = [
  { icono: '🎮', titulo: 'La pantalla como pasarela', texto: 'El gaming dejó de ser solo un hobby — hoy influye directamente en cómo se viste toda una generación.' },
  { icono: '⚡', titulo: 'Estética neón, actitud real', texto: 'Colores vibrantes, luces y texturas digitales se trasladaron de las salas gamer a las prendas streetwear.' },
  { icono: '🌸', titulo: 'El anime como inspiración', texto: 'Sin copiar personajes, muchas colecciones toman su paleta de colores y su energía visual.' },
  { icono: '🕹️', titulo: 'Una cultura, un estilo de vida', texto: 'Vestirse streetwear gamer es mostrar identidad — no solo lo que juegas, sino quién eres.' },
];

function Tips({ lista }) {
  return lista.map((t) => (
    <div className="tip-card" key={t.titulo}>
      <span className="tip-icono">{t.icono}</span>
      <div>
        <h5 className="tip-titulo">{t.titulo}</h5>
        <p className="tip-texto">{t.texto}</p>
      </div>
    </div>
  ));
}

export default function BlogCulturaPop({ usuarioActivo }) {
  const [blog, setBlog] = useState(null);
  const [detalle, setDetalle] = useState({
    intro: 'El streetwear dejó de ser solo ropa cómoda para el día a día: hoy es un lenguaje visual que mezcla música, skate, anime y redes sociales. En UrbanStyle creemos que cada prenda cuenta una historia — acá te contamos de dónde viene esta cultura y por qué sigue marcando tendencia.',
    cita1: '"Cuando la calle se toma la moda"',
    nota1: 'De los callejones de Nueva York a las luces de neón de hoy — el streetwear cambió de forma, pero nunca de actitud.',
    historia: historiaBase,
    cita2: '"Los píxeles también visten streetwear: hoy la moda urbana se mezcla con la cultura gamer y el anime, creando un estilo que nació en la pantalla y se llevó a la calle."',
    nota2: 'En definitiva, la cultura gamer no solo cambió nuestra forma de jugar: cambió la forma en que el mundo se viste. La próxima vez que salgas a la calle, mira a tu alrededor: el próximo nivel de la moda ya está activo.',
    gamer: gamerBase,
  });
  const [editando, setEditando] = useState(false);

  const esAdmin = usuarioActivo?.rol === 'ADMIN';

  useEffect(() => {
    blogService
      .obtenerPorSlug('cultura-pop')
      .then((data) => {
        setBlog(data);
        if (data.detalleJson) {
          setDetalle((prev) => ({ ...prev, ...JSON.parse(data.detalleJson) }));
        }
      })
      .catch((err) => console.warn('Usando datos locales de respaldo:', err));
  }, []);

  const handleGuardarEdicion = async (e) => {
    e.preventDefault();
    if (!blog) return;
    try {
      const actualizado = await blogService.actualizar(blog.id, {
        ...blog,
        detalleJson: JSON.stringify(detalle),
      });
      setBlog(actualizado);
      setEditando(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <article>
      <img src={street} alt="Streetwear" className="blog-banner-pop" />

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/blogs" className="text-warning text-decoration-none">
            <i className="bi bi-arrow-left"></i> Volver a Blogs
          </Link>

          {esAdmin && blog && (
            <button
              className="btn btn-sm btn-outline-warning"
              onClick={() => setEditando(!editando)}
            >
              {editando ? 'Cancelar edición' : 'Editar Artículo (ADMIN)'}
            </button>
          )}
        </div>

        {esAdmin && editando && (
          <form onSubmit={handleGuardarEdicion} className="card bg-secondary bg-opacity-10 border-warning p-3 my-4 text-white">
            <h5 className="text-warning mb-3">Editar contenido desde Backend</h5>
            <div className="mb-2">
              <label className="form-label small">Introducción principal</label>
              <textarea
                rows="3"
                className="form-control bg-dark text-white border-secondary"
                value={detalle.intro}
                onChange={(e) => setDetalle({ ...detalle, intro: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label small">Cita destacada</label>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                value={detalle.cita1}
                onChange={(e) => setDetalle({ ...detalle, cita1: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-warning btn-sm fw-bold">
              Guardar cambios en BD
            </button>
          </form>
        )}

        <div className="tabla-nota mt-4">
          <span className="tabla-nota-icono">👕</span>
          <p>{detalle.intro}</p>
        </div>

        <h2 className="text-center my-5"><strong>{detalle.cita1}</strong></h2>
        <div className="row g-4 align-items-center">
          <div className="col-md-6">
            <img src={moda1} alt="Moda urbana" className="blog-img" />
          </div>
          <div className="col-md-6">
            <Tips lista={detalle.historia} />
            <div className="tabla-nota mt-4">
              <span className="tabla-nota-icono">🗽</span>
              <p>{detalle.nota1}</p>
            </div>
          </div>
        </div>

        <h2 className="text-center my-5">
          <strong>{detalle.cita2}</strong>
        </h2>
        <div className="row g-4 align-items-center">
          <div className="col-md-6">
            <Tips lista={detalle.gamer} />
            <div className="tabla-nota mt-4">
              <span className="tabla-nota-icono">🕹️</span>
              <p>{detalle.nota2}</p>
            </div>
          </div>
          <div className="col-md-6">
            <img src={anime} alt="Moda anime" className="blog-img" />
          </div>
        </div>
      </div>
    </article>
  );
}