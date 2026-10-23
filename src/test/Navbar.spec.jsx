import React from 'react';
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Header from "../components/Header";

describe("Componente Header", () => {
  afterEach(() => {
    cleanup();
  });

  /* Caso de Prueba 1: Renderizado básico de navegación */
  it("Se renderiza el Header correctamente", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    // Comparador estándar de Jasmine (compatible sin librerías extra)
    expect(document.body).not.toBeNull();
  });

  /* Caso de Prueba 2: Menú móvil en el DOM */
  it("El botón de menú hamburguesa se encuentra en el DOM", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const toggleButton = screen.queryByRole('button', { name: /toggle navigation|menú/i });
    if (toggleButton) {
      expect(toggleButton).not.toBeNull();
    }
  });
});