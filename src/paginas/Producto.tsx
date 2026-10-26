import { useState } from "react"
import CardProductos from "../componentes/moleculas/CardProductos"
import { productos } from "../servicios/Productos"

type ProductosProps = {
    agregarProducto: (id: number) => void;
};

function Productos({ agregarProducto }: ProductosProps) {
    const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState("Todas");

    const productosFiltrados = productos.filter((producto) => {
        const coincideNombre = producto.titulo.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCategoria = categoria === "Todas" || producto.categoria === categoria;

        return coincideNombre && coincideCategoria;
    });

    return (
        <div className="container mt-4">
            <h1 className="titulo-seccion">Productos</h1>

            <div className="row justify-content-center mb-4">
                <div className="col-12 col-md-6 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar producto"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <div className="col-12 col-md-3">
                    <select
                        className="form-select"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="Todas">Todas las categorías</option>
                        <option value="Cuerdas">Cuerdas</option>
                        <option value="Teclados">Teclados</option>
                        <option value="Vientos">Vientos</option>
                        <option value="Percusión">Percusión</option>
                        <option value="Audio">Audio</option>
                        <option value="Accesorios">Accesorios</option>
                    </select>
                </div>
            </div>

            {productosFiltrados.length === 0 && (
                <p>No se encontraron productos</p>
            )}

            <div className="d-flex flex-wrap justify-content-center gap-3">
                {productosFiltrados.map((producto) => (
                    <CardProductos
                        key={producto.id}
                        {...producto}
                        agregarProducto={agregarProducto}
                    />
                ))}
            </div>
        </div>
    );
}

export default Productos