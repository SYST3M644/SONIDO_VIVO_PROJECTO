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

export function rutaSegunRol(rol: string) {
    if (rol === "administrador") {
        return "/admin";
    }

    if (rol === "vendedor") {
        return "/vendedor";
    }

    return "/productos";
}
