// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Productos from "../paginas/Producto";

afterEach(cleanup);

test("El catalogo muestra los instrumentos de Sonido Vivo", () => {
  render(
    <MemoryRouter>
      <Productos />
    </MemoryRouter>
  );

  expect(screen.getByText("Guitarra Acustica Folk")).toBeDefined();
  expect(screen.getByText("Saxofon Alto")).toBeDefined();
  expect(screen.getByText("Zampona Andina")).toBeDefined();
});

test("El catalogo ya no muestra los productos de hardware", () => {
  render(
    <MemoryRouter>
      <Productos />
    </MemoryRouter>
  );

  expect(screen.queryByText("Notebook")).toBeNull();
  expect(screen.queryByText("Mause")).toBeNull();
});

test("Todos los productos del catalogo tienen fotografia", () => {
  const { container } = render(
    <MemoryRouter>
      <Productos />
    </MemoryRouter>
  );

  const imagenes = container.querySelectorAll("img");

  expect(imagenes.length).toBe(12);
  imagenes.forEach((imagen) => {
    expect(imagen.getAttribute("src")).toContain(".jpg");
  });
});
