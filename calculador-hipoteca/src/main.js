// Ejercicio: Tipos complejos — Array, Object, Date
console.log("App JS cargado");

// ---------- 1) Crear estructura de datos completa ----------

// Pequeño helper para formatear números y fechas
const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
const toISODate = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Entradas (inputs) de ejemplo (valores sencillos para el ejercicio)
const precioVivienda = 200_000;           // number
const porcentajeFinanciacion = 80;        // number (porcentaje)
const principal = precioVivienda * (porcentajeFinanciacion / 100); // number
const plazoAnios = 30;                     // number (años)
const interesNominalAnual = 3.0;          // number (porcentaje)

// Fechas
const fechaInicio = new Date(); // ahora
// Sumo ~30 años con milisegundos (simple y suficiente para el nivel visto)
const treintaAniosMs = 30 * 365 * 24 * 60 * 60 * 1000;
const fechaFin = new Date(fechaInicio.getTime() + treintaAniosMs);

// Formato ISO básico con getFullYear/getMonth/getDate (sin toISOString)
const fechaInicioISO = toISODate(fechaInicio);
const fechaFinISO = toISODate(fechaFin);

console.log("Fecha inicio:", fechaInicioISO);
console.log("Fecha fin (aprox +30 años):", fechaFinISO);

// Objeto inputs
const inputs = {
  precioVivienda,
  porcentajeFinanciacion,
  principal,
  plazoAnios,
  interesNominalAnual,
  fechaInicioISO
};

// Objeto results (valores de ejemplo para el ejercicio)
const results = {
  cuota: 0,              // aún no calculamos la fórmula real en este bloque
  interesesTotales: 0,
  costeTotal: 0,
  fechaFinISO
};

// Tabla de amortización (schedule) vacía por ahora
const schedule = [];

// scenario combina inputs + results + schedule
const scenario = {
  inputs,
  results,
  schedule
};

console.log("Scenario (estructura completa):", scenario);

// ---------- 2) Crear array de escenarios ----------

const scenarios = [];

// Tres escenarios sencillos (distintos en nombre, precio, plazo, interés)
scenarios.push({
  nombre: "Escenario A",
  precio: 180000,
  plazo: 25,
  interes: 2.5
});
//holi jijiji
scenarios.push({
  nombre: "Escenario B",
  precio: 220000,
  plazo: 30,
  interes: 3.0
});

scenarios.push({
  nombre: "Escenario C",
  precio: 150000,
  plazo: 20,
  interes: 3.2
});

console.log("Nº de escenarios:", scenarios.length);
console.log("Primer escenario:", scenarios[0]);

// ---------- 3) Crear tabla de amortización básica (3 filas) ----------

// Para mantenerlo simple (nivel manuales), incremento por “meses” usando ~30 días
const unMesMs = 30 * 24 * 60 * 60 * 1000;

// Simulo 3 cuotas: cuotas fijas de ejemplo y un saldo que decrece
let saldoRestante = principal;

// Números sencillos para mostrar estructura (no es la fórmula real)
const cuotaEj = 700;
const interesMes1 = 300;
const interesMes2 = 295;
const interesMes3 = 290;

const capitalMes1 = cuotaEj - interesMes1;
saldoRestante -= capitalMes1;

schedule.push({
  mes: 1,
  fecha: toISODate(new Date(fechaInicio.getTime() + 1 * unMesMs)),
  cuota: cuotaEj,
  interes: interesMes1,
  capital: capitalMes1,
  saldo: Math.max(0, Math.round(saldoRestante))
});

const capitalMes2 = cuotaEj - interesMes2;
saldoRestante -= capitalMes2;

schedule.push({
  mes: 2,
  fecha: toISODate(new Date(fechaInicio.getTime() + 2 * unMesMs)),
  cuota: cuotaEj,
  interes: interesMes2,
  capital: capitalMes2,
  saldo: Math.max(0, Math.round(saldoRestante))
});

const capitalMes3 = cuotaEj - interesMes3;
saldoRestante -= capitalMes3;
