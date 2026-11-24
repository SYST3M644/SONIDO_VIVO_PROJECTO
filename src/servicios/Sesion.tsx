import type { Usuario } from "./Autenticacion";

const CLAVE_SESION = "sonidovivo-sesion";

// Lee la fecha de vencimiento que viene dentro del token JWT
export function vencimientoToken(token: string) {
    try {
        const partes = token.split(".");
        const datos = JSON.parse(atob(partes[1].replace(/-/g, "+").replace(/_/g, "/")));

        return datos.exp * 1000;
    } catch {
        return 0;
    }
}

export function tokenVencido(token: string) {
    return Date.now() >= vencimientoToken(token);
}

export function guardarSesion(usuario: Usuario) {
    localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
}

export function borrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
}

// Al recargar la página se recupera el usuario guardado.
// Si el token ya venció, la sesión se borra y hay que entrar de nuevo.
export function leerSesion(): Usuario | null {
    const texto = localStorage.getItem(CLAVE_SESION);

    if (texto === null) {
        return null;
    }

    try {
        const usuario: Usuario = JSON.parse(texto);

        if (tokenVencido(usuario.token)) {
            borrarSesion();
            return null;
        }

        return usuario;
    } catch {
        borrarSesion();
        return null;
    }
}
