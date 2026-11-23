// @vitest-environment jsdom

import { test, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import FormularioLogin from "../componentes/organismos/FormularioLogin";
import type { Usuario } from "../servicios/Autenticacion";

vi.mock("../servicios/Autenticacion", () => ({
    iniciarSesion: (correo: string, clave: string) => {
        if (correo === "admin@sonidovivo.cl" && clave === "admin123") {
            return Promise.resolve({
                nombre: "Carlos Rojas",
                correo: "admin@sonidovivo.cl",
                rol: "administrador",
                token: "token-de-prueba"
            });
        }

        return Promise.reject(new Error("Correo o contraseña incorrectos"));
    },
    rutaSegunRol: () => "/admin"
}));

afterEach(cleanup);

let usuarioGuardado: Usuario | null = null;

function mostrarFormulario() {
    usuarioGuardado = null;

    render(
        <MemoryRouter>
            <FormularioLogin guardarUsuario={(usuario) => { usuarioGuardado = usuario; }} />
        </MemoryRouter>
    );
}

function escribir(campo: string, valor: string) {
    fireEvent.change(screen.getByPlaceholderText(campo), {
        target: { value: valor }
    });
}

function presionarIngresar() {
    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));
}

test("Avisa debajo del formulario cuando el correo esta vacio", () => {
    mostrarFormulario();
    presionarIngresar();

    const aviso = screen.getByText("Debe ingresar su correo electrónico");

    expect(aviso).toBeDefined();
    expect(aviso.className).toBe("mensaje-error");
});

test("Avisa cuando el correo no tiene formato valido", () => {
    mostrarFormulario();
    escribir("correo", "correo-sin-arroba");
    presionarIngresar();

    expect(screen.getByText("Ingrese un correo válido")).toBeDefined();
});

test("Avisa cuando la contraseña tiene menos de 8 caracteres", () => {
    mostrarFormulario();
    escribir("correo", "admin@sonidovivo.cl");
    escribir("contraseña", "1234");
    presionarIngresar();

    expect(screen.getByText("Debe ingresar una contraseña de al menos 8 caracteres")).toBeDefined();
});

test("Avisa cuando las credenciales no coinciden", async () => {
    mostrarFormulario();
    escribir("correo", "admin@sonidovivo.cl");
    escribir("contraseña", "claveincorrecta");
    presionarIngresar();

    expect(await screen.findByText("Correo o contraseña incorrectos")).toBeDefined();
    expect(usuarioGuardado).toBeNull();
});

test("Guarda el usuario cuando las credenciales son correctas", async () => {
    mostrarFormulario();
    escribir("correo", "admin@sonidovivo.cl");
    escribir("contraseña", "admin123");
    presionarIngresar();

    const bienvenida = await screen.findByText("Bienvenido Carlos Rojas");

    expect(usuarioGuardado).not.toBeNull();
    expect(bienvenida.className).toBe("mensaje-exito");
});
