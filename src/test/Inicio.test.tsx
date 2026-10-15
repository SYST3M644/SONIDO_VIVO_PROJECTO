// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";

import Inicio from "../paginas/Inicio";

afterEach(cleanup);

test("La portada muestra el nombre de la tienda", () => {
    const { container } = render(<Inicio />);

    const titulo = container.querySelector(".portada h1");

    expect(titulo?.textContent).toContain("Sonido");
    expect(titulo?.textContent).toContain("Vivo");
});

test("La portada tiene un carrusel con tres imagenes", () => {
    const { container } = render(<Inicio />);

    const laminas = container.querySelectorAll(".carousel-item");

    expect(laminas.length).toBe(3);
});

test("Solo una lamina del carrusel empieza activa", () => {
    const { container } = render(<Inicio />);

    const activas = container.querySelectorAll(".carousel-item.active");

    expect(activas.length).toBe(1);
});
