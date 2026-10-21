import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { useSesion } from "../../contexto/SesionContext";
import { iniciarSesion } from "../../servicios/Autenticacion";

function FormularioLogin() {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    const { guardarUsuario } = useSesion();
    const navegar = useNavigate();

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
        navegar("/productos");
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
