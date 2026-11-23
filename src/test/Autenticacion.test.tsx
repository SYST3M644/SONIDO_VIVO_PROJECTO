import { test, expect, vi, afterEach } from "vitest";
import { iniciarSesion, rutaSegunRol } from "../servicios/Autenticacion";

afterEach(() => {
    vi.restoreAllMocks();
});

const respuestaLogin = {
    nombre: "Carlos Rojas",
    correo: "admin@sonidovivo.cl",
    rol: "administrador",
    token: "token-de-prueba"
};

test("Envia el correo y la clave al microservicio de usuarios", async () => {
    const peticion = vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => respuestaLogin
    } as Response);

    const usuario = await iniciarSesion("admin@sonidovivo.cl", "admin123");

    expect(peticion).toHaveBeenCalledWith(
        "http://localhost:6464/api/auth/login",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo: "admin@sonidovivo.cl", clave: "admin123" })
        }
    );
    expect(usuario.rol).toBe("administrador");
    expect(usuario.token).toBe("token-de-prueba");
});

test("Avisa cuando las credenciales son incorrectas", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: false,
        status: 401
    } as Response);

    await expect(iniciarSesion("admin@sonidovivo.cl", "claveMala"))
        .rejects.toThrow("Correo o contraseña incorrectos");
});

test("Avisa cuando el servidor falla", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: false,
        status: 500
    } as Response);

    await expect(iniciarSesion("admin@sonidovivo.cl", "admin123"))
        .rejects.toThrow("Error HTTP 500");
});

test("Cada rol tiene su vista de inicio", () => {
    expect(rutaSegunRol("administrador")).toBe("/admin");
    expect(rutaSegunRol("vendedor")).toBe("/vendedor");
    expect(rutaSegunRol("cliente")).toBe("/productos");
});
