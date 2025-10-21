/*******************************************
 * 1) delay(ms): promesa que se resuelve tras ms
 *    (usando Promise + setTimeout de los manuales)
 *******************************************/
function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}

/*******************************************
 * 2) loadSeedData(): debería usar fetch según enunciado,
 *    pero "fetch" NO está en los manuales.
 *    → Dejo una versión que mantiene la estructura con try/catch
 *      y devuelve [] si hay error. NO uso fetch.
 *******************************************/
async function loadSeedData() {
  try {
    // Aquí debería ir:
    // const res = await fetch('data/seed-scenarios.json');
    // const data = await res.json();
    // return data;

    // Como no tenemos fetch en los manuales, devuelvo un array vacío
    // para no romper el flujo:
    console.log('loadSeedData(): simulando carga (sin fetch)');
    return [];
  } catch (error) {
    console.log('Error al cargar datos:', error);
    return []; // devolver array vacío en caso de error
  }
}

/*******************************************
 * 3) cargarDatosIniciales(): usa delay + loadSeedData con try/catch
 *    y marca un isValid.
 *    (Manipulación DOM mínima: escribir en #error-messages
 *    es muy simple; si no existe, no pasa nada)
 *******************************************/
async function cargarDatosIniciales() {
  let isValid = true;

  const errorBox = document.getElementById('error-messages');
  if (errorBox) errorBox.textContent = ''; // limpiar

  try {
    // Simular tiempo de carga de 500ms
    await delay(500);

    // Cargar datos (aquí devolverá [] por no usar fetch)
    const escenarios = await loadSeedData();

    console.log('Escenarios cargados:', escenarios);
    // … seguiría el flujo normal …

  } catch (err) {
    // Si algo falla en el try
    isValid = false;
    console.log('Error en cargarDatosIniciales:', err);
    if (errorBox) errorBox.textContent = 'Hubo un problema cargando los datos.';
  }

  console.log('isValid:', isValid);
  return isValid;
}

/*******************************************
 * 4) Manejadores globales de errores
 *    (muy básicos, loguean en consola)
 *******************************************/
window.addEventListener('error', function (event) {
  console.log('Error global capturado:', event.message);
});

window.addEventListener('unhandledrejection', function (event) {
  console.log('Promesa rechazada no controlada:', event.reason);
});

/*******************************************
 * 5) Lanzar proceso de prueba (opcional)
 *******************************************/
cargarDatosIniciales();
