export type Usuario = {
    id: number;
    nombre: string;
    correo: string;
    rol: string;
    activo: boolean;
}

export const roles = ["administrador", "vendedor", "cliente"];

const API = "http://localhost:6464/api/usuarios";

function autorizacion(token: string) {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
    };
}

// Si el backend manda un mensaje de error (por ejemplo correo repetido), se usa ese
async function revisarRespuesta(respuesta: Response) {
    if (!respuesta.ok) {
        const detalle = await respuesta.json().catch(() => null);

        if (detalle !== null && detalle.message) {
            throw new Error(detalle.message);
        }

        throw new Error("Error HTTP " + respuesta.status);
    }
}

export async function listarUsuarios(token: string): Promise<Usuario[]> {
    const respuesta = await fetch(API, {
        headers: autorizacion(token),
    });

    await revisarRespuesta(respuesta);

    return await respuesta.json();
}

export async function crearUsuario(nombre: string, correo: string, clave: string, rol: string, token: string): Promise<Usuario> {
    const respuesta = await fetch(API, {
        method: "POST",
        headers: autorizacion(token),
        body: JSON.stringify({ nombre: nombre, correo: correo, clave: clave, rol: rol }),
    });

    await revisarRespuesta(respuesta);

    return await respuesta.json();
}

export async function editarUsuario(id: number, nombre: string, correo: string, rol: string, token: string): Promise<Usuario> {
    const respuesta = await fetch(API + "/" + id, {
        method: "PUT",
        headers: autorizacion(token),
        body: JSON.stringify({ nombre: nombre, correo: correo, rol: rol }),
    });

    await revisarRespuesta(respuesta);

    return await respuesta.json();
}

export async function cambiarEstado(id: number, token: string): Promise<Usuario> {
    const respuesta = await fetch(API + "/" + id + "/estado", {
        method: "PUT",
        headers: autorizacion(token),
    });

    await revisarRespuesta(respuesta);

    return await respuesta.json();
}

export async function eliminarUsuario(id: number, token: string) {
    const respuesta = await fetch(API + "/" + id, {
        method: "DELETE",
        headers: autorizacion(token),
    });

    await revisarRespuesta(respuesta);
}
