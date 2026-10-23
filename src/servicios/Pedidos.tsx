export type Pedido = {
    id: number;
    cliente: string;
    fecha: string;
    total: number;
    entrega: string;
    estado: string;
}

export const estados = ["en preparacion", "despachado", "entregado"];

let pedidos: Pedido[] = [
    {
        id: 1001,
        cliente: "Pedro Diaz",
        fecha: "2026-08-14",
        total: 129990,
        entrega: "retiro en tienda",
        estado: "entregado"
    },
    {
        id: 1002,
        cliente: "Marcela Fuentes",
        fecha: "2026-08-27",
        total: 379990,
        entrega: "despacho",
        estado: "entregado"
    },
    {
        id: 1003,
        cliente: "Jorge Carrasco",
        fecha: "2026-09-03",
        total: 1149990,
        entrega: "retiro en tienda",
        estado: "entregado"
    },
    {
        id: 1004,
        cliente: "Pedro Diaz",
        fecha: "2026-09-19",
        total: 69990,
        entrega: "despacho",
        estado: "despachado"
    },
    {
        id: 1005,
        cliente: "Camila Reyes",
        fecha: "2026-09-30",
        total: 649990,
        entrega: "despacho",
        estado: "despachado"
    },
    {
        id: 1006,
        cliente: "Ignacio Soto",
        fecha: "2026-10-05",
        total: 54990,
        entrega: "retiro en tienda",
        estado: "en preparacion"
    },
    {
        id: 1007,
        cliente: "Marcela Fuentes",
        fecha: "2026-10-12",
        total: 279990,
        entrega: "despacho",
        estado: "en preparacion"
    },
    {
        id: 1008,
        cliente: "Pedro Diaz",
        fecha: "2026-10-20",
        total: 189990,
        entrega: "retiro en tienda",
        estado: "en preparacion"
    }
];

export function listarPedidos() {
    return pedidos;
}

export function buscarPedido(id: number) {
    return pedidos.find(pedido => pedido.id === id);
}

export function cambiarEstado(id: number, estado: string) {
    pedidos = pedidos.map(pedido => {
        if (pedido.id === id) {
            return { ...pedido, estado: estado };
        }
        return pedido;
    });
}

export function listarMeses() {
    const meses: string[] = [];

    for (const pedido of pedidos) {
        const mes = pedido.fecha.slice(0, 7);

        if (!meses.includes(mes)) {
            meses.push(mes);
        }
    }

    return meses;
}

export function pedidosDelMes(mes: string) {
    if (mes === "todos") {
        return pedidos;
    }

    return pedidos.filter(pedido => pedido.fecha.slice(0, 7) === mes);
}
