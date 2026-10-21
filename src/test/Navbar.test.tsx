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
      <Navbar cantidadCarrito={0} />
    </MemoryRouter>
  );

  expect(screen.getByText("Sonido Vivo")).toBeDefined();
});

test("La barra de navegacion tiene el boton hamburguesa", () => {
  render(
    <MemoryRouter>
      <Navbar cantidadCarrito={0} />
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
        <Navbar cantidadCarrito={0} />
      </SesionContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByText(/Carlos Rojas/)).toBeDefined();
  expect(screen.getByRole("button", { name: "Cerrar Sesión" })).toBeDefined();
});

test("La barra muestra el enlace Login cuando no hay sesion", () => {
  render(
    <MemoryRouter>
      <Navbar cantidadCarrito={0} />
    </MemoryRouter>
  );

  expect(screen.getByText("Login")).toBeDefined();
});

function sesionCon(rol: string) {
  return {
    usuario: {
      correo: "usuario@sonidovivo.cl",
      nombre: "Usuario Prueba",
      rol: rol,
      token: "token-de-prueba"
    },
    guardarUsuario: () => {},
    cerrarSesion: () => {}
  };
}

function mostrarNavbarCon(rol: string) {
  render(
    <MemoryRouter>
      <SesionContext.Provider value={sesionCon(rol)}>
        <Navbar cantidadCarrito={0} />
      </SesionContext.Provider>
    </MemoryRouter>
  );
}

test("El cliente ve el enlace del carrito", () => {
  mostrarNavbarCon("cliente");

  expect(screen.getByText("Carrito")).toBeDefined();
});

test("El vendedor no ve el enlace del carrito", () => {
  mostrarNavbarCon("vendedor");

  expect(screen.queryByText("Carrito")).toBeNull();
});

test("Solo el administrador ve el enlace de administracion", () => {
  mostrarNavbarCon("administrador");
  expect(screen.getByText("Administración")).toBeDefined();

  cleanup();

  mostrarNavbarCon("vendedor");
  expect(screen.queryByText("Administración")).toBeNull();
});
