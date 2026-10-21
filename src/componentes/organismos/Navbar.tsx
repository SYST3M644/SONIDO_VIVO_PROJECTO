import { Link, useNavigate } from "react-router-dom"
import { useSesion } from "../../contexto/SesionContext"

type NavbarProps = {
    cantidadCarrito: number;
};

function Navbar({ cantidadCarrito }: NavbarProps) {
    const { usuario, cerrarSesion } = useSesion();
    const navegar = useNavigate();

    const salir = () => {
        cerrarSesion();
        navegar("/");
    };

    return(
        <nav className="navbar navbar-expand-lg barra-navegacion" data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand fw-semibold" to="/">
                    Sonido Vivo
                </Link>

                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#menuPrincipal"
                    aria-controls="menuPrincipal"
                    aria-expanded="false"
                    aria-label="Abrir menu de navegacion"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="menuPrincipal">
                    <div className="navbar-nav ms-auto align-items-lg-center">
                        <Link className="nav-link" to="/">
                            Inicio
                        </Link>

                        <Link className="nav-link" to="/productos">
                            Productos
                        </Link>

                        <Link className="nav-link" to="/carrito">
                            Carrito
                            <span className="badge text-bg-light ms-2">
                                {cantidadCarrito}
                            </span>
                        </Link>

                        <Link className="nav-link" to="/contacto">
                            Contacto
                        </Link>

                        <Link className="nav-link" to="/nosotros">
                            Nosotros
                        </Link>

                        {usuario !== null && usuario.rol === "administrador" && (
                            <Link className="nav-link" to="/admin">
                                Administración
                            </Link>
                        )}

                        {usuario === null ? (
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        ) : (
                            <>
                                <span className="nav-link">
                                    {usuario.nombre} ({usuario.rol})
                                </span>

                                <button 
                                    type="button"
                                    className="btn btn-outline-light btn-sm"
                                    onClick={salir}
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar
