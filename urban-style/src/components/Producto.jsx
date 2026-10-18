export default function Producto({id, nombre, precio, categoria, stock, imagen, onAgregar}){
    return (
        <div className="card h-100 bg-dark text-white border-secondary">
            <img
                src={imagen}
                className="card-img-top"
                alt={nombre}
                style={{ height: '220px', objectFit: 'cover'}}
                onError={(e) =>{
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/300x220/1a1a1a/d4af37?text=UrbanStyle';
                }}
                />
                <div className="card-body d-flex flex-column">
                    <span className="badge bg-warning text-dark align-self-start mb-2">{categoria}</span>
                    <h5 className="card-title fs-6">{nombre}</h5>
                    <p className="card-text text-secondary small mb-1">Stock Disponible: {stock}</p>
                    <p className="card-text fw-bold fs-5 mt-auto mb-3">${precio.toLocaleString('es-CL')}</p>
                    <button onClick={() => onAgregar({id,nombre,precio,imagen})}
                    disabled={stock === 0}
                    className="btn btn-outline-warning w-100 fw-bold">
                        {stock === 0 ? 'Agotado' : 'Añadir al Carrito' }
                    </button>
                </div>
        </div>
    );
}