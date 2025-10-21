// src/main.js
import { initForm } from './forms.js';
import { renderList, switchTab } from './ui.js';

function initTabs() {
  // Listeners de pestañas
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });
}

function initList() {
  // Datos de ejemplo “como alumno” (no persistentes)
  const escenarios = [
    { id: 1, nombre: 'Escenario A', valor: 'Ejemplo A' },
    { id: 2, nombre: 'Escenario B', valor: 'Ejemplo B' },
  ];
  renderList(escenarios);
}

export function init() {
  initTabs();
  initForm();
  initList();
}

// Iniciar app
init();
