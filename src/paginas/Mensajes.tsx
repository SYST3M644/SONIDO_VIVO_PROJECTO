import { useEffect, useState } from "react";
import { listarMensajes, marcarComoRecibido } from "../servicios/Contacto";
import type { Mensajeria } from "../servicios/Contacto";

type MensajesProps = {
    token: string;
};

function Mensajes({ token }: MensajesProps) {
    const [mensajes, setMensajes] = useState<Mensajeria[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        listarMensajes(token)
            .then((datos) => {
                setMensajes(datos);
                setError("");
            })
            .catch(() => {
                setMensajes([]);
                setError("No se pudieron cargar los mensajes. Revisa que el backend esté encendido.");
            })
            .finally(() => setCargando(false));
    }, [token]);

    const recibir = async (id: number) => {
        setMensajes(mensajes.map((mensaje) => {
            if (mensaje.id === id) {
                return { ...mensaje, estado: "RECIBIDO" };
            }
            return mensaje;
        }));

        try {
            await marcarComoRecibido(id, token);
        } catch (error) {
            console.error("No se pudo marcar el mensaje:", error);
        }
    };

    let pendientes = 0;

    for (const mensaje of mensajes) {
        if (mensaje.estado === "PENDIENTE") {
            pendientes = pendientes + 1;
        }
    }

    return (
        <div className="container mt-4">
            <h1 className="titulo-seccion">Mensajes de Contacto</h1>

            <p className="text-body-secondary">
                Mensajes que llegaron desde el formulario de contacto.
            </p>

            {cargando && (
                <p>Cargando mensajes...</p>
            )}

            {!cargando && error && (
                <p className="mensaje-error">{error}</p>
            )}

            {!cargando && !error && mensajes.length === 0 && (
                <p>Todavía no hay mensajes</p>
            )}

            {!cargando && !error && mensajes.length > 0 && (
                <p className="mb-4">
                    {mensajes.length} mensajes recibidos, {pendientes} sin revisar.
                </p>
            )}

            {mensajes.map((mensaje) => (
                <div className="card p-3 mb-3 text-start" key={mensaje.id}>
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                        <div>
                            <h2 className="h5 mb-1">{mensaje.nombreCompleto}</h2>
                            <p className="text-body-secondary mb-2">{mensaje.correo}</p>
                        </div>

                        {mensaje.estado === "PENDIENTE" ? (
                            <span className="badge text-bg-warning">Pendiente</span>
                        ) : (
                            <span className="badge text-bg-success">Recibido</span>
                        )}
                    </div>

                    <p className="mb-3">{mensaje.mensaje}</p>

                    <div>
                        <button
                            type="button"
                            className="btn boton-tienda btn-sm"
                            disabled={mensaje.estado === "RECIBIDO"}
                            onClick={() => recibir(mensaje.id)}
                        >
                            Marcar como recibido
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Mensajes
