/** Navegación principal. El menú móvil se controla con React (useState). */
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
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
  const cerrar = () => setAbierto(false)

  return (
    <nav className="navbar navbar-expand-lg site-navbar" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={cerrar}>
          <Logo />
        </Link>

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
                <NavLink className="nav-link" to={ruta} end={ruta === '/'} onClick={cerrar}>
                  <strong>{texto}</strong>
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className="navbar-nav flex-row gap-3">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/login"
                aria-label="Iniciar sesión"
                title="Iniciar sesión"
                onClick={cerrar}
              >
                <i className="bi bi-door-open nav-icono" aria-hidden="true"></i>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/carrito"
                aria-label="Carrito"
                title="Carrito"
                onClick={cerrar}
              >
                <i className="bi bi-cart nav-icono" aria-hidden="true"></i>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}