import { createContext, useContext } from "react";
import type { Usuario } from "../servicios/Autenticacion";

export type Sesion = {
    usuario: Usuario | null;
    guardarUsuario: (usuario: Usuario) => void;
    cerrarSesion: () => void;
}

export const SesionContext = createContext<Sesion>({
    usuario: null,
    guardarUsuario: () => {},
    cerrarSesion: () => {}
});

export function useSesion() {
    return useContext(SesionContext);
}
