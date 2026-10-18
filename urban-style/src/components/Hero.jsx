/** Banner de portada del Home: carrusel de imágenes con mensaje y accesos al catálogo. */
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import hero1 from '../assets/hero-1.jpg'
import hero2 from '../assets/hero-2.jpg'
import hero3 from '../assets/hero-3.jpg'
import './Hero.css'

const slides = [
  { src: hero1, alt: 'Hero Principal' },
  { src: hero2, alt: 'Zapatillas exclusivas de la temporada' },
  { src: hero3, alt: 'Polerones exclusivas de la temporada' },
]

const INTERVALO_MS = 5000

export default function Hero() {
  const [actual, setActual] = useState(0)
  const [pausado, setPausado] = useState(false)

  useEffect(() => {
    const reducirMovimiento = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (pausado || reducirMovimiento) return

    const id = setInterval(() => {
      setActual((i) => (i + 1) % slides.length)
    }, INTERVALO_MS)

    return () => clearInterval(id)
  }, [pausado, actual])

    return (
    <section aria-label="Portada">
      <div
        className="hero-banner"
        aria-roledescription="carrusel"
        aria-label="Colecciones destacadas"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        onFocus={() => setPausado(true)}
        onBlur={() => setPausado(false)}
      >
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`hero-banner-img${i === actual ? ' activa' : ''}`}
            aria-hidden={i !== actual}
          />
        ))}

        <div className="hero-banner-indicadores">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              className={`hero-banner-punto${i === actual ? ' activo' : ''}`}
              aria-label={`Ir a la imagen ${i + 1}`}
              aria-current={i === actual}
              onClick={() => setActual(i)}
            />
          ))}
        </div>
      </div>

      <div className="hero-contenido container">
        <h1>UrbanStyle Marcando Tendedncia</h1>
        <p>Ropa y zapatillas exclusivas para quienes dictan el estilo.</p>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Link className="btn btn-purple btn-lg" to="/productos">Ver Ropa</Link>
          <Link className="btn btn-outline-light btn-lg" to="/productos">Ver Calzado</Link>
        </div>
      </div>
    </section>
  )
}