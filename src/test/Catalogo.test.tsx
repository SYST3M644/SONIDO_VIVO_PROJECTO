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

  expect(screen.getByText("Guitarra Electrica")).toBeDefined();
  expect(screen.getByText("Bateria Acustica")).toBeDefined();
  expect(screen.getByText("Afinador de Pinza")).toBeDefined();
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
