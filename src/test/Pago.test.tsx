import { test, expect } from "vitest";
import { validarTarjeta, pagoAprobado, textoPago } from "../servicios/Pago";

test("Acepta una tarjeta con todos sus datos correctos", () => {
    expect(validarTarjeta("4111 1111 1111 1111", "Pedro Diaz", "12/30", "123")).toBe("");
});

test("Pide 16 digitos en el numero de tarjeta", () => {
    expect(validarTarjeta("4111 1111", "Pedro Diaz", "12/30", "123")).toBe("El número de tarjeta debe tener 16 dígitos");
});

test("Pide el nombre de la tarjeta", () => {
    expect(validarTarjeta("4111111111111111", "", "12/30", "123")).toBe("Debe ingresar el nombre que aparece en la tarjeta");
});

test("Revisa el formato y la fecha de vencimiento", () => {
    expect(validarTarjeta("4111111111111111", "Pedro Diaz", "1230", "123")).toBe("El vencimiento debe tener el formato MM/AA");
    expect(validarTarjeta("4111111111111111", "Pedro Diaz", "13/30", "123")).toBe("El mes de vencimiento no es válido");
    expect(validarTarjeta("4111111111111111", "Pedro Diaz", "01/20", "123")).toBe("La tarjeta está vencida");
});

test("Pide un CVV de 3 digitos", () => {
    expect(validarTarjeta("4111111111111111", "Pedro Diaz", "12/30", "12")).toBe("El CVV debe tener 3 dígitos");
});

test("La tarjeta de prueba terminada en 0002 es rechazada", () => {
    expect(pagoAprobado("4111 1111 1111 1111")).toBe(true);
    expect(pagoAprobado("4000 0000 0000 0002")).toBe(false);
});

test("Guarda solo los ultimos 4 digitos de la tarjeta", () => {
    expect(textoPago("4111 1111 1111 1111")).toBe("Tarjeta terminada en 1111");
});
