var tests = [
    {
        "id": "E1",
        "ejercicio": "Crear una clase Persona que: 1) Tenga un constructor que acepte nombre (por defecto 'Anónimo'), 2) Un método saludar() que retorne 'Hola, soy [nombre]', 3) Un método caminar(pasos) que retorne '[nombre] caminó [pasos] pasos'",
        "testing": {
            "Persona.saludar": [
                {
                    "instanceArgs": {"nombre": "Juan"},
                    "args": {},
                    "expected": "Hola, soy Juan",
                    "description": "Saludo con nombre"
                },
                {
                    "instanceArgs": {},
                    "args": {},
                    "expected": "Hola, soy Anónimo",
                    "description": "Saludo anónimo"
                }
            ],
            "Persona.caminar": [
                {
                    "instanceArgs": {"nombre": "Ana"},
                    "args": {"pasos": 10},
                    "expected": "Ana caminó 10 pasos",
                    "description": "Caminar 10 pasos"
                }
            ]
        }
    },
    {
        "id": "E2",
        "ejercicio": "Crear una clase Rectángulo que: 1) Tenga un constructor que acepte ancho y alto, 2) Un método area() que calcule el área (ancho*alto), 3) Un método perimetro() que calcule el perímetro (2*(ancho+alto))",
        "testing": {
            "Rectangulo.area": [
                {
                    "instanceArgs": {"ancho": 5, "alto": 3},
                    "args": {},
                    "expected": 15,
                    "description": "Cálculo de área básico"
                }
            ],
            "Rectangulo.perimetro": [
                {
                    "instanceArgs": {"ancho": 4, "alto": 7},
                    "args": {},
                    "expected": 22,
                    "description": "Cálculo de perímetro básico"
                }
            ]
        }
    },
    {
        "id": "E3",
        "ejercicio": "Crear una clase Libro que: 1) Tenga un constructor con título, autor y páginas, 2) Un método descripcion() que retorne '[titulo] por [autor], [páginas] páginas', 3) Un método leer(paginas_leidas) que retorne 'Has leído [paginas_leidas] páginas de [titulo]'",
        "testing": {
            "Libro.descripcion": [
                {
                    "instanceArgs": {"titulo": "Cien años de soledad", "autor": "García Márquez", "paginas": 432},
                    "args": {},
                    "expected": "Cien años de soledad por García Márquez, 432 páginas",
                    "description": "Descripción completa"
                }
            ],
            "Libro.leer": [
                {
                    "instanceArgs": {"titulo": "El Principito", "autor": "Saint-Exupéry", "paginas": 96},
                    "args": {"paginas_leidas": 30},
                    "expected": "Has leído 30 páginas de El Principito",
                    "description": "Lectura parcial"
                }
            ]
        }
    },
    {
        "id": "E4",
        "ejercicio": "Crear una clase CuentaBancaria que: 1) Tenga un constructor con titular y saldo (por defecto 0), 2) Un método depositar(monto) que sume al saldo, 3) Un método retirar(monto) que reste del saldo si hay fondos, o retorne 'Fondos insuficientes'",
        "testing": {
            "CuentaBancaria.depositar": [
                {
                    "instanceArgs": {"titular": "Ana", "saldo": 100},
                    "args": {"monto": 50},
                    "expected": 150,
                    "description": "Depósito normal"
                }
            ],
            "CuentaBancaria.retirar": [
                {
                    "instanceArgs": {"titular": "Carlos", "saldo": 200},
                    "args": {"monto": 80},
                    "expected": 120,
                    "description": "Retiro con fondos suficientes"
                },
                {
                    "instanceArgs": {"titular": "Luisa", "saldo": 50},
                    "args": {"monto": 100},
                    "expected": "Fondos insuficientes",
                    "description": "Retiro sin fondos suficientes"
                }
            ]
        }
    },
    {
        "id": "E5",
        "ejercicio": "Crear una clase Coche que: 1) Tenga un constructor con marca, modelo y kilometraje (por defecto 0), 2) Un método avanzar(kms) que sume kilómetros al kilometraje, 3) Un método obtener_kilometraje() que retorne el kilometraje actual",
        "testing": {
            "Coche.avanzar": [
                {
                    "instanceArgs": {"marca": "Toyota", "modelo": "Corolla", "kilometraje": 0},
                    "args": {"kms": 150},
                    "expected": 150,
                    "description": "Avance inicial"
                }
            ],
            "Coche.obtener_kilometraje": [
                {
                    "instanceArgs": {"marca": "Ford", "modelo": "Fiesta", "kilometraje": 5000},
                    "args": {},
                    "expected": 5000,
                    "description": "Obtener kilometraje existente"
                }
            ]
        }
    }
];

export {tests};