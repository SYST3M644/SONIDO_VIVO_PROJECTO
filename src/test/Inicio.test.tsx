// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Inicio from "../paginas/Inicio";

afterEach(cleanup);

function mostrarInicio() {
    return render(
        <MemoryRouter>
            <Inicio />
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