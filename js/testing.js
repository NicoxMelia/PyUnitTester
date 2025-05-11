import {tests} from "./testJSON.js";

// Variables globales
let pyodide;
let outputElement;
let currentTestOutput = [];
var testeos = NaN;

const urlParams = new URLSearchParams(window.location.search);
const ejercicio = urlParams.get('ejercicio');

document.addEventListener('DOMContentLoaded', () => {
    const codeEditor = CodeMirror.fromTextArea(document.getElementById('code'), {
        mode: 'python',
        lineNumbers: true,
        indentType: 4,
        theme: 'default'
    });

    for (var test of tests) {
        if (test["id"] == ejercicio) {
            testeos = test["testing"];
            testeos = JSON.stringify(testeos, null, 2);
        }
    }

    outputElement = document.getElementById('output');
    initializePyodide();
    
    document.getElementById('run-btn').addEventListener('click', async () => {
        await runAllTests(codeEditor.getValue(), testeos);
    });
});

async function initializePyodide() {
    outputElement.innerHTML = createAlert('Cargando Pyodide... (esto puede tomar unos segundos)', 'info');
    
    try {
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
        });
        
        pyodide.setStdout({ batched: (text) => currentTestOutput.push(text) });
        pyodide.setStderr({ batched: (text) => currentTestOutput.push(`<span class="text-danger">${text}</span>`) });
        
        outputElement.innerHTML += createAlert('Pyodide listo!', 'success');
    } catch (error) {
        outputElement.innerHTML = createAlert(`Error al cargar Pyodide: ${error.message}`, 'danger');
    }
}

async function runAllTests(code, testCasesText) {
    outputElement.innerHTML = '<div class="test-header">Ejecutando tests...</div>';
    currentTestOutput = [];
    
    try {
        const testSuites = JSON.parse(testCasesText);
        let totalTests = 0;
        let passedTests = 0;
        
        for (const [funcName, tests] of Object.entries(testSuites)) {
            const suiteDiv = document.createElement('div');
            suiteDiv.className = 'test-suite';
            suiteDiv.innerHTML = `<h4 class="suite-title">${formatFunctionName(funcName)}</h4>`;
            outputElement.appendChild(suiteDiv);
            
            for (let i = 0; i < tests.length; i++) {
                const testResult = await runSingleTest(code, funcName, tests[i], i+1);
                suiteDiv.appendChild(testResult.element);
                totalTests++;
                if (testResult.passed) passedTests++;
            }
        }
        
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

function formatFunctionName(funcName) {
    return funcName.includes('.') 
        ? funcName.replace('.', '.') + '()' 
        : `${funcName}()`;
}

async function runSingleTest(code, funcName, testCase, testNumber) {
    const testDiv = document.createElement('div');
    testDiv.className = 'test-case';
    
    const testHeader = document.createElement('div');
    testHeader.className = 'test-header';
    testHeader.innerHTML = `
        <strong>Test ${testNumber}:</strong>
        ${testCase.description || formatFunctionName(funcName)}
    `;
    testDiv.appendChild(testHeader);
    
    const testBody = document.createElement('div');
    testBody.className = 'test-body';
    
    if (testCase.instanceArgs) {
        testBody.innerHTML += `
            <div class="test-instance-args">
                <strong>Constructor args:</strong>
                <pre>${JSON.stringify(testCase.instanceArgs, null, 2)}</pre>
            </div>
        `;
    }
    
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
    
    try {
        currentTestOutput = [];
        await pyodide.runPythonAsync(code);
        
        let result;
        const isMethod = funcName.includes('.');
        
        if (isMethod) {
            const [className, methodName] = funcName.split('.');
            
            // Create instance with positional arguments instead of named ones
            const instanceArgs = testCase.instanceArgs || {};
            const instanceArgsValues = Object.values(instanceArgs);
            const instanceCode = `${className}(${instanceArgsValues.map(JSON.stringify).join(', ')})`;
            const instance = await pyodide.runPythonAsync(instanceCode);
            
            // Call method with positional arguments
            const methodArgsValues = Object.values(testCase.args);
            const methodCall = `_instance.${methodName}(${methodArgsValues.map(JSON.stringify).join(', ')})`;
            pyodide.globals.set('_instance', instance);
            result = await pyodide.runPythonAsync(methodCall);
            pyodide.globals.delete('_instance');
        } else {
            // Function call with positional arguments
            const argsValues = Object.values(testCase.args);
            const callStr = `${funcName}(${argsValues.map(JSON.stringify).join(', ')})`;
            result = await pyodide.runPythonAsync(callStr);
        }
        
        const resultValue = result?.toString() ?? JSON.stringify(result?.toJs?.() ?? result);
        const expectedValue = JSON.stringify(testCase.expected);
        
        // Flexible comparison
        let passed;
        if (typeof testCase.expected === 'string') {
            // For strings, check if the result contains the expected text
            passed = resultValue.toLowerCase().includes(testCase.expected.toLowerCase());
        } else {
            // For other types, do strict comparison
            passed = JSON.stringify(result?.toJs?.() ?? result) === expectedValue;
        }
        
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
        
        if (currentTestOutput.length > 0) {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'test-output';
            outputDiv.innerHTML = `
                <strong>Output:</strong>
                <pre>${currentTestOutput.join('')}</pre>
            `;
            testBody.appendChild(outputDiv);
        }
        
        testDiv.classList.add(passed ? 'test-passed' : 'test-failed');
        return { element: testDiv, passed };
        
    } catch (error) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'test-result test-error';
        errorDiv.innerHTML = `
            <strong>Error:</strong>
            <pre>${error.toString()}</pre>
            <div class="test-status">⚠️ ERROR</div>
        `;
        testBody.appendChild(errorDiv);
        
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

function createAlert(message, type) {
    return `<div class="alert alert-${type}">${message}</div>`;
}