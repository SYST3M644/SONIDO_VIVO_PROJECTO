import { useParams } from "react-router-dom"
import Regresar from "../componentes/atomos/Regresar";
import { productos } from "../servicios/Productos";

function DetalleProducto() {
    const { id } = useParams()

    const producto = productos.find(
        producto => producto.id === Number(id)
    )

    return (
        <div className="container mt-4">
            <h1 className="titulo-seccion">Detalle del Producto</h1>

            <img
                className="d-block mx-auto"
                src={producto?.imagen}
                alt={producto?.titulo}
                style={{ width: '300px', maxWidth: '100%' }}
            />

            <h2>{producto?.titulo}</h2>

            <p>{producto?.descripcion}</p>

            <p>${producto?.precio.toLocaleString("es-CL")}</p>

            <Regresar />
        </div>
    )
}

export default DetalleProducto
