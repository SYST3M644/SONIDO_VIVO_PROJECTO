import type { Producto } from "../../tipos/producto";
import { etiquetasCategoria } from "../../tipos/producto";
import { formatearPrecio } from "../../utilidades/formato";
import Boton from "../atomos/Boton";

interface CardProps {
  producto: Producto;
}

function CardProducto({ producto }: CardProps) {
  return (
    <div className="card h-100 sv-card">
      <img
        src={producto.imagen}
        className="card-img-top sv-card__imagen"
        alt={producto.nombre}
      />

      <div className="card-body d-flex flex-column text-start">
        <span className="sv-etiqueta align-self-start mb-2">
          {etiquetasCategoria[producto.categoria]}
        </span>

        <h3 className="h5 card-title mb-1">{producto.nombre}</h3>

        <p className="text-body-secondary small mb-2">
          {producto.marca} {producto.modelo}
        </p>

        <p className="fs-5 fw-semibold mb-3">
          {formatearPrecio(producto.precio)}
        </p>

        <div className="mt-auto">
          <Boton id={producto.id} />
        </div>
      </div>
    </div>
  );
}

export default CardProducto;
