import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";

function FormularioContacto() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensajeContacto, setMensajeContacto] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("error");

    const validarEnvioMSG = (e: React.SubmitEvent<HTMLFormElement>) => {
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

        setTipoMensaje("exito");
        setMensaje("Formulario enviado correctamente");
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

            <button type="submit" className="btn boton-tienda">Enviar Mensaje</button>

        </form>

    );
}

export default FormularioContacto
