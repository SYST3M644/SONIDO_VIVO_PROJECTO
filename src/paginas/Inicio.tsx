import { Link } from "react-router-dom"

function Inicio() {
    return(
        <div className="container mt-4">
            <div className="portada">
                <h1>
                    <img src="/img/logo/logo-blanco.png" alt="" className="logo-portada" />
                    <span className="visually-hidden">Sonido Vivo</span>
                </h1>

                <p>Instrumentos musicales y equipos de sonido en Viña del Mar</p>
            </div>

            <div id="carruselSonidoVivo" className="carousel slide mt-4 carrusel-tienda" data-bs-ride="carousel">
                <div className="carousel-inner">

                    <div className="carousel-item active">
                        <img src="/img/banners/guitarras.jpg" className="d-block w-100 imagen-carrusel" alt="Guitarras y bajos" />
                        <div className="carousel-caption texto-carrusel">
                            <h2>Cada cuerda cuenta una <span className="destacado">historia</span></h2>
                            <p>Guitarras acústicas, eléctricas y bajos.</p>
                            <Link to="/productos" className="btn boton-tienda">Ver guitarras</Link>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src="/img/banners/teclados.jpg" className="d-block w-100 imagen-carrusel" alt="Teclados y pianos" />
                        <div className="carousel-caption texto-carrusel">
                            <h2>Teclas que <span className="destacado">inspiran</span></h2>
                            <p>Pianos digitales, teclados y sintetizadores.</p>
                            <Link to="/productos" className="btn boton-tienda">Ver teclados</Link>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src="/img/banners/audio.jpg" className="d-block w-100 imagen-carrusel" alt="Equipos de sonido" />
                        <div className="carousel-caption texto-carrusel">
                            <h2>Sonido que se <span className="destacado">siente</span></h2>
                            <p>Amplificadores, parlantes y micrófonos.</p>
                            <Link to="/productos" className="btn boton-tienda">Ver equipos</Link>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src="/img/banners/percusion.jpg" className="d-block w-100 imagen-carrusel" alt="Baterías y percusión" />
                        <div className="carousel-caption texto-carrusel">
                            <h2>El ritmo empieza <span className="destacado">aquí</span></h2>
                            <p>Baterías, platillos y accesorios.</p>
                            <Link to="/productos" className="btn boton-tienda">Ver percusión</Link>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src="/img/banners/servicio_tecnico.jpg" className="d-block w-100 imagen-carrusel" alt="Servicio técnico" />
                        <div className="carousel-caption texto-carrusel">
                            <h2>Afinamos tu <span className="destacado">instrumento</span></h2>
                            <p>Reparación de instrumentos de cuerda.</p>
                            <Link to="/contacto" className="btn boton-tienda">Contáctanos</Link>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src="/img/banners/sonido_vivo.jpg" className="d-block w-100 imagen-carrusel" alt="Sonido Vivo" />
                        <div className="carousel-caption texto-carrusel">
                            <h2>Donde la música cobra <span className="destacado">vida</span></h2>
                            <p>Tu tienda de música en Viña del Mar.</p>
                            <Link to="/nosotros" className="btn boton-tienda">Conócenos</Link>
                        </div>
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

            <h2 className="mt-4">
                Bienvenido a Sonido Vivo, tu tienda de instrumentos musicales en Viña del Mar.
            </h2>

            <h5 className="mt-3">
                Encuentra guitarras, bajos, baterías, teclados, amplificadores,
                micrófonos, pedales de efectos y accesorios para músicos.
            </h5>

            <p className="mt-3">
                También realizamos reparación de instrumentos de cuerda.
            </p>
        </div>
    );
}
export default Inicio