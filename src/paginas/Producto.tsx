import CardProductos from "../componentes/moleculas/CardProductos"
import { productos } from "../servicios/Productos"

function Productos() {
    return (
        <div className="container mt-4">
            <h1 className="titulo-seccion">Productos</h1>
            <div className="d-flex flex-wrap justify-content-center gap-3">
                {productos.map((producto) => (
                    <CardProductos
                        key={producto.id}
                        {...producto}
                    />
                ))}
            </div>
        </div>
    );
}

export default Productos