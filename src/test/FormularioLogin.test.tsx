// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import FormularioLogin from "../componentes/organismos/FormularioLogin";
import type { Usuario } from "../servicios/Autenticacion";

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

test("Avisa cuando las credenciales no coinciden", () => {
    mostrarFormulario();
    escribir("correo", "admin@sonidovivo.cl");
    escribir("contraseña", "claveincorrecta");
    presionarIngresar();

    expect(screen.getByText("Correo o contraseña incorrectos")).toBeDefined();
    expect(usuarioGuardado).toBeNull();
});

test("Guarda el usuario cuando las credenciales son correctas", () => {
    mostrarFormulario();
    escribir("correo", "admin@sonidovivo.cl");
    escribir("contraseña", "admin123");
    presionarIngresar();

    const bienvenida = screen.getByText("Bienvenido Carlos Rojas");

    expect(usuarioGuardado).not.toBeNull();
    expect(bienvenida.className).toBe("mensaje-exito");
});
