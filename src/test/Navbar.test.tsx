// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Navbar from "../componentes/organismos/Navbar";
import type { Usuario } from "../servicios/Autenticacion";

afterEach(cleanup);

function usuarioCon(rol: string): Usuario {
  return {
    correo: "usuario@sonidovivo.cl",
    nombre: "Usuario Prueba",
    rol: rol,
    token: "token-de-prueba"
  };
}

function mostrarNavbar(usuario: Usuario | null) {
  render(
    <MemoryRouter>
      <Navbar cantidadCarrito={0} usuario={usuario} cerrarSesion={() => {}} />
    </MemoryRouter>
  );
}

test("La barra de navegacion muestra el nombre de la tienda", () => {
  mostrarNavbar(null);

  expect(screen.getByText("Sonido Vivo")).toBeDefined();
});

test("La barra de navegacion tiene el boton hamburguesa", () => {
  mostrarNavbar(null);

  const boton = screen.getByRole("button", { name: "Abrir menu de navegacion" });

  expect(boton).toBeDefined();
  expect(boton.className).toContain("navbar-toggler");
});

test("La barra muestra el enlace Login cuando no hay sesion", () => {
  mostrarNavbar(null);

  expect(screen.getByText("Login")).toBeDefined();
});

test("La barra muestra el usuario cuando hay sesion iniciada", () => {
  mostrarNavbar(usuarioCon("administrador"));

  expect(screen.getByText(/Usuario Prueba/)).toBeDefined();
  expect(screen.getByRole("button", { name: "Cerrar Sesión" })).toBeDefined();
});

test("El cliente ve el enlace del carrito", () => {
  mostrarNavbar(usuarioCon("cliente"));

  expect(screen.getByText("Carrito")).toBeDefined();
});

test("El vendedor no ve el enlace del carrito", () => {
  mostrarNavbar(usuarioCon("vendedor"));

  expect(screen.queryByText("Carrito")).toBeNull();
});

test("Solo el administrador ve el enlace de administracion", () => {
  mostrarNavbar(usuarioCon("administrador"));
  expect(screen.getByText("Administración")).toBeDefined();

  cleanup();

  mostrarNavbar(usuarioCon("vendedor"));
  expect(screen.queryByText("Administración")).toBeNull();
});

test("Solo el cliente ve el enlace de mis pedidos", () => {
  mostrarNavbar(usuarioCon("cliente"));
  expect(screen.getByText("Mis pedidos")).toBeDefined();

  cleanup();

  mostrarNavbar(usuarioCon("vendedor"));
  expect(screen.queryByText("Mis pedidos")).toBeNull();

  cleanup();

  mostrarNavbar(null);
  expect(screen.queryByText("Mis pedidos")).toBeNull();
});
