// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import Vendedor from "../paginas/Vendedor";
import { buscarPedido, cambiarEstado } from "../servicios/Pedidos";

afterEach(cleanup);

test("Muestra la tabla con los pedidos de la tienda", () => {
    render(<Vendedor />);

    expect(screen.getByText("1001")).toBeDefined();
    expect(screen.getByText("Camila Reyes")).toBeDefined();
});

test("Muestra la forma de entrega de cada pedido", () => {
    const { container } = render(<Vendedor />);

    expect(container.textContent).toContain("retiro en tienda");
    expect(container.textContent).toContain("despacho");
});

test("El vendedor puede cambiar el estado de un pedido", () => {
    render(<Vendedor />);

    const selectores = screen.getAllByRole("combobox");
    fireEvent.change(selectores[0], { target: { value: "despachado" } });

    expect(buscarPedido(1001)?.estado).toBe("despachado");

    cambiarEstado(1001, "entregado");
});

test("Los tres estados del caso estan disponibles", () => {
    render(<Vendedor />);

    const selectores = screen.getAllByRole("combobox");

    expect(selectores[0].textContent).toContain("en preparacion");
    expect(selectores[0].textContent).toContain("despachado");
    expect(selectores[0].textContent).toContain("entregado");
});
