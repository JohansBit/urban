import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import './Header.css'
import logoImg from '../img/logo.png';

export default function Header({ 
    cantidadCarrito = 0, 
    onAbrirCarrito,
    onAbrirAuth,
    usuarioActivo,
    onCerrarSesion
}){
    const [animando, setAnimando] = useState(false);

    useEffect(() => {
        if (cantidadCarrito === 0) return;
        setAnimando(true);

        const timeout = setTimeout(() => {
            setAnimando(false);
        }, 400);
        return () => clearTimeout(timeout);
    }, [cantidadCarrito]);

    return (
        <header className="sticky-top">
            <nav className="navbar navbar-expand-lg navbar-urban">
                <div className="container-fluid px-3 px-md-4">
                    <Link className="navbar-brand me-3" to="/">
                        <img
                            src={logoImg}
                            alt="UrbanStyle"
                            className="logo-img logo-header"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://placehold.co/120x45/000000/d4af37?text=UrbanStyle';
                            }}
                        />
                    </Link>
                    
                    <div className="d-flex align-items-center w-100" id="navUrbanMenu">
                        <ul className="navbar-nav d-flex flex-row gap-3">
                            <li className="nav-item">
                                <NavLink to="/" end className="nav-link text-warning p-0 border-0">
                                    <strong>HOME</strong>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/nosotros" className="nav-link text-warning p-0 border-0">
                                    <strong>NOSOTROS</strong>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/productos" className="nav-link text-warning p-0 border-0">
                                    <strong>PRODUCTOS</strong>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/blogs" className="nav-link text-warning p-0 border-0">
                                    <strong>BLOGS</strong>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contacto" className="nav-link text-warning p-0 border-0">
                                    <strong>CONTACTO</strong>
                                </NavLink>
                            </li>
                            {usuarioActivo && (usuarioActivo.rol === 'Administrador' || usuarioActivo.rol === 'Vendedor') && (
                                <li className="nav-item">
                                    <NavLink to="/admin" className="nav-link text-warning p-0 border-0">
                                        <strong>ADMIN-PANEL</strong>
                                    </NavLink>
                                </li>
                            )}
                        </ul>

                        <ul className="d-flex align-items-center gap-3 list-unstyled m-0 ms-auto flex-shrink-0">
                            <li className="nav-item" id="nav-usuario">
                                {usuarioActivo ? (
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="fw-bold small text-white">
                                            ¡Hola, {usuarioActivo.nombre}!
                                        </span>
                                        <button 
                                            type="button"
                                            onClick={onCerrarSesion}
                                            className="btn btn-sm btn-outline-light py-0 px-2 small"
                                        >
                                            SALIR
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        type="button"
                                        onClick={onAbrirAuth}
                                        className="nav-link text-white p-0 bg-transparent border-0"
                                        aria-label="Iniciar Sesión"
                                        title="Iniciar Sesión / Registro"
                                    >
                                        <i className="bi bi-door-open fs-2"></i>
                                    </button>
                                )}
                            </li>
                            <li className="nav-item">
                                <button
                                    type="button"
                                    onClick={onAbrirCarrito}
                                    className="cart-btn-link position-relative bg-transparent border-0 text-white"
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