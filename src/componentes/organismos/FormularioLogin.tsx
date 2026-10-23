import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import { iniciarSesion } from "../../servicios/Autenticacion";
import type { Usuario } from "../../servicios/Autenticacion";

type FormularioLoginProps = {
    guardarUsuario: (usuario: Usuario) => void;
    mostrarNotificacion: (texto: string, tipo: string) => void;
};

function FormularioLogin({ guardarUsuario, mostrarNotificacion }: FormularioLoginProps) {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    const validarLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (correo.trim() === "") {
            mostrarNotificacion("Debe ingresar su correo electrónico", "error");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            mostrarNotificacion("Ingrese un correo válido", "error");
            return;
        }

        if (contrasena.trim() === "" || contrasena.length < 8) {
            mostrarNotificacion("Debe ingresar una contraseña de al menos 8 caracteres", "error");
            return;
        }

        const usuario = iniciarSesion(correo, contrasena);

        if (usuario === null) {
            mostrarNotificacion("Correo o contraseña incorrectos", "error");
            return;
        }

        guardarUsuario(usuario);
        mostrarNotificacion("Bienvenido " + usuario.nombre, "exito");
    };

    return(
        <form onSubmit={validarLogin} noValidate>

            <CampoFormulario etiqueta="Correo Electrónico" tipo="email" nombre="correo" valor={correo} alCambiar={setCorreo}/>

            <CampoFormulario etiqueta="Contraseña" tipo="password" nombre="contraseña"valor={contrasena} alCambiar={setContrasena}/>

            <button type="submit" className="btn boton-tienda">Ingresar</button>

        </form>

    );
}

export default FormularioLogin
