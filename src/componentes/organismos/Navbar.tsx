import { Link } from "react-router-dom"

function Navbar() {
    return(
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand text-white fw-semibold" to="/">
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
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link text-white" to="/">
                            Inicio
                        </Link>

                        <Link className="nav-link text-white" to="/productos">
                            Productos
                        </Link>

                        <Link className="nav-link text-white" to="/contacto">
                            Contacto
                        </Link>

                        <Link className="nav-link text-white" to="/nosotros">
                            Nosotros
                        </Link>

                        <Link className="nav-link text-white" to="/login">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar
