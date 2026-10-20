import { Link } from 'react-router-dom';
import './Blogs.css';
import bannerBlog from '../img/blog1.png';

export default function Blogs() {
  return (
    <>
      <img src={bannerBlog} alt="Blog UrbanStyle" className="blog-banner" />

      <section className="container mt-5 mb-5">
        <div className="row g-4">
          <div className="col-md-6">
            <article className="categoria-card">
              <Link to="/blogs/tallas">
                <h3><strong>Cómo elegir la talla correcta de zapatillas</strong></h3>
                <img
                  src="https://cdn.runrepeat.com/storage/gallery/post/27375/shoe-size-conversion-24432934-main.jpg"
                  alt="Guía para elegir la talla de zapatillas"
                />
                <p><strong>Cómo elegir correctamente tu talla de zapatillas antes de realizar tu compra.</strong></p>
              </Link>
            </article>
          </div>

          <div className="col-md-6">
            <article className="categoria-card">
              <Link to="/blogs/cultura-pop">
                <h3><strong>Cultura pop y lifestyle juvenil</strong></h3>
                <img
                  src="https://img.magnific.com/foto-gratis/grupos-juveniles-antecedentes-inspirados-pop_23-2151494837.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="Cultura pop y lifestyle juvenil"
                />
                <p><strong>Descubre tendencias y estilos que forman parte de la cultura urbana.</strong></p>
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}