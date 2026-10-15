import { useParams } from "react-router-dom"
import Regresar from "../componentes/atomos/Regresar";

const listaProductos = [
    {
        id: 1,
        titulo: "Bajo Electrico",
        descripcion: "Ibanez GSR200",
        precio: 379990,
        imagen: "/img/bajo-electrico.jpg"
    },
    {
        id: 2,
        titulo: "Piano Digital",
        descripcion: "Korg LP-180 de 88 Teclas",
        precio: 649990,
        imagen: "/img/piano-digital.jpg"
    },
    {
        id: 3,
        titulo: "Saxofon Alto",
        descripcion: "Yamaha YAS-280 laqueado",
        precio: 1149990,
        imagen: "/img/saxofon-alto.jpg"
    },
    {
        id: 4,
        titulo: "Ukelele Soprano",
        descripcion: "Kala KA-15S de caoba",
        precio: 69990,
        imagen: "/img/ukelele-soprano.jpg"
    },
    {
        id: 5,
        titulo: "Melodica 32 Teclas",
        descripcion: "Hohner Student 32 con estuche",
        precio: 54990,
        imagen: "/img/melodica.jpg"
    },
    {
        id: 6,
        titulo: "Zampona Andina",
        descripcion: "Artesanal de bambu, 13 tubos",
        precio: 24990,
        imagen: "/img/zampona.jpg"
    },
    {
        id: 7,
        titulo: "Arpa Celta",
        descripcion: "34 cuerdas con llaves de semitono",
        precio: 1290990,
        imagen: "/img/arpa.jpg"
    },
    {
        id: 8,
        titulo: "Set de Platillos",
        descripcion: "Zildjian Planet Z de 4 piezas",
        precio: 279990,
        imagen: "/img/platillos.jpg"
    },
    {
        id: 9,
        titulo: "Microfono para Vientos",
        descripcion: "Shure Beta 98 con pinza",
        precio: 349990,
        imagen: "/img/microfono-vientos.jpg"
    },
    {
        id: 10,
        titulo: "Atril de Partituras",
        descripcion: "Hercules BS050B plegable",
        precio: 29990,
        imagen: "/img/atril-partituras.jpg"
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

            <p>${producto?.precio.toLocaleString("es-CL")}</p>

            <Regresar />

        </div>
    )
}

export default DetalleProducto
