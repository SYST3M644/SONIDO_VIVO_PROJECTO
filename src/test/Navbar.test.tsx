// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Navbar from "../componentes/organismos/Navbar";
import { SesionContext } from "../contexto/SesionContext";

afterEach(cleanup);

test("La barra de navegacion muestra el nombre de la tienda", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  expect(screen.getByText("Sonido Vivo")).toBeDefined();
});

test("La barra de navegacion tiene el boton hamburguesa", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  const boton = screen.getByRole("button", { name: "Abrir menu de navegacion" });

  expect(boton).toBeDefined();
  expect(boton.className).toContain("navbar-toggler");
});

test("La barra muestra el usuario cuando hay sesion iniciada", () => {
  const sesion = {
    usuario: {
      correo: "admin@sonidovivo.cl",
      nombre: "Carlos Rojas",
      rol: "administrador",
      token: "token-de-prueba"
    },
    guardarUsuario: () => {},
    cerrarSesion: () => {}
  };

  render(
    <MemoryRouter>
      <SesionContext.Provider value={sesion}>
        <Navbar />
      </SesionContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByText(/Carlos Rojas/)).toBeDefined();
  expect(screen.getByRole("button", { name: "Cerrar Sesión" })).toBeDefined();
});

test("La barra muestra el enlace Login cuando no hay sesion", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  expect(screen.getByText("Login")).toBeDefined();
});
