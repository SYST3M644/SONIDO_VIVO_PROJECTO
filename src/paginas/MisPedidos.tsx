import { useEffect, useState } from "react";
import { pedidosDeCliente, estados } from "../servicios/Pedidos";
import type { Pedido } from "../servicios/Pedidos";

type MisPedidosProps = {
    nombreCliente: string;
    token: string;
};

const nombresEstado = ["En preparación", "Despachado", "Entregado"];

function MisPedidos({ nombreCliente, token }: MisPedidosProps) {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [cargando, setCargando] = useState(true);
    const [abierto, setAbierto] = useState<number | null>(null);

    useEffect(() => {
        pedidosDeCliente(nombreCliente, token)
            .then((datos) => setPedidos(datos))
            .catch(() => setPedidos([]))
            .finally(() => setCargando(false));
    }, [nombreCliente, token]);

    const verDetalle = (id: number) => {
        if (abierto === id) {
            setAbierto(null);
        } else {
            setAbierto(id);
        }
    };

    if (cargando) {
        return (
            <div className="container mt-4">
                <h1 className="titulo-seccion">Mis Pedidos</h1>
                <p>Cargando tus pedidos...</p>
            </div>
        );
    }

    if (pedidos.length === 0) {
        return (
            <div className="container mt-4">
                <h1 className="titulo-seccion">Mis Pedidos</h1>

                <p>Todavía no tienes pedidos</p>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="titulo-seccion">Mis Pedidos</h1>

            <p className="text-body-secondary">
                Aquí puedes ver tus compras y en qué estado va cada pedido.
            </p>

            <div className="row justify-content-center">
                <div className="col-12 col-lg-9">
                    {pedidos.map((pedido) => {
                        // Posición del estado actual: 0, 1 o 2
                        const avance = estados.indexOf(pedido.estado);

                        return (
                            <div key={pedido.id} className="card mb-3 p-3 text-start">
                                <div className="d-flex justify-content-between flex-wrap gap-2">
                                    <div>
                                        <h2 className="h5 mb-1">Pedido N° {pedido.id}</h2>
                                        <p className="text-body-secondary mb-0">
                                            {pedido.fecha} · {pedido.entrega}
                                        </p>
                                    </div>

                                    <p className="precio-producto mb-0">
                                        ${pedido.total.toLocaleString("es-CL")}
                                    </p>
                                </div>

                                {/* Seguimiento: se marcan las etapas que ya pasaron */}
                                <div className="d-flex gap-2 my-3 flex-wrap">
                                    {nombresEstado.map((nombre, posicion) => (
                                        <span
                                            key={nombre}
                                            className={posicion <= avance ? "badge text-bg-success" : "badge text-bg-light"}
                                        >
                                            {posicion <= avance ? "✓ " : ""}{nombre}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm align-self-start"
                                    onClick={() => verDetalle(pedido.id)}
                                >
                                    {abierto === pedido.id ? "Ocultar detalle" : "Ver detalle"}
                                </button>

                                {abierto === pedido.id && (
                                    <div className="mt-3">
                                        <table className="table table-sm">
                                            <tbody>
                                                {pedido.items.map((item) => (
                                                    <tr key={item.productoId}>
                                                        <td>{item.cantidad} x {item.titulo}</td>
                                                        <td className="text-end">${(item.precio * item.cantidad).toLocaleString("es-CL")}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {pedido.direccion && (
                                            <p className="mb-1">Dirección: {pedido.direccion}</p>
                                        )}

                                        {pedido.pago && (
                                            <p className="mb-0">Pago: {pedido.pago}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default MisPedidos
