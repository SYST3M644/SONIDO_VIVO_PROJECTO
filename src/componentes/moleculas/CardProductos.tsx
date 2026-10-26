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
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M2.5 3.5h2.3l2.6 11.4h10.2" />
                            <path d="M6.2 6.6h15l-1.9 6.9H7.8" />
                            <circle cx="9.5" cy="19" r="1.5" fill="currentColor" stroke="none" />
                            <circle cx="17.5" cy="19" r="1.5" fill="currentColor" stroke="none" />
                        </svg>
                    </button>
                </div>

            </div>

        </div>

    );
}
export default CardProducto
