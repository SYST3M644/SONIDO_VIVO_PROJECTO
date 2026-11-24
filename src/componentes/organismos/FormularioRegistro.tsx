import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { registrarCliente } from "../../servicios/Autenticacion";
import type { Usuario } from "../../servicios/Autenticacion";

type FormularioRegistroProps = {
    guardarUsuario: (usuario: Usuario) => void;
};

function FormularioRegistro({ guardarUsuario }: FormularioRegistroProps) {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [repetir, setRepetir] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [registrando, setRegistrando] = useState(false);

    const navegar = useNavigate();

    const validarRegistro = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (nombre.trim() === "") {
            setMensaje("Debe ingresar su nombre");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            setMensaje("Ingrese un correo válido");
            return;
        }

        if (contrasena.length < 8) {
            setMensaje("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        if (contrasena !== repetir) {
            setMensaje("Las contraseñas no coinciden");
            return;
        }

        setRegistrando(true);

        try {
            const usuario = await registrarCliente(nombre.trim(), correo.trim(), contrasena);

            guardarUsuario(usuario);
            navegar("/productos");
        } catch (error) {
            if (error instanceof Error && error.message === "Ese correo ya esta registrado") {
                setMensaje("Ese correo ya está registrado");
            } else {
                setMensaje("No se pudo crear la cuenta, intente nuevamente");
            }
        } finally {
            setRegistrando(false);
        }
    };

    return (
        <form onSubmit={validarRegistro} noValidate>

            <CampoFormulario etiqueta="Nombre Completo" tipo="text" nombre="nombre" valor={nombre} alCambiar={setNombre} />

            <CampoFormulario etiqueta="Correo Electrónico" tipo="email" nombre="correo" valor={correo} alCambiar={setCorreo} />

            <CampoFormulario etiqueta="Contraseña" tipo="password" nombre="contraseña" valor={contrasena} alCambiar={setContrasena} />

            <CampoFormulario etiqueta="Repetir Contraseña" tipo="password" nombre="repetir contraseña" valor={repetir} alCambiar={setRepetir} />

            {mensaje !== "" && (
                <p className="mensaje-error">{mensaje}</p>
            )}

            <button type="submit" className="btn boton-tienda" disabled={registrando}>
                {registrando ? "Creando cuenta..." : "Crear cuenta"}
            </button>

        </form>
    );
}

export default FormularioRegistro
