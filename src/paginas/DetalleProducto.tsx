import { useParams } from "react-router-dom"
import Regresar from "../componentes/atomos/Regresar";

const listaProductos = [
    {
        id: 1,
        titulo: "Guitarra Electrica",
        descripcion: "Squier Affinity Stratocaster",
        precio: 329990, 
        imagen: "/img/guitarra-electrica.svg"
    },
    {
        id: 2,
        titulo: "Guitarra Acustica",
        descripcion: "Yamaha F310",
        imagen: "/img/guitarra-acustica.svg",
        precio: 179990
    },
    {
        id: 3,
        titulo: "Teclado",
        descripcion: "Casio CT-S300",
        precio: 229990,
        imagen: "/img/teclado.svg"
    },
    {
        id: 4,
        titulo: "Microfono",
        descripcion: "Shure SM58",
        precio: 139990,
        imagen: "/img/microfono.svg"
    }
];

function DetalleProducto(){
    const {id} = useParams()

    const producto = listaProductos.find(
        listaProductos => listaProductos.id === Number(id)
    )
    return(
        
        <div>
            <h1>Detalle del Producto</h1>

            <img 
                src={producto?.imagen} 
                alt={producto?.titulo}
                style={{width: '300px'}} 
            />

            <h2>{producto?.titulo}</h2>

            <p>{producto?.descripcion}</p>

            <p>{producto?.precio}</p>

            <Regresar />

        </div>
    )
}

export default DetalleProducto
