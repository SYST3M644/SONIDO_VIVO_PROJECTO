// @vitest-environment jsdom

import { afterEach, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../App";

const productosDePrueba = [
    { id: 1, titulo: "Guitarra Acustica Folk", descripcion: "Yamaha F310", precio: 129990, imagen: "guitarra-acustica.jpg", stock: 11, categoria: "Cuerdas" },
    { id: 5, titulo: "Saxofon Alto", descripcion: "Yamaha YAS-280", precio: 1149990, imagen: "saxofon-alto.jpg", stock: 2, categoria: "Vientos" }
];

vi.mock("../servicios/Productos", () => ({
    listarProductos: () => Promise.resolve(productosDePrueba),
    buscarProducto: (id: number) => Promise.resolve(productosDePrueba.find((p) => p.id === id)),
    actualizarStock: () => Promise.resolve({}),
    descontarStock: () => Promise.resolve({}),
    urlImagen: (imagen: string) => "http://localhost:6464/api/productos/imagenes/" + imagen
}));

afterEach(cleanup);

function entrarComoCliente() {
    vi.spyOn(window, "alert").mockImplementation(() => {});

    render(
        <MemoryRouter initialEntries={["/login"]}>
            <App />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("correo"), {
        target: { value: "cliente@sonidovivo.cl" }
    });

    fireEvent.change(screen.getByPlaceholderText("contraseña"), {
        target: { value: "cliente123" }
    });

    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));
}

vi.mock("../servicios/Pedidos", () => ({
    estados: ["en preparacion", "despachado", "entregado"],
    agregarPedido: (cliente: string) => Promise.resolve({
        id: 1001,
        cliente: cliente,
        correo: "cliente@sonidovivo.cl",
        fecha: "2026-11-23",
        total: 129990,
        entrega: "despacho",
        estado: "en preparacion",
        items: []
    }),
    pedidosDeCliente: () => Promise.resolve([]),
    listarPedidos: () => Promise.resolve([])
}));

vi.mock("../servicios/Autenticacion", () => ({
    iniciarSesion: () => Promise.resolve({
        nombre: "Pedro Diaz",
        correo: "cliente@sonidovivo.cl",
        rol: "cliente",
        token: "token-de-prueba"
    }),
    rutaSegunRol: () => "/productos"
}));

test("Sin sesion se puede ver el carrito", () => {
    render(
        <MemoryRouter initialEntries={["/carrito"]}>
            <App />
        </MemoryRouter>
    );

    expect(screen.getByText("El carrito está vacío")).toBeDefined();
});

function pagarConTarjeta(numero: string) {
    fireEvent.change(screen.getByPlaceholderText("número de tarjeta"), { target: { value: numero } });
    fireEvent.change(screen.getByPlaceholderText("nombre en la tarjeta"), { target: { value: "Pedro Diaz" } });
    fireEvent.change(screen.getByPlaceholderText("MM/AA"), { target: { value: "12/30" } });
    fireEvent.change(screen.getByPlaceholderText("CVV"), { target: { value: "123" } });

    fireEvent.click(screen.getByRole("button", { name: /^Pagar \$/ }));
}

async function agregarYAbrirCarrito() {
    render(
        <MemoryRouter initialEntries={["/productos"]}>
            <App />
        </MemoryRouter>
    );

    await screen.findByText("Guitarra Acustica Folk");

    fireEvent.click(screen.getAllByRole("button", { name: "Agregar al carrito" })[0]);
    fireEvent.click(screen.getByText("Carrito"));
}

test("Un invitado puede comprar sin iniciar sesion", async () => {
    await agregarYAbrirCarrito();

    expect(screen.getByText("Comprar como invitado")).toBeDefined();

    fireEvent.click(screen.getByText("Continuar al pago"));
    expect(screen.getByText("Debe ingresar su nombre para continuar")).toBeDefined();

    fireEvent.change(screen.getByPlaceholderText("nombre"), {
        target: { value: "Camila Reyes" }
    });

    fireEvent.change(screen.getByPlaceholderText("correo"), {
        target: { value: "camila@correo.cl" }
    });

    fireEvent.click(screen.getByText("Continuar al pago"));
    pagarConTarjeta("4111 1111 1111 1111");

    expect(await screen.findByText(/fue confirmado/)).toBeDefined();
    expect(screen.getByText("Seguir comprando")).toBeDefined();
});

