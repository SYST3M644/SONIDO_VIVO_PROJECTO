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
        precio: 179990,
        imagen: "/img/guitarra-acustica.svg"
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
    },
    {
        id: 5,
        titulo: "Guitarra Clasica",
        descripcion: "Yamaha C40",
        precio: 149990,
        imagen: "/img/guitarra-clasica.svg"
    },
    {
        id: 6,
        titulo: "Bajo Electrico",
        descripcion: "Squier Affinity Precision Bass",
        precio: 379990,
        imagen: "/img/bajo-electrico.svg"
    },
    {
        id: 7,
        titulo: "Bateria Acustica",
        descripcion: "Pearl Roadshow 5 Cuerpos",
        precio: 749990,
        imagen: "/img/bateria-acustica.svg"
    },
    {
        id: 8,
        titulo: "Bateria Electronica",
        descripcion: "Alesis Nitro Mesh Kit",
        precio: 589990,
        imagen: "/img/bateria-electronica.svg"
    },
    {
        id: 9,
        titulo: "Piano Digital",
        descripcion: "Yamaha P-45 de 88 Teclas",
        precio: 649990,
        imagen: "/img/piano-digital.svg"
    },
    {
        id: 10,
        titulo: "Amplificador de Guitarra",
        descripcion: "Marshall MG15G de 15W",
        precio: 219990,
        imagen: "/img/amplificador-guitarra.svg"
    },
    {
        id: 11,
        titulo: "Amplificador de Bajo",
        descripcion: "Fender Rumble 25",
        precio: 299990,
        imagen: "/img/amplificador-bajo.svg"
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
