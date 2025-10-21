// src/ui.js
// Funciones de DOM para pintar resultados y listas + navegación de pestañas

// Formateo muy simple usando lo visto (strings y toLocaleString se usa ya en código previo)
export function formatearMoneda(valor) {
  // Como alumno: uso toLocaleString porque ya lo vi en ejemplos previos
  if (typeof valor !== 'number' || isNaN(valor)) return '€ 0';
  return `€ ${valor.toLocaleString('es-ES')}`;
}

// Renderiza el panel de resultados con un resumen y (opcional) un schedule
export function renderResults(resumen = {}, schedule = []) {
  const box = document.getElementById('calc-results');
  const content = document.getElementById('results-content');

  if (!box || !content) return;

  // Construyo HTML simple (DOM básico)
  const cuota   = formatearMoneda(resumen.cuota || 0);
  const total   = formatearMoneda(resumen.costeTotal || 0);
  const interes = formatearMoneda(resumen.interesesTotales || 0);

  content.innerHTML = `
    <p><strong>Cuota:</strong> ${cuota}</p>
    <p><strong>Coste total:</strong> ${total}</p>
    <p><strong>Intereses totales:</strong> ${interes}</p>
  `;

  // Muestro el bloque (quitar clase hidden)
  box.classList.remove('hidden');
}

// Renderiza tarjetas en la pestaña "Escenarios"
export function renderList(items = []) {
  const wrap = document.getElementById('escenarios-content');
  if (!wrap) return;

  // Limpio y pinto
  wrap.innerHTML = '';

  items.forEach((it) => {
    // it: { id, nombre, valor }
    const card = document.createElement('div');
    card.className = 'item-card';
    card.dataset.id = String(it.id);

    card.innerHTML = `
      <h4>${it.nombre ?? 'Sin nombre'}</h4>
      <p><strong>Valor:</strong> ${it.valor ?? '-'}</p>
      <div class="item-actions">
        <button class="btn-select">Seleccionar</button>
        <button class="btn-edit">Editar</button>
        <button class="btn-delete">Eliminar</button>
      </div>
    `;

    // Botones (addEventListener con funciones "de alumno")
    card.querySelector('.btn-select').addEventListener('click', () => seleccionarItem(it.id));
    card.querySelector('.btn-edit').addEventListener('click', () => editarItem(it.id));
    card.querySelector('.btn-delete').addEventListener('click', () => eliminarItem(it.id));

    wrap.appendChild(card);
  });
}

// Navegación de pestañas muy básica con clases .active
export function switchTab(tabName) {
  const sections = document.querySelectorAll('.tab-content');
  sections.forEach(sec => sec.classList.remove('active'));

  const target = document.getElementById(tabName);
  if (target) target.classList.add('active');

  // Marcar botón activo
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(b => {
    if (b.dataset.tab === tabName) b.classList.add('active');
    else b.classList.remove('active');
  });
}

/* === Acciones de los botones de cada tarjeta ===
   Como alumno, implemento lógica simple:
   - seleccionarItem: muestro en consola y voy a la pestaña "calcular"
   - editarItem: aviso con alert (sin construir UI de edición)
   - eliminarItem: elimino la tarjeta del DOM
*/

export function seleccionarItem(id) {
  console.log('Seleccionar item', id);
  switchTab('calcular');
}

export function editarItem(id) {
  alert('Editar item ' + id + ' (no implementado)');
}

export function eliminarItem(id) {
  const card = document.querySelector(`.item-card[data-id="${id}"]`);
  if (card) card.remove();
}
