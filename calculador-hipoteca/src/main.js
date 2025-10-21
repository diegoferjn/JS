// 1) Filtrar números
const numeros = [1, 5, 10, 15, 20, 25];

// Quedarme con los > 10
const mayoresQueDiez = numeros.filter(function (n) {
  return n > 10;
});
console.log('Mayores que 10:', mayoresQueDiez); // [15, 20, 25]

// 2) Mapear datos
// a) cada número * 2
const porDos = numeros.map(function (n) {
  return n * 2;
});
console.log('Multiplicados por 2:', porDos); // [2, 10, 20, 30, 40, 50]

// b) array de objetos { valor, doble }
const objetosConDoble = numeros.map(function (n) {
  return {
    valor: n,
    doble: n * 2
  };
});
console.log('Objetos (valor, doble):', objetosConDoble);
// [ {valor:1, doble:2}, {valor:5, doble:10}, ... ]

// 3) Ordenar números
// sort muta el array: primero de menor a mayor
numeros.sort(function (a, b) {
  return a - b;
});
console.log('Orden ascendente:', numeros); // [1, 5, 10, 15, 20, 25]

// luego de mayor a menor (sobre el mismo array)
numeros.sort(function (a, b) {
  return b - a;
});
console.log('Orden descendente:', numeros); // [25, 20, 15, 10, 5, 1]

// 4) Calcular estadísticas
// a) suma con reduce
const suma = numeros.reduce(function (acum, n) {
  return acum + n;
}, 0);
console.log('Suma total:', suma);

// b) promedio (media)
const promedio = suma / numeros.length;
console.log('Promedio:', promedio);

// c) verificar si hay algún número > 20
const hayMayorQueVeinte = numeros.some(function (n) {
  return n > 20;
});
console.log('¿Algún número > 20?:', hayMayorQueVeinte);
