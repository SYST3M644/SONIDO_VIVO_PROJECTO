import { useState } from "react";
import { Link } from "react-router-dom";
import Regresar from "../componentes/atomos/Regresar";
import type { ProductoCarrito } from "../servicios/Productos";

type CarritoProps = {
    carrito: ProductoCarrito[];
    sumarCantidad: (id: number) => void;
    restarCantidad: (id: number) => void;
    quitarProducto: (id: number) => void;
    puedeComprar: boolean;
}

function Carrito({ carrito, sumarCantidad, restarCantidad, quitarProducto, puedeComprar }: CarritoProps) {
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("error");

    let total = 0;

    for (const producto of carrito) {
        total += producto.precio * producto.cantidad;
    }

    const pagar = () => {
        if (!puedeComprar) {
            setTipoMensaje("error");
            setMensaje("Debes iniciar sesión para pagar");
            return;
        }

        setTipoMensaje("exito");
        setMensaje("¡Gracias por tu compra! Total: $" + total.toLocaleString("es-CL"));
    };

    let estiloMensaje = "mensaje-error";

    if (tipoMensaje === "exito") {
        estiloMensaje = "mensaje-exito";
    }

    if (carrito.length === 0) {
        return (
            <div className="container mt-4">
                <h1 className="titulo-seccion">Carrito</h1>

                <p>El carrito está vacío</p>

                <Link to="/productos" className="btn boton-tienda">
                    Ver productos
                </Link>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="titulo-seccion">Carrito</h1>

            {carrito.map(producto => (
                <div key={producto.id} className="card mb-3 p-3">
                    <div className="row align-items-center">

                        <div className="col-12 col-md-2">
                            <img
                                src={producto.imagen}
                                alt={producto.titulo}
                                style={{ width: '100px' }}
                            />
                        </div>

                        <div className="col-12 col-md-4">
                            <h5>{producto.titulo}</h5>
                            <p>${producto.precio.toLocaleString("es-CL")}</p>
                        </div>

                        <div className="col-12 col-md-3">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => restarCantidad(producto.id)}
                            >
                                -
                            </button>

                            <span className="mx-3">{producto.cantidad}</span>

                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => sumarCantidad(producto.id)}
                            >
                                +
                            </button>
                        </div>

                        <div className="col-12 col-md-3">
                            <button
                                className="btn btn-danger"
                                onClick={() => quitarProducto(producto.id)}
                            >
                                Quitar
                            </button>
                        </div>

                    </div>
                </div>
            ))}

            <h3>Total: ${total.toLocaleString("es-CL")}</h3>

            <button className="btn boton-tienda me-2" onClick={pagar}>
                Pagar
            </button>

            <Regresar />

            {mensaje !== "" && (
                <p className={estiloMensaje}>{mensaje}</p>
            )}
        </div>
    );
}

export default Carrito