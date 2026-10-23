import FormularioLogin from "../componentes/organismos/FormularioLogin";
import type { Usuario } from "../servicios/Autenticacion";

type LoginProps = {
    guardarUsuario: (usuario: Usuario) => void;
    mostrarNotificacion: (texto: string, tipo: string) => void;
};

function Login({ guardarUsuario, mostrarNotificacion }: LoginProps){
    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-6 col-lg-4">
                    <div className="card shadow-sm p-4">
                        <h2 className="mt-4">Formulario de Login</h2>

                        <FormularioLogin guardarUsuario={guardarUsuario} mostrarNotificacion={mostrarNotificacion} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login
