import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Nosotros from './components/Nosotros';
import NosotrosDetalle from './components/NosotrosDetalle';
import Blogs from './components/Blogs';
import Contacto from './components/Contacto';
import Catalogo from './components/Catalogo';
import AdminPanel from './components/AdminPanel';
import Auth from './components/Auth';
import Carrito from './components/Carrito';
import { useCarrito } from './hooks/useCarrito';
import productosBase from './data/productos.json';
import './App.css';

export default function App() {
  const navigate = useNavigate();

  const { 
    mostrarCarrito, 
    setMostrarCarrito, 
    agregarProducto, 
    totalUnidades 
  } = useCarrito();

  const [usuario, setUsuario] = useState(() => {
    try {
      const sesion = localStorage.getItem('sesionActiva');
      return sesion ? JSON.parse(sesion) : null;
    } catch {
      return null;
    }
  });

  const [mostrarAuth, setMostrarAuth] = useState(false);

  const [productos, setProductos] = useState(() => {
    try {
      const guardados = localStorage.getItem('urban_productos');
      if (guardados) {
        const parsed = JSON.parse(guardados);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return Array.isArray(productosBase) ? productosBase : [];
  });

  const handleCerrarSesion = () => {
    localStorage.removeItem('sesionActiva');
    setUsuario(null);
    navigate('/');
  };

  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column">
      <Header 
        cantidadCarrito={totalUnidades} 
        onAbrirCarrito={() => setMostrarCarrito(true)}
        onAbrirAuth={() => setMostrarAuth(true)}
        usuarioActivo={usuario}
        onCerrarSesion={handleCerrarSesion}
      />

      <main className="flex-grow-1 pt-3">
        <Routes>
          
          <Route path="/" element={
            <>
              <Hero />
              <Nosotros />
              <div className="container py-4">
                <h2 className="text-center text-warning fw-bold mb-4">COLECCIÓN DESTACADA</h2>
                <Catalogo onAgregarAlCarrito={agregarProducto} productos={productos} />
              </div>
            </>
          } />

         
          <Route path="/productos" element={
            <div className="container py-4">
              <h2 className="text-center text-warning fw-bold mb-4">CATÁLOGO COMPLETO</h2>
              <Catalogo onAgregarAlCarrito={agregarProducto} productos={productos} />
            </div>
          } />

          <Route path="/nosotros" element={<NosotrosDetalle />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          
          
          <Route path="/admin" element={
            <AdminPanel 
              productos={productos}
              onActualizarProductos={setProductos}
              onVolverTienda={() => navigate('/')}
            />
          } />

          <Route path="*" element={<h1 className="container py-5 text-center">Página no encontrada</h1>} />
        </Routes>
      </main>

     
      <Auth
        visible={mostrarAuth} 
        onClose={() => setMostrarAuth(false)} 
        onLoginExitoso={(usr) => setUsuario(usr)} 
      />
    </div>
  );
}