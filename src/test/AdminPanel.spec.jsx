import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import AdminPanel from '../components/AdminPanel';

describe('Componente AdminPanel', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  const productosMock = [
    {
      id: 1,
      sku: 'URB-1',
      nombre: 'Zapatilla Urban Classic',
      precio: 45000,
      stock: 10,
      categoria: 'Zapatillas'
    }
  ];

  beforeEach(() => {
    localStorage.setItem('urban_productos', JSON.stringify(productosMock));
  });

  it('Renderiza la tabla de productos y el título del panel correctamente', () => {
    render(<AdminPanel />);

    expect(screen.getByText('PANEL DE ADMINISTRACIÓN')).not.toBeNull();
    expect(screen.getByText('Zapatilla Urban Classic')).not.toBeNull();
    expect(screen.getByText('URB-1')).not.toBeNull();
  });

  it('Permite alternar activamente entre la vista de Productos y Usuarios', () => {
    render(<AdminPanel />);

    const tabUsuarios = screen.getByRole('button', { name: /usuarios/i });
    fireEvent.click(tabUsuarios);
    expect(tabUsuarios.className).toContain('active');

    const tabProductos = screen.getByRole('button', { name: /productos/i });
    fireEvent.click(tabProductos);
    expect(tabProductos.className).toContain('active');
  });

  it('Modifica e incrementa el stock del producto en la tabla con el control rápido', () => {
    render(<AdminPanel />);

    const botonSumar = screen.getByRole('button', { name: '+' });
    fireEvent.click(botonSumar);

    expect(screen.getByText('11')).not.toBeNull();
  });

  it('Permite agregar un nuevo producto llenando los campos numéricos requeridos', () => {
    const { container } = render(<AdminPanel />);

    fireEvent.change(screen.getByPlaceholderText(/sku/i), { target: { value: 'URB-200' } });
    fireEvent.change(screen.getByPlaceholderText(/nombre de prenda/i), { target: { value: 'Casaca Cuero Vintage' } });
    fireEvent.change(screen.getByPlaceholderText('Precio ($)'), { target: { value: '79990' } });
    fireEvent.change(screen.getByPlaceholderText('Stock'), { target: { value: '5' } });

    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(screen.getByText('Casaca Cuero Vintage')).not.toBeNull();
  });

  it('Informe de fallo: Valida que el campo precio no acepte números negativos', () => {
    render(<AdminPanel />);

    const inputPrecio = screen.getByPlaceholderText('Precio ($)');
    
    // Simula el intento de ingreso de un valor negativo
    fireEvent.change(inputPrecio, { target: { value: '-15000' } });

    // El filtro de sanitización debe evitar números negativos o el valor numérico debe evaluarse
    const valorActual = Number(inputPrecio.value);
    
    // Si tu componente sanitiza el "-" con replace(/\D/g, ''), el valor será 15000 (>= 0).
    // Si llega a ser menor a 0, fallará documentando el reporte del error.
    expect(valorActual >= 0).toBe(true);
  });
});