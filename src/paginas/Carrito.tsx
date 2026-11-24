import { useState } from "react";
import { Link } from "react-router-dom";
import Regresar from "../componentes/atomos/Regresar";
import CampoFormulario from "../componentes/moleculas/CampoFormulario";
import type { ProductoCarrito } from "../servicios/Productos";
import { urlImagen, descontarStock, buscarProducto } from "../servicios/Productos";
import { agregarPedido } from "../servicios/Pedidos";
import type { Pedido } from "../servicios/Pedidos";
import { validarTarjeta, pagoAprobado, textoPago } from "../servicios/Pago";

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
    // Pasos de la compra: "carrito" -> "pago" -> "listo"
    const [paso, setPaso] = useState("carrito");

    const [mensaje, setMensaje] = useState("");
    const [entrega, setEntrega] = useState("despacho");
    const [direccion, setDireccion] = useState("");
    const [nombreInvitado, setNombreInvitado] = useState("");
    const [correoInvitado, setCorreoInvitado] = useState("");

    const [numeroTarjeta, setNumeroTarjeta] = useState("");
    const [nombreTarjeta, setNombreTarjeta] = useState("");
    const [vencimiento, setVencimiento] = useState("");
    const [cvv, setCvv] = useState("");

    const [pagando, setPagando] = useState(false);
    const [pedidoListo, setPedidoListo] = useState<Pedido | null>(null);

    let total = 0;

    for (const producto of carrito) {
        total += producto.precio * producto.cantidad;
    }

    // Paso 1 -> Paso 2: revisa los datos del comprador
    const irAPagar = () => {
        if (!puedeComprar) {
            setMensaje("Los vendedores no pueden confirmar pedidos");
            return;
        }

        if (!hayUsuario) {
            if (nombreInvitado.trim() === "") {
                setMensaje("Debe ingresar su nombre para continuar");
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoInvitado)) {
                setMensaje("Ingrese un correo válido para enviarle el seguimiento");
                return;
            }
        }

        if (entrega === "despacho" && direccion.trim() === "") {
            setMensaje("Debe ingresar la dirección de despacho");
            return;
        }

        setMensaje("");
        setPaso("pago");
    };

    // Paso 2 -> Paso 3: valida la tarjeta, simula el pago y crea el pedido
    const pagar = async () => {
        const error = validarTarjeta(numeroTarjeta, nombreTarjeta, vencimiento, cvv);

        if (error !== "") {
            setMensaje(error);
            return;
        }

        if (!pagoAprobado(numeroTarjeta)) {
            setMensaje("El pago fue rechazado. Pruebe con otra tarjeta");
            return;
        }

        let cliente = nombreCliente;
        let correo = correoCliente;

        if (!hayUsuario) {
            cliente = nombreInvitado.trim();
            correo = correoInvitado.trim();
        }

        setPagando(true);

        try {
            const items = carrito.map((producto) => ({
                productoId: producto.id,
                titulo: producto.titulo,
                precio: producto.precio,
                cantidad: producto.cantidad,
            }));

            // Antes de crear el pedido se revisa el stock real en el backend,
            // por si otro cliente compró lo mismo mientras tanto
            for (const item of items) {
                const producto = await buscarProducto(item.productoId);

                if (producto.stock < item.cantidad) {
                    throw new Error("Solo quedan " + producto.stock + " unidades de " + producto.titulo);
                }
            }

            // La dirección solo se envía si el pedido es con despacho
            let direccionEnvio = "";

            if (entrega === "despacho") {
                direccionEnvio = direccion.trim();
            }

            const pedido = await agregarPedido(cliente, correo, total, entrega, items, textoPago(numeroTarjeta), direccionEnvio);

            for (const item of items) {
                await descontarStock(item.productoId, item.cantidad, token);
            }

            vaciarCarrito();
            setPedidoListo(pedido);
            setMensaje("");
            setPaso("listo");
        } catch (error) {
            console.error("No se pudo confirmar el pedido:", error);

            if (error instanceof Error && error.message.startsWith("Solo quedan")) {
                setMensaje(error.message);
            } else {
                setMensaje("No se pudo confirmar el pedido, intente nuevamente");
            }
        } finally {
            setPagando(false);
        }
    };

    // Paso 3: confirmación de la compra
    if (paso === "listo" && pedidoListo !== null) {
        return (
            <div className="container mt-4">
                <h1 className="titulo-seccion">¡Compra confirmada!</h1>

                <p className="mensaje-exito">
                    ¡Gracias por tu compra! Tu pedido N° {pedidoListo.id} fue confirmado
                </p>

                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card p-4 text-start">
                            <table className="table mb-0">
                                <tbody>
                                    <tr>
                                        <th scope="row">Pedido</th>
                                        <td>N° {pedidoListo.id}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total pagado</th>
                                        <td>${pedidoListo.total.toLocaleString("es-CL")}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Entrega</th>
                                        <td>{pedidoListo.entrega}</td>
                                    </tr>
                                    {pedidoListo.direccion && (
                                        <tr>
                                            <th scope="row">Dirección</th>
                                            <td>{pedidoListo.direccion}</td>
                                        </tr>
                                    )}
                                    <tr>
                                        <th scope="row">Pago</th>
                                        <td>{textoPago(numeroTarjeta)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Estado</th>
                                        <td>En preparación</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="d-flex gap-2 justify-content-center mt-4 flex-wrap">
                    {hayUsuario && (
                        <Link to="/mis-pedidos" className="btn boton-tienda">
                            Ver mis pedidos
                        </Link>
                    )}

                    <Link to="/productos" className="btn btn-outline-secondary">
                        Seguir comprando
                    </Link>
                </div>
            </div>
        );
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

            <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
                <span className={paso === "carrito" ? "badge text-bg-dark" : "badge text-bg-light"}>1. Carrito y entrega</span>
                <span className={paso === "pago" ? "badge text-bg-dark" : "badge text-bg-light"}>2. Pago</span>
                <span className="badge text-bg-light">3. Confirmación</span>
            </div>

            {paso === "carrito" && (
                <>
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

                    {entrega === "despacho" && (
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-6 text-start">
                                <CampoFormulario
                                    etiqueta="Dirección de despacho"
                                    tipo="text"
                                    nombre="dirección"
                                    valor={direccion}
                                    alCambiar={setDireccion}
                                />
                            </div>
                        </div>
                    )}

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

                    <button className="btn boton-tienda me-2" onClick={irAPagar}>
                        Continuar al pago
                    </button>

                    <Regresar />
                </>
            )}

            {paso === "pago" && (
                <div className="row justify-content-center g-4">
                    <div className="col-12 col-md-5">
                        <div className="card p-4 text-start">
                            <h2 className="h5">Resumen de tu compra</h2>

                            <table className="table table-sm">
                                <tbody>
                                    {carrito.map((producto) => (
                                        <tr key={producto.id}>
                                            <td>{producto.cantidad} x {producto.titulo}</td>
                                            <td className="text-end">${(producto.precio * producto.cantidad).toLocaleString("es-CL")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <p className="mb-1">Entrega: {entrega}</p>
                            {entrega === "despacho" && (
                                <p className="mb-1">Dirección: {direccion}</p>
                            )}
                            <h3 className="h5">Total: ${total.toLocaleString("es-CL")}</h3>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="card p-4 text-start">
                            <h2 className="h5">Pago con tarjeta</h2>

                            <p className="small text-body-secondary">
                                Pago simulado para el proyecto: no se cobra dinero real.
                                Tarjeta de prueba: 4111 1111 1111 1111.
                            </p>

                            <CampoFormulario etiqueta="Número de tarjeta" tipo="text" nombre="número de tarjeta" valor={numeroTarjeta} alCambiar={setNumeroTarjeta} />

                            <CampoFormulario etiqueta="Nombre en la tarjeta" tipo="text" nombre="nombre en la tarjeta" valor={nombreTarjeta} alCambiar={setNombreTarjeta} />

                            <div className="row">
                                <div className="col-6">
                                    <CampoFormulario etiqueta="Vencimiento" tipo="text" nombre="MM/AA" valor={vencimiento} alCambiar={setVencimiento} />
                                </div>

                                <div className="col-6">
                                    <CampoFormulario etiqueta="CVV" tipo="password" nombre="CVV" valor={cvv} alCambiar={setCvv} />
                                </div>
                            </div>

                            <div className="d-flex gap-2 flex-wrap">
                                <button className="btn boton-tienda" onClick={pagar} disabled={pagando}>
                                    {pagando ? "Procesando pago..." : "Pagar $" + total.toLocaleString("es-CL")}
                                </button>

                                <button className="btn btn-outline-secondary" onClick={() => { setMensaje(""); setPaso("carrito"); }}>
                                    Volver
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {mensaje !== "" && (
                <p className="mensaje-error mt-3">{mensaje}</p>
            )}
        </div>
    );
}

export default Carrito
