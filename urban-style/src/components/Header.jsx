
import React, {useState, useEffect} from "react";
import logoImg from '../img/logo.png'
import Auth from './Auth'

export default function Header({ 
    cantidadCarrito = 0, 
    onAbrirCarrito,
    onAbrirAuth,
    usuarioActivo,
    onCerrarSesion,
    onNavegar
}){
   

    const[animando, setAnimando] = useState(false);

    useEffect(() => {
        const sesion = localStorage.getItem('sesionActiva');
        if(sesion){
            try{
                setUsuarioActivo(JSON.parse(sesion));
            } catch (e){
                console.error('Error al parsear sesionActiva', e);
            }
        }
    }, []);    

    useEffect(() => {
        if(cantidadCarrito === 0) return;
        setAnimando(true);

        const timeout = setTimeout(() => {
            setAnimando(false);
        }, 400);
        return ()=> clearTimeout(timeout);
    }, [cantidadCarrito]);


    const handleCerrarSesion = () => {
        localStorage.removeItem('sesionActiva');
        setUsuarioActivo(null);
        window.location.reload();
    };

    return (
        <header className="sticky-top">
            <nav className="navbar navbar-expand-lg navbar-urban">
                <div className="container-fluid  px-3 px-md-4">
                    <a className="navbar-brand me-3" href="#inicio">
                    <img
                    src={logoImg}
                    alt="UrbanStyle"
                    className="logo-img logo-header"
                    onError={(e) =>{
                        e.target.onerror = null;
                        e.target.src= 'https://placehold.co/120x45/000000/d4af37?text=UrbanStyle';
                    }}
                    />
                    </a>
                    
                    <div className="d-flex alignt-items-center w-100" id="navUrbanMenu">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button
                                        type="button"
                                        onClick={() => onNavegar('tienda')}
                                        className="btn btn-link nav-link text-warning p-0 border-0"
                                        >
                                        <strong>HOME</strong>
                                    </button>
                            </li>
                            <li className="nav-item">
                                <button
                                        type="button"
                                        onClick={() => onNavegar('tienda')}
                                        className="btn btn-link nav-link text-warning p-0 border-0"
                                        >
                                        <strong>NOSOTROS</strong>
                                    </button>
                            </li>
                            <li className="nav-item">
                                <button
                                        type="button"
                                        onClick={() => onNavegar('tienda')}
                                        className="btn btn-link nav-link text-warning p-0 border-0"
                                        >
                                        <strong>PRODUCTOS</strong>
                                    </button>
                            </li>
                            <li className="nav-item">
                                <button
                                        type="button"
                                        onClick={() => onNavegar('tienda')}
                                        className="btn btn-link nav-link text-warning p-0 border-0"
                                        >
                                        <strong>BLOGS</strong>
                                    </button>
                            </li>
                            <li className="nav-item">
                                <button
                                        type="button"
                                        onClick={() => onNavegar('tienda')}
                                        className="btn btn-link nav-link text-warning p-0 border-0"
                                        >
                                        <strong>CONTACTO</strong>
                                    </button>
                            </li>
                            {usuarioActivo &&(usuarioActivo.rol === 'Administrador' || usuarioActivo.rol === 'Vendedor') &&(
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        onClick={() => onNavegar('admin')}
                                        className="btn btn-link nav-link text-warning p-0 border-0"
                                        >
                                        <strong>ADMIN-PANEL</strong>
                                    </button>
                                </li>
                            )}
                        </ul>

                        <ul className="d-flex align-items-center  gap-3 list-unstyled m-0 ms-auto flex-shrink-0">
                             <li className="nav-item" id="nav-usuario">
                                {usuarioActivo ? (
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="fw-bold small text-white">
                                            ¡Hola, {usuarioActivo.nombre}!
                                        </span>
                                        <button 
                                        onClick={onCerrarSesion}
                                        className="btn btn-sm btn-outline-light py-0 px-2 small"
                                        >SALIR</button>
                                    </div>
                                ) : (
                                    <button 
                                        type="button"
                                        onClick={onAbrirAuth}
                                        className="nav-link text-white p-0 bg-transparent border-0"
                                        aria-label="Iniciar Sesión"
                                        title="Iniciar Sesión / Registro">
                                        <i className="bi bi-door-open fs-2"></i>
                                    </button>
                                )}
                             </li>
                             <li className="nav-item">
                                <button
                                    onClick={onAbrirCarrito}
                                    className="cart-btn-link position-relative"
                                    aria-label="Carrito"
                                    title="Carrito de Compras"
                                    >
                                        <i className="bi bi-cart fs-2"></i>
                                        {cantidadCarrito > 0 && (
                                            <span className={`badge-cart ${animando ? 'badge-cart-animate' : ''}`}>
                                            {cantidadCarrito}
                                            </span>
                                        )}
                                    </button>
                             </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}