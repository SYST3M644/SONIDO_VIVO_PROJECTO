import { test, expect, vi, afterEach } from "vitest";
import { agregarPedido, listarMeses, pedidosDelMes } from "../servicios/Pedidos";
import type { Pedido } from "../servicios/Pedidos";

afterEach(() => {
    vi.restoreAllMocks();
});

const pedidosDePrueba: Pedido[] = [
    { id: 1001, cliente: "Pedro Diaz", correo: "pedro@correo.cl", fecha: "2026-08-14", total: 129990, entrega: "retiro en tienda", estado: "entregado", items: [] },
    { id: 1002, cliente: "Camila Reyes", correo: "camila@correo.cl", fecha: "2026-09-03", total: 379990, entrega: "despacho", estado: "en preparacion", items: [] }
];

test("Crea el pedido en el microservicio con la forma de pago", async () => {
    const peticion = vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => pedidosDePrueba[0]
    } as Response);

    const pedido = await agregarPedido("Pedro Diaz", "pedro@correo.cl", 129990, "retiro en tienda", [], "Tarjeta terminada en 1111");

    expect(peticion).toHaveBeenCalledWith(
        "http://localhost:6464/api/pedidos",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cliente: "Pedro Diaz",
                correo: "pedro@correo.cl",
                total: 129990,
                entrega: "retiro en tienda",
                pago: "Tarjeta terminada en 1111",
                direccion: "",
                items: []
            })
        }
    );
    expect(pedido.id).toBe(1001);
});

test("Agrupa los pedidos por mes", () => {
    expect(listarMeses(pedidosDePrueba)).toEqual(["2026-08", "2026-09"]);
    expect(pedidosDelMes(pedidosDePrueba, "2026-08").length).toBe(1);
    expect(pedidosDelMes(pedidosDePrueba, "todos").length).toBe(2);
});
