
import { Link } from "react-router-dom"


function Regresar() {
    return (
        <Link to={`/productos`}
        className="btn btn-outline-secondary"
        >
            Regresar a Productos
        </Link>
    );
}

export default Regresar

