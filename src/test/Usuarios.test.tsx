import { test, expect } from "vitest";
import {
    listarUsuarios,
    buscarUsuario,
    crearUsuario,
    editarUsuario,
    cambiarEstado,
    correoRepetido
} from "../servicios/Usuarios";

test("Parte con los tres usuarios de la tienda", () => {
    const usuarios = listarUsuarios();

    expect(usuarios.length).toBe(3);
    expect(usuarios[0].rol).toBe("administrador");
});

test("Crea un usuario nuevo y queda activo", () => {
    const cantidadAntes = listarUsuarios().length;

    const nuevo = crearUsuario("Marta Vega", "marta@sonidovivo.cl", "vendedor");

    expect(listarUsuarios().length).toBe(cantidadAntes + 1);
    expect(nuevo.activo).toBe(true);
    expect(nuevo.rol).toBe("vendedor");
});

test("Edita el nombre y el rol de un usuario", () => {
    const creado = crearUsuario("Luis Pena", "luis@sonidovivo.cl", "cliente");

    editarUsuario(creado.id, "Luis Pena Soto", "luis@sonidovivo.cl", "administrador");

    const editado = buscarUsuario(creado.id);

    expect(editado?.nombre).toBe("Luis Pena Soto");
    expect(editado?.rol).toBe("administrador");
});

test("Desactiva y vuelve a activar un usuario", () => {
    const creado = crearUsuario("Rosa Lillo", "rosa@sonidovivo.cl", "cliente");

    cambiarEstado(creado.id);
    expect(buscarUsuario(creado.id)?.activo).toBe(false);

    cambiarEstado(creado.id);
    expect(buscarUsuario(creado.id)?.activo).toBe(true);
});

test("Detecta cuando un correo ya esta registrado", () => {
    expect(correoRepetido("admin@sonidovivo.cl", 0)).toBe(true);
    expect(correoRepetido("nadie@sonidovivo.cl", 0)).toBe(false);
});

test("No marca como repetido el correo del usuario que se esta editando", () => {
    expect(correoRepetido("admin@sonidovivo.cl", 1)).toBe(false);
});
