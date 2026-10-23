// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import Stock from "../paginas/Stock";
import { listarExistencias, stockDe, actualizarStock } from "../servicios/Stock";

afterEach(cleanup);

test("Hay stock registrado para los doce productos", () => {
    expect(listarExistencias().length).toBe(12);
});

test("Entrega la cantidad de un producto", () => {
    expect(stockDe(1)).toBe(11);
});

test("Entrega cero cuando el producto no existe", () => {
    expect(stockDe(999)).toBe(0);
});

test("Actualiza la cantidad de un producto", () => {
    actualizarStock(1, 25);

    expect(stockDe(1)).toBe(25);

    actualizarStock(1, 11);
});

test("La vista muestra los productos con su stock", () => {
    render(<Stock />);

    expect(screen.getByText("Guitarra Acustica Folk")).toBeDefined();
    expect(screen.getByText("Saxofon Alto")).toBeDefined();
});

test("Marca los productos con poco stock y sin stock", () => {
    actualizarStock(2, 0);
    actualizarStock(3, 2);

    render(<Stock />);

    expect(screen.getAllByText("Sin stock").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Quedan pocas").length).toBeGreaterThan(0);

    actualizarStock(2, 5);
    actualizarStock(3, 4);
});

test("Se puede cambiar el stock desde la tabla", () => {
    render(<Stock />);

    const campos = screen.getAllByRole("spinbutton");
    fireEvent.change(campos[0], { target: { value: "7" } });

    expect(stockDe(1)).toBe(7);

    actualizarStock(1, 11);
});
