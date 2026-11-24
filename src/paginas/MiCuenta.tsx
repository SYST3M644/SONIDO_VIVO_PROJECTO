import { Link } from "react-router-dom";
import type { Usuario } from "../servicios/Autenticacion";
import { vencimientoToken } from "../servicios/Sesion";

type MiCuentaProps = {
    usuario: Usuario;
    cerrarSesion: () => void;
};

function MiCuenta({ usuario, cerrarSesion }: MiCuentaProps) {
    const vence = vencimientoToken(usuario.token);

    let horaVencimiento = "";

    if (vence > 0) {
        horaVencimiento = new Date(vence).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
    }

    return (
        <div className="container mt-4">
            <h1 className="titulo-seccion">Mi Cuenta</h1>

            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card p-4 text-start">
                        <h2 className="h4">{usuario.nombre}</h2>

                        <table className="table mb-3">
                            <tbody>
                                <tr>
                                    <th scope="row">Correo</th>
                                    <td>{usuario.correo}</td>
                                </tr>

                                <tr>
                                    <th scope="row">Tipo de cuenta</th>
                                    <td className="text-capitalize">{usuario.rol}</td>
                                </tr>

                                {horaVencimiento !== "" && (
                                    <tr>
                                        <th scope="row">Sesión</th>
                                        <td>Se renueva sola antes de las {horaVencimiento}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="d-flex gap-2 flex-wrap">
                            {usuario.rol === "cliente" && (
                                <Link to="/mis-pedidos" className="btn boton-tienda">
                                    Ver mis pedidos
                                </Link>
                            )}

                            <button type="button" className="btn btn-outline-secondary" onClick={cerrarSesion}>
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiCuenta
