import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../services/blogService';
import './Blogs.css';
import tablaTallas from '../img/tabla_tallas.png';

const consejosBase = [
  { icono: '👣', titulo: 'Mide ambos pies', texto: 'A veces un pie puede ser ligeramente más grande que el otro.' },
  { icono: '📏', titulo: 'Quédate con la medida más grande', texto: 'Utiliza como referencia el pie que tenga mayor longitud.' },
  { icono: '📋', titulo: 'Revisa la tabla antes de comprar', texto: 'Compara tu medida en centímetros con nuestra tabla de tallas.' },
  { icono: '🧦', titulo: 'Ten en cuenta tus calcetines', texto: 'Mide pensando en el tipo de calcetines que normalmente usarás.' },
  { icono: '👟', titulo: '¿Estás entre dos tallas?', texto: 'Considera qué tan ajustadas o cómodas prefieres tus zapatillas.' },
  { icono: '✨', titulo: 'La comodidad es lo primero', texto: 'Una buena talla te permitirá disfrutar tus zapatillas sin molestias.' },
];

export default function BlogTallas({ usuarioActivo }) {
  const [blog, setBlog] = useState(null);
  const [detalle, setDetalle] = useState({
    subtitulo: '¿Cómo elegir tu talla?',
    intro: 'Elegir la talla correcta es importante para que tus zapatillas sean cómodas y se ajusten correctamente a tu pie. Antes de realizar tu compra, te recomendamos medir la longitud de tu pie en centímetros.',
    videoUrl: 'https://www.youtube.com/embed/DnIV27zJNcI?si=zVYrPuoYcCUAWfY8',
    notaTabla: 'Utiliza esta tabla para encontrar la talla que corresponde a la medida de tu pie. Compara los centímetros obtenidos con la tabla antes de elegir tus zapatillas.',
    consejos: consejosBase,
  });
  const [editando, setEditando] = useState(false);

  const esAdmin = usuarioActivo?.rol === 'ADMIN';

  useEffect(() => {
    blogService
      .obtenerPorSlug('tallas')
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
    <article className="container py-4">
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
            <label className="form-label small">Subtítulo principal</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              value={detalle.subtitulo}
              onChange={(e) => setDetalle({ ...detalle, subtitulo: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label small">Introducción</label>
            <textarea
              rows="3"
              className="form-control bg-dark text-white border-secondary"
              value={detalle.intro}
              onChange={(e) => setDetalle({ ...detalle, intro: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-warning btn-sm fw-bold">
            Guardar cambios en BD
          </button>
        </form>
      )}

      <h1 className="text-center mt-3"><strong>{detalle.subtitulo}</strong></h1>
      <p className="fs-5 fw-bold my-4">{detalle.intro}</p>

      <div className="ratio ratio-16x9 mb-5">
        <iframe
          src={detalle.videoUrl}
          title="Cómo medir tu talla de zapatillas"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <div className="row align-items-center g-4">
        <div className="col-md-6">
          <div className="tabla-nota">
            <span className="tabla-nota-icono">📐</span>
            <p>{detalle.notaTabla}</p>
          </div>
          <img src={tablaTallas} alt="Tabla de tallas" className="img-fluid rounded" />
        </div>

        <div className="col-md-6">
          <h4 className="text-center mt-4"><strong>💡 Consejos para elegir tu talla</strong></h4>
          {detalle.consejos.map((c) => (
            <div className="tip-card" key={c.titulo}>
              <span className="tip-icono">{c.icono}</span>
              <div>
                <h5 className="tip-titulo">{c.titulo}</h5>
                <p className="tip-texto">{c.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}