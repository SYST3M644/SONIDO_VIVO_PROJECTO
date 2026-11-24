import { useState } from "react";
import { Link } from "react-router-dom";
import Regresar from "../componentes/atomos/Regresar";
import CampoFormulario from "../componentes/moleculas/CampoFormulario";
import type { ProductoCarrito } from "../servicios/Productos";
import { urlImagen, descontarStock } from "../servicios/Productos";
import { agregarPedido } from "../servicios/Pedidos";

type CarritoProps = {
    carrito: ProductoCarrito[];
    sumarCantidad: (id: number) => void;
    restarCantidad: (id: number) => void;
    quitarProducto: (id: number) => void;
    puedeComprar: boolean;
    vaciarCarrito: () => void;
    nombreCliente: string;
    correoCliente: string;
    stockDe: (id: number) => number;
    hayUsuario: boolean;
    token: string;
}

function Carrito({ carrito, sumarCantidad, restarCantidad, quitarProducto, puedeComprar, vaciarCarrito, nombreCliente, correoCliente, stockDe, hayUsuario, token }: CarritoProps) {
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("error");
    const [entrega, setEntrega] = useState("despacho");
    const [nombreInvitado, setNombreInvitado] = useState("");
    const [correoInvitado, setCorreoInvitado] = useState("");
    const [confirmando, setConfirmando] = useState(false);

    let total = 0;

    for (const producto of carrito) {
        total += producto.precio * producto.cantidad;
    }

    const confirmarPedido = async () => {
        if (!puedeComprar) {
            setTipoMensaje("error");
            setMensaje("Los vendedores no pueden confirmar pedidos");
            return;
        }

        let cliente = nombreCliente;
        let correo = correoCliente;

        if (!hayUsuario) {
            if (nombreInvitado.trim() === "") {
                setTipoMensaje("error");
                setMensaje("Debe ingresar su nombre para continuar");
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoInvitado)) {
                setTipoMensaje("error");
                setMensaje("Ingrese un correo válido para enviarle el seguimiento");
                return;
            }

            cliente = nombreInvitado.trim();
            correo = correoInvitado.trim();
        }

        setConfirmando(true);

        try {
            const items = carrito.map((producto) => ({
                productoId: producto.id,
                titulo: producto.titulo,
                precio: producto.precio,
                cantidad: producto.cantidad,
            }));

            const pedido = await agregarPedido(cliente, correo, total, entrega, items);

            for (const item of items) {
                await descontarStock(item.productoId, item.cantidad, token);
            }

            vaciarCarrito();
            setNombreInvitado("");
            setCorreoInvitado("");
            setTipoMensaje("exito");
            setMensaje("¡Gracias por tu compra! Tu pedido N° " + pedido.id + " fue confirmado");
        } catch (error) {
            console.error("No se pudo confirmar el pedido:", error);
            setTipoMensaje("error");

            if (error instanceof Error && error.message.startsWith("Solo quedan")) {
                setMensaje(error.message);
            } else {
                setMensaje("No se pudo confirmar el pedido, intente nuevamente");
            }
        } finally {
            setConfirmando(false);
        }
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

                {mensaje !== "" && (
                    <p className={estiloMensaje}>{mensaje}</p>
                )}
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
                                src={urlImagen(producto.imagen)}
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
                                disabled={producto.cantidad >= stockDe(producto.id)}
                                onClick={() => sumarCantidad(producto.id)}
                            >
                                +
                            </button>

                            {producto.cantidad >= stockDe(producto.id) && (
                                <span className="d-block small text-body-secondary mt-1">
                                    Quedan {stockDe(producto.id)} en bodega
                                </span>
                            )}
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

            <div className="my-3">
                <p className="mb-1">¿Cómo quieres recibir tu pedido?</p>

                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="entrega"
                        id="despacho"
                        value="despacho"
                        checked={entrega === "despacho"}
                        onChange={(e) => setEntrega(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="despacho">
                        Despacho a domicilio
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="entrega"
                        id="retiro"
                        value="retiro en tienda"
                        checked={entrega === "retiro en tienda"}
                        onChange={(e) => setEntrega(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="retiro">
                        Retiro en tienda
                    </label>
                </div>
            </div>

            {!hayUsuario && (
                <div className="row justify-content-center my-4">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card p-4 text-start">
                            <h2 className="h5">Comprar como invitado</h2>

                            <p className="text-body-secondary">
                                No necesitas crear una cuenta. Déjanos tus datos para avisarte
                                cuando tu pedido esté listo.
                            </p>

                            <CampoFormulario
                                etiqueta="Nombre Completo"
                                tipo="text"
                                nombre="nombre"
                                valor={nombreInvitado}
                                alCambiar={setNombreInvitado}
                            />

                            <CampoFormulario
                                etiqueta="Correo Electrónico"
                                tipo="email"
                                nombre="correo"
                                valor={correoInvitado}
                                alCambiar={setCorreoInvitado}
                            />

                            <p className="text-body-secondary mb-0">
                                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <button className="btn boton-tienda me-2" onClick={confirmarPedido} disabled={confirmando}>
                {confirmando ? "Confirmando..." : "Confirmar pedido"}
            </button>

            <Regresar />

            {mensaje !== "" && (
                <p className={estiloMensaje}>{mensaje}</p>
            )}
        </div>
    );
}

export default Carrito