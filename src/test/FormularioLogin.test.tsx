// @vitest-environment jsdom

import { test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import FormularioLogin from "../componentes/organismos/FormularioLogin";

afterEach(cleanup);

function mostrarFormulario() {
    render(
        <MemoryRouter>
            <FormularioLogin />
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
    const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

    mostrarFormulario();
    presionarIngresar();

    expect(alerta).toHaveBeenCalledWith("Debe ingresar su correo");

    alerta.mockRestore();
});

test("Avisa cuando el correo no tiene formato valido", () => {
    const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

    mostrarFormulario();
    escribir("correo", "correo-sin-arroba");
    presionarIngresar();

    expect(alerta).toHaveBeenCalledWith("Ingrese un correo válido");

    alerta.mockRestore();
});

test("Avisa cuando la contraseña tiene menos de 8 caracteres", () => {
    const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

    mostrarFormulario();
    escribir("correo", "admin@sonidovivo.cl");
    escribir("contraseña", "1234");
    presionarIngresar();

    expect(alerta).toHaveBeenCalledWith("Debe ingresar una contraseña de al menos 8 caracteres");

    alerta.mockRestore();
});

test("Avisa cuando las credenciales no coinciden", () => {
    const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

    mostrarFormulario();
    escribir("correo", "admin@sonidovivo.cl");
    escribir("contraseña", "claveincorrecta");
    presionarIngresar();

    expect(alerta).toHaveBeenCalledWith("Correo o contraseña incorrectos");

    alerta.mockRestore();
});

test("No muestra ninguna alerta cuando las credenciales son correctas", () => {
    const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

    mostrarFormulario();
    escribir("correo", "admin@sonidovivo.cl");
    escribir("contraseña", "admin123");
    presionarIngresar();

    expect(alerta).not.toHaveBeenCalled();

    alerta.mockRestore();
});
