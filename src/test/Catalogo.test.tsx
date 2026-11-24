// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Productos from "../paginas/Producto";
import type { Producto } from "../servicios/Productos";

afterEach(cleanup);

const productosDePrueba: Producto[] = [
  { id: 1, titulo: "Guitarra Acustica Folk", descripcion: "Yamaha F310", precio: 129990, imagen: "guitarra-acustica.jpg", stock: 11, categoria: "Cuerdas" },
  { id: 2, titulo: "Guitarra Acustica Dreadnought", descripcion: "Fender CD-60S", precio: 189990, imagen: "guitarra-dreadnought.jpg", stock: 5, categoria: "Cuerdas" },
  { id: 3, titulo: "Bajo Electrico", descripcion: "Ibanez GSR200", precio: 379990, imagen: "bajo-electrico.jpg", stock: 4, categoria: "Cuerdas" },
  { id: 4, titulo: "Piano Digital", descripcion: "Korg LP-180", precio: 649990, imagen: "piano-digital.jpg", stock: 3, categoria: "Teclados" },
  { id: 5, titulo: "Saxofon Alto", descripcion: "Yamaha YAS-280", precio: 1149990, imagen: "saxofon-alto.jpg", stock: 2, categoria: "Vientos" },
  { id: 6, titulo: "Ukelele Soprano", descripcion: "Kala KA-15S", precio: 69990, imagen: "ukelele-soprano.jpg", stock: 14, categoria: "Cuerdas" },
  { id: 7, titulo: "Melodica 32 Teclas", descripcion: "Hohner Student", precio: 54990, imagen: "melodica.jpg", stock: 9, categoria: "Teclados" },
  { id: 8, titulo: "Zampona Andina", descripcion: "Artesanal de bambu", precio: 24990, imagen: "zampona.jpg", stock: 22, categoria: "Vientos" },
  { id: 9, titulo: "Arpa Celta", descripcion: "34 cuerdas", precio: 1290990, imagen: "arpa.jpg", stock: 1, categoria: "Cuerdas" },
  { id: 10, titulo: "Set de Platillos", descripcion: "Zildjian Planet Z", precio: 279990, imagen: "platillos.jpg", stock: 6, categoria: "Percusión" },
  { id: 11, titulo: "Microfono para Vientos", descripcion: "Shure Beta 98", precio: 349990, imagen: "microfono-vientos.jpg", stock: 8, categoria: "Audio" },
  { id: 12, titulo: "Atril de Partituras", descripcion: "Hercules BS050B", precio: 29990, imagen: "atril-partituras.jpg", stock: 17, categoria: "Accesorios" }
];

function mostrarCatalogo() {
  render(
    <MemoryRouter>
      <Productos productos={productosDePrueba} cargando={false} agregarProducto={() => {}} />
    </MemoryRouter>
  );
}

test("El catalogo muestra los instrumentos de Sonido Vivo", () => {
  mostrarCatalogo();

  expect(screen.getByText("Guitarra Acustica Folk")).toBeDefined();
  expect(screen.getByText("Saxofon Alto")).toBeDefined();
  expect(screen.getByText("Zampona Andina")).toBeDefined();
});

test("El catalogo ya no muestra los productos de hardware", () => {
  mostrarCatalogo();

  expect(screen.queryByText("Notebook")).toBeNull();
  expect(screen.queryByText("Mause")).toBeNull();
});

test("Todos los productos del catalogo tienen fotografia", () => {
  mostrarCatalogo();
  const container = document.body;

  const imagenes = container.querySelectorAll("img.card-img-top");

  expect(imagenes.length).toBe(12);
  imagenes.forEach((imagen) => {
    expect(imagen.getAttribute("src")).toContain(".jpg");
  });
});

test("Los precios se muestran con separador de miles", () => {
  mostrarCatalogo();

  expect(screen.getByText("$1.149.990")).toBeDefined();
  expect(screen.getByText("$129.990")).toBeDefined();
});

test("Cada producto tiene su boton para ver el detalle", () => {
  mostrarCatalogo();

  expect(screen.getAllByText("Ver Producto").length).toBe(12);
});

test("El buscador muestra solo los productos que coinciden", () => {
  mostrarCatalogo();

  fireEvent.change(screen.getByPlaceholderText("Buscar producto"), {
    target: { value: "guitarra" }
  });

  expect(screen.getByText("Guitarra Acustica Folk")).toBeDefined();
  expect(screen.queryByText("Saxofon Alto")).toBeNull();
});

test("El filtro muestra solo la categoria elegida", () => {
  mostrarCatalogo();

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "Vientos" }
  });

  expect(screen.getByText("Saxofon Alto")).toBeDefined();
  expect(screen.queryByText("Guitarra Acustica Folk")).toBeNull();
});

test("Si no hay resultados muestra un mensaje", () => {
  mostrarCatalogo();

  fireEvent.change(screen.getByPlaceholderText("Buscar producto"), {
    target: { value: "violonchelo" }
  });

  expect(screen.getByText("No se encontraron productos")).toBeDefined();
});
test("Avisa cuando quedan pocas unidades de un producto", () => {
  mostrarCatalogo();

  expect(screen.getByText("¡Quedan 2!")).toBeDefined();
  expect(screen.getByText("¡Quedan 1!")).toBeDefined();
});

test("Un producto agotado no se puede agregar al carrito", () => {
  const agotado = [{ ...productosDePrueba[0], stock: 0 }];

  render(
    <MemoryRouter>
      <Productos productos={agotado} cargando={false} agregarProducto={() => {}} />
    </MemoryRouter>
  );

  expect(screen.getByText("Agotado")).toBeDefined();

  const boton = screen.getByRole("button", { name: "Agregar al carrito" }) as HTMLButtonElement;
  expect(boton.disabled).toBe(true);
});
