import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";

function FormularioContacto() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    const validarEnvioMSG = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (nombre.trim() === "") {
            alert("Debe ingresar su nombre");
            return;
        }

        if (correo.trim() === "") {
            alert("Debe ingresar su correo");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            alert("Ingrese un correo válido");
            return;
        }

        if (mensaje.trim() === "") {
            alert("Debe ingresar un mensaje");
            return;
        }

        alert("Formulario enviado correctamente");
    };

    return(
        <form onSubmit={validarEnvioMSG} noValidate>
            <CampoFormulario etiqueta="Nombre Completo" tipo="text" nombre="nombre" valor={nombre} alCambiar={setNombre}/>

            <CampoFormulario etiqueta="Correo Electrónico" tipo="email" nombre="correo" valor={correo} alCambiar={setCorreo}/>

            <CampoFormulario etiqueta="Mensaje" tipo="text" nombre="mensaje"valor={mensaje} alCambiar={setMensaje}/>

            <button type="submit" className="btn btn-dark">Enviar Mensaje</button>

        </form>

    );
}

export default FormularioContacto