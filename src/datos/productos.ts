import type { Categoria, Producto } from "../tipos/producto";

/*
 * Catálogo de Sonido Vivo.
 *
 * Esta lista es provisional: reemplaza a los datos de prueba mientras el
 * microservicio de catálogo no esté disponible. El catálogo real de la
 * tienda tiene 340 referencias y llega en un archivo Excel, que se
 * cargará a la base de datos en la siguiente etapa del proyecto.
 */
export const productos: Producto[] = [
  {
    id: 1,
    nombre: "Guitarra Eléctrica Stratocaster",
    marca: "Squier",
    modelo: "Affinity Stratocaster",
    categoria: "guitarras",
    descripcion:
      "Guitarra eléctrica de cuerpo en álamo, mástil de arce y tres cápsulas single-coil. Ideal para quienes empiezan y buscan el sonido clásico Stratocaster.",
    precio: 329990,
    stock: 6,
    imagen: "/img/guitarra-electrica.svg",
  },
  {
    id: 2,
    nombre: "Guitarra Acústica Folk",
    marca: "Yamaha",
    modelo: "F310",
    categoria: "guitarras",
    descripcion:
      "Guitarra acústica tipo folk con tapa de abeto y aros de meranti. Es el modelo más vendido de la tienda para quienes recién se inician.",
    precio: 179990,
    stock: 11,
    imagen: "/img/guitarra-acustica.svg",
  },
  {
    id: 3,
    nombre: "Guitarra Clásica de Estudio",
    marca: "Yamaha",
    modelo: "C40",
    categoria: "guitarras",
    descripcion:
      "Guitarra clásica de cuerdas de nylon en tamaño completo. Recomendada por los profesores de música de la zona para alumnos de conservatorio.",
    precio: 149990,
    stock: 8,
    imagen: "/img/guitarra-clasica.svg",
  },
  {
    id: 4,
    nombre: "Bajo Eléctrico Precision",
    marca: "Squier",
    modelo: "Affinity Precision Bass PJ",
    categoria: "bajos",
    descripcion:
      "Bajo de cuatro cuerdas con cápsulas split-coil y jazz, mástil de arce y diapasón de laurel indio. Buena opción para bandas de rock y cumbia.",
    precio: 379990,
    stock: 4,
    imagen: "/img/bajo-electrico.svg",
  },
  {
    id: 5,
    nombre: "Batería Acústica 5 Cuerpos",
    marca: "Pearl",
    modelo: "Roadshow RS505C",
    categoria: "baterias",
    descripcion:
      "Set completo de cinco cuerpos con bombo de 22 pulgadas, platillos, pedal y banqueta. Se entrega armada y afinada en la tienda.",
    precio: 749990,
    stock: 2,
    imagen: "/img/bateria-acustica.svg",
  },
  {
    id: 6,
    nombre: "Batería Electrónica de Malla",
    marca: "Alesis",
    modelo: "Nitro Mesh Kit",
    categoria: "baterias",
    descripcion:
      "Ocho pads de malla con módulo de 40 sets de sonidos. Permite ensayar con audífonos, sin molestar a los vecinos.",
    precio: 589990,
    stock: 3,
    imagen: "/img/bateria-electronica.svg",
  },
  {
    id: 7,
    nombre: "Teclado Portátil 61 Teclas",
    marca: "Casio",
    modelo: "CT-S300",
    categoria: "teclados",
    descripcion:
      "Teclado de 61 teclas con respuesta a la pulsación, 400 tonos y 77 ritmos. Funciona con pilas o transformador, cómodo para llevar a ensayos.",
    precio: 229990,
    stock: 7,
    imagen: "/img/teclado.svg",
  },
  {
    id: 8,
    nombre: "Piano Digital 88 Teclas",
    marca: "Yamaha",
    modelo: "P-45",
    categoria: "teclados",
    descripcion:
      "Piano digital de 88 teclas contrapesadas con acción GHS. Incluye pedal de sostenido y atril de partituras. El soporte se vende por separado.",
    precio: 649990,
    stock: 3,
    imagen: "/img/piano-digital.svg",
  },
  {
    id: 9,
    nombre: "Amplificador de Guitarra 15W",
    marca: "Marshall",
    modelo: "MG15G",
    categoria: "amplificadores",
    descripcion:
      "Combo de 15 watts con canales limpio y overdrive, reverberación digital y salida para audífonos. Suficiente para ensayo y sala pequeña.",
    precio: 219990,
    stock: 5,
    imagen: "/img/amplificador-guitarra.svg",
  },
  {
    id: 10,
    nombre: "Amplificador de Bajo 25W",
    marca: "Fender",
    modelo: "Rumble 25",
    categoria: "amplificadores",
    descripcion:
      "Combo de bajo de 25 watts con parlante de 8 pulgadas y ecualizador de tres bandas. Actualmente sin stock: se repone en 10 días hábiles.",
    precio: 299990,
    stock: 0,
    imagen: "/img/amplificador-bajo.svg",
  },
  {
    id: 11,
    nombre: "Micrófono Dinámico Vocal",
    marca: "Shure",
    modelo: "SM58-LC",
    categoria: "microfonos",
    descripcion:
      "Micrófono dinámico cardioide, estándar de la industria para voz en vivo. Incluye estuche y pinza. El cable se vende por separado.",
    precio: 139990,
    stock: 14,
    imagen: "/img/microfono.svg",
  },
  {
    id: 12,
    nombre: "Pedal de Distorsión",
    marca: "Boss",
    modelo: "DS-1",
    categoria: "pedales",
    descripcion:
      "Pedal de distorsión clásico con controles de tono, nivel y distorsión. Chasis metálico que aguanta el uso en gira.",
    precio: 89990,
    stock: 9,
    imagen: "/img/pedal-efectos.svg",
  },
  {
    id: 13,
    nombre: "Set de Cuerdas para Eléctrica",
    marca: "Ernie Ball",
    modelo: "Regular Slinky 2221",
    categoria: "accesorios",
    descripcion:
      "Juego de seis cuerdas 010-046 de acero niquelado. Es el calibre que más piden los clientes de la tienda.",
    precio: 12990,
    stock: 40,
    imagen: "/img/cuerdas.svg",
  },
  {
    id: 14,
    nombre: "Afinador de Pinza Cromático",
    marca: "Korg",
    modelo: "PitchClip 2",
    categoria: "accesorios",
    descripcion:
      "Afinador cromático de pinza con pantalla LED visible a contraluz. Sirve para guitarra, bajo, ukelele y violín.",
    precio: 24990,
    stock: 22,
    imagen: "/img/afinador.svg",
  },
];

/** Busca un producto del catálogo por su identificador. */
export function buscarProducto(id: number): Producto | undefined {
  return productos.find((producto) => producto.id === id);
}

/** Devuelve las categorías que hoy tienen al menos un producto cargado. */
export function categoriasDisponibles(): Categoria[] {
  return [...new Set(productos.map((producto) => producto.categoria))];
}
