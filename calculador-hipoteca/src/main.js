// src/main.js

// 1) Referencias básicas del DOM
const form = document.getElementById('calc-form');
const errorBox = document.getElementById('error-messages');
const resultsBox = document.getElementById('calc-results');
// Selecciono el <p> que ya existe dentro de #calc-results para escribir el resumen
const resultsParagraph = document.querySelector('#calc-results p');

// (Opcional) Conmutar pestañas como en tu ejemplo
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// 2) Manejador del submit con condicionales
form.addEventListener('submit', (ev) => {
  ev.preventDefault();

  // a) Inicio de validación
  let isValid = true;
  errorBox.textContent = '';           // limpiar error anterior
  resultsBox.classList.add('hidden');  // por defecto oculto resultados

  // b) Recoger valores del formulario
  const data = new FormData(form);
  const precio = parseFloat(data.get('precio'));
  const porcentaje = parseFloat(data.get('porcentaje'));
  const plazo = parseFloat(data.get('plazo'));
  const interes = parseFloat(data.get('interes'));
  const fecha = data.get('fecha'); // no la uso en cálculos (no se pide)

  // c) Validaciones pedidas (mostrar SOLO el primer error encontrado)
  // precio > 0
  if (!(precio > 0)) {
    isValid = false;
    errorBox.textContent = 'El precio de la vivienda debe ser mayor que 0.';
  }

  // plazo 1..50
  if (isValid && (plazo < 1 || plazo > 50)) {
    isValid = false;
    errorBox.textContent = 'El plazo debe estar entre 1 y 50 años.';
  }

  // interés 0..20
  if (isValid && (interes < 0 || interes > 20)) {
    isValid = false;
    errorBox.textContent = 'El interés anual debe estar entre 0% y 20%.';
  }

  // porcentaje 1..100
  if (isValid && (porcentaje < 1 || porcentaje > 100)) {
    isValid = false;
    errorBox.textContent = 'El porcentaje de financiación debe estar entre 1% y 100%.';
  }

  // d) Cálculo del principal (según enunciado: usar la fórmula correspondiente)
  // Con el contenido dado en los materiales y tu código de referencia:
  // principal = precio * (porcentaje / 100)
  let principal = 0;
  if (isValid) {
    principal = precio * (porcentaje / 100);
    if (principal === 0) {
      isValid = false;
      errorBox.textContent = 'El principal no puede ser 0.';
    }
  }

  // e) Mostrar/Ocultar resultados según isValid
  if (isValid) {
    errorBox.textContent = '';
    resultsBox.classList.remove('hidden');

    // Mostrar un pequeño resumen (strings y template literals están en los manuales)
    resultsParagraph.textContent =
      `Precio: €${precio.toLocaleString()} — Financiación: ${porcentaje}% — ` +
      `Plazo: ${plazo} años — Interés: ${interes}% — ` +
      `Principal calculado: €${principal.toLocaleString()}`;
  } else {
    resultsBox.classList.add('hidden');
  }
});
