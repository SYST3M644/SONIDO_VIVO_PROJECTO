// @vitest-environment jsdom

import { test, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import MisPedidos from "../paginas/MisPedidos";

vi.mock("../servicios/Pedidos", () => ({
    estados: ["en preparacion", "despachado", "entregado"],
    pedidosDeCliente: (cliente: string) => {
        if (cliente !== "Pedro Diaz") {
            return Promise.resolve([]);
        }

        return Promise.resolve([
            { id: 1001, cliente: "Pedro Diaz", correo: "pedro@correo.cl", fecha: "2026-08-14", total: 129990, entrega: "retiro en tienda", estado: "entregado", items: [] }
        ]);
    }
}));

afterEach(cleanup);

test("El cliente ve solo sus propios pedidos", async () => {
    render(<MisPedidos nombreCliente="Pedro Diaz" token="token-de-prueba" />);

    expect(await screen.findByText(/1001/)).toBeDefined();
});

test("Avisa cuando el cliente no tiene compras", async () => {
    render(<MisPedidos nombreCliente="Cliente Nuevo" token="token-de-prueba" />);

    expect(await screen.findByText(/Mis Pedidos/)).toBeDefined();
    expect(screen.queryByText(/1001/)).toBeNull();
});
