import { useState } from "react";
import { listarMeses, pedidosDelMes, estados } from "../servicios/Pedidos";

function Reportes() {
    const [mes, setMes] = useState("todos");

    const meses = listarMeses();
    const pedidos = pedidosDelMes(mes);

    let total = 0;

    for (const pedido of pedidos) {
        total += pedido.total;
    }

    let promedio = 0;

    if (pedidos.length > 0) {
        promedio = Math.round(total / pedidos.length);
    }

    const contarPorEstado = (estado: string) => {
        return pedidos.filter(pedido => pedido.estado === estado).length;
    };

    return (
        <div className="container mt-4">
            <h1 className="titulo-seccion">Resumen de Ventas</h1>

            <div className="row justify-content-center mb-4">
                <div className="col-12 col-md-6 col-lg-4">
                    <label className="form-label">Período</label>

                    <select
                        className="form-select"
                        value={mes}
                        onChange={(e) => setMes(e.target.value)}
                    >
                        <option value="todos">Todos los meses</option>

                        {meses.map((unMes) => (
                            <option key={unMes} value={unMes}>
                                {unMes}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12 col-md-4">
                    <div className="card shadow-sm p-3">
                        <p className="text-body-secondary mb-1">Total vendido</p>
                        <p className="precio-producto mb-0">
                            ${total.toLocaleString("es-CL")}
                        </p>
                    </div>
                </div>

                <div className="col-12 col-md-4">
                    <div className="card shadow-sm p-3">
                        <p className="text-body-secondary mb-1">Pedidos</p>
                        <p className="precio-producto mb-0">{pedidos.length}</p>
                    </div>
                </div>

                <div className="col-12 col-md-4">
                    <div className="card shadow-sm p-3">
                        <p className="text-body-secondary mb-1">Promedio por pedido</p>
                        <p className="precio-producto mb-0">
                            ${promedio.toLocaleString("es-CL")}
                        </p>
                    </div>
                </div>
            </div>

            <h2 className="h5">Pedidos por estado</h2>

            <div className="row g-3 mb-4">
                {estados.map((estado) => (
                    <div className="col-12 col-md-4" key={estado}>
                        <div className="card shadow-sm p-3">
                            <p className="text-body-secondary mb-1">{estado}</p>
                            <p className="fs-4 fw-semibold mb-0">
                                {contarPorEstado(estado)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="h5">Detalle del período</h2>

            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
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
                                <td>${pedido.total.toLocaleString("es-CL")}</td>
                                <td>{pedido.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Reportes
