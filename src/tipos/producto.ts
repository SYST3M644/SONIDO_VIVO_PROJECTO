/*
 * Modelo de un producto del catalogo de Sonido Vivo.
 *
 * El caso indica que el catalogo real tiene 340 referencias distintas
 * repartidas en instrumentos, equipos de sonido y accesorios. Estos
 * tipos describen la forma que tendra cada registro cuando el catalogo
 * se cargue desde la API del microservicio correspondiente.
 */

export type Categoria =
  | "guitarras"
  | "bajos"
  | "baterias"
  | "teclados"
  | "amplificadores"
  | "microfonos"
  | "pedales"
  | "accesorios";

export interface Producto {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  categoria: Categoria;
  descripcion: string;
  precio: number;
  /** Unidades disponibles en bodega. Cero significa sin stock. */
  stock: number;
  imagen: string;
}

/** Nombre legible de cada categoria, para mostrar en la interfaz. */
export const etiquetasCategoria: Record<Categoria, string> = {
  guitarras: "Guitarras",
  bajos: "Bajos",
  baterias: "Baterias",
  teclados: "Teclados y pianos",
  amplificadores: "Amplificadores",
  microfonos: "Microfonos",
  pedales: "Pedales de efectos",
  accesorios: "Accesorios",
};
