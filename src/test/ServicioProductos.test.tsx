import { test, expect, vi, afterEach } from "vitest";
import { listarProductos, buscarProducto, actualizarStock, urlImagen } from "../servicios/Productos";

afterEach(() => {
    vi.restoreAllMocks();
});

const productoFalso = {
    id: 1,
    titulo: "Guitarra Acustica Folk",
    descripcion: "Yamaha F310",
    precio: 129990,
    imagen: "guitarra-acustica.jpg",
    stock: 11,
    categoria: "Cuerdas"
};

test("Arma la direccion de la imagen del microservicio", () => {
    expect(urlImagen("guitarra-acustica.jpg"))
        .toBe("http://localhost:6464/api/productos/imagenes/guitarra-acustica.jpg");
});

test("Pide los productos al gateway y devuelve la lista", async () => {
    const peticion = vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => [productoFalso]
    } as Response);

    const productos = await listarProductos();

    expect(peticion).toHaveBeenCalledWith("http://localhost:6464/api/productos");
    expect(productos.length).toBe(1);
    expect(productos[0].titulo).toBe("Guitarra Acustica Folk");
});

test("Avisa cuando el servidor responde con error", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: false,
        status: 500
    } as Response);

    await expect(listarProductos()).rejects.toThrow("Error HTTP 500");
});

test("Busca un producto por su id", async () => {
    const peticion = vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => productoFalso
    } as Response);

    const producto = await buscarProducto(1);

    expect(peticion).toHaveBeenCalledWith("http://localhost:6464/api/productos/1");
    expect(producto.stock).toBe(11);
});

test("Actualiza el stock con el metodo PUT", async () => {
    const peticion = vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({ ...productoFalso, stock: 25 })
    } as Response);

    const producto = await actualizarStock(1, 25);

    expect(peticion).toHaveBeenCalledWith(
        "http://localhost:6464/api/productos/1/stock",
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stock: 25 })
        }
    );
    expect(producto.stock).toBe(25);
});
