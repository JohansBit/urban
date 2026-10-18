import React, { useState } from 'react';
import './Auth.css';


const REGIONES_CHILE = {
  'Metropolitana de Santiago': [
    'Santiago', 'Las Condes', 'Providencia', 'Ñuñoa', 'La Florida', 
    'Maipú', 'Puente Alto', 'San Miguel', 'La Granja', 'Recoleta'
  ],
  'Valparaíso': [
    'Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Concón'
  ],
  'Biobío': [
    'Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Chiguayante', 'Coronel'
  ],
  'Coquimbo': [
    'La Serena', 'Coquimbo', 'Ovalle'
  ],
  'Antofagasta': [
    'Antofagasta', 'Calama', 'Mejillones'
  ],
  'Araucanía': [
    'Temuco', 'Padre Las Casas', 'Villarrica', 'Pucón'
  ]
};

export default function AuthModal({ visible, onClose, onLoginExitoso }) {
  const [esLogin, setEsLogin] = useState(true);

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  
  const [nombre, setNombre] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rol, setRol] = useState('Cliente');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [direccion, setDireccion] = useState('');

  if (!visible) return null;

  
  const handleRegionChange = (e) => {
    const nuevaRegion = e.target.value;
    setRegion(nuevaRegion);
    setComuna(''); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const usuariosGuardados = JSON.parse(localStorage.getItem('urban_usuarios') || '[]');

    if (esLogin) {
      
      const usuario = usuariosGuardados.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      
      if (!usuario && email === 'admin@urban.cl' && password === 'admin123') {
        const adminUser = { nombre: 'Admin', email, rol: 'Administrador' };
        localStorage.setItem('sesionActiva', JSON.stringify(adminUser));
        onLoginExitoso(adminUser);
        onClose();
        return;
      }

      if (!usuario) {
        setError('Correo o contraseña incorrectos.');
        return;
      }

      localStorage.setItem('sesionActiva', JSON.stringify(usuario));
      onLoginExitoso(usuario);
      onClose();
    } else {
     
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }

      if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        return;
      }

      if (!region || !comuna || !direccion.trim()) {
        setError('Por favor completa todos los datos de dirección.');
        return;
      }

      const existe = usuariosGuardados.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (existe) {
        setError('Este correo electrónico ya se encuentra registrado.');
        return;
      }

      const nuevoUsuario = {
        nombre,
        email,
        password,
        rol,
        direccion: {
          region,
          comuna,
          calle: direccion
        }
      };

      usuariosGuardados.push(nuevoUsuario);
      localStorage.setItem('urban_usuarios', JSON.stringify(usuariosGuardados));

      
      localStorage.setItem('sesionActiva', JSON.stringify(nuevoUsuario));
      onLoginExitoso(nuevoUsuario);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-card ${!esLogin ? 'modal-card-registro' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="modal-title">
            {esLogin ? 'Iniciar Sesión' : 'Registro de Usuario'}
          </h4>
          <button
            type="button"
            onClick={onClose}
            className="btn-close btn-close-white"
            aria-label="Cerrar"
          ></button>
        </div>

        {error && <div className="alert alert-danger py-1 px-2 small mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form-scroll">
          {!esLogin && (
            <>
              
              <div className="row g-2 mb-2">
                <div className="col-12 col-md-7">
                  <label className="form-label small text-secondary mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    className="modal-input"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Johans"
                    required
                  />
                </div>
                <div className="col-12 col-md-5">
                  <label className="form-label small text-secondary mb-1">Tipo de Cuenta</label>
                  <select
                    className="modal-input"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>
              </div>

              
              <div className="row g-2 mb-2">
                <div className="col-12 col-md-6">
                  <label className="form-label small text-secondary mb-1">Región</label>
                  <select
                    className="modal-input"
                    value={region}
                    onChange={handleRegionChange}
                    required
                  >
                    <option value="">Selecciona región...</option>
                    {Object.keys(REGIONES_CHILE).map((reg) => (
                      <option key={reg} value={reg}>{reg}</option>
                    ))}
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small text-secondary mb-1">Comuna</label>
                  <select
                    className="modal-input"
                    value={comuna}
                    onChange={(e) => setComuna(e.target.value)}
                    disabled={!region}
                    required
                  >
                    <option value="">{region ? 'Selecciona comuna...' : 'Elige región primero'}</option>
                    {region && REGIONES_CHILE[region].map((com) => (
                      <option key={com} value={com}>{com}</option>
                    ))}
                  </select>
                </div>
              </div>

              
              <div className="mb-2">
                <label className="form-label small text-secondary mb-1">Dirección (Calle, Número, Depto)</label>
                <input
                  type="text"
                  className="modal-input"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Ej: Av. Santa Rosa 1234, Depto 402"
                  required
                />
              </div>
            </>
          )}

          
          <div className="mb-2">
            <label className="form-label small text-secondary mb-1">Correo Electrónico</label>
            <input
              type="email"
              className="modal-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          
          <div className={`row g-2 ${esLogin ? 'mb-3' : 'mb-2'}`}>
            <div className={esLogin ? 'col-12' : 'col-12 col-md-6'}>
              <label className="form-label small text-secondary mb-1">Contraseña</label>
              <input
                type="password"
                className="modal-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {!esLogin && (
              <div className="col-12 col-md-6">
                <label className="form-label small text-secondary mb-1">Confirmar Clave</label>
                <input
                  type="password"
                  className="modal-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            )}
          </div>

          <button type="submit" className="btn-auth-submit">
            {esLogin ? 'Ingresar' : 'Completar Registro'}
          </button>
        </form>

        <div className="text-center small text-secondary">
          {esLogin ? (
            <span>
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => { setEsLogin(false); setError(''); }}
                className="btn-toggle-auth"
              >
                Regístrate aquí
              </button>
            </span>
          ) : (
            <span>
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => { setEsLogin(true); setError(''); }}
                className="btn-toggle-auth"
              >
                Inicia sesión
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}