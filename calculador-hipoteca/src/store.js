// Guardar y cargar JSON en localStorage, con try/catch simple (manuales de errores + JSON)

export function saveJSON(key, data) {
  try {
    const text = JSON.stringify(data);   // convertir a JSON
    localStorage.setItem(key, text);     // guardar como string
  } catch (err) {
    console.error('No se pudo guardar en localStorage:', err);
  }
}

export function loadJSON(key) {
  try {
    const raw = localStorage.getItem(key); // leer string o null
    if (!raw) return null;                 // si no hay datos -> null
    return JSON.parse(raw);                // convertir a objeto
  } catch (err) {
    console.error('No se pudo leer/parsear de localStorage:', err);
    return null;
  }
}

// Estado inicial simple
export function createInitialState() {
  return {
    datos: [],
    contador: 0,
  };
}

// Añadir un dato (string o número) y persistir
export function addDato(dato) {
  const KEY = 'appState';
  let state = loadJSON(KEY) || createInitialState();

  state.datos.push(dato);
  state.contador = state.contador + 1;

  saveJSON(KEY, state);
  return state;
}
