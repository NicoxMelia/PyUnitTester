import {tests} from "./testJSON.js";

// Variables globales
let pyodide;
let outputElement;
let currentTestOutput = [];
var testeos = NaN;



const urlParams = new URLSearchParams(window.location.search);
const ejercicio = urlParams.get('ejercicio');

// Verificar si se obtuvo el parámetro
if (ejercicio) {
    console.log(`Ejercicio seleccionado: ${ejercicio}`);
    // Aquí puedes usar la variable 'ejercicio' como necesites
} else {
    console.log('No se especificó ejercicio en la URL');
}



// Configuración inicial al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Configurar editores de código
    const codeEditor = CodeMirror.fromTextArea(document.getElementById('code'), {
        mode: 'python',
        lineNumbers: true,
        indentUnit: 4,
        theme: 'default'
    });

    // const testEditor = CodeMirror.fromTextArea(document.getElementById('test-cases'), {
    //     mode: 'javascript',
    //     lineNumbers: true,
    //     theme: 'default'
    // });

    for (var test of tests) {
        if (test["id"] == ejercicio) {
            testeos = test["testing"];
            testeos = JSON.stringify(testeos, null, 2);
            let consigna = document.getElementById('consigna');
            consigna.innerHTML = test["ejercicio"];
        }
    }


    outputElement = document.getElementById('output');
    
    // Inicializar Pyodide
    initializePyodide();
    
    // Configurar botón de ejecución
    document.getElementById('run-btn').addEventListener('click', async () => {
        await runAllTests(codeEditor.getValue(), testeos);
    });
});

// Inicializar Pyodide
async function initializePyodide() {
    outputElement.innerHTML = createAlert('Cargando Pyodide... (esto puede tomar unos segundos)', 'info');
    
    try {
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
        });
        
        // Configurar captura de stdout/stderr
        pyodide.setStdout({
            batched: (text) => {
                currentTestOutput.push(text);
            }
        });
        
        pyodide.setStderr({
            batched: (text) => {
                currentTestOutput.push(`<span class="text-danger">${text}</span>`);
            }
        });
        
        outputElement.innerHTML += createAlert('Pyodide listo!', 'success');
    } catch (error) {
        outputElement.innerHTML = createAlert(`Error al cargar Pyodide: ${error.message}`, 'danger');
    }
}

// Ejecutar todos los tests
async function runAllTests(code, testCasesText) {
    outputElement.innerHTML = '<div class="test-header">Ejecutando tests...</div>';
    currentTestOutput = [];
    
    try {
        const testSuites = JSON.parse(testCasesText);
        let totalTests = 0;
        let passedTests = 0;
        
        // Ejecutar cada suite de tests
        for (const [funcName, tests] of Object.entries(testSuites)) {
            const suiteDiv = document.createElement('div');
            suiteDiv.className = 'test-suite';
            suiteDiv.innerHTML = `<h4 class="suite-title">${formatFunctionName(funcName)}</h4>`;
            outputElement.appendChild(suiteDiv);
            
            // Ejecutar cada test en la suite
            for (let i = 0; i < tests.length; i++) {
                const testResult = await runSingleTest(code, funcName, tests[i], i+1);
                suiteDiv.appendChild(testResult.element);
                
                totalTests++;
                if (testResult.passed) passedTests++;
            }
        }
        
        // Mostrar resumen final
        const summaryDiv = document.createElement('div');
        summaryDiv.className = `test-summary alert alert-${passedTests === totalTests ? 'success' : 'warning'}`;
        summaryDiv.innerHTML = `
            <strong>Resumen:</strong>
            ${passedTests} de ${totalTests} tests pasados
            (${Math.round(passedTests/totalTests*100)}%)
        `;
        outputElement.prepend(summaryDiv);
        
    } catch (error) {
        outputElement.innerHTML = createAlert(`Error en los tests: ${error.message}`, 'danger');
    }
}

// Formatear nombre de función para mostrar
function formatFunctionName(funcName) {
    if (funcName.includes('.')) {
        const [className, methodName] = funcName.split('.');
        return `${className}.${methodName}()`;
    }
    return `${funcName}()`;
}

