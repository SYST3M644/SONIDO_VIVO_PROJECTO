export type Mensajeria = {
    id: number;
    nombreCompleto: string;
    correo: string;
    mensaje: string;
    estado: string;
    fechaCreacion: string;
}

const API = "http://localhost:6464/api/contactos";

export async function enviarMensaje(nombreCompleto: string, correo: string, mensaje: string) {
    const respuesta = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombreCompleto: nombreCompleto,
            correo: correo,
            mensaje: mensaje,
        }),
    });

    if (!respuesta.ok) {
        throw new Error("Error HTTP " + respuesta.status);
    }

    return await respuesta.json();
}

export async function listarMensajes(token: string): Promise<Mensajeria[]> {
    const respuesta = await fetch(API, {
        headers: {
            "Authorization": "Bearer " + token,
        },
    });

    if (!respuesta.ok) {
        throw new Error("Error HTTP " + respuesta.status);
    }

    return await respuesta.json();
}

export async function marcarComoRecibido(id: number, token: string) {
    const respuesta = await fetch(API + "/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    });

    if (!respuesta.ok) {
        throw new Error("Error HTTP " + respuesta.status);
    }

    return await respuesta.json();
}
