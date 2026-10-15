export type Usuario = {
    correo: string;
    nombre: string;
    rol: string;
    token: string;
}

const usuarios = [
    {
        correo: "admin@sonidovivo.cl",
        clave: "admin123",
        nombre: "Carlos Rojas",
        rol: "administrador"
    },
    {
        correo: "vendedor@sonidovivo.cl",
        clave: "vende123",
        nombre: "Ana Soto",
        rol: "vendedor"
    },
    {
        correo: "cliente@sonidovivo.cl",
        clave: "cliente123",
        nombre: "Pedro Diaz",
        rol: "cliente"
    }
];

export function iniciarSesion(correo: string, clave: string) {
    const encontrado = usuarios.find(
        usuario => usuario.correo === correo && usuario.clave === clave
    );

    if (encontrado === undefined) {
        return null;
    }

    return {
        correo: encontrado.correo,
        nombre: encontrado.nombre,
        rol: encontrado.rol,
        token: "token-de-prueba"
    };
}
