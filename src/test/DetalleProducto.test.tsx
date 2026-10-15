// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import DetalleProducto from "../paginas/DetalleProducto";

afterEach(cleanup);

function mostrarDetalle(id: number) {
    render(
        <MemoryRouter initialEntries={[`/productos/${id}`]}>
            <Routes>
                <Route path="/productos/:id" element={<DetalleProducto />} />
            </Routes>
        </MemoryRouter>
    );
}

test("Muestra el producto que corresponde al id de la direccion", () => {
    mostrarDetalle(1);

    expect(screen.getByText("Guitarra Acustica Folk")).toBeDefined();
    expect(screen.getByText("Yamaha F310")).toBeDefined();
});

test("Muestra otro producto distinto segun el id", () => {
    mostrarDetalle(5);

    expect(screen.getByText("Saxofon Alto")).toBeDefined();
});

test("Tiene el boton para volver al catalogo", () => {
    mostrarDetalle(1);

    expect(screen.getByText("Regresar a Productos")).toBeDefined();
});
