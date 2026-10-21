import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import { iniciarSesion } from "../../servicios/Autenticacion";
import type { Usuario } from "../../servicios/Autenticacion";

type FormularioLoginProps = {
    guardarUsuario: (usuario: Usuario) => void;
};

function FormularioLogin({ guardarUsuario }: FormularioLoginProps) {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    const validarLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (correo.trim() === "") {
            alert("Debe ingresar su correo electrónico");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            alert("Ingrese un correo válido");
            return;
        }

        if (contrasena.trim() === "" || contrasena.length < 8) {
            alert("Debe ingresar una contraseña de al menos 8 caracteres");
            return;
        }

        const usuario = iniciarSesion(correo, contrasena);

        if (usuario === null) {
            alert("Correo o contraseña incorrectos");
            return;
        }

        guardarUsuario(usuario);
        alert("Bienvenido " + usuario.nombre);
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
