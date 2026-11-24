// @vitest-environment jsdom

import { test, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import Stock from "../paginas/Stock";

const productosDePrueba = [
    { id: 1, titulo: "Guitarra Acustica Folk", descripcion: "Yamaha F310", precio: 129990, imagen: "guitarra-acustica.jpg", stock: 11, categoria: "Cuerdas" },
    { id: 2, titulo: "Guitarra Acustica Dreadnought", descripcion: "Fender CD-60S", precio: 189990, imagen: "guitarra-dreadnought.jpg", stock: 0, categoria: "Cuerdas" },
    { id: 3, titulo: "Bajo Electrico", descripcion: "Ibanez GSR200", precio: 379990, imagen: "bajo-electrico.jpg", stock: 2, categoria: "Cuerdas" },
    { id: 5, titulo: "Saxofon Alto", descripcion: "Yamaha YAS-280", precio: 1149990, imagen: "saxofon-alto.jpg", stock: 8, categoria: "Vientos" }
];

const stockActualizado = vi.fn();

vi.mock("../servicios/Productos", () => ({
    listarProductos: () => Promise.resolve(productosDePrueba),
    actualizarStock: (id: number, stock: number) => {
        stockActualizado(id, stock);
        return Promise.resolve({ id: id, stock: stock });
    }
}));

afterEach(() => {
    cleanup();
    stockActualizado.mockClear();
});

async function mostrarStock() {
    render(<Stock token="token-de-prueba" />);
    await screen.findByText("Guitarra Acustica Folk");
}

test("La vista muestra los productos con su stock", async () => {
    await mostrarStock();

    expect(screen.getByText("Guitarra Acustica Folk")).toBeDefined();
    expect(screen.getByText("Saxofon Alto")).toBeDefined();
});

test("Marca los productos con poco stock y sin stock", async () => {
    await mostrarStock();

    expect(screen.getAllByText("Sin stock").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Quedan pocas").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Disponible").length).toBeGreaterThan(0);
});

test("Al cambiar el stock se avisa al microservicio", async () => {
    await mostrarStock();

    const campos = screen.getAllByRole("spinbutton");
    fireEvent.change(campos[0], { target: { value: "7" } });

    expect(stockActualizado).toHaveBeenCalledWith(1, 7);
});

test("No se envia un stock negativo al microservicio", async () => {
    await mostrarStock();

    const campos = screen.getAllByRole("spinbutton");
    fireEvent.change(campos[0], { target: { value: "-5" } });

    expect(stockActualizado).not.toHaveBeenCalled();
});
