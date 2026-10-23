export type Existencia = {
    id: number;
    cantidad: number;
}

let existencias: Existencia[] = [
    { id: 1, cantidad: 11 },
    { id: 2, cantidad: 5 },
    { id: 3, cantidad: 4 },
    { id: 4, cantidad: 3 },
    { id: 5, cantidad: 2 },
    { id: 6, cantidad: 14 },
    { id: 7, cantidad: 9 },
    { id: 8, cantidad: 22 },
    { id: 9, cantidad: 1 },
    { id: 10, cantidad: 6 },
    { id: 11, cantidad: 8 },
    { id: 12, cantidad: 17 }
];

export function listarExistencias() {
    return existencias;
}

export function stockDe(id: number) {
    const existencia = existencias.find(existencia => existencia.id === id);

    if (existencia === undefined) {
        return 0;
    }

    return existencia.cantidad;
}

export function actualizarStock(id: number, cantidad: number) {
    existencias = existencias.map(existencia => {
        if (existencia.id === id) {
            return { ...existencia, cantidad: cantidad };
        }
        return existencia;
    });
}