// Ejecutar un test individual
async function runSingleTest(code, funcName, testCase, testNumber) {
    const testDiv = document.createElement('div');
    testDiv.className = 'test-case';
    
    // Cabecera del test
    const testHeader = document.createElement('div');
    testHeader.className = 'test-header';
    testHeader.innerHTML = `
        <strong>Test ${testNumber}:</strong>
        ${testCase.description || formatFunctionName(funcName)}
    `;
    testDiv.appendChild(testHeader);
    
    // Cuerpo del test
    const testBody = document.createElement('div');
    testBody.className = 'test-body';
    
    // Mostrar argumentos de instancia si existen
    if (testCase.instanceArgs) {
        testBody.innerHTML += `
            <div class="test-instance-args">
                <strong>Constructor args:</strong>
                <pre>${JSON.stringify(testCase.instanceArgs, null, 2)}</pre>
            </div>
        `;
    }
    
    // Mostrar argumentos del método/función
    testBody.innerHTML += `
        <div class="test-args">
            <strong>${funcName.includes('.') ? 'Method args:' : 'Function args:'}</strong>
            <pre>${JSON.stringify(testCase.args, null, 2)}</pre>
        </div>
        <div class="test-expected">
            <strong>Expected:</strong>
            <pre>${JSON.stringify(testCase.expected, null, 2)}</pre>
        </div>
    `;
    testDiv.appendChild(testBody);
    
    // Ejecutar el test
    try {
        // Resetear output
        currentTestOutput = [];
        
        // Cargar el código Python
        await pyodide.runPythonAsync(code);
        
        let result;
        let resultValue;
        
        // Determinar el tipo de test
        const isMethod = funcName.includes('.');
        
        if (isMethod) {
            const [className, methodName] = funcName.split('.');
            
            // Crear instancia si es método de instancia
            if (testCase.instanceArgs || !testCase.isStatic) {
                const instanceArgs = testCase.instanceArgs || {};
                const instanceArgsStr = Object.entries(instanceArgs)
                    .map(([key, val]) => `${key}=${JSON.stringify(val)}`)
                    .join(', ');
                
                const instanceCode = `${className}(${instanceArgsStr})`;
                const instance = await pyodide.runPythonAsync(instanceCode);
                
                // Llamar al método con los argumentos
                const methodArgsStr = Object.entries(testCase.args)
                    .map(([key, val]) => `${key}=${JSON.stringify(val)}`)
                    .join(', ');
                
                const methodCall = `_instance.${methodName}(${methodArgsStr})`;
                
                // Asignar la instancia a una variable global temporal
                pyodide.globals.set('_instance', instance);
                result = await pyodide.runPythonAsync(methodCall);
                pyodide.globals.delete('_instance');
            } else {
                // Método estático
                const argsStr = Object.entries(testCase.args)
                    .map(([key, val]) => `${key}=${JSON.stringify(val)}`)
                    .join(', ');
                
                const staticCall = `${className}.${methodName}(${argsStr})`;
                result = await pyodide.runPythonAsync(staticCall);
            }
        } else {
            // Función normal
            const argsStr = Object.entries(testCase.args)
                .map(([key, val]) => `${key}=${JSON.stringify(val)}`)
                .join(', ');
            
            const callStr = `${funcName}(${argsStr})`;
            result = await pyodide.runPythonAsync(callStr);
        }
        
        resultValue = result?.toString() ?? JSON.stringify(result?.toJs?.() ?? result);
        
        // Comparar resultados
        const expectedValue = JSON.stringify(testCase.expected);
        const receivedValue = JSON.stringify(result?.toJs?.() ?? result);
        const passed = receivedValue === expectedValue;
        
        // Mostrar resultados
        const resultDiv = document.createElement('div');
        resultDiv.className = `test-result ${passed ? 'passed' : 'failed'}`;
        resultDiv.innerHTML = `
            <strong>Result:</strong>
            <pre>${resultValue}</pre>
            <div class="test-status">
                ${passed ? '✅ PASSED' : '❌ FAILED'}
            </div>
        `;
        testBody.appendChild(resultDiv);
        
        // Mostrar output del test (prints)
        if (currentTestOutput.length > 0) {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'test-output';
            outputDiv.innerHTML = `
                <strong>Output:</strong>
                <pre>${currentTestOutput.join('')}</pre>
            `;
            testBody.appendChild(outputDiv);
        }
        
        // Actualizar clases según resultado
        testDiv.classList.add(passed ? 'test-passed' : 'test-failed');
        
        return { element: testDiv, passed };
        
    } catch (error) {
        // Manejar errores
        const errorDiv = document.createElement('div');
        errorDiv.className = 'test-result test-error';
        errorDiv.innerHTML = `
            <strong>Error:</strong>
            <pre>${error.toString()}</pre>
            <div class="test-status">⚠️ ERROR</div>
        `;
        testBody.appendChild(errorDiv);
        
        // Mostrar output incluso si hay error
        if (currentTestOutput.length > 0) {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'test-output';
            outputDiv.innerHTML = `
                <strong>Output:</strong>
                <pre>${currentTestOutput.join('')}</pre>
            `;
            testBody.appendChild(outputDiv);
        }
        
        testDiv.classList.add('test-error');
        return { element: testDiv, passed: false };
    }
}

// Helper para crear alerts
function createAlert(message, type) {
    return `<div class="alert alert-${type}">${message}</div>`;
}