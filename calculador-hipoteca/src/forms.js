// src/forms.js
// Manejo del formulario de "Calcular" con validaciones sencillas
import { renderResults, formatearMoneda } from './ui.js';

export function initForm() {
  const form = document.getElementById('calc-form');
  const errorBox = document.getElementById('error-messages');
  const resultsBox = document.getElementById('calc-results');

  if (!form) return;

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    // Limpio estado
    if (errorBox) errorBox.textContent = '';
    if (resultsBox) resultsBox.classList.add('hidden');

    // Datos
    const data = new FormData(form);
    const precio = parseFloat(data.get('precio'));
    const porcentaje = parseFloat(data.get('porcentaje'));
    const plazo = parseFloat(data.get('plazo'));
    const interes = parseFloat(data.get('interes'));
    // fecha no la valido porque no se pide nada especial

    // Validaciones del enunciado (condicionales básicos)
    let isValid = true;

    if (!(precio > 0)) {
      isValid = false;
      if (errorBox) errorBox.textContent = 'El precio de la vivienda debe ser mayor que 0.';
    }

    if (isValid && (plazo < 1 || plazo > 50)) {
      isValid = false;
      if (errorBox) errorBox.textContent = 'El plazo debe estar entre 1 y 50 años.';
    }

    if (isValid && (interes < 0 || interes > 20)) {
      isValid = false;
      if (errorBox) errorBox.textContent = 'El interés anual debe estar entre 0% y 20%.';
    }

    if (isValid && (porcentaje < 1 || porcentaje > 100)) {
      isValid = false;
      if (errorBox) errorBox.textContent = 'El porcentaje de financiación debe estar entre 1% y 100%.';
    }

    // Cálculo mínimo posible con lo visto: principal
    if (!isValid) return;

    const principal = precio * (porcentaje / 100);
    if (principal === 0) {
      if (errorBox) errorBox.textContent = 'El principal no puede ser 0.';
      return;
    }

    // No tenemos fórmula de cuota en los manuales.
    // Para poder mostrar algo coherente en pantalla:
    const resumen = {
      cuota: principal,          // placeholder (no es la cuota real)
      costeTotal: principal,     // placeholder
      interesesTotales: 0        // placeholder
    };

    // Renderizo resultados
    renderResults(resumen, []); // schedule vacío porque no hay enunciado para crearlo

    // (Opcional) consola de alumno para ver algo
    console.log('Principal calculado:', formatearMoneda(principal));
  });
}
