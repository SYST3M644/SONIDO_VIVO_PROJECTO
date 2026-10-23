// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import FormularioContacto from "../componentes/organismos/FormularioContacto";

afterEach(cleanup);

let mensaje = "";
let tipoMensaje = "";

function mostrarFormulario() {
    mensaje = "";
    tipoMensaje = "";

    render(
        <FormularioContacto
            mostrarNotificacion={(texto, tipo) => { mensaje = texto; tipoMensaje = tipo; }}
        />
    );
}

function escribir(campo: string, valor: string) {
    fireEvent.change(screen.getByPlaceholderText(campo), {
        target: { value: valor }
    });
}

function presionarEnviar() {
    fireEvent.click(screen.getByRole("button", { name: "Enviar Mensaje" }));
}

test("Avisa cuando el nombre esta vacio", () => {
    mostrarFormulario();
    presionarEnviar();

    expect(mensaje).toBe("Debe ingresar su nombre");
    expect(tipoMensaje).toBe("error");
});

test("Avisa cuando falta el mensaje", () => {
    mostrarFormulario();
    escribir("nombre", "Pedro Diaz");
    escribir("correo", "pedro@sonidovivo.cl");
    presionarEnviar();

    expect(mensaje).toBe("Debe ingresar un mensaje");
});

test("Confirma cuando el formulario esta completo", () => {
    mostrarFormulario();
    escribir("nombre", "Pedro Diaz");
    escribir("correo", "pedro@sonidovivo.cl");
    escribir("mensaje", "Quiero cotizar una guitarra");
    presionarEnviar();

    expect(mensaje).toBe("Formulario enviado correctamente");
    expect(tipoMensaje).toBe("exito");
});
