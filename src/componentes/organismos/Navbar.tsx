import { Link } from "react-router-dom"
import type { Usuario } from "../../servicios/Autenticacion"

type NavbarProps = {
    cantidadCarrito: number;
    usuario: Usuario | null;
    cerrarSesion: () => void;
};

function Navbar({ cantidadCarrito, usuario, cerrarSesion }: NavbarProps) {
    const esStaff = usuario !== null && (usuario.rol === "vendedor" || usuario.rol === "administrador");
    const esCliente = usuario === null || usuario.rol === "cliente";

    return(
        <nav className="navbar navbar-expand-lg barra-navegacion" data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand py-0" to="/">
                    <img src="/img/logo/logo-navbar.png" alt="" className="logo-navbar" />
                    <span className="visually-hidden">Sonido Vivo</span>
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

                        {esCliente && (
                            <Link className="nav-link" to="/carrito">
                                Carrito
                                <span className="badge text-bg-light ms-2">
                                    {cantidadCarrito}
                                </span>
                            </Link>
                        )}

                        {usuario !== null && usuario.rol === "cliente" && (
                            <Link className="nav-link" to="/mis-pedidos">
                                Mis pedidos
                            </Link>
                        )}

                        {esCliente && (
                            <>
                                <Link className="nav-link" to="/contacto">
                                    Contacto
                                </Link>

                                <Link className="nav-link" to="/nosotros">
                                    Nosotros
                                </Link>
                            </>
                        )}

                        {esStaff && usuario !== null && (
                            <div className="nav-item dropdown">
                                <button
                                    className="nav-link dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Gestión
                                </button>

                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link className="dropdown-item" to="/vendedor">
                                            Pedidos
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="dropdown-item" to="/vendedor/stock">
                                            Stock
                                        </Link>
                                    </li>

                                    {usuario.rol === "administrador" && (
                                        <>
                                            <li><hr className="dropdown-divider" /></li>

                                            <li>
                                                <Link className="dropdown-item" to="/mensajes">
                                                    Mensajes
                                                </Link>
                                            </li>

                                            <li>
                                                <Link className="dropdown-item" to="/reportes">
                                                    Reportes
                                                </Link>
                                            </li>

                                            <li>
                                                <Link className="dropdown-item" to="/admin">
                                                    Usuarios
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
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
                                    onClick={cerrarSesion}
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
