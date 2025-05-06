// Configurar CodeMirror para los editores
const codeEditor = CodeMirror.fromTextArea(document.getElementById('code'), {
    mode: 'python',
    lineNumbers: true,
    indentUnit: 4
});

const testEditor = CodeMirror.fromTextArea(document.getElementById('test-cases'), {
    mode: 'javascript',
    lineNumbers: true
});

let pyodide;

// Inicializar Pyodide
async function initializePyodide() {
    document.getElementById('output').textContent = "Cargando Pyodide...";
    pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
    });
    document.getElementById('output').textContent = "Pyodide listo!";
}

initializePyodide();

// Manejar el clic del botón
document.getElementById('run-btn').addEventListener('click', async () => {
    const code = codeEditor.getValue();
    const testCasesText = testEditor.getValue();
    const output = document.getElementById('output');
    
    output.textContent = "Ejecutando tests...";
    
    try {
        const testCases = JSON.parse(testCasesText);
        let results = [];
        
        // Ejecutar el código Python en Pyodide
        await pyodide.loadPackagesFromImports(code);
        await pyodide.runPythonAsync(code);
        
        // Ejecutar cada test case
        for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];
            const input = JSON.stringify(testCase.input);
            const expected = JSON.stringify(testCase.expected);
            
            try {
                const result = await pyodide.runPythonAsync(
                    `import json; json.dumps(solution(${input}))`
                );
                
                const passed = result === expected;
                results.push({
                    testCase: i + 1,
                    input: input,
                    expected: expected,
                    result: result,
                    passed: passed,
                    error: null
                });
            } catch (e) {
                results.push({
                    testCase: i + 1,
                    input: input,
                    expected: expected,
                    result: null,
                    passed: false,
                    error: e.toString()
                });
            }
        }
        
        // Mostrar resultados
        let outputText = '';
        results.forEach(test => {
            outputText += `Test ${test.testCase}:\n`;
            outputText += `Input: ${test.input}\n`;
            outputText += `Expected: ${test.expected}\n`;
            
            if (test.error) {
                outputText += `ERROR: ${test.error}\n\n`;
            } else {
                outputText += `Result: ${test.result}\n`;
                outputText += `Status: ${test.passed ? 'PASSED' : 'FAILED'}\n\n`;
            }
        });
        
        output.textContent = outputText;
        
    } catch (e) {
        output.textContent = `Error: ${e.message}`;
    }
});