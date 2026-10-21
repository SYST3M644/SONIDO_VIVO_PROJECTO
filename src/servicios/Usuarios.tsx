export type Usuario = {
    id: number;
    nombre: string;
    correo: string;
    rol: string;
    activo: boolean;
}

export const roles = ["administrador", "vendedor", "cliente"];

let usuarios: Usuario[] = [
    {
        id: 1,
        nombre: "Carlos Rojas",
        correo: "admin@sonidovivo.cl",
        rol: "administrador",
        activo: true
    },
    {
        id: 2,
        nombre: "Ana Soto",
        correo: "vendedor@sonidovivo.cl",
        rol: "vendedor",
        activo: true
    },
    {
        id: 3,
        nombre: "Pedro Diaz",
        correo: "cliente@sonidovivo.cl",
        rol: "cliente",
        activo: true
    }
];

export function listarUsuarios() {
    return usuarios;
}

export function buscarUsuario(id: number) {
    return usuarios.find(usuario => usuario.id === id);
}

export function crearUsuario(nombre: string, correo: string, rol: string) {
    let mayorId = 0;

    for (const usuario of usuarios) {
        if (usuario.id > mayorId) {
            mayorId = usuario.id;
        }
    }

    const nuevo = {
        id: mayorId + 1,
        nombre: nombre,
        correo: correo,
        rol: rol,
        activo: true
    };

    usuarios = [...usuarios, nuevo];

    return nuevo;
}

export function editarUsuario(id: number, nombre: string, correo: string, rol: string) {
    usuarios = usuarios.map(usuario => {
        if (usuario.id === id) {
            return { ...usuario, nombre: nombre, correo: correo, rol: rol };
        }
        return usuario;
    });
}

export function cambiarEstado(id: number) {
    usuarios = usuarios.map(usuario => {
        if (usuario.id === id) {
            return { ...usuario, activo: !usuario.activo };
        }
        return usuario;
    });
}

export function correoRepetido(correo: string, idActual: number) {
    const encontrado = usuarios.find(usuario => usuario.correo === correo);

    if (encontrado === undefined) {
        return false;
    }

    return encontrado.id !== idActual;
}
