export type Producto = {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string;
    stock: number;
    categoria: string;
};

export type ProductoCarrito = {
    id: number;
    titulo: string;
    precio: number;
    imagen: string;
    cantidad: number;
};

const API = "http://localhost:6464/api/productos";

export function urlImagen(imagen: string) {
    return API + "/imagenes/" + imagen;
}

export async function listarProductos(): Promise<Producto[]> {
    const respuesta = await fetch(API);

    if (!respuesta.ok) {
        throw new Error("Error HTTP " + respuesta.status);
    }

    return await respuesta.json();
}

export async function buscarProducto(id: number): Promise<Producto> {
    const respuesta = await fetch(API + "/" + id);

    if (!respuesta.ok) {
        throw new Error("Error HTTP " + respuesta.status);
    }

    return await respuesta.json();
}

export async function descontarStock(id: number, cantidad: number): Promise<Producto> {
    const respuesta = await fetch(API + "/" + id + "/descontar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock: cantidad }),
    });

    if (!respuesta.ok) {
        throw new Error("Error HTTP " + respuesta.status);
    }

    return await respuesta.json();
}

export async function actualizarStock(id: number, stock: number): Promise<Producto> {
    const respuesta = await fetch(API + "/" + id + "/stock", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock: stock }),
    });

    if (!respuesta.ok) {
        throw new Error("Error HTTP " + respuesta.status);
    }

    return await respuesta.json();
}
