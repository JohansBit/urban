import { useState, useEffect } from 'react';
import './NosotrosDetalle.css';
import street from '../img/street.png';
import moda1 from '../img/moda1.jpg';
import anime from '../img/anime.jpg';
import catalogo from '../img/catalogo.png';
import hero from '../img/hero2.0.png';

const slides = [
  {
    fondo: street,
    marca: 'Ropa / Calzado / Accesorios',
    titulo: 'Nuestra',
    acento: 'historia',
    texto:
      'UrbanStyle nace de una pasión: la moda urbana y la cultura juvenil. Somos un equipo que cree en el estilo, la autenticidad y en la posibilidad de que cada persona exprese su personalidad a través de lo que viste.',
    lema: 'Más que ropa, es un estilo de vida.',
  },
  {
    fondo: moda1,
    marca: 'Proveedores',
    titulo: 'Buscamos proveedores',
    acento: 'en todo el mundo',
    texto:
      'Trabajamos con proveedores y marcas de distintos países, conectando con lo mejor de cada lugar para traerte los modelos más exclusivos y las últimas tendencias del mundo.',
    items: ['Asia (China)', 'Europa (Italia / España)', 'América (EE.UU. / LATAM)', 'Y más...'],
    lema: 'Del mundo para ti.',
  },
  {
    fondo: anime,
    marca: 'Marcas',
    titulo: 'Las mejores',
    acento: 'marcas',
    texto:
      'Trabajamos con las marcas más reconocidas y también con nuevas propuestas que marcan tendencia. Desde los clásicos hasta lo más exclusivo, todo en un solo lugar.',
    items: ['Nike', 'Adidas', 'Puma', 'Vans', 'New Balance', 'Converse', 'Jordan', 'The North Face', 'Reebok', "Levi's", 'Carhartt', 'DC'],
    lema: 'Todas las marcas, un solo lugar.',
  },
  {
    fondo: catalogo,
    marca: 'Catálogo',
    titulo: 'Todo lo que',
    acento: 'te gusta',
    items: ['Polerones', 'Poleras', 'Zapatillas', 'Accesorios', 'Y mucho más'],
    lema: 'Las últimas tendencias, en un solo lugar.',
  },
  {
    fondo: hero,
    marca: 'Calidad / Estilo / Exclusividad',
    titulo: 'UrbanStyle',
    acento: 'tu estilo',
    items: ['Modelos exclusivos', 'Los mejores precios', 'Compra segura', 'Envíos a todo Chile'],
    lema: 'Tu estilo, nuestra pasión.',
  },
];

export default function NosotrosDetalle() {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActual((a) => (a + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [actual]);

  const siguiente = () => setActual((a) => (a + 1) % slides.length);
  const anterior = () => setActual((a) => (a - 1 + slides.length) % slides.length);

  const s = slides[actual];

  return (
    <section className="nos-carrusel">
      <div
        className="nos-slide"
        key={actual}
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.92) 40%, rgba(60,20,110,0.55)), url(${s.fondo})`,
        }}
      >
        <div className="container">
          <p className="nos-marca">{s.marca}</p>
          <h2 className="nos-titulo">
            {s.titulo} <span>{s.acento}</span>
          </h2>

          {s.texto && <p className="nos-texto my-3">{s.texto}</p>}

          {s.items && (
            <ul className="nos-items">
              {s.items.map((it) => (
                <li className="nos-item" key={it}>{it}</li>
              ))}
            </ul>
          )}

          <span className="nos-lema">{s.lema}</span>
        </div>
      </div>

      <button type="button" className="nos-flecha izq" onClick={anterior} aria-label="Anterior">
        <i className="bi bi-chevron-left"></i>
      </button>
      <button type="button" className="nos-flecha der" onClick={siguiente} aria-label="Siguiente">
        <i className="bi bi-chevron-right"></i>
      </button>

      <div className="nos-puntos">
        {slides.map((_, i) => (
          <button
            type="button"
            key={i}
            className={`nos-punto ${i === actual ? 'activo' : ''}`}
            onClick={() => setActual(i)}
            aria-label={`Ir a la vista ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}