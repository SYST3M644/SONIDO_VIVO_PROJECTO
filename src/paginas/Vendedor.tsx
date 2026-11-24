import { useEffect, useState } from "react";
import { listarPedidos, cambiarEstado, estados } from "../servicios/Pedidos";
import type { Pedido } from "../servicios/Pedidos";

type VendedorProps = {
    token: string;
};

function Vendedor({ token }: VendedorProps) {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        listarPedidos(token)
            .then((datos) => {
                setPedidos(datos);
                setError("");
            })
            .catch(() => {
                setPedidos([]);
                setError("No se pudieron cargar los pedidos. Revisa que el backend esté encendido.");
            })
            .finally(() => setCargando(false));
    }, [token]);

    const actualizarEstado = async (id: number, estado: string) => {
        setPedidos(pedidos.map((pedido) => {
            if (pedido.id === id) {
                return { ...pedido, estado: estado };
            }
            return pedido;
        }));

        try {
            await cambiarEstado(id, estado, token);
        } catch (error) {
            console.error("No se pudo cambiar el estado:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="titulo-seccion">Pedidos de la Tienda</h1>

            <p className="text-body-secondary">
                Cambia el estado de cada pedido a medida que avanza.
            </p>

            {cargando && (
                <p>Cargando pedidos...</p>
            )}

            {!cargando && error && (
                <p className="mensaje-error">{error}</p>
            )}

            {!cargando && !error && pedidos.length === 0 && (
                <p>Todavía no hay pedidos</p>
            )}

            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Cliente</th>
                            <th>Productos</th>
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
                                <td>
                                    {pedido.cliente}

                                    {pedido.correo && (
                                        <span className="d-block text-body-secondary small">
                                            {pedido.correo}
                                        </span>
                                    )}
                                </td>

                                <td className="text-start">
                                    {pedido.items.map((item) => (
                                        <span className="d-block small" key={item.productoId}>
                                            {item.cantidad} x {item.titulo}
                                        </span>
                                    ))}
                                </td>
                                <td>{pedido.fecha}</td>
                                <td>
                                    {pedido.entrega}
                                    {pedido.direccion && (
                                        <span className="d-block small text-body-secondary">
                                            {pedido.direccion}
                                        </span>
                                    )}
                                </td>
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
