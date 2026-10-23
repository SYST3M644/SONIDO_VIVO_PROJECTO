import { useState } from "react";
import { productos } from "../servicios/Productos";
import { listarExistencias, actualizarStock } from "../servicios/Stock";
import type { Existencia } from "../servicios/Stock";

function Stock() {
    const [existencias, setExistencias] = useState<Existencia[]>(listarExistencias());

    const cambiarCantidad = (id: number, valor: string) => {
        const cantidad = Number(valor);

        if (valor === "" || cantidad < 0) {
            return;
        }

        actualizarStock(id, cantidad);
        setExistencias([...listarExistencias()]);
    };

    return (
        <div className="container mt-4">
            <h1 className="titulo-seccion">Stock de Productos</h1>

            <p className="text-body-secondary">
                Actualiza las unidades disponibles en bodega.
            </p>

            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Unidades</th>
                            <th>Disponibilidad</th>
                        </tr>
                    </thead>

                    <tbody>
                        {existencias.map((existencia) => {
                            const producto = productos.find(
                                producto => producto.id === existencia.id
                            );

                            return (
                                <tr key={existencia.id}>
                                    <td>{producto?.titulo}</td>

                                    <td style={{ width: '140px' }}>
                                        <input
                                            type="number"
                                            min="0"
                                            className="form-control form-control-sm"
                                            value={existencia.cantidad}
                                            onChange={(e) => cambiarCantidad(existencia.id, e.target.value)}
                                        />
                                    </td>

                                    <td>
                                        {existencia.cantidad === 0 && (
                                            <span className="badge text-bg-secondary">Sin stock</span>
                                        )}

                                        {existencia.cantidad > 0 && existencia.cantidad <= 3 && (
                                            <span className="badge text-bg-warning">Quedan pocas</span>
                                        )}

                                        {existencia.cantidad > 3 && (
                                            <span className="badge text-bg-success">Disponible</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Stock
