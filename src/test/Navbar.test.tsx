// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Navbar from "../componentes/organismos/Navbar";

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
