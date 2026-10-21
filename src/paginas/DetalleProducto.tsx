import { useParams } from "react-router-dom"
import Regresar from "../componentes/atomos/Regresar";
import { productos } from "../servicios/Productos";
import { buscarFicha } from "../servicios/Caracteristicas";

function DetalleProducto() {
    const { id } = useParams()

    const producto = productos.find(
        producto => producto.id === Number(id)
    )

    const ficha = buscarFicha(Number(id));

    return (
        <div className="container mt-4">
            <h1 className="titulo-seccion">Detalle del Producto</h1>

            <div className="row justify-content-center g-4">
                <div className="col-12 col-md-5">
                    <img
                        className="img-fluid"
                        src={producto?.imagen}
                        alt={producto?.titulo}
                    />
                </div>

                <div className="col-12 col-md-6 text-start">
                    <h2>{producto?.titulo}</h2>

                    <p className="text-body-secondary">{producto?.descripcion}</p>

                    <p className="precio-producto">
                        ${producto?.precio.toLocaleString("es-CL")}
                    </p>

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

                    <Regresar />
                </div>
            </div>
        </div>
    )
}

export default DetalleProducto
