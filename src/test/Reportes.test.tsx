// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import Reportes from "../paginas/Reportes";

afterEach(cleanup);

test("Muestra el total vendido de todos los meses", () => {
    render(<Reportes />);

    expect(screen.getByText("$2.904.920")).toBeDefined();
    expect(screen.getByText("8")).toBeDefined();
});

test("Al elegir un mes cambia el resumen", () => {
    render(<Reportes />);

    const periodo = screen.getByRole("combobox");
    fireEvent.change(periodo, { target: { value: "2026-08" } });

    expect(screen.getByText("$509.980")).toBeDefined();
});

test("Muestra el conteo de pedidos por estado", () => {
    const { container } = render(<Reportes />);

    expect(container.textContent).toContain("Pedidos por estado");
    expect(container.textContent).toContain("en preparacion");
    expect(container.textContent).toContain("despachado");
    expect(container.textContent).toContain("entregado");
});

test("Muestra el detalle de los pedidos del periodo", () => {
    render(<Reportes />);

    expect(screen.getByText("Jorge Carrasco")).toBeDefined();
    expect(screen.getByText("Ignacio Soto")).toBeDefined();
});