test("Una tarjeta incompleta muestra un aviso y no paga", async () => {
    await agregarYAbrirCarrito();

    fireEvent.change(screen.getByPlaceholderText("nombre"), { target: { value: "Camila Reyes" } });
    fireEvent.change(screen.getByPlaceholderText("correo"), { target: { value: "camila@correo.cl" } });
    fireEvent.click(screen.getByText("Continuar al pago"));

    pagarConTarjeta("4111 1111");

    expect(screen.getByText("El número de tarjeta debe tener 16 dígitos")).toBeDefined();
    expect(screen.queryByText(/fue confirmado/)).toBeNull();
});

test("Si el banco rechaza el pago no se crea el pedido", async () => {
    await agregarYAbrirCarrito();

    fireEvent.change(screen.getByPlaceholderText("nombre"), { target: { value: "Camila Reyes" } });
    fireEvent.change(screen.getByPlaceholderText("correo"), { target: { value: "camila@correo.cl" } });
    fireEvent.click(screen.getByText("Continuar al pago"));

    pagarConTarjeta("4000 0000 0000 0002");

    expect(screen.getByText("El pago fue rechazado. Pruebe con otra tarjeta")).toBeDefined();
    expect(screen.queryByText(/fue confirmado/)).toBeNull();
});

test("Al confirmar con sesion se crea el pedido y se vacia el carrito", async () => {
    entrarComoCliente();

    fireEvent.click(screen.getByText("Productos"));

    await screen.findByText("Guitarra Acustica Folk");
    fireEvent.click(screen.getAllByRole("button", { name: "Agregar al carrito" })[0]);
    fireEvent.click(screen.getByText("Carrito"));
    fireEvent.click(screen.getByText("Continuar al pago"));
    pagarConTarjeta("4111 1111 1111 1111");

    expect(await screen.findByText(/¡Gracias por tu compra! Tu pedido N° \d+ fue confirmado/)).toBeDefined();
    expect(screen.getByText("Ver mis pedidos")).toBeDefined();
});

test("Se puede elegir retiro en tienda", async () => {
    entrarComoCliente();

    fireEvent.click(screen.getByText("Productos"));

    await screen.findByText("Guitarra Acustica Folk");
    fireEvent.click(screen.getAllByRole("button", { name: "Agregar al carrito" })[0]);
    fireEvent.click(screen.getByText("Carrito"));

    const retiro = screen.getByLabelText("Retiro en tienda") as HTMLInputElement;
    fireEvent.click(retiro);

    expect(retiro.checked).toBe(true);
});

test("El carrito vacio muestra un mensaje", () => {
    entrarComoCliente();

    fireEvent.click(screen.getByText("Carrito"));

    expect(screen.getByText("El carrito está vacío")).toBeDefined();
});

test("Se puede agregar, sumar, restar y quitar un producto", async () => {
    entrarComoCliente();

    fireEvent.click(screen.getByText("Productos"));

    await screen.findByText("Guitarra Acustica Folk");

    const botonesAgregar = screen.getAllByRole("button", { name: "Agregar al carrito" });
    fireEvent.click(botonesAgregar[0]);
    fireEvent.click(botonesAgregar[0]);

    fireEvent.click(screen.getByText("Carrito"));

    expect(screen.getByText("Guitarra Acustica Folk")).toBeDefined();
    expect(screen.getByText("Total: $259.980")).toBeDefined();

    fireEvent.click(screen.getByText("-"));
    expect(screen.getByText("Total: $129.990")).toBeDefined();

    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText("Total: $259.980")).toBeDefined();

    fireEvent.click(screen.getByText("Quitar"));
    expect(screen.getByText("El carrito está vacío")).toBeDefined();
});