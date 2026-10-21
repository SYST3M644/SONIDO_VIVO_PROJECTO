export type Caracteristica = {
    nombre: string;
    valor: string;
}

export type FichaTecnica = {
    id: number;
    caracteristicas: Caracteristica[];
}

const fichas: FichaTecnica[] = [
    {
        id: 1,
        caracteristicas: [
            { nombre: "Tapa", valor: "Abeto" },
            { nombre: "Aros y fondo", valor: "Meranti" },
            { nombre: "Diapasón", valor: "Palo de rosa" },
            { nombre: "Escala", valor: "634 mm" },
            { nombre: "Peso", valor: "2,1 kg" },
            { nombre: "Garantía", valor: "12 meses" }
        ]
    },
    {
        id: 2,
        caracteristicas: [
            { nombre: "Tapa", valor: "Abeto macizo" },
            { nombre: "Aros y fondo", valor: "Caoba" },
            { nombre: "Diapasón", valor: "Nogal" },
            { nombre: "Escala", valor: "643 mm" },
            { nombre: "Peso", valor: "2,4 kg" },
            { nombre: "Garantía", valor: "12 meses" }
        ]
    },
    {
        id: 3,
        caracteristicas: [
            { nombre: "Cuerpo", valor: "Álamo" },
            { nombre: "Mástil", valor: "Arce" },
            { nombre: "Cuerdas", valor: "4" },
            { nombre: "Cápsulas", valor: "P y J cerámicas" },
            { nombre: "Peso", valor: "3,8 kg" },
            { nombre: "Garantía", valor: "12 meses" }
        ]
    },
    {
        id: 4,
        caracteristicas: [
            { nombre: "Teclas", valor: "88 contrapesadas" },
            { nombre: "Polifonía", valor: "120 notas" },
            { nombre: "Sonidos", valor: "10" },
            { nombre: "Pedales", valor: "3" },
            { nombre: "Peso", valor: "22 kg" },
            { nombre: "Garantía", valor: "24 meses" }
        ]
    },
    {
        id: 5,
        caracteristicas: [
            { nombre: "Afinación", valor: "Mi bemol" },
            { nombre: "Material", valor: "Latón" },
            { nombre: "Acabado", valor: "Laca dorada" },
            { nombre: "Boquilla", valor: "Incluida 4C" },
            { nombre: "Peso", valor: "2,6 kg" },
            { nombre: "Garantía", valor: "24 meses" }
        ]
    },
    {
        id: 6,
        caracteristicas: [
            { nombre: "Cuerpo", valor: "Caoba" },
            { nombre: "Escala", valor: "347 mm" },
            { nombre: "Cuerdas", valor: "Nylon Aquila" },
            { nombre: "Trastes", valor: "12" },
            { nombre: "Peso", valor: "0,4 kg" },
            { nombre: "Garantía", valor: "12 meses" }
        ]
    },
    {
        id: 7,
        caracteristicas: [
            { nombre: "Teclas", valor: "32" },
            { nombre: "Rango", valor: "Fa3 a Do6" },
            { nombre: "Material", valor: "ABS" },
            { nombre: "Incluye", valor: "Estuche y dos boquillas" },
            { nombre: "Peso", valor: "0,7 kg" },
            { nombre: "Garantía", valor: "12 meses" }
        ]
    },
    {
        id: 8,
        caracteristicas: [
            { nombre: "Tubos", valor: "13" },
            { nombre: "Material", valor: "Bambú" },
            { nombre: "Afinación", valor: "Sol mayor" },
            { nombre: "Origen", valor: "Artesanal chileno" },
            { nombre: "Peso", valor: "0,3 kg" },
            { nombre: "Garantía", valor: "6 meses" }
        ]
    },
    {
        id: 9,
        caracteristicas: [
            { nombre: "Cuerdas", valor: "34" },
            { nombre: "Material", valor: "Madera de haya" },
            { nombre: "Llaves", valor: "Semitono en todas" },
            { nombre: "Altura", valor: "120 cm" },
            { nombre: "Peso", valor: "8,5 kg" },
            { nombre: "Garantía", valor: "24 meses" }
        ]
    },
    {
        id: 10,
        caracteristicas: [
            { nombre: "Piezas", valor: "4" },
            { nombre: "Hi-hat", valor: "14 pulgadas" },
            { nombre: "Crash", valor: "16 pulgadas" },
            { nombre: "Ride", valor: "20 pulgadas" },
            { nombre: "Peso", valor: "5,2 kg" },
            { nombre: "Garantía", valor: "24 meses" }
        ]
    },
    {
        id: 11,
        caracteristicas: [
            { nombre: "Tipo", valor: "Condensador" },
            { nombre: "Patrón", valor: "Cardioide" },
            { nombre: "Respuesta", valor: "20 Hz a 20 kHz" },
            { nombre: "Incluye", valor: "Pinza y estuche" },
            { nombre: "Peso", valor: "0,2 kg" },
            { nombre: "Garantía", valor: "24 meses" }
        ]
    },
    {
        id: 12,
        caracteristicas: [
            { nombre: "Altura", valor: "65 a 120 cm" },
            { nombre: "Material", valor: "Acero" },
            { nombre: "Plegable", valor: "Sí" },
            { nombre: "Capacidad", valor: "5 kg" },
            { nombre: "Peso", valor: "1,8 kg" },
            { nombre: "Garantía", valor: "12 meses" }
        ]
    }
];

export function buscarFicha(id: number) {
    const ficha = fichas.find(ficha => ficha.id === id);

    if (ficha === undefined) {
        return [];
    }

    return ficha.caracteristicas;
}
