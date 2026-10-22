import React, { useState } from 'react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const enviarWhatsApp = (e) => {
    e.preventDefault();
    const { nombre, correo, asunto, mensaje } = formData;
    const numero = "56920974343";

    const texto = `Hola UrbanStyle\n\n` +
                  `Nuevo mensaje desde la página web\n\n` +
                  `Nombre: ${nombre}\n` +
                  `Correo: ${correo}\n` +
                  `Asunto: ${asunto}\n` +
                  `Mensaje: ${mensaje}`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="text-center mb-4">
            <h1 className="fw-bold text-warning text-uppercase tracking-wider">
              CONTÁCTANOS
            </h1>
            <p className="text-muted">
              ¿Tienes dudas o consultas? Escríbenos directamente a nuestro WhatsApp.
            </p>
          </div>

          <div className="card bg-dark text-white border-secondary shadow-lg rounded-4 p-4">
            <form onSubmit={enviarWhatsApp}>
              <div className="mb-3 text-start">
                <label className="form-label text-warning fw-bold small">
                  NOMBRE COMPLETO
                </label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control bg-black text-white border-secondary focus-ring focus-ring-warning"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 text-start">
                <label className="form-label text-warning fw-bold small">
                  CORREO ELECTRÓNICO
                </label>
                <input
                  type="email"
                  name="correo"
                  className="form-control bg-black text-white border-secondary focus-ring focus-ring-warning"
                  placeholder="ejemplo@correo.com"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 text-start">
                <label className="form-label text-warning fw-bold small">
                  ASUNTO
                </label>
                <input
                  type="text"
                  name="asunto"
                  className="form-control bg-black text-white border-secondary focus-ring focus-ring-warning"
                  placeholder="Motivo de tu mensaje"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4 text-start">
                <label className="form-label text-warning fw-bold small">
                  MENSAJE
                </label>
                <textarea
                  name="mensaje"
                  className="form-control bg-black text-white border-secondary focus-ring focus-ring-warning"
                  rows="4"
                  placeholder="¿En qué podemos ayudarte?"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-warning w-100 fw-bold py-2 text-dark shadow-sm hover-opacity"
              >
                <i className="bi bi-whatsapp me-2"></i>
                Enviar a WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}