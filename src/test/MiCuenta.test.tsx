// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import MiCuenta from "../paginas/MiCuenta";

afterEach(cleanup);

function usuarioCon(rol: string) {
    return {
        nombre: "Pedro Diaz",
        correo: "cliente@sonidovivo.cl",
        rol: rol,
        token: "token-de-prueba"
    };
}

test("Muestra los datos de la cuenta", () => {
    render(
        <MemoryRouter>
            <MiCuenta usuario={usuarioCon("cliente")} cerrarSesion={() => {}} />
        </MemoryRouter>
    );

    expect(screen.getByText("Pedro Diaz")).toBeDefined();
    expect(screen.getByText("cliente@sonidovivo.cl")).toBeDefined();
});

test("El cliente tiene acceso directo a sus pedidos", () => {
    render(
        <MemoryRouter>
            <MiCuenta usuario={usuarioCon("cliente")} cerrarSesion={() => {}} />
        </MemoryRouter>
    );

    expect(screen.getByText("Ver mis pedidos")).toBeDefined();
});

test("El vendedor no ve el acceso a mis pedidos", () => {
    render(
        <MemoryRouter>
            <MiCuenta usuario={usuarioCon("vendedor")} cerrarSesion={() => {}} />
        </MemoryRouter>
    );

    expect(screen.queryByText("Ver mis pedidos")).toBeNull();
});

test("El boton cierra la sesion", () => {
    let cerro = false;

    render(
        <MemoryRouter>
            <MiCuenta usuario={usuarioCon("cliente")} cerrarSesion={() => { cerro = true; }} />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Cerrar Sesión" }));

    expect(cerro).toBe(true);
});
