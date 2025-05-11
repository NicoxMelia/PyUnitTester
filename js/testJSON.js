const tests = [
    {
        "id": "E1",
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

export { tests };