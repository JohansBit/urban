import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import AuthModal from '../components/Auth';

describe('Componente AuthModal', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('Renderiza los campos iniciales de inicio de sesión correctamente', () => {
    render(<AuthModal visible={true} onClose={() => {}} onLoginExitoso={() => {}} />);

    expect(screen.getByPlaceholderText('correo@ejemplo.com')).not.toBeNull();
    expect(screen.getByPlaceholderText('••••••••')).not.toBeNull();
    expect(screen.getByRole('button', { name: /ingresar/i })).not.toBeNull();
  });

  it('No renderiza contenido en el DOM cuando visible es false', () => {
    const { container } = render(<AuthModal visible={false} onClose={() => {}} onLoginExitoso={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('Alterna la visibilidad de la contraseña al presionar el botón del ojo', () => {
    render(<AuthModal visible={true} onClose={() => {}} onLoginExitoso={() => {}} />);

    const inputPassword = screen.getByPlaceholderText('••••••••');
    const botonToggle = screen.getByRole('button', { name: /ver/i });

    expect(inputPassword.getAttribute('type')).toBe('password');
    fireEvent.click(botonToggle);
    expect(inputPassword.getAttribute('type')).toBe('text');
    fireEvent.click(botonToggle);
    expect(inputPassword.getAttribute('type')).toBe('password');
  });

  it('Muestra error cuando las credenciales no existen en el sistema', () => {
    const { container } = render(<AuthModal visible={true} onClose={() => {}} onLoginExitoso={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText('correo@ejemplo.com'), { target: { value: 'nadie@urban.cl' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'erronea123' } });

    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(screen.getByText('Correo o contraseña incorrectos.')).not.toBeNull();
  });

  it('Inicia sesión exitosamente al ingresar las credenciales de Administrador', () => {
    let sesionIniciada = null;
    let modalCerrado = false;

    const { container } = render(
      <AuthModal 
        visible={true} 
        onClose={() => { modalCerrado = true; }} 
        onLoginExitoso={(usuario) => { sesionIniciada = usuario; }} 
      />
    );

    fireEvent.change(screen.getByPlaceholderText('correo@ejemplo.com'), { target: { value: 'admin@urban.cl' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'admin123' } });

    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(sesionIniciada).not.toBeNull();
    expect(sesionIniciada.rol).toBe('Administrador');
    expect(modalCerrado).toBe(true);

    const sesionStorage = JSON.parse(localStorage.getItem('sesionActiva'));
    expect(sesionStorage).not.toBeNull();
    expect(sesionStorage.email).toBe('admin@urban.cl');
  });

  it('Inicia sesión con un usuario regular registrado previamente en localStorage', () => {
    const usuariosMock = [
      { email: 'cliente@urban.cl', password: 'passwordSegura', rol: 'Cliente', nombre: 'Test' }
    ];
    localStorage.setItem('urban_usuarios', JSON.stringify(usuariosMock));

    let sesionIniciada = null;
    const { container } = render(
      <AuthModal 
        visible={true} 
        onClose={() => {}} 
        onLoginExitoso={(usuario) => { sesionIniciada = usuario; }} 
      />
    );

    fireEvent.change(screen.getByPlaceholderText('correo@ejemplo.com'), { target: { value: 'cliente@urban.cl' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'passwordSegura' } });

    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(sesionIniciada).not.toBeNull();
    expect(sesionIniciada.email).toBe('cliente@urban.cl');
  });

  it('Cambia entre la vista de Login y Registro limpiando mensajes de error', () => {
    render(<AuthModal visible={true} onClose={() => {}} onLoginExitoso={() => {}} />);

    const botonIrRegistro = screen.getByRole('button', { name: /regístrate aquí/i });
    fireEvent.click(botonIrRegistro);

    expect(screen.getByText('Registro de Usuario')).not.toBeNull();
    expect(screen.getByPlaceholderText('12345678-K')).not.toBeNull();

    const botonIrLogin = screen.getByRole('button', { name: /inicia sesión/i });
    fireEvent.click(botonIrLogin);

    expect(screen.getByText('Iniciar Sesión')).not.toBeNull();
  });

  it('Valida el algoritmo Módulo 11 y rechaza un RUN inválido en registro', () => {
    const { container } = render(<AuthModal visible={true} onClose={() => {}} onLoginExitoso={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /regístrate aquí/i }));

    // RUN inválido (dígito verificador incorrecto)
    const inputRun = screen.getByPlaceholderText('12345678-K');
    fireEvent.change(inputRun, { target: { value: '11111111-1' } });

    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(screen.getByText('El RUN ingresado no es válido (Ej: 19876543-K).')).not.toBeNull();
  });

  it('Valida que las contraseñas coincidan al registrarse', () => {
    const { container } = render(<AuthModal visible={true} onClose={() => {}} onLoginExitoso={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /regístrate aquí/i }));

    // RUN 19876543-K pasa la validación de módulo 11
    fireEvent.change(screen.getByPlaceholderText('12345678-K'), { target: { value: '19876543-K' } });

    const passInputs = container.querySelectorAll('input[type="password"]');
    fireEvent.change(passInputs[0], { target: { value: 'claveValida123' } });
    fireEvent.change(passInputs[1], { target: { value: 'claveDistinta456' } });

    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(screen.getByText('Las contraseñas no coinciden.')).not.toBeNull();
  });

  it('Valida que la contraseña tenga un mínimo de 6 caracteres', () => {
    const { container } = render(<AuthModal visible={true} onClose={() => {}} onLoginExitoso={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /regístrate aquí/i }));

    fireEvent.change(screen.getByPlaceholderText('12345678-K'), { target: { value: '19876543-K' } });

    const passInputs = container.querySelectorAll('input[type="password"]');
    fireEvent.change(passInputs[0], { target: { value: '123' } });
    fireEvent.change(passInputs[1], { target: { value: '123' } });

    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(screen.getByText('La contraseña debe tener al menos 6 caracteres.')).not.toBeNull();
  });

  it('Valida que se completen todos los campos de dirección', () => {
    const { container } = render(<AuthModal visible={true} onClose={() => {}} onLoginExitoso={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /regístrate aquí/i }));

    fireEvent.change(screen.getByPlaceholderText('12345678-K'), { target: { value: '19876543-K' } });

    const passInputs = container.querySelectorAll('input[type="password"]');
    fireEvent.change(passInputs[0], { target: { value: 'secreta123' } });
    fireEvent.change(passInputs[1], { target: { value: 'secreta123' } });

    // No se seleccionó región ni comuna
    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(screen.getByText('Por favor completa todos los datos de dirección.')).not.toBeNull();
  });

  it('Llama a la función onClose al hacer clic en el botón de cerrar', () => {
    let cerrado = false;
    render(<AuthModal visible={true} onClose={() => { cerrado = true; }} onLoginExitoso={() => {}} />);

    const botonCerrar = screen.getByRole('button', { name: /cerrar/i });
    fireEvent.click(botonCerrar);

    expect(cerrado).toBe(true);
  });
});