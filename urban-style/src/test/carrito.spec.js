import { cleanup } from "@testing-library/react";
import { guardarCarrito, cargarCarrito } from "../utils/carrito";

describe("Persistencia del carrito", () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  /* Caso de Prueba 1: Guardar y recuperar carrito */
  it("Guarda y recupera el carrito desde localStorage", () => {
    const carrito = [{ id: 1, nombre: "Zapatilla", cantidad: 2 }];
    guardarCarrito(carrito);

    const recuperado = cargarCarrito();
    expect(recuperado).toEqual(carrito);
  });

  /* Caso de Prueba 2: Datos dañados devuelven carrito vacío */
  it("Si los datos en localStorage están dañados, devuelve carrito vacío", () => {
    localStorage.setItem("carrito", "{dato:malformado}");
    const recuperado = cargarCarrito();
    expect(recuperado).toEqual([]);
  });
});
