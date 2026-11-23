// @vitest-environment jsdom

import { test, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import Vendedor from "../paginas/Vendedor";

const estadoCambiado = vi.fn();

vi.mock("../servicios/Pedidos", () => ({
    estados: ["en preparacion", "despachado", "entregado"],
    listarPedidos: () => Promise.resolve([
        { id: 1001, cliente: "Pedro Diaz", correo: "pedro@correo.cl", fecha: "2026-08-14", total: 129990, entrega: "retiro en tienda", estado: "en preparacion", items: [] },
        { id: 1002, cliente: "Camila Reyes", correo: "camila@correo.cl", fecha: "2026-09-03", total: 379990, entrega: "despacho", estado: "despachado", items: [] }
    ]),
    cambiarEstado: (id: number, estado: string) => {
        estadoCambiado(id, estado);
        return Promise.resolve({ id: id, estado: estado });
    }
}));

afterEach(() => {
    cleanup();
    estadoCambiado.mockClear();
});

test("El vendedor ve los pedidos con su forma de entrega", async () => {
    render(<Vendedor token="token-de-prueba" />);

    await screen.findByText("Pedro Diaz");

    expect(screen.getByText("Camila Reyes")).toBeDefined();
    expect(screen.getByText("retiro en tienda")).toBeDefined();
    expect(screen.getByText("despacho")).toBeDefined();
});

test("El vendedor puede cambiar el estado de un pedido", async () => {
    render(<Vendedor token="token-de-prueba" />);

    await screen.findByText("Pedro Diaz");

    const selectores = screen.getAllByRole("combobox");
    fireEvent.change(selectores[0], { target: { value: "despachado" } });

    expect(estadoCambiado).toHaveBeenCalledWith(1001, "despachado");
});
