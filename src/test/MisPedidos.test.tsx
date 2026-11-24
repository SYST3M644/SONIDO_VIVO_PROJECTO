// @vitest-environment jsdom

import { test, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import MisPedidos from "../paginas/MisPedidos";

vi.mock("../servicios/Pedidos", () => ({
    estados: ["en preparacion", "despachado", "entregado"],
    pedidosDeCliente: (cliente: string) => {
        if (cliente !== "Pedro Diaz") {
            return Promise.resolve([]);
        }

        return Promise.resolve([
            { id: 1001, cliente: "Pedro Diaz", correo: "pedro@correo.cl", fecha: "2026-08-14", total: 129990, entrega: "retiro en tienda", estado: "entregado", items: [] },
            { id: 1002, cliente: "Pedro Diaz", correo: "pedro@correo.cl", fecha: "2026-11-20", total: 259980, entrega: "despacho", estado: "despachado", pago: "Tarjeta terminada en 1111",
              items: [{ productoId: 1, titulo: "Guitarra Acustica Folk", precio: 129990, cantidad: 2 }] }
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

test("Muestra el seguimiento de cada pedido", async () => {
    render(<MisPedidos nombreCliente="Pedro Diaz" token="token-de-prueba" />);

    await screen.findByText(/1002/);

    // El pedido 1001 ya fue entregado: sus 3 etapas aparecen marcadas
    expect(screen.getAllByText("✓ Entregado").length).toBe(1);
    // El 1002 va despachado: preparacion y despacho marcados, entregado no
    expect(screen.getAllByText("✓ Despachado").length).toBe(2);
    expect(screen.getAllByText("Entregado").length).toBe(1);
});

test("Al ver el detalle se muestran los productos y el pago", async () => {
    render(<MisPedidos nombreCliente="Pedro Diaz" token="token-de-prueba" />);

    await screen.findByText(/1002/);

    fireEvent.click(screen.getAllByRole("button", { name: "Ver detalle" })[1]);

    expect(screen.getByText("2 x Guitarra Acustica Folk")).toBeDefined();
    expect(screen.getByText("Pago: Tarjeta terminada en 1111")).toBeDefined();
});
