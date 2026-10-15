import Boton from "../atomos/Boton";


interface CardProps {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string;
}

function CardProducto({id, titulo, descripcion, precio, imagen}: CardProps) {
    return(
        <div className="card" style={{ width: '20rem'}}>

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

                <p className="card-text">
                    ${precio}
                </p>

                <div className="mt-auto">
                    <Boton id={id}/>
                </div>

            </div>

        </div>

    );
}
export default CardProducto
