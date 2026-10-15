import { useState } from "react";
import type { ReactNode } from "react";
import type { Usuario } from "../servicios/Autenticacion";
import { SesionContext } from "./SesionContext";

function ProveedorSesion({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const guardarUsuario = (nuevoUsuario: Usuario) => {
        setUsuario(nuevoUsuario);
    };

    const cerrarSesion = () => {
        setUsuario(null);
    };

    return (
        <SesionContext.Provider value={{ usuario, guardarUsuario, cerrarSesion }}>
            {children}
        </SesionContext.Provider>
    );
}

export default ProveedorSesion
