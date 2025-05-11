// Función para cargar ejercicios desde JSON
async function loadExercises() {
  try {
    const response = await fetch('../js/ejercicios.json');
    const exercises = await response.json();
    renderExercises(exercises);
  } catch (error) {
    console.error('Error al cargar los ejercicios:', error);
    document.getElementById('exercises-container').innerHTML = 
      '<p>❌ No se pudieron cargar los ejercicios. Recarga la página.</p>';
  }
}

// Función para renderizar ejercicios
function renderExercises(exercises) {
  const container = document.getElementById('exercises-container');
  
  exercises.forEach(exercise => {
    // Crear tabla de ejemplos
    let examplesHTML = '';
    if (exercise.ejemplos && exercise.ejemplos.length > 0) {
      examplesHTML = `
        <p>✅ <strong>Ejemplos de uso:</strong></p>
        <table>
          <thead>
            <tr>
              <th>Llamada a la función</th>
              <th>Salida esperada</th>
            </tr>
          </thead>
          <tbody>
            ${exercise.ejemplos.map(example => `
              <tr>
                <td><code>${example.llamada}</code></td>
                <td><code>${example.salida}</code></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    // Crear estructura del ejercicio
    const exerciseHTML = `
      <div class="exercise">
        <h2>${exercise.titulo}</h2>
        <p>${exercise.enunciado}</p>
        ${examplesHTML}
        <div class="solution">
          <a href="./pages/testing.html?ejercicio=${exercise.id}">Resolver</a>
        </div>
      </div>
    `;
    
    container.innerHTML += exerciseHTML;
  });

  // Resaltar código visible inicialmente
  hljs.highlightAll();
}

// Función para mostrar/ocultar soluciones
function toggleSolution(button) {
  const pre = button.nextElementSibling;
  if (pre.style.display === "block") {
    pre.style.display = "none";
    button.textContent = "Mostrar Solución";
  } else {
    pre.style.display = "block";
    button.textContent = "Ocultar Solución";
    // Resaltar código solo cuando se muestra
    hljs.highlightElement(pre.querySelector('code'));
  }
}

// Cargar ejercicios al iniciar
document.addEventListener('DOMContentLoaded', loadExercises);