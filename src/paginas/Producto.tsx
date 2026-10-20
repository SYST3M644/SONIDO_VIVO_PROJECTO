import CardProductos from "../componentes/moleculas/CardProductos"
import { productos } from "../servicios/Productos"

type ProductosProps = {
    agregarProducto: (id: number) => void;
};

function Productos({ agregarProducto }: ProductosProps) {
    return (
        <div className="container mt-4">
            <h1 className="titulo-seccion">Productos</h1>
            <div className="d-flex flex-wrap justify-content-center gap-3">
                {productos.map((producto) => (
                    <CardProductos
                        key={producto.id}
                        {...producto}
                        agregarProducto={agregarProducto}
                    />
                ))}
            </div>
        </div>
    );
}

export default Productos