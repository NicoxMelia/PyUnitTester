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
    },
    {
    "id": "E6",
    "testing": {
      "Estudiante.estudiar": [
        {
          "instanceArgs": {"nombre": "Laura", "carrera": "Ingeniería"},
          "args": {},
          "expected": "Laura está estudiando Ingeniería",
          "description": "Estudiante con carrera definida"
        }
      ],
      "Estudiante.presentarse": [
        {
          "instanceArgs": {"nombre": "Carlos"},
          "args": {},
          "expected": "Hola, soy Carlos y estudio No especificada",
          "description": "Presentación con carrera por defecto"
        },
        {
          "instanceArgs": {"nombre": "Ana", "carrera": "Derecho"},
          "args": {},
          "expected": "Hola, soy Ana y estudio Derecho",
          "description": "Presentación con carrera específica"
        }
      ],
      "Estudiante.caminar": [
        {
          "instanceArgs": {"nombre": "Pedro"},
          "args": {"pasos": 15},
          "expected": "Pedro caminó 15 pasos",
          "description": "Herencia de método de Persona"
        }
      ]
    }
  },
  {
    "id": "E7",
    "testing": {
      "Medico.tratar": [
        {
          "instanceArgs": {"nombre": "González", "especialidad": "Pediatría"},
          "args": {"paciente": "niño Juan"},
          "expected": "Dr. González está tratando a niño Juan",
          "description": "Tratamiento a paciente"
        }
      ],
      "Medico.saludar": [
        {
          "instanceArgs": {"nombre": "Pérez", "especialidad": "Cirugía"},
          "args": {},
          "expected": "Hola, soy el Dr. Pérez, especialista en Cirugía",
          "description": "Saludo profesional"
        }
      ],
      "Medico.caminar": [
        {
          "instanceArgs": {"nombre": "Ramírez", "especialidad": "Neurología"},
          "args": {"pasos": 20},
          "expected": "Dr. Ramírez caminó 20 pasos",
          "description": "Método heredado con título"
        }
      ]
    }
  },
  {
    "id": "E8",
    "testing": {
      "CuentaPremium.transferir": [
        {
          "instanceArgs": {"titular": "Ana", "saldo": 1500},
          "args": {"destino": "Cuenta123", "monto": 300},
          "expected": 1200,
          "description": "Transferencia normal"
        }
      ],
      "CuentaPremium.retirar": [
        {
          "instanceArgs": {"titular": "Carlos", "nivel": "Platino"},
          "args": {"monto": 1300},
          "expected": -300,
          "description": "Sobregiro permitido"
        },
        {
          "instanceArgs": {"titular": "Luisa", "nivel": "Oro"},
          "args": {"monto": 1100},
          "expected": "Fondos insuficientes",
          "description": "Sobregiro no permitido"
        }
      ]
    }
  },
  {
    "id": "E9",
    "testing": {
      "Smartphone.instalar_app": [
        {
          "instanceArgs": {"marca": "Xiaomi", "modelo": "Redmi Note", "sistema_operativo": "Android", "almacenamiento": 64},
          "args": {"nombre": "Twitter"},
          "expected": "Instalando Twitter en Xiaomi Redmi Note",
          "description": "Instalación app básica"
        }
      ],
      "Smartphone.info": [
        {
          "instanceArgs": {"marca": "Apple", "modelo": "iPhone 14", "sistema_operativo": "iOS", "almacenamiento": 256},
          "args": {},
          "expected": "Marca: Apple, Modelo: iPhone 14, SO: iOS, Almacenamiento: 256GB",
          "description": "Información completa"
        }
      ]
    }
  },
  {
    "id": "E10",
    "testing": {
      "AnimalVolador.mover": [
        {
          "instanceArgs": {"nombre": "Cóndor", "especie": "Andino", "altitud_maxima": 5000},
          "args": {},
          "expected": "Cóndor Andino está volando a 5000 metros",
          "description": "Movimiento de ave"
        }
      ],
      "AnimalAcuatico.mover": [
        {
          "instanceArgs": {"nombre": "Delfín", "especie": "Común", "profundidad_maxima": 300},
          "args": {},
          "expected": "Delfín Común está nadando a 300 metros de profundidad",
          "description": "Movimiento de mamífero acuático"
        }
      ]
    }
  }
];

export { tests };