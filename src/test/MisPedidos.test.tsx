// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import MisPedidos from "../paginas/MisPedidos";
import { cambiarEstado } from "../servicios/Pedidos";

afterEach(cleanup);

test("El cliente ve solo sus pedidos", () => {
    render(<MisPedidos nombreCliente="Pedro Diaz" />);

    expect(screen.getByText("1001")).toBeDefined();
    expect(screen.getByText("1004")).toBeDefined();
    expect(screen.getByText("1008")).toBeDefined();
    expect(screen.queryByText("1002")).toBeNull();
});

test("Muestra el estado de cada pedido", () => {
    render(<MisPedidos nombreCliente="Pedro Diaz" />);

    expect(screen.getByText("Entregado")).toBeDefined();
    expect(screen.getByText("Despachado")).toBeDefined();
    expect(screen.getByText("En preparación")).toBeDefined();
});

test("Si el vendedor cambia el estado, el cliente lo ve", () => {
    cambiarEstado(1008, "despachado");

    render(<MisPedidos nombreCliente="Pedro Diaz" />);

    expect(screen.getAllByText("Despachado").length).toBe(2);
    expect(screen.queryByText("En preparación")).toBeNull();

    cambiarEstado(1008, "en preparacion");
});

test("Un cliente sin compras ve un mensaje", () => {
    render(<MisPedidos nombreCliente="Cliente Sin Compras" />);

    expect(screen.getByText("Todavía no tienes pedidos")).toBeDefined();
});