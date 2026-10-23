import FormularioContacto from "../componentes/organismos/FormularioContacto";

function Contacto(){
    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm p-4">
                        <h2 className="mt-4">Formulario de Contacto</h2>

                        <p>
                            Tienda Sonido Vivo, Viña del Mar, Región de Valparaíso.
                            Escríbenos y te respondemos el mismo día.
                        </p>

                        <FormularioContacto />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacto
