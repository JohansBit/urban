import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Nosotros from './components/Nosotros'
import Productos from './components/Productos'
import Blogs from './components/Blogs'
import Contacto from './components/Contacto'
import Carrito from './components/Carrito'
import Login from './components/Login'
import Hero from './components/Hero'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <section className="container my-4">
                <div className="card p-3">
                  <p><strong>UrbanStyle es tu tienda de moda urbana, ropa y calzado juvenil...</strong></p>
                  <p><strong>Trabajamos con proveedores y marcas...</strong></p>
                  <p><strong>Queremos que encuentres modelos exclusivos...</strong></p>
                  <p>🔥 Nuevas tendencias, grandes marcas y estilos que van contigo.</p>
                  <p><strong>UrbanStyle — viste diferente, marca tu estilo.</strong></p>
                </div>
              </section>
            </>
          } />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1 className="container py-5">Página no encontrada</h1>} />
        </Routes>
      </main>
    </>
  )
}
