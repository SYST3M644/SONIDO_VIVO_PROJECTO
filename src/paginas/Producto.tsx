import CardProductos from "../componentes/moleculas/CardProductos"

function Productos(){
    return(
        <div className="container mt-4">
            <h1>Productos</h1>
       
            <div className="d-flex flex-wrap justify-content-center gap-3">

                    <CardProductos 
                    id={1}
                    titulo="Guitarra Electrica"
                    descripcion= "Squier Affinity Stratocaster"
                    precio= {329990}
                    imagen= "/img/guitarra-electrica.svg"
                    />

                    <CardProductos 
                    id={2}
                    titulo="Guitarra Acustica"
                    descripcion= "Yamaha F310"
                    precio= {179990}
                    imagen= "/img/guitarra-acustica.svg"
                    />

                    <CardProductos 
                    id={3}
                    titulo="Teclado"
                    descripcion= "Casio CT-S300"
                    precio= {229990}
                    imagen= "/img/teclado.svg"
                    />

                    <CardProductos 
                    id={4}
                    titulo="Microfono"
                    descripcion= "Shure SM58"
                    precio= {139990}
                    imagen= "/img/microfono.svg"
                    />

                    <CardProductos 
                    id={5}
                    titulo="Guitarra Clasica"
                    descripcion= "Yamaha C40"
                    precio= {149990}
                    imagen= "/img/guitarra-clasica.svg"
                    />

                    <CardProductos 
                    id={6}
                    titulo="Bajo Electrico"
                    descripcion= "Squier Affinity Precision Bass"
                    precio= {379990}
                    imagen= "/img/bajo-electrico.svg"
                    />

                    <CardProductos 
                    id={7}
                    titulo="Bateria Acustica"
                    descripcion= "Pearl Roadshow 5 Cuerpos"
                    precio= {749990}
                    imagen= "/img/bateria-acustica.svg"
                    />

                    <CardProductos 
                    id={8}
                    titulo="Bateria Electronica"
                    descripcion= "Alesis Nitro Mesh Kit"
                    precio= {589990}
                    imagen= "/img/bateria-electronica.svg"
                    />
            </div>
        </div>
    );
}

export default Productos
