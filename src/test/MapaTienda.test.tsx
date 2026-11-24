// @vitest-environment jsdom

import { afterEach, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import MapaTienda from "../componentes/moleculas/MapaTienda";

afterEach(cleanup);

test("El mapa muestra la direccion de la tienda", () => {
    render(<MapaTienda />);

    expect(screen.getByText("Av. Valparaíso 650, Viña del Mar")).toBeDefined();
    expect(screen.getByTitle("Mapa de la tienda Sonido Vivo")).toBeDefined();
});

test("El boton Como llegar abre la ruta en Google Maps", () => {
    render(<MapaTienda />);

    const enlace = screen.getByText("Cómo llegar") as HTMLAnchorElement;

    expect(enlace.href).toContain("google.com/maps/dir");
    expect(enlace.target).toBe("_blank");
});
