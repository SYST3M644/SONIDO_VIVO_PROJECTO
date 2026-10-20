// @vitest-environment jsdom

import { afterEach, expect, test } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../App";

afterEach(cleanup);

test("El carrito vacio muestra un mensaje", () => {
    render(
        <MemoryRouter initialEntries={["/carrito"]}>
            <App />
        </MemoryRouter>
    );

    expect(screen.getByText("El carrito está vacío")).toBeDefined();
});

test("Se puede agregar, sumar, restar y quitar un producto", () => {
    render(
        <MemoryRouter initialEntries={["/productos"]}>
            <App />
        </MemoryRouter>
    );

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
