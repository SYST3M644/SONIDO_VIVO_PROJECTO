/**
 * Formatea un monto en pesos chilenos: 329990 -> "$329.990".
 *
 * El peso chileno no usa decimales, por eso se fuerza a cero.
 */
export function formatearPrecio(valor: number): string {
  return valor.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });
}
