import CardProductos from "../componentes/moleculas/CardProductos"

function Productos(){
    return(
        <div className="container mt-4">
            <h1>Productos</h1>
       
            <div className="d-flex gap-3">

                    <CardProductos 
                    id={1}
                    titulo="Teclado"
                    descripcion= "Redragon Kurama"
                    precio= {59990}
                    imagen= "/img/teclado.jpg"
                    />

                    <CardProductos 
                    id={2}
                    titulo="Notebook"
                    descripcion= "Notebook HP Pavilon"
                    precio= {699000}
                    imagen= "/img/notebook.jpg"
                    />

                    <CardProductos 
                    id={3}
                    titulo="Mause"
                    descripcion= "Logitech G502 HERO"
                    precio= {189990}
                    imagen= "/img/mouse.jpg"
                    />

                    <CardProductos 
                    id={4}
                    titulo="Audifono"
                    descripcion= "Audifono Sony WH-CH520"
                    precio= {39990}
                    imagen= "/img/audifono.jpg"
                    />
            </div>
        </div>
    );
}

export default Productos