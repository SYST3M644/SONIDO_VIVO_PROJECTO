import FormularioLogin from "../componentes/organismos/FormularioLogin";

function Login(){
    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-6 col-lg-4">
                    <div className="card shadow-sm p-4">
                        <h2 className="mt-4">Formulario de Login</h2>

                        <FormularioLogin />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login