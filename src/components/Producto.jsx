import './Producto.css';

export default function Producto({ id, nombre, precio, genero, descripcion, stock, imagen, onAgregar }) {
  return (
    <article className="producto-card">
      <div className="producto-imagen-contenedor">
        <img
          src={imagen}
          alt={nombre}
          className="producto-imagen"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/300x220/1a1a1a/d4af37?text=UrbanStyle';
          }}
        />
      </div>
      <div className="producto-cuerpo">
        {genero && <p className="producto-genero">{genero}</p>}
        <h3 className="producto-nombre">{nombre}</h3>
        {descripcion && <p className="producto-descripcion">{descripcion}</p>}
        {stock !== undefined && <p className="producto-stock">Stock disponible: {stock}</p>}
        <p className="producto-precio">${Number(precio).toLocaleString('es-CL')}</p>
        <button
          type="button"
          className="producto-boton"
          aria-label={stock === 0 ? 'Producto agotado' : 'Agregar al carrito'}
          onClick={() => onAgregar?.({ id, nombre, precio, imagen })}
          disabled={stock === 0}
        >
          {stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
        </button>
      </div>
    </article>
  );
}