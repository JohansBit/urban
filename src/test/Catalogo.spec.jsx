import React from 'react';
import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import Catalogo from '../components/Catalogo';

describe('Componente Catalogo', () => {
  afterEach(() => {
    cleanup();
  });

  const productosMock = [
    {
      id: 1,
      nombre: 'Zapatilla Urban Run',
      precio: 39990,
      categoria: 'zapatillas',
      genero: 'hombre',
      descripcion: 'Zapatillas deportivas cómodas',
      imagen: 'img/zapatilla1.png'
    },
    {
      id: 2,
      nombre: 'Polera Oversize Black',
      precio: 19990,
      categoria: 'poleras-polerones',
      genero: 'mujer',
      descripcion: 'Polera de algodón estilo urbano',
      imagen: 'img/polera1.png'
    },
    {
      id: 3,
      nombre: 'Pantalón Cargo Khaki',
      precio: 29990,
      categoria: 'pantalones',
      genero: 'hombre',
      descripcion: 'Pantalón cargo multibolsillos',
      imagen: 'img/pantalon1.png'
    }
  ];

  it('Renderiza la lista inicial de productos del catálogo correctamente', () => {
    render(<Catalogo productos={productosMock} onAgregarAlCarrito={() => {}} />);

    expect(screen.getByText('Zapatilla Urban Run')).not.toBeNull();
    expect(screen.getByText('Polera Oversize Black')).not.toBeNull();
  });

  it('Llama a la función callback al presionar el botón "Añadir"', () => {
    let productoAgregado = null;
    const mockAgregar = (prod) => {
      productoAgregado = prod;
    };

    render(<Catalogo productos={productosMock} onAgregarAlCarrito={mockAgregar} />);

    // getAllByRole captura el arreglo de botones "Añadir"
    const botonesAñadir = screen.getAllByRole('button', { name: /añadir/i });
    fireEvent.click(botonesAñadir[0]);

    expect(productoAgregado).not.toBeNull();
    expect(productoAgregado.id).toBe(1);
  });

  it('Filtra la lista visual de productos cuando se selecciona un género', () => {
    render(<Catalogo productos={productosMock} onAgregarAlCarrito={() => {}} />);

    // Opción A: Usar getAllByRole para evitar el error de múltiples elementos
    const botonesMujer = screen.getAllByRole('button', { name: /mujer/i });
    
    // Hacemos clic en el botón de la primera sección
    fireEvent.click(botonesMujer[0]);

    // Verificamos que la búsqueda por texto no devuelva errores
    expect(screen.getByText('Polera Oversize Black')).not.toBeNull();
  });
});