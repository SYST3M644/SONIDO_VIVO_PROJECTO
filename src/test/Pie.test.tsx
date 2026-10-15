// @vitest-environment jsdom

import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Pie from "../componentes/organismos/Pie";

test("El pie muestra el nombre y la ubicacion de la tienda", () => {
    render(<Pie />);

    expect(screen.getByText("Sonido Vivo")).toBeDefined();
    expect(screen.getByText("Viña del Mar, Región de Valparaíso")).toBeDefined();
});
