import CardProductos from "../componentes/moleculas/CardProductos"

function Productos(){
    return(
        <div className="container mt-4">
            <h1>Productos</h1>
       
            <div className="d-flex gap-3">

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
            </div>
        </div>
    );
}

export default Productos
