export type Producto = {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoria: string;
};

export type ProductoCarrito = {
    id: number;
    titulo: string;
    precio: number;
    imagen: string;
    cantidad: number;
};

export const productos: Producto[] = [
    {
        id: 1,
        titulo: "Guitarra Acustica Folk",
        descripcion: "Yamaha F310",
        precio: 129990,
        imagen: "/img/guitarra-acustica.jpg",
        categoria: "Cuerdas"
    },
    {
        id: 2,
        titulo: "Guitarra Acustica Dreadnought",
        descripcion: "Fender CD-60S",
        precio: 189990,
        imagen: "/img/guitarra-dreadnought.jpg",
        categoria: "Cuerdas"
    },
    {
        id: 3,
        titulo: "Bajo Electrico",
        descripcion: "Ibanez GSR200",
        precio: 379990,
        imagen: "/img/bajo-electrico.jpg",
        categoria: "Cuerdas"
    },
    {
        id: 4,
        titulo: "Piano Digital",
        descripcion: "Korg LP-180 de 88 Teclas",
        precio: 649990,
        imagen: "/img/piano-digital.jpg",
        categoria: "Teclados"
    },
    {
        id: 5,
        titulo: "Saxofon Alto",
        descripcion: "Yamaha YAS-280 laqueado",
        precio: 1149990,
        imagen: "/img/saxofon-alto.jpg",
        categoria: "Vientos"
    },
    {
        id: 6,
        titulo: "Ukelele Soprano",
        descripcion: "Kala KA-15S de caoba",
        precio: 69990,
        imagen: "/img/ukelele-soprano.jpg",
        categoria: "Cuerdas"
    },
    {
        id: 7,
        titulo: "Melodica 32 Teclas",
        descripcion: "Hohner Student 32 con estuche",
        precio: 54990,
        imagen: "/img/melodica.jpg",
        categoria: "Teclados"
    },
    {
        id: 8,
        titulo: "Zampona Andina",
        descripcion: "Artesanal de bambu, 13 tubos",
        precio: 24990,
        imagen: "/img/zampona.jpg",
        categoria: "Vientos"
    },
    {
        id: 9,
        titulo: "Arpa Celta",
        descripcion: "34 cuerdas con llaves de semitono",
        precio: 1290990,
        imagen: "/img/arpa.jpg",
        categoria: "Cuerdas"
    },
    {
        id: 10,
        titulo: "Set de Platillos",
        descripcion: "Zildjian Planet Z de 4 piezas",
        precio: 279990,
        imagen: "/img/platillos.jpg",
        categoria: "Percusión"
    },
    {
        id: 11,
        titulo: "Microfono para Vientos",
        descripcion: "Shure Beta 98 con pinza",
        precio: 349990,
        imagen: "/img/microfono-vientos.jpg",
        categoria: "Audio"
    },
    {
        id: 12,
        titulo: "Atril de Partituras",
        descripcion: "Hercules BS050B plegable",
        precio: 29990,
        imagen: "/img/atril-partituras.jpg",
        categoria: "Accesorios"
    }
];