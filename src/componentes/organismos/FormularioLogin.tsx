import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { iniciarSesion, rutaSegunRol } from "../../servicios/Autenticacion";
import type { Usuario } from "../../servicios/Autenticacion";

type FormularioLoginProps = {
    guardarUsuario: (usuario: Usuario) => void;
};

function FormularioLogin({ guardarUsuario }: FormularioLoginProps) {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("error");
    const [entrando, setEntrando] = useState(false);

    const navegar = useNavigate();

    const validarLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
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

        setEntrando(true);

        try {
            const usuario = await iniciarSesion(correo, contrasena);

            guardarUsuario(usuario);
            setTipoMensaje("exito");
            setMensaje("Bienvenido " + usuario.nombre);

            navegar(rutaSegunRol(usuario.rol));
        } catch (error) {
            setTipoMensaje("error");

            if (error instanceof Error && error.message === "Correo o contraseña incorrectos") {
                setMensaje("Correo o contraseña incorrectos");
            } else {
                setMensaje("No se pudo conectar con el servidor");
            }
        } finally {
            setEntrando(false);
        }
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

            <button type="submit" className="btn boton-tienda" disabled={entrando}>
                {entrando ? "Entrando..." : "Ingresar"}
            </button>

        </form>

    );
}

export default FormularioLogin
