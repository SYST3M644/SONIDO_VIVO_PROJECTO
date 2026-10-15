import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Usuario } from "../servicios/autenticacion";

type Sesion = {
    usuario: Usuario | null;
    guardarUsuario: (usuario: Usuario) => void;
    cerrarSesion: () => void;
}

const SesionContext = createContext<Sesion>({
    usuario: null,
    guardarUsuario: () => {},
    cerrarSesion: () => {}
});

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

function useSesion() {
    return useContext(SesionContext);
}

export { ProveedorSesion, useSesion }
