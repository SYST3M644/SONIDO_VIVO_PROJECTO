// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import FormularioLogin from "../componentes/organismos/FormularioLogin";
import type { Usuario } from "../servicios/Autenticacion";

afterEach(cleanup);

let usuarioGuardado: Usuario | null = null;
let mensaje = "";
let tipoMensaje = "";

function mostrarFormulario() {
    usuarioGuardado = null;
    mensaje = "";
    tipoMensaje = "";

    render(
        <MemoryRouter>
            <FormularioLogin
                guardarUsuario={(usuario) => { usuarioGuardado = usuario; }}
                mostrarNotificacion={(texto, tipo) => { mensaje = texto; tipoMensaje = tipo; }}
            />
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

test("Avisa cuando el correo esta vacio", () => {
    mostrarFormulario();
    presionarIngresar();

    expect(mensaje).toBe("Debe ingresar su correo electrónico");
    expect(tipoMensaje).toBe("error");
});

test("Avisa cuando el correo no tiene formato valido", () => {
    mostrarFormulario();
    escribir("correo", "correo-sin-arroba");
    presionarIngresar();

    expect(mensaje).toBe("Ingrese un correo válido");
});

test("Avisa cuando la contraseña tiene menos de 8 caracteres", () => {
    mostrarFormulario();
    escribir("correo", "admin@sonidovivo.cl");
    escribir("contraseña", "1234");
    presionarIngresar();

    expect(mensaje).toBe("Debe ingresar una contraseña de al menos 8 caracteres");
});

test("Avisa cuando las credenciales no coinciden", () => {
    mostrarFormulario();
    escribir("correo", "admin@sonidovivo.cl");
    escribir("contraseña", "claveincorrecta");
    presionarIngresar();

    expect(mensaje).toBe("Correo o contraseña incorrectos");
    expect(usuarioGuardado).toBeNull();
});

test("Guarda el usuario cuando las credenciales son correctas", () => {
    mostrarFormulario();
    escribir("correo", "admin@sonidovivo.cl");
    escribir("contraseña", "admin123");
    presionarIngresar();

    expect(usuarioGuardado).not.toBeNull();
    expect(mensaje).toBe("Bienvenido Carlos Rojas");
    expect(tipoMensaje).toBe("exito");
});
