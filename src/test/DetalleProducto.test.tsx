// @vitest-environment jsdom

import { test, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import DetalleProducto from "../paginas/DetalleProducto";

const productosDePrueba = [
    { id: 1, titulo: "Guitarra Acustica Folk", descripcion: "Yamaha F310", precio: 129990, imagen: "guitarra-acustica.jpg", stock: 11, categoria: "Cuerdas" },
    { id: 5, titulo: "Saxofon Alto", descripcion: "Yamaha YAS-280 laqueado", precio: 1149990, imagen: "saxofon-alto.jpg", stock: 2, categoria: "Vientos" }
];

vi.mock("../servicios/Productos", () => ({
    buscarProducto: (id: number) => {
        const producto = productosDePrueba.find((p) => p.id === id);

        if (producto === undefined) {
            return Promise.reject(new Error("Error HTTP 404"));
        }

        return Promise.resolve(producto);
    },
    urlImagen: (imagen: string) => "http://localhost:6464/api/productos/imagenes/" + imagen
}));

const productoAgregado = vi.fn();

afterEach(() => {
    cleanup();
    productoAgregado.mockClear();
});

async function mostrarDetalle(id: number) {
    render(
        <MemoryRouter initialEntries={[`/productos/${id}`]}>
            <Routes>
                <Route path="/productos/:id" element={<DetalleProducto agregarProducto={productoAgregado} />} />
            </Routes>
        </MemoryRouter>
    );

    await screen.findByRole("heading", { name: "Detalle del Producto" });
}

test("Muestra el producto que corresponde al id de la direccion", async () => {
    await mostrarDetalle(1);

    expect(screen.getByText("Guitarra Acustica Folk")).toBeDefined();
    expect(screen.getByText("Yamaha F310")).toBeDefined();
});

test("Muestra otro producto distinto segun el id", async () => {
    await mostrarDetalle(5);

    expect(screen.getByText("Saxofon Alto")).toBeDefined();
});

test("Tiene el boton para volver al catalogo", async () => {
    await mostrarDetalle(1);

    expect(screen.getByText("Regresar a Productos")).toBeDefined();
});

test("Muestra la ficha tecnica del producto", async () => {
    await mostrarDetalle(1);

    expect(screen.getByText("Características")).toBeDefined();
    expect(screen.getByText("Peso")).toBeDefined();
    expect(screen.getByText("2,1 kg")).toBeDefined();
    expect(screen.getByText("Garantía")).toBeDefined();
});

test("Cada producto tiene su propia ficha tecnica", async () => {
    await mostrarDetalle(5);

    expect(screen.getByText("Afinación")).toBeDefined();
    expect(screen.getByText("Mi bemol")).toBeDefined();
});

test("Se puede agregar al carrito desde el detalle", async () => {
    await mostrarDetalle(1);

    fireEvent.click(screen.getByRole("button", { name: "Agregar al carrito" }));

    expect(productoAgregado).toHaveBeenCalledWith(1);
});
