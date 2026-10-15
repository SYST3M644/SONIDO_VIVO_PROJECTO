// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import RutaProtegida from "../componentes/RutaProtegida";
import { SesionContext } from "../contexto/SesionContext";
import type { Usuario } from "../servicios/Autenticacion";

afterEach(cleanup);

const administrador: Usuario = {
    correo: "admin@sonidovivo.cl",
    nombre: "Carlos Rojas",
    rol: "administrador",
    token: "token-de-prueba"
};

function mostrarVistaPrivada(usuario: Usuario | null, roles?: string[]) {
    const sesion = {
        usuario: usuario,
        guardarUsuario: () => {},
        cerrarSesion: () => {}
    };

    render(
        <MemoryRouter initialEntries={["/privado"]}>
            <SesionContext.Provider value={sesion}>
                <Routes>
                    <Route path="/" element={<p>Pantalla de inicio</p>} />
                    <Route path="/login" element={<p>Pantalla de login</p>} />
                    <Route
                        path="/privado"
                        element={
                            <RutaProtegida roles={roles}>
                                <p>Contenido privado</p>
                            </RutaProtegida>
                        }
                    />
                </Routes>
            </SesionContext.Provider>
        </MemoryRouter>
    );
}

test("Sin sesion iniciada manda al login", () => {
    mostrarVistaPrivada(null);

    expect(screen.getByText("Pantalla de login")).toBeDefined();
    expect(screen.queryByText("Contenido privado")).toBeNull();
});

test("Con sesion iniciada muestra el contenido", () => {
    mostrarVistaPrivada(administrador);

    expect(screen.getByText("Contenido privado")).toBeDefined();
});

test("Deja entrar cuando el rol esta permitido", () => {
    mostrarVistaPrivada(administrador, ["administrador"]);

    expect(screen.getByText("Contenido privado")).toBeDefined();
});

test("Bloquea cuando el rol no esta permitido", () => {
    mostrarVistaPrivada(administrador, ["vendedor"]);

    expect(screen.queryByText("Contenido privado")).toBeNull();
    expect(screen.getByText("Pantalla de inicio")).toBeDefined();
});
