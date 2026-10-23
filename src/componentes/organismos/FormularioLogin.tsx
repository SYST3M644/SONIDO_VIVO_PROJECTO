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
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("error");

    const validarLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setTipoMensaje("error");

        if (correo.trim() === "") {
            setMensaje("Debe ingresar su correo electrónico");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            setMensaje("Ingrese un correo válido");
            return;
        }

        if (contrasena.trim() === "" || contrasena.length < 8) {
            setMensaje("Debe ingresar una contraseña de al menos 8 caracteres");
            return;
        }

        const usuario = iniciarSesion(correo, contrasena);

        if (usuario === null) {
            setMensaje("Correo o contraseña incorrectos");
            return;
        }

        guardarUsuario(usuario);
        setTipoMensaje("exito");
        setMensaje("Bienvenido " + usuario.nombre);
    };

    let estiloMensaje = "mensaje-error";

    if (tipoMensaje === "exito") {
        estiloMensaje = "mensaje-exito";
    }

    return(
        <form onSubmit={validarLogin} noValidate>

            <CampoFormulario etiqueta="Correo Electrónico" tipo="email" nombre="correo" valor={correo} alCambiar={setCorreo}/>

            <CampoFormulario etiqueta="Contraseña" tipo="password" nombre="contraseña"valor={contrasena} alCambiar={setContrasena}/>

            {mensaje !== "" && (
                <p className={estiloMensaje}>{mensaje}</p>
            )}

            <button type="submit" className="btn boton-tienda">Ingresar</button>

        </form>

    );
}

export default FormularioLogin
