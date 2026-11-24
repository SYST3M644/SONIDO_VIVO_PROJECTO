// @vitest-environment jsdom

import { test, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import FormularioRegistro from "../componentes/organismos/FormularioRegistro";
import type { Usuario } from "../servicios/Autenticacion";

vi.mock("../servicios/Autenticacion", () => ({
    registrarCliente: (nombre: string, correo: string) => {
        if (correo === "admin@sonidovivo.cl") {
            return Promise.reject(new Error("Ese correo ya esta registrado"));
        }

        return Promise.resolve({
            nombre: nombre,
            correo: correo,
            rol: "cliente",
            token: "token-de-prueba"
        });
    }
}));

afterEach(cleanup);

let usuarioGuardado: Usuario | null = null;

function mostrarFormulario() {
    usuarioGuardado = null;

    render(
        <MemoryRouter>
            <FormularioRegistro guardarUsuario={(usuario) => { usuarioGuardado = usuario; }} />
        </MemoryRouter>
    );
}

function escribir(campo: string, valor: string) {
    fireEvent.change(screen.getByPlaceholderText(campo), {
        target: { value: valor }
    });
}

function llenarTodo(correo: string) {
    escribir("nombre", "Javiera Mora");
    escribir("correo", correo);
    escribir("contraseña", "clave12345");
    escribir("repetir contraseña", "clave12345");
}

function presionarCrear() {
    fireEvent.click(screen.getByRole("button", { name: "Crear cuenta" }));
}

test("Avisa cuando falta el nombre", () => {
    mostrarFormulario();
    presionarCrear();

    expect(screen.getByText("Debe ingresar su nombre")).toBeDefined();
});

test("Avisa cuando las contraseñas no coinciden", () => {
    mostrarFormulario();
    escribir("nombre", "Javiera Mora");
    escribir("correo", "javiera@sonidovivo.cl");
    escribir("contraseña", "clave12345");
    escribir("repetir contraseña", "otraclave1");
    presionarCrear();

    expect(screen.getByText("Las contraseñas no coinciden")).toBeDefined();
});

test("Crea la cuenta como cliente y deja la sesion iniciada", async () => {
    mostrarFormulario();
    llenarTodo("javiera@sonidovivo.cl");
    presionarCrear();

    await screen.findByRole("button", { name: "Crear cuenta" });

    expect(usuarioGuardado).not.toBeNull();
    expect(usuarioGuardado!.rol).toBe("cliente");
});

test("Avisa cuando el correo ya esta registrado", async () => {
    mostrarFormulario();
    llenarTodo("admin@sonidovivo.cl");
    presionarCrear();

    expect(await screen.findByText("Ese correo ya está registrado")).toBeDefined();
});
