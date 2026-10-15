import type { Producto } from "../tipos/producto";

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
];
