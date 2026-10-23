import { useState } from "react";
import { listarPedidos, cambiarEstado, estados } from "../servicios/Pedidos";
import type { Pedido } from "../servicios/Pedidos";

function Vendedor() {
    const [pedidos, setPedidos] = useState<Pedido[]>(listarPedidos());

    const actualizarEstado = (id: number, estado: string) => {
        cambiarEstado(id, estado);
        setPedidos([...listarPedidos()]);
    };

    return (
        <div className="container mt-4">
            <h1 className="titulo-seccion">Pedidos de la Tienda</h1>

            <p className="text-body-secondary">
                Cambia el estado de cada pedido a medida que avanza.
            </p>

            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Cliente</th>
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
                                <td>{pedido.cliente}</td>
                                <td>{pedido.fecha}</td>
                                <td>{pedido.entrega}</td>
                                <td>${pedido.total.toLocaleString("es-CL")}</td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={pedido.estado}
                                        onChange={(e) => actualizarEstado(pedido.id, e.target.value)}
                                    >
                                        {estados.map((estado) => (
                                            <option key={estado} value={estado}>
                                                {estado}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Vendedor
