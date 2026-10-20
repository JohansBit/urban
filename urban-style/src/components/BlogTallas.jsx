import { Link } from 'react-router-dom';
import './Blogs.css';
import tablaTallas from '../img/tabla_tallas.png';

const consejos = [
  { icono: '👣', titulo: 'Mide ambos pies', texto: 'A veces un pie puede ser ligeramente más grande que el otro.' },
  { icono: '📏', titulo: 'Quédate con la medida más grande', texto: 'Utiliza como referencia el pie que tenga mayor longitud.' },
  { icono: '📋', titulo: 'Revisa la tabla antes de comprar', texto: 'Compara tu medida en centímetros con nuestra tabla de tallas.' },
  { icono: '🧦', titulo: 'Ten en cuenta tus calcetines', texto: 'Mide pensando en el tipo de calcetines que normalmente usarás.' },
  { icono: '👟', titulo: '¿Estás entre dos tallas?', texto: 'Considera qué tan ajustadas o cómodas prefieres tus zapatillas.' },
  { icono: '✨', titulo: 'La comodidad es lo primero', texto: 'Una buena talla te permitirá disfrutar tus zapatillas sin molestias.' },
];

export default function BlogTallas() {
  return (
    <article className="container py-4">
      <Link to="/blogs" className="text-warning text-decoration-none">
        <i className="bi bi-arrow-left"></i> Volver a Blogs
      </Link>

      <h1 className="text-center mt-3"><strong>¿Cómo elegir tu talla?</strong></h1>
      <p className="fs-5 fw-bold my-4">
        Elegir la talla correcta es importante para que tus zapatillas sean cómodas y se ajusten
        correctamente a tu pie. Antes de realizar tu compra, te recomendamos medir la longitud de
        tu pie en centímetros.
      </p>

      <div className="ratio ratio-16x9 mb-5">
        <iframe
          src="https://www.youtube.com/embed/DnIV27zJNcI?si=zVYrPuoYcCUAWfY8"
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
            <p>
              Utiliza esta tabla para encontrar la talla que corresponde a la medida de tu pie.
              Compara los centímetros obtenidos con la tabla antes de elegir tus zapatillas.
            </p>
          </div>
          <img src={tablaTallas} alt="Tabla de tallas" className="img-fluid rounded" />
        </div>

        <div className="col-md-6">
          <h4 className="text-center mt-4"><strong>💡 Consejos para elegir tu talla</strong></h4>
          {consejos.map((c) => (
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