import React, {useState} from "react";
import productos from '../data/productos.json';
import Producto from './Producto';

export default function Catalogo({ onAgregarAlCarrito}){
    const[filtro, setFiltro] = useState('Todos');

    const productosFiltrados = filtro === 'Todos'
    ? productos
    : productos.filter(p => p.categoria.toLowerCase()=== filtro.toLowerCase());
    return(
        <section className="container py-5" id="catalogo">
            <div className="text-center mb-4">
                <h2 className="text-warning fw-bold">CATÁLOGO</h2>
                <p className="text-secondary">Coleccion urbana de temporada</p>

                <div className="d-flex justifi-content-center gap-2 mt-3 flex-wrap">
                    {['Todos', 'Hombre', 'Mujer', 'Niño'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFiltro(cat)}
                            className={`btn btn-sm ${filtro === cat ? 'btn-warning fw-bold' : 'btn-outline-secondary text-white'}`}
                            >{cat}</button>
                    ))}
                </div>
            </div>

            <div className="row g-4">
                {productosFiltrados.map(prod =>(
                    <div key={prod.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <Producto {...prod} onAgregar={onAgregarAlCarrito}/>
                    </div>
                ))}
            </div>
        </section>
    );
}