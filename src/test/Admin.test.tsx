// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import Admin from "../paginas/Admin";

afterEach(cleanup);

test("Muestra la tabla con los usuarios del sistema", () => {
    render(<Admin />);

    expect(screen.getByText("Carlos Rojas")).toBeDefined();
    expect(screen.getByText("Ana Soto")).toBeDefined();
    expect(screen.getByText("Pedro Diaz")).toBeDefined();
});

test("Muestra el rol y el estado de cada usuario", () => {
    const { container } = render(<Admin />);

    const tabla = container.querySelector("table");

    expect(tabla?.textContent).toContain("administrador");
    expect(tabla?.textContent).toContain("vendedor");
    expect(screen.getAllByText("Activo").length).toBeGreaterThan(0);
});

test("Crea un usuario nuevo desde el formulario", () => {
    render(<Admin />);

    fireEvent.change(screen.getByPlaceholderText("nombre"), {
        target: { value: "Javiera Mora" }
    });

    fireEvent.change(screen.getByPlaceholderText("correo"), {
        target: { value: "javiera@sonidovivo.cl" }
    });

    fireEvent.click(screen.getByRole("button", { name: "Crear Usuario" }));

    expect(screen.getByText("Javiera Mora")).toBeDefined();
});

test("Desactiva un usuario desde la tabla", () => {
    render(<Admin />);

    const botones = screen.getAllByRole("button", { name: "Desactivar" });
    fireEvent.click(botones[0]);

    expect(screen.getAllByText("Inactivo").length).toBeGreaterThan(0);
});

test("Carga los datos del usuario al presionar Editar", () => {
    render(<Admin />);

    const botones = screen.getAllByRole("button", { name: "Editar" });
    fireEvent.click(botones[0]);

    expect(screen.getByRole("button", { name: "Guardar Cambios" })).toBeDefined();
});
