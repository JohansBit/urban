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

function validarRut(rutCompleto) {
  if (!rutCompleto) return false;
  const limpio = rutCompleto.replace(/\./g, '').replace(/-/g, '').trim().toUpperCase();
  if (limpio.length < 8) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += multiplo * parseInt(cuerpo.charAt(i), 10);
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvEsperado = 11 - (suma % 11);
  let dvCalculado = '0';
  if (dvEsperado === 11) dvCalculado = '0';
  else if (dvEsperado === 10) dvCalculado = 'K';
  else dvCalculado = dvEsperado.toString();

  return dv === dvCalculado;
}

export default function AuthModal({ visible, onClose, onLoginExitoso }) {
  const [esLogin, setEsLogin] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState('');

  const [run, setRun] = useState('');
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
      if (!validarRut(run)) {
        setError('El RUN ingresado no es válido (Ej: 19876543-K).');
        return;
      }

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

      const existeEmail = usuariosGuardados.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (existeEmail) {
        setError('Este correo electrónico ya se encuentra registrado.');
        return;
      }

      const existeRun = usuariosGuardados.some(
        (u) => u.run && u.run.replace(/\./g, '').replace(/-/g, '').toUpperCase() === run.replace(/\./g, '').replace(/-/g, '').toUpperCase()
      );
      if (existeRun) {
        setError('Este RUN ya se encuentra registrado.');
        return;
      }

      const nuevoUsuario = {
        run,
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
                <div className="col-12 col-md-6">
                  <label className="form-label small text-secondary mb-1">RUN / RUT</label>
                  <input
                    type="text"
                    className="modal-input"
                    value={run}
                    onChange={(e) => setRun(e.target.value)}
                    placeholder="12345678-K"
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
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

              <div className="mb-2">
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
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label small text-secondary mb-0">Contraseña</label>
                <button
                  type="button"
                  className="btn btn-link p-0 text-warning text-decoration-none small"
                  style={{ fontSize: '0.75rem' }}
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                >
                  <i className={`bi ${mostrarPassword ? 'bi-eye-slash' : 'bi-eye'} me-1`}></i>
                  {mostrarPassword ? 'Ocultar' : 'Ver'}
                </button>
              </div>
              <input
                type={mostrarPassword ? 'text' : 'password'}
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
                  type={mostrarPassword ? 'text' : 'password'}
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