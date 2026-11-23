import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import { enviarMensaje } from "../../servicios/Contacto";

function FormularioContacto() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensajeContacto, setMensajeContacto] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("error");
    const [enviando, setEnviando] = useState(false);

    const validarEnvioMSG = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setTipoMensaje("error");

        if (nombre.trim() === "") {
            setMensaje("Debe ingresar su nombre");
            return;
        }

        if (correo.trim() === "") {
            setMensaje("Debe ingresar su correo");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            setMensaje("Ingrese un correo válido");
            return;
        }

        if (mensajeContacto.trim() === "") {
            setMensaje("Debe ingresar un mensaje");
            return;
        }

        setEnviando(true);

        try {
            await enviarMensaje(nombre.trim(), correo.trim(), mensajeContacto.trim());

            setTipoMensaje("exito");
            setMensaje("Formulario enviado correctamente");

            setNombre("");
            setCorreo("");
            setMensajeContacto("");
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
            setTipoMensaje("error");
            setMensaje("No se pudo enviar el mensaje, intente nuevamente");
        } finally {
            setEnviando(false);
        }
    };

    let estiloMensaje = "mensaje-error";

    if (tipoMensaje === "exito") {
        estiloMensaje = "mensaje-exito";
    }

    return(
        <form onSubmit={validarEnvioMSG} noValidate>
            <CampoFormulario etiqueta="Nombre Completo" tipo="text" nombre="nombre" valor={nombre} alCambiar={setNombre}/>

            <CampoFormulario etiqueta="Correo Electrónico" tipo="email" nombre="correo" valor={correo} alCambiar={setCorreo}/>

            <CampoFormulario etiqueta="Mensaje" tipo="text" nombre="mensaje" valor={mensajeContacto} alCambiar={setMensajeContacto}/>

            {mensaje !== "" && (
                <p className={estiloMensaje}>{mensaje}</p>
            )}

            <button type="submit" className="btn boton-tienda" disabled={enviando}>
                {enviando ? "Enviando..." : "Enviar Mensaje"}
            </button>

        </form>

    );
}

export default FormularioContacto
