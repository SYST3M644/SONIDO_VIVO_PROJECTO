// Mapa con la ubicación de la tienda, que también es el punto de retiro
const urlMapa = "https://maps.google.com/maps?q=-33.0246,-71.5518&z=16&output=embed";
const urlComoLlegar = "https://www.google.com/maps/dir/?api=1&destination=-33.0246,-71.5518";

function MapaTienda(){
    return(
        <div className="card shadow-sm p-3 mt-4">
            <h2>Dónde estamos</h2>

            <p>Av. Valparaíso 650, Viña del Mar</p>
            <p>Lunes a sábado de 10:00 a 19:00</p>
            <p>Si eliges "Retiro en tienda" al comprar, aquí retiras tu pedido.</p>

            <div className="ratio ratio-16x9 mb-3">
                <iframe title="Mapa de la tienda Sonido Vivo" src={urlMapa}></iframe>
            </div>

            <a className="btn boton-tienda" href={urlComoLlegar} target="_blank" rel="noreferrer">
                Cómo llegar
            </a>
        </div>
    );
}

export default MapaTienda
