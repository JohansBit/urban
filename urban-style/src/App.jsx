import React, { useState } from 'react';
import Header from './components/Header';
import Catalogo from './components/Catalogo';
import Auth from './components/Auth';
import { useCarrito } from './hooks/useCarrito';
import AdminPanel from './components/AdminPanel';
import './App.css';

export default function App() {
  const { 
    mostrarCarrito, 
    setMostrarCarrito, 
    agregarProducto, 
    totalUnidades 
  } = useCarrito();

  const [usuario, setUsuario] = useState(() => {
    const sesion = localStorage.getItem('sesionActiva');
    return sesion ? JSON.parse(sesion) : null;
  });
  const [mostrarAuth, setMostrarAuth] = useState(false);
  const [vistaActual, setVistaActual] = useState('tienda');

  const handleCerrarSesion = () => {
    localStorage.removeItem('sesionActiva');
    setUsuario(null);
    setVistaActual('tienda')
  };

  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column">
      <Header 
        cantidadCarrito={totalUnidades} 
        onAbrirCarrito={() => setMostrarCarrito(true)}
        onAbrirAuth={() => setMostrarAuth(true)}
        usuarioActivo={usuario}
        onCerrarSesion={handleCerrarSesion}
        onNavegar={setVistaActual}
      />

      <main className="flex-grow-1">
        {vistaActual === 'admin' ? (
          <AdminPanel 
          productos ={productos}
          onActualizarProductos={setProductos}
          onVolverTienda={() => setVistaActual('tienda')}/>
        ): (
        <Catalogo onAgregarAlCarrito={agregarProducto} />
        )}
      </main>

      <Auth
        visible={mostrarAuth} 
        onClose={() => setMostrarAuth(false)} 
        onLoginExitoso={(usr) => setUsuario(usr)} 
      />
    </div>
  );
}


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
