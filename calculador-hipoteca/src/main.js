import { saveJSON, loadJSON, createInitialState, addDato } from './store.js';

const KEY = 'appState';

// Inicializar: cargar si existe; si no, crear y guardar
function initApp() {
  let state = loadJSON(KEY);

  if (!state) {
    state = createInitialState();
    saveJSON(KEY, state);
  }

  console.log('Estado cargado al iniciar:', state);
  return state;
}

// Ejemplo de uso muy simple (opcional de prueba):
// const s1 = addDato('hola');
// console.log('Tras añadir "hola":', s1);
// const s2 = addDato(123);
// console.log('Tras añadir 123:', s2);

initApp();
