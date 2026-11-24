import { Link } from "react-router-dom";
import FormularioRegistro from "../componentes/organismos/FormularioRegistro";
import type { Usuario } from "../servicios/Autenticacion";

type RegistroProps = {
    guardarUsuario: (usuario: Usuario) => void;
};

function Registro({ guardarUsuario }: RegistroProps) {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-6 col-lg-4">
                    <div className="card shadow-sm p-4">
                        <h2 className="mt-4">Crear cuenta</h2>

                        <p className="text-body-secondary">
                            Con tu cuenta puedes ver tus compras y seguir tus pedidos.
                        </p>

                        <FormularioRegistro guardarUsuario={guardarUsuario} />

                        <p className="mt-3 mb-0">
                            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registro
