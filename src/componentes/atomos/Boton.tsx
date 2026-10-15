/*
 * • btn-primary:         Se vuelve azul
 * • btn-success:         Se vuelve verde.
 * • btn-danger:          Se vuelve rojo.
 * • btn-warning:         Se vuelve amarillo.
 * • btn-info:            Se vuelve azul claro/celeste.
 * • btn-secondary:       Se vuelve gris.
 * • btn-dark:            Se vuelve negro.
 * • btn-outline-primary: Se vuelve transparente con borde azul
 */

import { Link } from "react-router-dom"

interface BotonProps {
    id: number;
}
function Boton({id}: BotonProps) {
    return (
        <Link to={`/productos/${id}`}
        className="btn boton-tienda"
        >
            Ver Producto
        </Link>
    );
}

export default Boton


