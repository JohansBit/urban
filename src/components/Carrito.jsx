export default function Carrito() {
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid justify-content-start">
          <a className="navbar-brand" href="/">
            <img src="img/logo.png" alt="UrbanStyle" width="100" height="50" />
          </a>

          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                <strong>HOME</strong>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/nosotros">
                <strong>NOSOTROS</strong>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/productos">
                <strong>PRODUCTOS</strong>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/blogs">
                <strong>BLOGS</strong>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contacto">
                <strong>CONTACTO</strong>
              </a>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                href="/login"
                aria-label="Iniciar sesión"
                title="Iniciar Sesión"
              >
                <i className="bi bi-door-open"></i>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/carrito"
                aria-label="Carrito de Compras"
                title="Carrito de Compras"
              >
                <i className="bi bi-cart"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL DEL CARRITO */}
      <div className="container py-5">
        <h1>Carrito de Compras</h1>
      </div>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="m-0">UrbanStyle Boutique &copy; 2026</p>
      </footer>
    </>
  );
}