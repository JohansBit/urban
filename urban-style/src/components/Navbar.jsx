/** Navegación principal. El menú móvil se controla con React (useState). */
import { useState } from 'react'
import Logo from './Logo'

const enlaces = [
  { texto: 'HOME', ruta: '/' },
  { texto: 'NOSOTROS', ruta: '/nosotros' },
  { texto: 'PRODUCTOS', ruta: '/productos' },
  { texto: 'BLOGS', ruta: '/blogs' },
  { texto: 'CONTACTO', ruta: '/contacto' },
]

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg site-navbar" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <Logo />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse${abierto ? ' show' : ''}`}>
          <ul className="navbar-nav me-auto">
            {enlaces.map(({ texto, ruta }) => (
              <li className="nav-item" key={ruta}>
                <a className="nav-link" href={ruta}>
                  <strong>{texto}</strong>
                </a>
              </li>
            ))}
          </ul>

          <ul className="navbar-nav flex-row gap-3">
            <li className="nav-item">
              <a className="nav-link" href="/login" aria-label="Iniciar sesión" title="Iniciar sesión">
                <i className="bi bi-door-open nav-icono" aria-hidden="true"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/carrito" aria-label="Carrito" title="Carrito">
                <i className="bi bi-cart nav-icono" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}