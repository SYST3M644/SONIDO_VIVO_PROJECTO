// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { guardarSesion, leerSesion, borrarSesion, tokenVencido } from "../servicios/Sesion";

afterEach(() => {
    localStorage.clear();
});

// Arma un token de prueba que vence en la cantidad de segundos indicada
function tokenQueVenceEn(segundos: number) {
    const exp = Math.floor(Date.now() / 1000) + segundos;
    const datos = btoa(JSON.stringify({ sub: "cliente@sonidovivo.cl", rol: "cliente", exp: exp }));

    return "cabecera." + datos + ".firma";
}

function usuarioCon(token: string) {
    return {
        nombre: "Pedro Diaz",
        correo: "cliente@sonidovivo.cl",
        rol: "cliente",
        token: token
    };
}

test("Sin sesion guardada no hay usuario", () => {
    expect(leerSesion()).toBeNull();
});

test("La sesion guardada se recupera al recargar la pagina", () => {
    guardarSesion(usuarioCon(tokenQueVenceEn(3600)));

    const usuario = leerSesion();

    expect(usuario?.nombre).toBe("Pedro Diaz");
    expect(usuario?.rol).toBe("cliente");
});

test("Si el token ya vencio la sesion se borra", () => {
    guardarSesion(usuarioCon(tokenQueVenceEn(-60)));

    expect(leerSesion()).toBeNull();
    expect(localStorage.getItem("sonidovivo-sesion")).toBeNull();
});

test("Cerrar sesion borra los datos guardados", () => {
    guardarSesion(usuarioCon(tokenQueVenceEn(3600)));
    borrarSesion();

    expect(leerSesion()).toBeNull();
});

test("Un token que no es JWT se considera vencido", () => {
    expect(tokenVencido("token-de-prueba")).toBe(true);
});
