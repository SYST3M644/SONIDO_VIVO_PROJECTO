// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Inicio from "../paginas/Inicio";

afterEach(cleanup);

const productosDePrueba = [
    { id: 1, titulo: "Guitarra Acustica Folk", descripcion: "Yamaha F310", precio: 129990, imagen: "guitarra-acustica.jpg", stock: 11, categoria: "Cuerdas" },
    { id: 2, titulo: "Bajo Electrico", descripcion: "Ibanez GSR200", precio: 379990, imagen: "bajo-electrico.jpg", stock: 0, categoria: "Cuerdas" },
    { id: 3, titulo: "Piano Digital", descripcion: "Korg LP-180", precio: 649990, imagen: "piano-digital.jpg", stock: 3, categoria: "Teclados" },
    { id: 4, titulo: "Saxofon Alto", descripcion: "Yamaha YAS-280", precio: 1149990, imagen: "saxofon-alto.jpg", stock: 2, categoria: "Vientos" },
    { id: 5, titulo: "Ukelele Soprano", descripcion: "Kala KA-15S", precio: 69990, imagen: "ukelele-soprano.jpg", stock: 14, categoria: "Cuerdas" }
];

function mostrarInicio() {
    return render(
        <MemoryRouter>
            <Inicio productos={productosDePrueba} agregarProducto={() => {}} />
        </MemoryRouter>
    );
}

test("La portada muestra el nombre de la tienda", () => {
    const { container } = mostrarInicio();

    const titulo = container.querySelector(".portada h1");

    expect(titulo?.textContent).toContain("Sonido");
    expect(titulo?.textContent).toContain("Vivo");
});

test("La portada tiene un carrusel con seis imagenes", () => {
    const { container } = mostrarInicio();

    const laminas = container.querySelectorAll(".carousel-item");

    expect(laminas.length).toBe(6);
});

test("Solo una lamina del carrusel empieza activa", () => {
    const { container } = mostrarInicio();

    const activas = container.querySelectorAll(".carousel-item.active");

    expect(activas.length).toBe(1);
});
test("Se muestran 3 productos destacados y no los agotados", () => {
    const { container } = mostrarInicio();

    const tarjetas = container.querySelectorAll(".tarjeta-producto");

    expect(tarjetas.length).toBe(3);
    expect(container.textContent).not.toContain("Bajo Electrico");
});
