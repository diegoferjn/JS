// Manejador del formulario y validaciones con condicionales
const form = document.getElementById('calc-form');
const errorBox = document.getElementById('error-messages');
const resultsBox = document.getElementById('calc-results');
const resultsText = document.getElementById('calc-summary');

// (Opcional de UX) conmutar pestañas por accesibilidad visual simple (no es obligatorio en este ejercicio)
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

form.addEventListener('submit', (ev) => {
  ev.preventDefault();

  // 1) Inicio
  let isValid = true;
  errorBox.textContent = ''; // limpia errores
  resultsBox.classList.add('hidden'); // se mostrará solo si todo está OK

  // 2) Recoger valores
  const data = new FormData(form);
  const precio = parseFloat(data.get('precio'));
  const porcentaje = parseFloat(data.get('porcentaje'));
  const plazo = parseFloat(data.get('plazo'));
  const interes = parseFloat(data.get('interes'));
  // fecha existe, pero el enunciado NO exige validarla/cálculo, la dejamos como recogida
  const fecha = data.get('fecha');

  // 3) Validaciones pedidas (mostramos SOLO el primer error encontrado)
  // precioVivienda: > 0
  if (!(precio > 0)) {
    isValid = false;
    errorBox.textContent = 'El precio de la vivienda debe ser mayor que 0.';
  }

  // plazo: entre 1 y 50
  if (isValid && (plazo < 1 || plazo > 50)) {
    isValid = false;
    errorBox.textContent = 'El plazo debe estar entre 1 y 50 años.';
  }

  // interés: entre 0 y 20
  if (isValid && (interes < 0 || interes > 20)) {
    isValid = false;
    errorBox.textContent = 'El interés anual debe estar entre 0% y 20%.';
  }

  // porcentajeFinanciacion: entre 1 y 100
  if (isValid && (porcentaje < 1 || porcentaje > 100)) {
    isValid = false;
    errorBox.textContent = 'El porcentaje de financiación debe estar entre 1% y 100%.';
  }

  // 4) Cálculo del principal (según enunciado: usar la fórmula correspondiente)
  // Con el contenido dado, la “fórmula” que sí podemos aplicar es: principal = precio * (porcentaje / 100)
  let principal = 0;
  if (isValid) {
    principal = precio * (porcentaje / 100);
    if (principal === 0) {
      isValid = false;
      errorBox.textContent = 'El principal no puede ser 0.';
    }
  }

  // 5) Mostrar/Ocultar resultados
  if (isValid) {
    // mostar resultados y ocultar error
    errorBox.textContent = '';
    resultsBox.classList.remove('hidden');

    // No se pide realizar la cuota hipotecaria (no se proporcionó fórmula en los manuales),
    // así que mostramos un resumen simple con los valores validados y el principal calculado.
    resultsText.textContent =
      `Precio: €${precio.toLocaleString()} — Financiación: ${porcentaje}% — ` +
      `Plazo: ${plazo} años — Interés: ${interes}% — ` +
      `Principal calculado: €${principal.toLocaleString()}`;
  } else {
    // ocultar resultados si hay error
    resultsBox.classList.add('hidden');
  }
});
