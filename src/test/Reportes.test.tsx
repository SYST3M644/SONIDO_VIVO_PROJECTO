// @vitest-environment jsdom

import { test, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import Reportes from "../paginas/Reportes";

vi.mock("../servicios/Pedidos", async () => {
    const real = await vi.importActual<typeof import("../servicios/Pedidos")>("../servicios/Pedidos");

    return {
        ...real,
        listarPedidos: () => Promise.resolve([
            { id: 1001, cliente: "Pedro Diaz", correo: "pedro@correo.cl", fecha: "2026-08-14", total: 100000, entrega: "retiro en tienda", estado: "entregado", items: [] },
            { id: 1002, cliente: "Camila Reyes", correo: "camila@correo.cl", fecha: "2026-09-03", total: 200000, entrega: "despacho", estado: "en preparacion", items: [] }
        ])
    };
});

afterEach(cleanup);

test("Muestra el total vendido y la cantidad de pedidos", async () => {
    render(<Reportes token="token-de-prueba" />);

    expect(await screen.findByText("$300.000")).toBeDefined();
    expect(screen.getByText("Pedro Diaz")).toBeDefined();
});

test("Al elegir un mes cambia el resumen", async () => {
    render(<Reportes token="token-de-prueba" />);

    await screen.findByText("$300.000");

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "2026-08" } });

    expect(screen.getAllByText("$100.000").length).toBeGreaterThan(0);
    expect(screen.queryByText("Camila Reyes")).toBeNull();
});
