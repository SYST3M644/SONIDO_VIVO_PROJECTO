export type PedidoItem = {
    productoId: number;
    titulo: string;
    precio: number;
    cantidad: number;
}

export type Pedido = {
    id: number;
    cliente: string;
    correo: string;
    fecha: string;
    total: number;
    entrega: string;
    estado: string;
    items: PedidoItem[];
}

export const estados = ["en preparacion", "despachado", "entregado"];

const API = "http://localhost:6464/api/pedidos";

function autorizacion(token: string) {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
    };
}

export async function listarPedidos(token: string): Promise<Pedido[]> {
    const respuesta = await fetch(API, {
        headers: autorizacion(token),
    });

    if (!respuesta.ok) {
        throw new Error("Error HTTP " + respuesta.status);
    }

    return await respuesta.json();
}

export async function pedidosDeCliente(cliente: string, token: string): Promise<Pedido[]> {
    const respuesta = await fetch(API + "?cliente=" + encodeURIComponent(cliente), {
        headers: autorizacion(token),
    });

    if (!respuesta.ok) {
        throw new Error("Error HTTP " + respuesta.status);
    }

    return await respuesta.json();
}

export async function agregarPedido(cliente: string, correo: string, total: number, entrega: string, items: PedidoItem[]): Promise<Pedido> {
    const respuesta = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cliente: cliente,
            correo: correo,
            total: total,
            entrega: entrega,
            items: items,
        }),
    });

    if (!respuesta.ok) {
        const detalle = await respuesta.json().catch(() => null);

        if (detalle !== null && detalle.message) {
            throw new Error(detalle.message);
        }

        throw new Error("Error HTTP " + respuesta.status);
    }

    return await respuesta.json();
}

export async function cambiarEstado(id: number, estado: string, token: string): Promise<Pedido> {
    const respuesta = await fetch(API + "/" + id + "/estado", {
        method: "PUT",
        headers: autorizacion(token),
        body: JSON.stringify({ estado: estado }),
    });

    if (!respuesta.ok) {
        throw new Error("Error HTTP " + respuesta.status);
    }

    return await respuesta.json();
}

export function listarMeses(pedidos: Pedido[]) {
    const meses: string[] = [];

    for (const pedido of pedidos) {
        const mes = pedido.fecha.slice(0, 7);

        if (!meses.includes(mes)) {
            meses.push(mes);
        }
    }

    return meses;
}

export function pedidosDelMes(pedidos: Pedido[], mes: string) {
    if (mes === "todos") {
        return pedidos;
    }

    return pedidos.filter(pedido => pedido.fecha.slice(0, 7) === mes);
}
