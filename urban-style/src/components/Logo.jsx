/** Identidad visual compartida por el Navbar y el Footer. */
import logo from '../assets/logo.png'

export default function Logo() {
  // Componente de presentación sin estado: se reutiliza en varias páginas.
  return (
    <img
      src={logo}
      alt="UrbanStyle"
      height="40"
      className="d-inline-block align-text-top"
    />
  )
}