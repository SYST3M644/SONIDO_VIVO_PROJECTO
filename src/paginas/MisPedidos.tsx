import { useEffect, useState } from "react";
import { pedidosDeCliente } from "../servicios/Pedidos";
import type { Pedido } from "../servicios/Pedidos";

type MisPedidosProps = {
    nombreCliente: string;
    token: string;
};

function MisPedidos({ nombreCliente, token }: MisPedidosProps) {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        pedidosDeCliente(nombreCliente, token)
            .then((datos) => setPedidos(datos))
            .catch(() => setPedidos([]))
            .finally(() => setCargando(false));
    }, [nombreCliente, token]);

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

            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Fecha</th>
                            <th>Entrega</th>
                            <th>Total</th>
                            <th>Estado</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.id}>
                                <td>{pedido.id}</td>
                                <td>{pedido.fecha}</td>
                                <td>{pedido.entrega}</td>
                                <td>${pedido.total.toLocaleString("es-CL")}</td>
                                <td>
                                    {pedido.estado === "en preparacion" && (
                                        <span className="badge text-bg-warning">En preparación</span>
                                    )}

                                    {pedido.estado === "despachado" && (
                                        <span className="badge text-bg-primary">Despachado</span>
                                    )}

                                    {pedido.estado === "entregado" && (
                                        <span className="badge text-bg-success">Entregado</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MisPedidos