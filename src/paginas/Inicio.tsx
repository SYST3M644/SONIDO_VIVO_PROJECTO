function Inicio() {
    return(
        <div className="container mt-4">
            <div className="portada">
                <h1>Sonido <span className="destacado">Vivo</span></h1>

                <p>Instrumentos musicales y equipos de sonido en Viña del Mar</p>
            </div>

            <div id="carruselSonidoVivo" className="carousel slide mt-4 carrusel-tienda" data-bs-ride="carousel" data-bs-theme="dark">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/img/guitarra-acustica.jpg" className="d-block w-100 imagen-carrusel" alt="Guitarra acustica Yamaha F310" />
                    </div>

                    <div className="carousel-item">
                        <img src="/img/saxofon-alto.jpg" className="d-block w-100 imagen-carrusel" alt="Saxofon alto Yamaha YAS-280" />
                    </div>

                    <div className="carousel-item">
                        <img src="/img/piano-digital.jpg" className="d-block w-100 imagen-carrusel" alt="Piano digital Korg LP-180" />
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carruselSonidoVivo" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Anterior</span>
                </button>

                <button className="carousel-control-next" type="button" data-bs-target="#carruselSonidoVivo" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Siguiente</span>
                </button>
            </div>

            <p className="mt-4">
                Bienvenido a Sonido Vivo, tu tienda de instrumentos musicales en Viña del Mar.
            </p>

            <p>
                Encuentra guitarras, bajos, baterías, teclados, amplificadores,
                micrófonos, pedales de efectos y accesorios para músicos.
            </p>

            <p>
                También realizamos reparación de instrumentos de cuerda.
            </p>
        </div>
    );
}
export default Inicio
