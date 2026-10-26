import { pedidosDeCliente } from "../servicios/Pedidos";

type MisPedidosProps = {
    nombreCliente: string;
};

function MisPedidos({ nombreCliente }: MisPedidosProps) {
    const pedidos = pedidosDeCliente(nombreCliente);

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