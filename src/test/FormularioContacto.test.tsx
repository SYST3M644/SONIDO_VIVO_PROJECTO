// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import FormularioContacto from "../componentes/organismos/FormularioContacto";

afterEach(cleanup);

function escribir(campo: string, valor: string) {
    fireEvent.change(screen.getByPlaceholderText(campo), {
        target: { value: valor }
    });
}

function presionarEnviar() {
    fireEvent.click(screen.getByRole("button", { name: "Enviar Mensaje" }));
}

test("Avisa debajo del formulario cuando el nombre esta vacio", () => {
    render(<FormularioContacto />);
    presionarEnviar();

    expect(screen.getByText("Debe ingresar su nombre")).toBeDefined();
});

test("Avisa cuando falta el mensaje", () => {
    render(<FormularioContacto />);
    escribir("nombre", "Pedro Diaz");
    escribir("correo", "pedro@sonidovivo.cl");
    presionarEnviar();

    expect(screen.getByText("Debe ingresar un mensaje")).toBeDefined();
});

test("Confirma cuando el formulario esta completo", () => {
    render(<FormularioContacto />);
    escribir("nombre", "Pedro Diaz");
    escribir("correo", "pedro@sonidovivo.cl");
    escribir("mensaje", "Quiero cotizar una guitarra");
    presionarEnviar();

    const confirmacion = screen.getByText("Formulario enviado correctamente");

    expect(confirmacion).toBeDefined();
    expect(confirmacion.className).toBe("mensaje-exito");
});
