import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Carrito from "../components/Carrito";

describe("Componente Carrito", () => {
    afterEach(() => {
        cleanup();
    });

    const items = [{ id: 1, nombre: "Zapatilla", precio: 50000, cantidad: 2 }];

    /* Caso de Prueba 1: Muestra cantidad y total correctos */
    it("Muestra la cantidad y el total (2 x 50.000 = 100.000)", () => {
        render(
            <MemoryRouter>
                <Carrito items={items} />
            </MemoryRouter>
        );

        const cantidad = screen.getByText("2");
        const resumen = screen.getByText("Total:").parentElement;

        expect(cantidad.textContent).toBe("2");
        expect(resumen.textContent).toContain("100.000");
    });

    /* Caso de Prueba 2: Botón + suma una unidad */
    it("Al apretar + pide subir la cantidad de 2 a 3", () => {
        const onActualizar = jasmine.createSpy("onActualizar");

        render(
            <MemoryRouter>
                <Carrito items={items} onActualizarCantidad={onActualizar} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: "+" }));

        expect(onActualizar).toHaveBeenCalledWith(1, 3);
    });

    /* Caso de Prueba 3: Botón - resta una unidad */
    it("Al apretar - pide bajar la cantidad de 2 a 1", () => {
        const onActualizar = jasmine.createSpy("onActualizar");

        render(
            <MemoryRouter>
                <Carrito items={items} onActualizarCantidad={onActualizar} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: "-" }));

        expect(onActualizar).toHaveBeenCalledWith(1, 1);
    });
});