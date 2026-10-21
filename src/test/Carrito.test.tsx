// @vitest-environment jsdom

import { afterEach, expect, test } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../App";
import { SesionContext } from "../contexto/SesionContext";

afterEach(cleanup);

const sesionCliente = {
    usuario: {
        correo: "cliente@sonidovivo.cl",
        nombre: "Pedro Diaz",
        rol: "cliente",
        token: "token-de-prueba"
    },
    guardarUsuario: () => {},
    cerrarSesion: () => {}
};

function mostrarApp(ruta: string) {
    render(
        <MemoryRouter initialEntries={[ruta]}>
            <SesionContext.Provider value={sesionCliente}>
                <App />
            </SesionContext.Provider>
        </MemoryRouter>
    );
}

test("El carrito vacio muestra un mensaje", () => {
    mostrarApp("/carrito");

    expect(screen.getByText("El carrito está vacío")).toBeDefined();
});

test("Se puede agregar, sumar, restar y quitar un producto", () => {
    mostrarApp("/productos");

    const botonesAgregar = screen.getAllByText("Agregar al carrito");
    fireEvent.click(botonesAgregar[0]);
    fireEvent.click(botonesAgregar[0]);

    fireEvent.click(screen.getByText("Carrito"));

    expect(screen.getByText("Guitarra Acustica Folk")).toBeDefined();
    expect(screen.getByText("Total: $259.980")).toBeDefined();

    fireEvent.click(screen.getByText("-"));
    expect(screen.getByText("Total: $129.990")).toBeDefined();

    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText("Total: $259.980")).toBeDefined();

    fireEvent.click(screen.getByText("Quitar"));
    expect(screen.getByText("El carrito está vacío")).toBeDefined();
});
