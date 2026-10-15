// @vitest-environment jsdom

import { test, expect, vi } from "vitest"; 
import { render, screen, fireEvent } from "@testing-library/react";
import FormularioContacto from "../componentes/organismos/FormularioContacto";

test("Muestra una alerta cuando el nombre esta vacio", () => {

    const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<FormularioContacto />);

    fireEvent.click(
        screen.getByRole("button", { name: "Enviar Mensaje" })
    );

    expect(alerta).toHaveBeenCalledWith("Debe ingresar su nombre");

    alerta.mockRestore();

});
