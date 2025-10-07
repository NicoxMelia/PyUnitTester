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
  },
  {
    "id": "E11",
    "testing": {
      "area_cuadrado": [
        {
          "args": {"lado": 5},
          "expected": 25,
          "description": "Área de cuadrado con lado 5"
        },
        {
          "args": {"lado": 8},
          "expected": 64,
          "description": "Área de cuadrado con lado 8"
        },
        {
          "args": {"lado": 0},
          "expected": 0,
          "description": "Área de cuadrado con lado 0"
        },
        {
          "args": {"lado": 10},
          "expected": 100,
          "description": "Área de cuadrado con lado 10"
        },
        {
          "args": {"lado": 2.5},
          "expected": 6.25,
          "description": "Área de cuadrado con lado decimal"
        }
      ]
    }
  },
  {
    "id": "E12",
    "testing": {
      "precio_con_iva": [
        {
          "args": {"precio": 100},
          "expected": 121.0,
          "description": "Precio con IVA del 21%"
        },
        {
          "args": {"precio": 250},
          "expected": 302.5,
          "description": "Precio con IVA para 250"
        },
        {
          "args": {"precio": 0},
          "expected": 0.0,
          "description": "Precio base 0"
        },
        {
          "args": {"precio": 1000},
          "expected": 1210.0,
          "description": "Precio alto con IVA"
        },
        {
          "args": {"precio": 49.99},
          "expected": 60.4879,
          "description": "Precio con decimales"
        }
      ]
    }
  },
  {
    "id": "E13",
    "testing": {
      "comparar_numeros": [
        {
          "args": {"a": 5, "b": 8},
          "expected": "El mayor es 8",
          "description": "Comparar números distintos"
        },
        {
          "args": {"a": 7, "b": 7},
          "expected": "Son iguales",
          "description": "Comparar números iguales"
        },
        {
          "args": {"a": -3, "b": 2},
          "expected": "El mayor es 2",
          "description": "Comparar número negativo y positivo"
        },
        {
          "args": {"a": 100, "b": 50},
          "expected": "El mayor es 100",
          "description": "Comparar números grandes"
        },
        {
          "args": {"a": 0, "b": -10},
          "expected": "El mayor es 0",
          "description": "Comparar con cero y negativo"
        }
      ]
    }
  },
  {
    "id": "E14",
    "testing": {
      "area_triangulo": [
        {
          "args": {"base": 6, "altura": 4},
          "expected": 12.0,
          "description": "Área de triángulo base 6 altura 4"
        },
        {
          "args": {"base": 10, "altura": 3},
          "expected": 15.0,
          "description": "Área de triángulo base 10 altura 3"
        },
        {
          "args": {"base": 0, "altura": 5},
          "expected": 0.0,
          "description": "Área con base 0"
        },
        {
          "args": {"base": 8, "altura": 2.5},
          "expected": 10.0,
          "description": "Área con altura decimal"
        },
        {
          "args": {"base": 3, "altura": 3},
          "expected": 4.5,
          "description": "Triángulo equilátero simple"
        }
      ]
    }
  },
  {
    "id": "E15",
    "testing": {
      "mayoria_edad": [
        {
          "args": {"edad": 20},
          "expected": "Eres mayor de edad",
          "description": "Mayor de edad"
        },
        {
          "args": {"edad": 16},
          "expected": "Eres menor de edad",
          "description": "Menor de edad"
        },
        {
          "args": {"edad": 18},
          "expected": "Eres mayor de edad",
          "description": "Justo en el límite de mayoría de edad"
        },
        {
          "args": {"edad": 0},
          "expected": "Eres menor de edad",
          "description": "Edad nula"
        },
        {
          "args": {"edad": 70},
          "expected": "Eres mayor de edad",
          "description": "Adulto mayor"
        }
      ]
    }
  },
  {
    "id": "E16",
    "testing": {
      "promedio_notas": [
        {
          "args": {"notas": [8, 6, 7]},
          "expected": "Aprobado con 7.0",
          "description": "Promedio aprobatorio"
        },
        {
          "args": {"notas": [3, 5, 4]},
          "expected": "Reprobado con 4.0",
          "description": "Promedio reprobatorio"
        },
        {
          "args": {"notas": [10, 9, 10]},
          "expected": "Aprobado con 9.7",
          "description": "Promedio sobresaliente"
        },
        {
          "args": {"notas": [6, 6, 6]},
          "expected": "Aprobado con 6.0",
          "description": "Promedio justo"
        },
        {
          "args": {"notas": [2, 3, 1]},
          "expected": "Reprobado con 2.0",
          "description": "Promedio muy bajo"
        }
      ]
    }
  },
  {
    "id": "E17",
    "testing": {
      "contar_pares": [
        {
          "args": {"numeros": [1, 2, 3, 4, 5, 6]},
          "expected": 3,
          "description": "Tres números pares"
        },
        {
          "args": {"numeros": [7, 9, 11]},
          "expected": 0,
          "description": "Sin números pares"
        },
        {
          "args": {"numeros": [2, 4, 6, 8, 10]},
          "expected": 5,
          "description": "Todos pares"
        },
        {
          "args": {"numeros": []},
          "expected": 0,
          "description": "Lista vacía"
        },
        {
          "args": {"numeros": [1, 3, 5, 7, 9]},
          "expected": 0,
          "description": "Solo impares"
        }
      ]
    }
  },
  {
    "id": "E18",
    "testing": {
      "suma_hasta_n": [
        {
          "args": {"n": 5},
          "expected": 15,
          "description": "Suma de 1 a 5"
        },
        {
          "args": {"n": 10},
          "expected": 55,
          "description": "Suma de 1 a 10"
        },
        {
          "args": {"n": 1},
          "expected": 1,
          "description": "Suma mínima"
        },
        {
          "args": {"n": 0},
          "expected": 0,
          "description": "Suma con límite 0"
        },
        {
          "args": {"n": 100},
          "expected": 5050,
          "description": "Suma de 1 a 100"
        }
      ]
    }
  },
  {
    "id": "E19",
    "testing": {
      "contar_vocales": [
        {
          "args": {"palabra": "murciélago"},
          "expected": 5,
          "description": "Contar vocales en murciélago"
        },
        {
          "args": {"palabra": "python"},
          "expected": 1,
          "description": "Contar vocales en python"
        },
        {
          "args": {"palabra": "AEIOU"},
          "expected": 5,
          "description": "Todas las vocales mayúsculas"
        },
        {
          "args": {"palabra": "bcdfg"},
          "expected": 0,
          "description": "Sin vocales"
        },
        {
          "args": {"palabra": "Educación"},
          "expected": 5,
          "description": "Palabra con tilde y mayúscula"
        }
      ]
    }
  },
  {
    "id": "E20",
    "testing": {
      "tabla_multiplicar": [
        {
          "args": {"n": 3},
          "expected": [
            "3 x 1 = 3",
            "3 x 2 = 6",
            "3 x 3 = 9",
            "3 x 4 = 12",
            "3 x 5 = 15",
            "3 x 6 = 18",
            "3 x 7 = 21",
            "3 x 8 = 24",
            "3 x 9 = 27",
            "3 x 10 = 30"
          ],
          "description": "Tabla de multiplicar del 3"
        },
        {
          "args": {"n": 5},
          "expected": [
            "5 x 1 = 5",
            "5 x 2 = 10",
            "5 x 3 = 15",
            "5 x 4 = 20",
            "5 x 5 = 25",
            "5 x 6 = 30",
            "5 x 7 = 35",
            "5 x 8 = 40",
            "5 x 9 = 45",
            "5 x 10 = 50"
          ],
          "description": "Tabla de multiplicar del 5"
        },
        {
          "args": {"n": 1},
          "expected": [
            "1 x 1 = 1",
            "1 x 2 = 2",
            "1 x 3 = 3",
            "1 x 4 = 4",
            "1 x 5 = 5",
            "1 x 6 = 6",
            "1 x 7 = 7",
            "1 x 8 = 8",
            "1 x 9 = 9",
            "1 x 10 = 10"
          ],
          "description": "Tabla del 1"
        },
        {
          "args": {"n": 10},
          "expected": [
            "10 x 1 = 10",
            "10 x 2 = 20",
            "10 x 3 = 30",
            "10 x 4 = 40",
            "10 x 5 = 50",
            "10 x 6 = 60",
            "10 x 7 = 70",
            "10 x 8 = 80",
            "10 x 9 = 90",
            "10 x 10 = 100"
          ],
          "description": "Tabla del 10"
        },
        {
          "args": {"n": 0},
          "expected": [
            "0 x 1 = 0",
            "0 x 2 = 0",
            "0 x 3 = 0",
            "0 x 4 = 0",
            "0 x 5 = 0",
            "0 x 6 = 0",
            "0 x 7 = 0",
            "0 x 8 = 0",
            "0 x 9 = 0",
            "0 x 10 = 0"
          ],
          "description": "Tabla de multiplicar del 0"
        }
      ]
    }
  }
];

export { tests };