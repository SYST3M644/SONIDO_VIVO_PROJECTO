import { useParams } from "react-router-dom"
import Regresar from "../componentes/atomos/Regresar";

const listaProductos = [
    {
        id: 1,
        titulo: "Teclado",
        descripcion: "Redragon Kurama",
        precio: 59990, 
        imagen: "/img/teclado.jpg"
    },
    {
        id: 2,
        titulo: "Notebook",
        descripcion: "Notebook HP Pavilion",
        imagen: "/img/notebook.jpg",
        precio: 699000
    },
    {
        id: 3,
        titulo: "Mouse",
        descripcion: "Logitech G502 HERO",
        precio: 189990,
        imagen: "/img/mouse.jpg"
    },
    {
        id: 4,
        titulo: "Audifono",
        descripcion: "Audifono Sony WH-CH520",
        precio: 39990,
        imagen: "/img/audifono.jpg"
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