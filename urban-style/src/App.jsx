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
import NosotrosDetalle from './components/NosotrosDetalle'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Nosotros />
            </>
          } />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/nosotros" element={<NosotrosDetalle />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<h1 className="container py-5">Página no encontrada</h1>} />
        </Routes>
      </main>
    </>
  )
}
