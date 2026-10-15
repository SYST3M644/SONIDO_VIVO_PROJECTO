// @vitest-environment jsdom

import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Boton from "../componentes/atomos/Boton";

test('El boton muestra el texto Ver producto', () => {
  render(
    <MemoryRouter>
      <Boton id={3} />
    </MemoryRouter>
  );

  // Buscamos el elemento por su texto visible
  const boton = screen.getByText('Ver Producto');
  
  // Verificamos que esté presente en el documento
  expect(boton).toBeDefined(); 
  expect(boton.textContent).toBe('Ver Producto');
});
