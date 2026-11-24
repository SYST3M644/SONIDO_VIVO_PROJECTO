import { test, expect, vi, afterEach } from "vitest";
import { listarUsuarios, crearUsuario, cambiarEstado, eliminarUsuario } from "../servicios/Usuarios";

afterEach(() => {
    vi.restoreAllMocks();
});

const cabeceras = { "Content-Type": "application/json", "Authorization": "Bearer token-admin" };

test("Pide la lista de usuarios con el token del administrador", async () => {
    const peticion = vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => [{ id: 1, nombre: "Carlos Rojas", correo: "admin@sonidovivo.cl", rol: "administrador", activo: true }]
    } as Response);

    const usuarios = await listarUsuarios("token-admin");

    expect(peticion).toHaveBeenCalledWith("http://localhost:6464/api/usuarios", { headers: cabeceras });
    expect(usuarios.length).toBe(1);
});

test("Crea un usuario con el metodo POST", async () => {
    const peticion = vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({ id: 4, nombre: "Marta Vega", correo: "marta@sonidovivo.cl", rol: "vendedor", activo: true })
    } as Response);

    const nuevo = await crearUsuario("Marta Vega", "marta@sonidovivo.cl", "clave12345", "vendedor", "token-admin");

    expect(peticion).toHaveBeenCalledWith("http://localhost:6464/api/usuarios", {
        method: "POST",
        headers: cabeceras,
        body: JSON.stringify({ nombre: "Marta Vega", correo: "marta@sonidovivo.cl", clave: "clave12345", rol: "vendedor" })
    });
    expect(nuevo.activo).toBe(true);
});

test("Muestra el mensaje del backend cuando el correo esta repetido", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ message: "Ese correo ya esta registrado" })
    } as Response);

    await expect(crearUsuario("Otro", "admin@sonidovivo.cl", "clave12345", "cliente", "token-admin"))
        .rejects.toThrow("Ese correo ya esta registrado");
});

test("Activa o desactiva un usuario con PUT", async () => {
    const peticion = vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({ id: 3, activo: false })
    } as Response);

    await cambiarEstado(3, "token-admin");

    expect(peticion).toHaveBeenCalledWith("http://localhost:6464/api/usuarios/3/estado", {
        method: "PUT",
        headers: cabeceras
    });
});

test("Elimina un usuario con DELETE", async () => {
    const peticion = vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        status: 204
    } as Response);

    await eliminarUsuario(3, "token-admin");

    expect(peticion).toHaveBeenCalledWith("http://localhost:6464/api/usuarios/3", {
        method: "DELETE",
        headers: cabeceras
    });
});

test("Si el token no tiene permiso avisa con el codigo 403", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: false,
        status: 403,
        json: async () => { throw new Error("sin cuerpo"); }
    } as unknown as Response);

    await expect(listarUsuarios("token-cliente")).rejects.toThrow("Error HTTP 403");
});
