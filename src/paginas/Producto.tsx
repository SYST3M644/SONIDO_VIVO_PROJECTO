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
                    descripcion= "Ibanez GSR200"
                    precio= {379990}
                    imagen= "/img/bajo-electrico.jpg"
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

                    <CardProductos 
                    id={9}
                    titulo="Piano Digital"
                    descripcion= "Korg LP-180 de 88 Teclas"
                    precio= {649990}
                    imagen= "/img/piano-digital.jpg"
                    />

                    <CardProductos 
                    id={10}
                    titulo="Amplificador de Guitarra"
                    descripcion= "Marshall MG15G de 15W"
                    precio= {219990}
                    imagen= "/img/amplificador-guitarra.svg"
                    />

                    <CardProductos 
                    id={11}
                    titulo="Amplificador de Bajo"
                    descripcion= "Fender Rumble 25"
                    precio= {299990}
                    imagen= "/img/amplificador-bajo.svg"
                    />

                    <CardProductos 
                    id={12}
                    titulo="Pedal de Distorsion"
                    descripcion= "Boss DS-1"
                    precio= {89990}
                    imagen= "/img/pedal-efectos.svg"
                    />

                    <CardProductos 
                    id={13}
                    titulo="Set de Cuerdas"
                    descripcion= "Ernie Ball Regular Slinky 010"
                    precio= {12990}
                    imagen= "/img/cuerdas.svg"
                    />

                    <CardProductos 
                    id={14}
                    titulo="Afinador de Pinza"
                    descripcion= "Korg PitchClip 2"
                    precio= {24990}
                    imagen= "/img/afinador.svg"
                    />

                    <CardProductos 
                    id={15}
                    titulo="Saxofon Alto"
                    descripcion= "Yamaha YAS-280 laqueado"
                    precio= {1149990}
                    imagen= "/img/saxofon-alto.jpg"
                    />

                    <CardProductos 
                    id={16}
                    titulo="Ukelele Soprano"
                    descripcion= "Kala KA-15S de caoba"
                    precio= {69990}
                    imagen= "/img/ukelele-soprano.jpg"
                    />
            </div>
        </div>
    );
}

export default Productos
