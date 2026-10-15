import CardProductos from "../componentes/moleculas/CardProductos"

function Productos(){
    return(
        <div className="container mt-4">
            <h1 className="titulo-seccion">Productos</h1>
       
            <div className="d-flex flex-wrap justify-content-center gap-3">

                    <CardProductos 
                    id={1}
                    titulo="Guitarra Acustica Folk"
                    descripcion= "Yamaha F310"
                    precio= {129990}
                    imagen= "/img/guitarra-acustica.jpg"
                    />

                    <CardProductos 
                    id={2}
                    titulo="Guitarra Acustica Dreadnought"
                    descripcion= "Fender CD-60S"
                    precio= {189990}
                    imagen= "/img/guitarra-dreadnought.jpg"
                    />

                    <CardProductos 
                    id={3}
                    titulo="Bajo Electrico"
                    descripcion= "Ibanez GSR200"
                    precio= {379990}
                    imagen= "/img/bajo-electrico.jpg"
                    />

                    <CardProductos 
                    id={4}
                    titulo="Piano Digital"
                    descripcion= "Korg LP-180 de 88 Teclas"
                    precio= {649990}
                    imagen= "/img/piano-digital.jpg"
                    />

                    <CardProductos 
                    id={5}
                    titulo="Saxofon Alto"
                    descripcion= "Yamaha YAS-280 laqueado"
                    precio= {1149990}
                    imagen= "/img/saxofon-alto.jpg"
                    />

                    <CardProductos 
                    id={6}
                    titulo="Ukelele Soprano"
                    descripcion= "Kala KA-15S de caoba"
                    precio= {69990}
                    imagen= "/img/ukelele-soprano.jpg"
                    />

                    <CardProductos 
                    id={7}
                    titulo="Melodica 32 Teclas"
                    descripcion= "Hohner Student 32 con estuche"
                    precio= {54990}
                    imagen= "/img/melodica.jpg"
                    />

                    <CardProductos 
                    id={8}
                    titulo="Zampona Andina"
                    descripcion= "Artesanal de bambu, 13 tubos"
                    precio= {24990}
                    imagen= "/img/zampona.jpg"
                    />

                    <CardProductos 
                    id={9}
                    titulo="Arpa Celta"
                    descripcion= "34 cuerdas con llaves de semitono"
                    precio= {1290990}
                    imagen= "/img/arpa.jpg"
                    />

                    <CardProductos 
                    id={10}
                    titulo="Set de Platillos"
                    descripcion= "Zildjian Planet Z de 4 piezas"
                    precio= {279990}
                    imagen= "/img/platillos.jpg"
                    />

                    <CardProductos 
                    id={11}
                    titulo="Microfono para Vientos"
                    descripcion= "Shure Beta 98 con pinza"
                    precio= {349990}
                    imagen= "/img/microfono-vientos.jpg"
                    />

                    <CardProductos 
                    id={12}
                    titulo="Atril de Partituras"
                    descripcion= "Hercules BS050B plegable"
                    precio= {29990}
                    imagen= "/img/atril-partituras.jpg"
                    />
            </div>
        </div>
    );
}

export default Productos
