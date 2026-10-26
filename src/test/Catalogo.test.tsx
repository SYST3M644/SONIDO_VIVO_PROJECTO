// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Productos from "../paginas/Producto";

afterEach(cleanup);

test("El catalogo muestra los instrumentos de Sonido Vivo", () => {
  render(
    <MemoryRouter>
      <Productos agregarProducto={() => {}} />
    </MemoryRouter>
  );

  expect(screen.getByText("Guitarra Acustica Folk")).toBeDefined();
  expect(screen.getByText("Saxofon Alto")).toBeDefined();
  expect(screen.getByText("Zampona Andina")).toBeDefined();
});

test("El catalogo ya no muestra los productos de hardware", () => {
  render(
    <MemoryRouter>
      <Productos agregarProducto={() => {}} />
    </MemoryRouter>
  );

  expect(screen.queryByText("Notebook")).toBeNull();
  expect(screen.queryByText("Mause")).toBeNull();
});

test("Todos los productos del catalogo tienen fotografia", () => {
  const { container } = render(
    <MemoryRouter>
      <Productos agregarProducto={() => {}} />
    </MemoryRouter>
  );

  const imagenes = container.querySelectorAll("img");

  expect(imagenes.length).toBe(12);
  imagenes.forEach((imagen) => {
    expect(imagen.getAttribute("src")).toContain(".jpg");
  });
});

test("Los precios se muestran con separador de miles", () => {
  render(
    <MemoryRouter>
      <Productos agregarProducto={() => {}} />
    </MemoryRouter>
  );

  expect(screen.getByText("$1.149.990")).toBeDefined();
  expect(screen.getByText("$129.990")).toBeDefined();
});

test("Cada producto tiene su boton para ver el detalle", () => {
  render(
    <MemoryRouter>
      <Productos agregarProducto={() => {}} />
    </MemoryRouter>
  );

  expect(screen.getAllByText("Ver Producto").length).toBe(12);
});

test("El buscador muestra solo los productos que coinciden", () => {
  render(
    <MemoryRouter>
      <Productos agregarProducto={() => {}} />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Buscar producto"), {
    target: { value: "guitarra" }
  });

  expect(screen.getByText("Guitarra Acustica Folk")).toBeDefined();
  expect(screen.queryByText("Saxofon Alto")).toBeNull();
});

test("El filtro muestra solo la categoria elegida", () => {
  render(
    <MemoryRouter>
      <Productos agregarProducto={() => {}} />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "Vientos" }
  });

  expect(screen.getByText("Saxofon Alto")).toBeDefined();
  expect(screen.queryByText("Guitarra Acustica Folk")).toBeNull();
});

test("Si no hay resultados muestra un mensaje", () => {
  render(
    <MemoryRouter>
      <Productos agregarProducto={() => {}} />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Buscar producto"), {
    target: { value: "violonchelo" }
  });

  expect(screen.getByText("No se encontraron productos")).toBeDefined();
});