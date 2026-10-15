import { test, expect } from "vitest";
import { iniciarSesion } from "../servicios/Autenticacion";

test("Permite entrar con las credenciales correctas", () => {
    const usuario = iniciarSesion("admin@sonidovivo.cl", "admin123");

    expect(usuario).not.toBeNull();
    expect(usuario?.nombre).toBe("Carlos Rojas");
});

test("Rechaza una contraseña incorrecta", () => {
    const usuario = iniciarSesion("admin@sonidovivo.cl", "otraclave");

    expect(usuario).toBeNull();
});

test("Rechaza un correo que no esta registrado", () => {
    const usuario = iniciarSesion("nadie@sonidovivo.cl", "admin123");

    expect(usuario).toBeNull();
});

test("Entrega el rol que corresponde a cada usuario", () => {
    expect(iniciarSesion("admin@sonidovivo.cl", "admin123")?.rol).toBe("administrador");
    expect(iniciarSesion("vendedor@sonidovivo.cl", "vende123")?.rol).toBe("vendedor");
    expect(iniciarSesion("cliente@sonidovivo.cl", "cliente123")?.rol).toBe("cliente");
});

test("Entrega un token al iniciar sesion", () => {
    const usuario = iniciarSesion("cliente@sonidovivo.cl", "cliente123");

    expect(usuario?.token).toBe("token-de-prueba");
});
