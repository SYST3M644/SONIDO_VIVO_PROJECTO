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

test("Sin sesion se puede ver el carrito", () => {
    render(
        <MemoryRouter initialEntries={["/carrito"]}>
            <App />
        </MemoryRouter>
    );

    expect(screen.getByText("El carrito está vacío")).toBeDefined();
});

test("Al pagar sin sesion pide iniciar sesion", () => {
    render(
        <MemoryRouter initialEntries={["/productos"]}>
            <App />
        </MemoryRouter>
    );

    fireEvent.click(screen.getAllByText("Agregar al carrito")[0]);
    fireEvent.click(screen.getByText("Carrito"));
    fireEvent.click(screen.getByText("Pagar"));

    expect(screen.getByText("Debes iniciar sesión para pagar")).toBeDefined();
    expect(screen.getByText("Formulario de Login")).toBeDefined();
});

test("Al pagar con sesion muestra el total", () => {
    entrarComoCliente();

    fireEvent.click(screen.getByText("Productos"));
    fireEvent.click(screen.getAllByText("Agregar al carrito")[0]);
    fireEvent.click(screen.getByText("Carrito"));
    fireEvent.click(screen.getByText("Pagar"));

    expect(screen.getByText("¡Gracias por tu compra! Total: $129.990")).toBeDefined();
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