// Función para obtener parámetros de la URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Función para cargar y mostrar un ejercicio específico
async function loadSingleExercise() {
  try {
    const exerciseId = getQueryParam('ejercicio');
    if (!exerciseId) {
      throw new Error('No se especificó un ID de ejercicio');
    }

    const response = await fetch('../js/ejercicios.json');
    const exercises = await response.json();
    
    // Buscar el ejercicio por ID
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (!exercise) {
      throw new Error(`Ejercicio con ID ${exerciseId} no encontrado`);
    }

    renderSingleExercise(exercise);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('exercises-container').innerHTML = `
      <div class="error">
        <p>❌ ${error.message}</p>
        <a href="./">Volver a todos los ejercicios</a>
      </div>
    `;
  }
}

// Función para formatear llamadas multi-línea
function formatCodeCall(code) {
  return code.split(';') // Separar por punto y coma
    .filter(line => line.trim() !== '') // Eliminar líneas vacías
    .map(line => `<div class="code-line">${line.trim()}</div>`)
    .join('');
}

// Función para renderizar un solo ejercicio
function renderSingleExercise(exercise) {
  const container = document.getElementById('exercises-container');
  
  // Procesar el enunciado para resaltar código
  const processedEnunciado = exercise.enunciado
    .replace(/(\w+\([^)]*\))/g, '<code class="hljs-function">$1</code>') // Funciones
    .replace(/(clase\s+\w+)/gi, '<code class="hljs-class">$1</code>') // Clases
    .replace(/`([^`]+)`/g, '<code class="hljs-inline">$1</code>'); // Código entre backticks

  // Crear tabla de ejemplos
  let examplesHTML = '';
  if (exercise.ejemplos && exercise.ejemplos.length > 0) {
    examplesHTML = `
      <div class="examples-container">
        <p>✅ <strong>Ejemplos de uso:</strong></p>
        <table class="examples-table">
          <thead>
            <tr>
              <th>Llamada a la función</th>
              <th>Salida esperada</th>
            </tr>
          </thead>
          <tbody>
            ${exercise.ejemplos.map(example => `
              <tr>
                <td>${formatCodeCall(example.llamada)}</td>
                <td>${formatCodeCall(example.salida)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // Crear estructura del ejercicio
  const exerciseHTML = `
    <div class="exercise">
      <h2>${exercise.titulo}</h2>
      <p>${processedEnunciado}</p>
      ${examplesHTML}
      <div class="solution">
        <a href="../index.html">← Volver a todos los ejercicios</a>
      </div>
    </div>
  `;
  
  container.innerHTML = exerciseHTML;
  hljs.highlightAll();
}

// Cargar ejercicio específico al iniciar
document.addEventListener('DOMContentLoaded', loadSingleExercise);