export default function Nosotros() {
  return (
    <section 
      className="container my-4 text-center text-white p-5"
      style={{
        backgroundImage: "url('/fondo-nosotros.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "10px"
      }}
    >
      <div className="card bg-transparent border-0">
        <p><strong>UrbanStyle es tu tienda de moda urbana, ropa y calzado juvenil...</strong></p>
        <p><strong>Trabajamos con proveedores y marcas...</strong></p>
        <p><strong>Queremos que encuentres modelos exclusivos...</strong></p>
        <p>🔥 Nuevas tendencias, grandes marcas y estilos que van contigo.</p>
        <p><strong>UrbanStyle — viste diferente, marca tu estilo.</strong></p>
      </div>
    </section>
  )
}
