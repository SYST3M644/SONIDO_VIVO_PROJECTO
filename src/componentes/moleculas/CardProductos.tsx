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
                        <img src="/img/carrito.svg" alt="" width="22" height="22" />
                    </button>
                </div>

            </div>

        </div>

    );
}
export default CardProducto
