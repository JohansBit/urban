import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'
import Navbar from "../components/Navbar";


describe("Componente Navbar", () => {
  afterEach(() => {
    cleanup();
  });

  /* Caso de Prueba 1: Menú móvil abre y cierra */
  it("El botón hamburguesa abre y cierra el menú", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const toggleButton = screen.getByLabelText('button', { name: /menú/i });

    // Estado inicial
    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");

    // Abrir menú
    fireEvent.click(toggleButton);
    expect(toggleButton.getAttribute("aria-expanded")).toBe("true");

    // Cerrar menú
    fireEvent.click(toggleButton);
    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
  });
});
