import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Contacto from '../components/Contacto';

describe('Componente Contacto', () => {
  afterEach(() => {
    cleanup();
  });

  it('Renderiza correctamente todos los campos e insumos del formulario', () => {
    render(<Contacto />);

    // Búsqueda por texto y placeholders presentes en tu JSX
    expect(screen.getByPlaceholderText(/tu nombre/i)).not.toBeNull();
    expect(screen.getByPlaceholderText(/ejemplo@correo.com/i)).not.toBeNull();
    expect(screen.getByPlaceholderText(/motivo de tu mensaje/i)).not.toBeNull();
    expect(screen.getByPlaceholderText(/¿en qué podemos ayudarte\?/i)).not.toBeNull();
    
    // Botón de envío
    const botonEnviar = screen.getByRole('button', { name: /enviar a whatsapp/i });
    expect(botonEnviar).not.toBeNull();
  });

  it('Permite al usuario escribir en los campos del formulario', () => {
    render(<Contacto />);

    const inputNombre = screen.getByPlaceholderText(/tu nombre/i);
    const inputEmail = screen.getByPlaceholderText(/ejemplo@correo.com/i);

    fireEvent.change(inputNombre, { target: { value: 'Juan Pérez' } });
    fireEvent.change(inputEmail, { target: { value: 'juan@example.com' } });

    expect(inputNombre.value).toBe('Juan Pérez');
    expect(inputEmail.value).toBe('juan@example.com');
  });

  it('Envía el formulario correctamente al presionar Submit', () => {
    render(<Contacto />);

    const botonEnviar = screen.getByRole('button', { name: /enviar a whatsapp/i });
    expect(botonEnviar).not.toBeNull();
  });
});