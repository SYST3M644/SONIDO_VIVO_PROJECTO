import Boton from "../atomos/Boton";


interface CardProps {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string;
    agregarProducto: (id: number) => void;
}

function CardProducto({id, titulo, descripcion, precio, imagen, agregarProducto}: CardProps) {
    return(
        <div className="card tarjeta-producto" style={{ width: '20rem', maxWidth: '100%'}}>

            <img 
            src={imagen} className="card-img-top" 
            alt={titulo} 
            style={{height: '200px',objectFit: 'contain'}}
            />

            <h2>{titulo}</h2>

            <div className="card-body d-flex flex-column">

                <p className="card-text">
                    {descripcion}
                </p>

                <p className="card-text precio-producto">
                    ${precio.toLocaleString("es-CL")}
                </p>

                <div className="mt-auto d-flex gap-2">
                    <Boton id={id}/>

                    <button
                        className="btn boton-carrito"
                        type="button"
                        title="Agregar al carrito"
                        aria-label="Agregar al carrito"
                        onClick={() => agregarProducto(id)}
                    >
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5z"/>
                            <path d="M5 13a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                    </button>
                </div>

            </div>

        </div>

    );
}
export default CardProducto
