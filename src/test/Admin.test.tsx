// @vitest-environment jsdom

import { test, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import Admin from "../paginas/Admin";

// Lista de usuarios que simula la base de datos del microservicio
let usuarios = [
    { id: 1, nombre: "Carlos Rojas", correo: "admin@sonidovivo.cl", rol: "administrador", activo: true },
    { id: 2, nombre: "Ana Soto", correo: "vendedor@sonidovivo.cl", rol: "vendedor", activo: true },
    { id: 3, nombre: "Pedro Diaz", correo: "cliente@sonidovivo.cl", rol: "cliente", activo: true }
];

vi.mock("../servicios/Usuarios", () => ({
    roles: ["administrador", "vendedor", "cliente"],
    listarUsuarios: () => Promise.resolve([...usuarios]),
    crearUsuario: (nombre: string, correo: string, _clave: string, rol: string) => {
        const nuevo = { id: 4, nombre: nombre, correo: correo, rol: rol, activo: true };
        usuarios = [...usuarios, nuevo];
        return Promise.resolve(nuevo);
    },
    editarUsuario: () => Promise.resolve({}),
    cambiarEstado: (id: number) => {
        usuarios = usuarios.map((u) => (u.id === id ? { ...u, activo: !u.activo } : u));
        return Promise.resolve({});
    },
    eliminarUsuario: (id: number) => {
        usuarios = usuarios.filter((u) => u.id !== id);
        return Promise.resolve();
    }
}));

afterEach(cleanup);

test("Muestra la tabla con los usuarios del sistema", async () => {
    render(<Admin token="token-de-prueba" />);

    expect(await screen.findByText("Carlos Rojas")).toBeDefined();
    expect(screen.getByText("Ana Soto")).toBeDefined();
    expect(screen.getByText("Pedro Diaz")).toBeDefined();
});

test("Muestra el rol y el estado de cada usuario", async () => {
    const { container } = render(<Admin token="token-de-prueba" />);

    await screen.findByText("Carlos Rojas");

    const tabla = container.querySelector("table");

    expect(tabla?.textContent).toContain("administrador");
    expect(tabla?.textContent).toContain("vendedor");
    expect(screen.getAllByText("Activo").length).toBeGreaterThan(0);
});

test("Pide una contraseña de 8 caracteres al crear un usuario", async () => {
    render(<Admin token="token-de-prueba" />);

    await screen.findByText("Carlos Rojas");

    fireEvent.change(screen.getByPlaceholderText("nombre"), { target: { value: "Javiera Mora" } });
    fireEvent.change(screen.getByPlaceholderText("correo"), { target: { value: "javiera@sonidovivo.cl" } });
    fireEvent.change(screen.getByPlaceholderText("contraseña"), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: "Crear Usuario" }));

    expect(screen.getByText("La contraseña debe tener al menos 8 caracteres")).toBeDefined();
});

test("Crea un usuario nuevo desde el formulario", async () => {
    render(<Admin token="token-de-prueba" />);

    await screen.findByText("Carlos Rojas");

    fireEvent.change(screen.getByPlaceholderText("nombre"), { target: { value: "Javiera Mora" } });
    fireEvent.change(screen.getByPlaceholderText("correo"), { target: { value: "javiera@sonidovivo.cl" } });
    fireEvent.change(screen.getByPlaceholderText("contraseña"), { target: { value: "clave12345" } });
    fireEvent.click(screen.getByRole("button", { name: "Crear Usuario" }));

    expect(await screen.findByText("Javiera Mora")).toBeDefined();
});

test("Desactiva un usuario desde la tabla", async () => {
    render(<Admin token="token-de-prueba" />);

    await screen.findByText("Carlos Rojas");

    fireEvent.click(screen.getAllByRole("button", { name: "Desactivar" })[1]);

    expect(await screen.findByText("Inactivo")).toBeDefined();
});

test("Eliminar pide confirmar antes de borrar", async () => {
    render(<Admin token="token-de-prueba" />);

    await screen.findByText("Ana Soto");

    fireEvent.click(screen.getAllByRole("button", { name: "Eliminar" })[1]);
    expect(screen.getByText("Ana Soto")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "¿Seguro? Eliminar" }));

    await screen.findByText("Carlos Rojas");
    expect(await screen.findByText("Pedro Diaz")).toBeDefined();
});

test("Carga los datos del usuario al presionar Editar", async () => {
    render(<Admin token="token-de-prueba" />);

    await screen.findByText("Carlos Rojas");

    fireEvent.click(screen.getAllByRole("button", { name: "Editar" })[0]);

    expect(screen.getByRole("button", { name: "Guardar Cambios" })).toBeDefined();
});
