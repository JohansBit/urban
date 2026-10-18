import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Navbar from "../components/Navbar";

describe("Componente Navbar", () => {
  afterEach(() => {
    cleanup();
  });

  /* Caso de Prueba 1: Menú móvil abre y cierra */
  it("El botón hamburguesa abre y cierra el menú", () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText("Toggle navigation");

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
