/***********************
 * Funciones del ejercicio
 ***********************/

// 1) calcularPrincipal(precio, porcentaje)
//    Usa la fórmula de clase: principal = precio * (porcentaje / 100)
//    Redondeo con Math.round (está en los manuales de Math)
function calcularPrincipal(precio, porcentaje) {
  // asumo números válidos (validaciones las hacemos con funciones aparte)
  const principal = precio * (porcentaje / 100);
  return Math.round(principal);
}

// 2) Validaciones básicas (condicionales)
function esValidoInteres(interes) {
  // válido si 0 <= interes <= 20
  return interes >= 0 && interes <= 20;
}

function esValidoPlazo(plazo) {
  // válido si 1 <= plazo <= 50
  return plazo >= 1 && plazo <= 50;
}

// 3) formatearMoneda(cantidad)
//    Como no tenemos formateo de moneda en los manuales, hago algo MUY simple:
//    devuelvo un string con el símbolo de euro delante.
function formatearMoneda(cantidad) {
  // (sin toLocaleString ni Intl, que NO están en los manuales)
  return "€ " + cantidad;
}

// 4) calcularCuotaMensual(principal, interesAnual, meses)
//    *** NO la implemento *** porque la “fórmula adecuada” no aparece en los manuales.
//    Dejo un esqueleto para que se vea la intención.
function calcularCuotaMensual(principal, interesAnual, meses) {
  // Falta la fórmula en los materiales => no puedo implementarla correctamente.
  // return ...;
  return null; // marcador de "no implementado"
}


/***********************
 * Pruebas por consola (simulando el “manejador”)
 ***********************/
const precio = 200000;      // € 200.000
const porcentaje = 80;      // 80%
const plazoAnios = 30;      // 30 años
const interesAnual = 2.5;   // 2.5%

// Validaciones simples con condicionales
if (!esValidoPlazo(plazoAnios)) {
  console.log("Error: el plazo debe estar entre 1 y 50 años.");
} else if (!esValidoInteres(interesAnual)) {
  console.log("Error: el interés anual debe estar entre 0% y 20%.");
} else {
  // Calcular principal
  const principal = calcularPrincipal(precio, porcentaje);
  console.log("Principal calculado:", principal);

  // Formatear (versión simple)
  console.log("Principal (formateado):", formatearMoneda(principal));

  // Calcular cuota mensual (no implementada por falta de fórmula)
  const meses = plazoAnios * 12;
  const cuota = calcularCuotaMensual(principal, interesAnual, meses);

  if (cuota === null) {
    console.log("Cuota mensual: no disponible (falta la fórmula en los manuales).");
  } else {
    console.log("Cuota mensual:", formatearMoneda(cuota));
  }
}
