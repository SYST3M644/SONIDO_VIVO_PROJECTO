import { useEffect, useState } from "react";
import { actualizarStock, listarProductos } from "../servicios/Productos";
import type { Producto } from "../servicios/Productos";

function Stock() {
    const [existencias, setExistencias] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        listarProductos()
            .then((datos) => setExistencias(datos))
            .catch(() => setExistencias([]))
            .finally(() => setCargando(false));
    }, []);

    const cambiarCantidad = async (id: number, valor: string) => {
        const cantidad = Number(valor);

        if (valor === "" || cantidad < 0) {
            return;
        }

        setExistencias(existencias.map((producto) => {
            if (producto.id === id) {
                return { ...producto, stock: cantidad };
            }
            return producto;
        }));

        try {
            await actualizarStock(id, cantidad);
        } catch (error) {
            console.error("No se pudo actualizar el stock:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="titulo-seccion">Stock de Productos</h1>

            <p className="text-body-secondary">
                Actualiza las unidades disponibles en bodega.
            </p>

            {cargando && (
                <p>Cargando stock...</p>
            )}

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
                        {existencias.map((existencia) => (
                            <tr key={existencia.id}>
                                <td>{existencia.titulo}</td>

                                <td style={{ width: '140px' }}>
                                    <input
                                        type="number"
                                        min="0"
                                        className="form-control form-control-sm"
                                        value={existencia.stock}
                                        onChange={(e) => cambiarCantidad(existencia.id, e.target.value)}
                                    />
                                </td>

                                <td>
                                    {existencia.stock === 0 && (
                                        <span className="badge text-bg-secondary">Sin stock</span>
                                    )}

                                    {existencia.stock > 0 && existencia.stock <= 3 && (
                                        <span className="badge text-bg-warning">Quedan pocas</span>
                                    )}

                                    {existencia.stock > 3 && (
                                        <span className="badge text-bg-success">Disponible</span>
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

export default Stock
