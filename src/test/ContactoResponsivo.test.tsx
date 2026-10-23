// @vitest-environment jsdom

import { test, expect } from "vitest"; 
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Contacto from "../paginas/Contacto";

test("El componente contiene las clases responsivas de Bootstrap", () => {
    const { container } = render(<Contacto />);

    // Seleccionamos el div con las clases de Bootstrap
    const elemento = container.querySelector(".col-12.col-md-8.col-lg-6");

    // Validamos que exista
    expect(elemento).not.toBeNull();

    expect(elemento).toHaveClass("col-12");
    expect(elemento).toHaveClass("col-md-8");
    expect(elemento).toHaveClass("col-lg-6");
});