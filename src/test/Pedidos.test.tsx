import { test, expect } from "vitest";
import {
    listarPedidos,
    buscarPedido,
    cambiarEstado,
    listarMeses,
    pedidosDelMes
} from "../servicios/Pedidos";

test("Parte con los pedidos de la tienda", () => {
    expect(listarPedidos().length).toBe(8);
});

test("Cambia el estado de un pedido", () => {
    cambiarEstado(1006, "despachado");

    expect(buscarPedido(1006)?.estado).toBe("despachado");

    cambiarEstado(1006, "en preparacion");

    expect(buscarPedido(1006)?.estado).toBe("en preparacion");
});

test("Lista los meses que tienen pedidos", () => {
    const meses = listarMeses();

    expect(meses).toContain("2026-08");
    expect(meses).toContain("2026-09");
    expect(meses).toContain("2026-10");
});

test("Filtra los pedidos de un mes", () => {
    expect(pedidosDelMes("2026-08").length).toBe(2);
    expect(pedidosDelMes("2026-09").length).toBe(3);
    expect(pedidosDelMes("2026-10").length).toBe(3);
});

test("Con el periodo todos devuelve el total de pedidos", () => {
    expect(pedidosDelMes("todos").length).toBe(8);
});
