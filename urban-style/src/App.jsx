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


