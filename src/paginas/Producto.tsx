import CardProductos from "../componentes/moleculas/CardProductos";
import { productos } from "../datos/productos";

function Productos() {
  return (
    <div className="container my-4">
      <h1 className="mb-1">Catálogo</h1>

      <p className="text-body-secondary mb-4">
        Instrumentos, equipos de sonido y accesorios disponibles en nuestra
        tienda de Viña del Mar.
      </p>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {productos.map((producto) => (
          <div className="col" key={producto.id}>
            <CardProductos producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;
