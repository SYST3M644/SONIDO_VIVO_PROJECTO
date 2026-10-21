// @vitest-environment jsdom

import { afterEach, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../App";

afterEach(cleanup);

function entrarComoCliente() {
    vi.spyOn(window, "alert").mockImplementation(() => {});

    render(
        <MemoryRouter initialEntries={["/login"]}>
            <App />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("correo"), {
        target: { value: "cliente@sonidovivo.cl" }
    });

    fireEvent.change(screen.getByPlaceholderText("contraseña"), {
        target: { value: "cliente123" }
    });

    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));
}

test("El carrito pide iniciar sesion cuando no hay usuario", () => {
    render(
        <MemoryRouter initialEntries={["/carrito"]}>
            <App />
        </MemoryRouter>
    );

    expect(screen.getByText("Debes iniciar sesión como cliente para usar el carrito.")).toBeDefined();
});

test("El carrito vacio muestra un mensaje", () => {
    entrarComoCliente();

    fireEvent.click(screen.getByText("Carrito"));

    expect(screen.getByText("El carrito está vacío")).toBeDefined();
});

test("Se puede agregar, sumar, restar y quitar un producto", () => {
    entrarComoCliente();

    fireEvent.click(screen.getByText("Productos"));

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
