import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Regresar from "../componentes/atomos/Regresar";
import { buscarProducto, urlImagen } from "../servicios/Productos";
import type { Producto } from "../servicios/Productos";
import { buscarFicha } from "../servicios/Caracteristicas";

type DetalleProductoProps = {
    agregarProducto: (id: number) => void;
};

function DetalleProducto({ agregarProducto }: DetalleProductoProps) {
    const { id } = useParams()

    const [producto, setProducto] = useState<Producto | null>(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        buscarProducto(Number(id))
            .then((datos) => setProducto(datos))
            .catch(() => setProducto(null))
            .finally(() => setCargando(false));
    }, [id]);

    const ficha = buscarFicha(Number(id));

    if (cargando) {
        return (
            <div className="container mt-4">
                <p>Cargando producto...</p>
            </div>
        );
    }

    if (producto === null) {
        return (
            <div className="container mt-4">
                <p>No se encontró el producto</p>
                <Regresar />
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="titulo-seccion">Detalle del Producto</h1>

            <div className="row justify-content-center g-4">
                <div className="col-12 col-md-5">
                    <img
                        className="img-fluid"
                        src={urlImagen(producto.imagen)}
                        alt={producto.titulo}
                    />
                </div>

                <div className="col-12 col-md-6 text-start">
                    <h2>{producto.titulo}</h2>

                    <p className="text-body-secondary">{producto.descripcion}</p>

                    <p className="precio-producto">
                        ${producto.precio.toLocaleString("es-CL")}
                    </p>

                    {producto.stock === 0 ? (
                        <p><span className="badge text-bg-secondary">Agotado</span></p>
                    ) : (
                        <p className="text-body-secondary">Disponibles: {producto.stock} unidades</p>
                    )}

                    <h3 className="h5 mt-4">Características</h3>

                    <div className="table-responsive">
                        <table className="table table-sm table-striped">
                            <tbody>
                                {ficha.map((caracteristica) => (
                                    <tr key={caracteristica.nombre}>
                                        <th scope="row">{caracteristica.nombre}</th>
                                        <td>{caracteristica.valor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
                        <button
                            type="button"
                            className="btn boton-tienda"
                            disabled={producto.stock === 0}
                            onClick={() => agregarProducto(producto.id)}
                        >
                            Agregar al carrito
                        </button>

                        <Regresar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetalleProducto
