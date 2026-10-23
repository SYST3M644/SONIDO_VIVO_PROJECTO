import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";

type FormularioContactoProps = {
    mostrarNotificacion: (texto: string, tipo: string) => void;
};

function FormularioContacto({ mostrarNotificacion }: FormularioContactoProps) {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    const validarEnvioMSG = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (nombre.trim() === "") {
            mostrarNotificacion("Debe ingresar su nombre", "error");
            return;
        }

        if (correo.trim() === "") {
            mostrarNotificacion("Debe ingresar su correo", "error");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            mostrarNotificacion("Ingrese un correo válido", "error");
            return;
        }

        if (mensaje.trim() === "") {
            mostrarNotificacion("Debe ingresar un mensaje", "error");
            return;
        }

        mostrarNotificacion("Formulario enviado correctamente", "exito");
    };

    return(
        <form onSubmit={validarEnvioMSG} noValidate>
            <CampoFormulario etiqueta="Nombre Completo" tipo="text" nombre="nombre" valor={nombre} alCambiar={setNombre}/>

            <CampoFormulario etiqueta="Correo Electrónico" tipo="email" nombre="correo" valor={correo} alCambiar={setCorreo}/>

            <CampoFormulario etiqueta="Mensaje" tipo="text" nombre="mensaje"valor={mensaje} alCambiar={setMensaje}/>

            <button type="submit" className="btn boton-tienda">Enviar Mensaje</button>

        </form>

    );
}

export default FormularioContacto