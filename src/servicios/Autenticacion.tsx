export type Usuario = {
    correo: string;
    nombre: string;
    rol: string;
    token: string;
}

const API = "http://localhost:6464/api/auth";

export async function iniciarSesion(correo: string, clave: string): Promise<Usuario> {
    const respuesta = await fetch(API + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: correo, clave: clave }),
    });

    if (respuesta.status === 401) {
        throw new Error("Correo o contraseña incorrectos");
    }

    if (!respuesta.ok) {
        throw new Error("Error HTTP " + respuesta.status);
    }

    return await respuesta.json();
}

export async function registrarCliente(nombre: string, correo: string, clave: string): Promise<Usuario> {
    const respuesta = await fetch(API + "/registro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: nombre, correo: correo, clave: clave }),
    });

    if (!respuesta.ok) {
        const detalle = await respuesta.json().catch(() => null);

        if (detalle !== null && detalle.message) {
            throw new Error(detalle.message);
        }

        throw new Error("Error HTTP " + respuesta.status);
    }

    return await respuesta.json();
}

// Pide un token nuevo antes de que venza el actual
export async function renovarToken(token: string): Promise<Usuario> {
    const respuesta = await fetch(API + "/renovar", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
        },
    });

    if (!respuesta.ok) {
        throw new Error("Error HTTP " + respuesta.status);
    }

    return await respuesta.json();
}

export function rutaSegunRol(rol: string) {
    if (rol === "administrador") {
        return "/admin";
    }

    if (rol === "vendedor") {
        return "/vendedor";
    }

    return "/productos";
}
