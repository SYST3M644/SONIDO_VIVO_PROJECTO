// Pago SIMULADO: no se conecta con ningún banco ni se cobra dinero real.
// Tarjetas de prueba:
//   4111 1111 1111 1111  -> pago aprobado
//   4000 0000 0000 0002  -> pago rechazado

export function soloNumeros(texto: string) {
    return texto.replace(/\D/g, "");
}

// Devuelve el error a mostrar, o "" si los datos de la tarjeta están bien
export function validarTarjeta(numero: string, nombre: string, vencimiento: string, cvv: string) {
    if (soloNumeros(numero).length !== 16) {
        return "El número de tarjeta debe tener 16 dígitos";
    }

    if (nombre.trim() === "") {
        return "Debe ingresar el nombre que aparece en la tarjeta";
    }

    if (!/^\d{2}\/\d{2}$/.test(vencimiento)) {
        return "El vencimiento debe tener el formato MM/AA";
    }

    const mes = Number(vencimiento.slice(0, 2));
    const anio = 2000 + Number(vencimiento.slice(3, 5));

    if (mes < 1 || mes > 12) {
        return "El mes de vencimiento no es válido";
    }

    // La tarjeta sirve hasta el último día de su mes de vencimiento
    const ultimoDia = new Date(anio, mes, 0, 23, 59, 59);

    if (ultimoDia < new Date()) {
        return "La tarjeta está vencida";
    }

    if (!/^\d{3}$/.test(cvv)) {
        return "El CVV debe tener 3 dígitos";
    }

    return "";
}

// Simula la respuesta del banco
export function pagoAprobado(numero: string) {
    return !soloNumeros(numero).endsWith("0002");
}

export function textoPago(numero: string) {
    return "Tarjeta terminada en " + soloNumeros(numero).slice(-4);
}
