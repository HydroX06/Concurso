class Juego {
    constructor() {
        this.dinero = 0
        this.vidas = 3
        this.temporizador = 30
        this.intervalo = null
        this.preguntaActual = null
        this.escudoActivo = false
        this.doblesPuntosActivo = false
        this.respuestasExtrasActivas = false
        this.ruletaActivo = false
    }

    preguntas = {
        muyFacil: [
            {
                q:"Qué lenguaje se usa mucho para hacer páginas web interactivas junto con HTML y CSS?",
                a:["JavaScript", "C#", "Pascal", "Swift"],
                correct:0,
                reward:100
            },
            {
                q:"¿Qué etiqueta HTML se usa para crear un enlace?",
                a:["<img>","<link>","<a>","<href>"],
                correct:2,
                reward:100
            },
            {
                q:"¿Cuál es el océano más grande?",
                a:["Atlántico","Índico","Ártico","Pacífico"],
                correct:3,
                reward:100
            },
            {
                q:"¿Qué estrella está en el centro del sistema solar?",
                a:["La Luna","El Sol","Marte","Júpiter"],
                correct:1,
                reward:100
            },
            {
                q:"¿Cuántas patas tiene una araña?",
                a:["6","8","10","12"],
                correct:1,
                reward:100
            },
            {
                q:"En programación, ¿cómo se llama una “caja” donde guardamos datos?",
                a:["Bucle", "Variable", "Clase", "Función"],
                correct:2,
                reward:100
            },
            {
                q: "¿Quién escribió Don Quijote de la Mancha?",
                a: ["Lope de Vega", "Miguel de Cervantes", "García Lorca", "Fernando de Rojas"],
                correct:1,
                reward:100
            },
            {
                q:"¿Cuántos planetas hay en el sistema solar?",
                a:["7","8","9","10"],
                correct:1,
                reward:100
            },
            {
                q:"¿Quién pintó la Mona Lisa?",
                a:["Van Gogh","Picasso","Leonardo da Vinci","Miguel Ángel"],
                correct:2,
                reward:100
            },
            {
                q:"¿Qué científico formuló la ley de la gravedad?",
                a:["Einstein","Newton","Galileo","Tesla"],
                correct:1,
                reward:100
            },
            {
                q:"¿Qué idioma se habla principalmente en Brasil?",
                a:["Español","Portugués","Brasileño","Italiano"],
                correct:1,
                reward:100
            },
            {
                q: "¿Qué lenguaje se usa para estilos web?",
                a: ["HTML","CSS","Python","C++"],
                correct:2,
                reward:100
            }
        ],
        facil: [
            {
                pregunta: "En Python, ¿qué símbolo se usa normalmente para comentarios de una sola línea?",
                respuestas: ["//", "--", "#", "**"],
                correcta: 2,
                recompensa: 200
            },
            {
                q:"¿Qué metal es líquido a temperatura ambiente?",
                a:["Hierro","Mercurio","Oro","Cobre"],
                correct:1,
                reward:200
            },
            {
                pregunta: "¿Cuál NO es un lenguaje de programación?",
                respuestas: ["HTML", "Java", "Python", "PHP"],
                correcta: 0,
                recompensa: 200
            },
            {
                pregunta: "¿Qué significa HTML?",
                respuestas: [
                    "HyperText Markup Language",
                    "HighText Machine Language",
                    "Hyper Transfer Mark",
                    "Home Tool Markup"
                ],
                correcta: 0,
                recompensa: 200
            },
            {
                pregunta: "¿Cuál es el país más grande del mundo?",
                respuestas: ["Alemania", "Estados Unidos", "China", "Rusia"],
                correcta: 3,
                recompensa: 200
            },
            {
                pregunta: "¿En qué continente se encuentra Egipto?",
                respuestas: ["Asia", "Europa", "África", "América"],
                correcta: 2,
                recompensa: 200
            },
            {
                pregunta: "¿En qué ciudad se encuentra el Museo del Louvre?",
                respuestas: ["Londres", "Roma", "Berlín", "París"],
                correcta: 3,
                recompensa: 200
            },
            {
                q:"¿Qué órgano filtra la sangre en el cuerpo?",
                a:["Riñones","Pulmones","Estómago","Hígado"],
                correct:0,
                reward:200
            },
            {
                q:"¿Qué gas necesitan las plantas para la fotosíntesis?",
                a:["Oxígeno","Dióxido de carbono","Helio","Nitrógeno"],
                correct:1,
                reward:200
            },
            {
                q:"¿Qué palabra clave en Python define una función?",
                a:["function","def","func","define"],
                correct:1,
                reward:200
            },
            {
                q:"¿Cómo se llama una variable que no cambia su valor en JavaScript?",
                a:["let","const","var","static"],
                correct:1,
                reward:200
            },
            {
                pregunta: "¿Qué es una clave primaria en una base de datos?",
                respuestas: [
                    "La primera columna de la tabla",
                    "Una contraseña para acceder a la base de datos",
                    "Un identificador único para cada registro",
                    "Un índice que acelera las búsquedas"
                ],
                correcta: 2,
                recompensa: 200
            }
        ],
        medio: [
            {
                pregunta: "¿Qué método añade un elemento a un array en JS?",
                respuestas: ["push()", "add()", "insert()", "append()"],
                correcta: 0,
                recompensa: 300
            },
            {
                q:"¿Qué país tiene más volcanes activos?",
                a:["Japón","Indonesia","Chile","Estados Unidos"],
                correct:1,
                reward:300
            },
            {
                pregunta: "¿Qué tipo de base de datos es MongoDB?",
                respuestas: ["Relacional", "NoSQL", "Jerárquica", "Orientada a objetos"],
                correcta: 1,
                recompensa: 300
            },
            {
                q:"¿Qué método en Java se ejecuta automáticamente al crear un objeto?",
                a:["main()","constructor()","init()","start()"],
                correct:1,
                reward:300
            },
            {
                q:"¿Qué operador compara igualdad estricta en JavaScript?",
                a:["==","===","!=","<>"],
                correct:1,
                reward:300
            },
            {
                q:"¿Qué palabra clave detiene un bucle?",
                a:["exit","stop","break","halt"],
                correct:2,
                reward:300
            },
            {
                pregunta: "¿En qué año comenzó la Primera Guerra Mundial?",
                respuestas: ["1920", "1910", "1914", "1933"],
                correcta: 2,
                recompensa: 300
            },
            {
                pregunta: "¿Quién fue el primer presidente de España tras la muerte de Franco?",
                respuestas: ["José Zapatero", "Mariano Rajoy", "Pedro Sánchez", "Adolfo Suárez"],
                correcta: 3,
                recompensa: 300
            },
            {
                q:"¿Cuál es el metal más abundante en la corteza terrestre?",
                a:["Hierro","Aluminio","Cobre","Plata"],
                correct:1,
                reward:300
            },
            {
                q:"¿Qué instrumento mide la velocidad del viento?",
                a:["Barómetro","Anemómetro","Termómetro","Voltímetro"],
                correct:1,
                reward:300
            },
            {
                q:"¿Qué significa SQL JOIN?",
                a:[
                    "Combinar filas de varias tablas",
                    "Eliminar tablas",
                    "Crear tablas",
                    "Ordenar tablas"
                ],
                correct:0,
                reward:300
            },
            {
                pregunta: "¿Cuál es el elemento más abundante en la corteza terrestre?",
                respuestas: ["Hierro", "Nitrógeno", "Silicio", "Oxígeno"],
                correcta: 3,
                recompensa: 300
            }
        ],
        dificil: [
            {
                pregunta: "¿Qué estructura almacena pares clave-valor?",
                respuestas: ["Array", "Map", "Stack", "Queue"],
                correcta: 1,
                recompensa: 400
            },
            {
                q:"¿Qué palabra clave en Java impide que una clase sea heredada?",
                a:["static","final","private","sealed"],
                correct:1,
                reward:400
            },
            {
                pregunta: "¿Qué civilización construyó el Machu Picchu?",
                respuestas: ["Azteca", "Maya", "Inca", "Olmeca"],
                correcta: 2,
                recompensa: 400
            },
            {
                pregunta: "¿En qué año cayó el Imperio Romano de Occidente?",
                respuestas: ["476 d.C.", "510 d.C.", "73 d.C.", "493 d.C."],
                correcta: 0,
                recompensa: 400
            },
            {
                q:"¿Quién escribió 'Cien años de soledad'?",
                a:["Mario Vargas Llosa","Gabriel García Márquez","Pablo Neruda","Jorge Luis Borges"],
                correct:1,
                reward:400
            },
            {
                q:"¿Cuál es el río más largo de Europa?",
                a:["Danubio","Volga","Rin","Tajo"],
                correct:1,
                reward:400
            },
            {
                pregunta: "¿Qué río atraviesa más países de África?",
                respuestas: ["Congo", "Zambeze", "Níger", "Nilo"],
                correcta: 3,
                recompensa: 400
            }
        ],
        muyDificil: [
            {
                pregunta: "¿En qué país se originó el ajedrez?",
                respuestas: ["Persia", "India", "China", "Grecia"],
                correcta: 1,
                recompensa: 500
            },
            {
                q:"¿Qué tipo de excepción en Java debe declararse o manejarse obligatoriamente?",
                a:["Checked Exception","Runtime Exception","Error","NullPointerException"],
                correct:0,
                reward:500
            },
            {
                pregunta: "¿Qué elemento tiene el punto de fusión más alto de la Tabla Periódica?",
                respuestas: ["Titanio", "Wolframio", "Renio", "Osmio"],
                correcta: 1,
                recompensa: 500
            },
            {
                pregunta: "¿En qué año fue publicada la 'Crítica de la Razón Pura' de Kant?",
                respuestas: ["1762", "1790", "1781", "1820"],
                correcta: 3,
                recompensa: 500
            },
            {
                pregunta: "¿Qué filósofo presocrático sostenía que el Ápeiron era el principio de todo?",
                respuestas: ["Tales", "Heráclito", "Pitágoras", "Anaximandro"],
                correcta: 3,
                recompensa: 500
            }
        ]
    }

    iniciarJuego() {
        this.siguientePregunta()
    }

    siguientePregunta() {
        const niveles = ["muyFacil", "facil", "medio", "dificil", "muyDificil"]
        const nivel = niveles[Math.floor(Math.random() * niveles.length)]
        const listaPregunta = this.preguntas[nivel]
        this.preguntaActual = listaPregunta[Math.floor(Math.random() * listaPregunta.length)]
        this.mostrarPregunta()
        this.iniciarTemporizador()
    }

    mostrarPregunta() {
        document.getElementById("question").innerText = this.preguntaActual.pregunta

        const divRespuestas = document.getElementById("respuestas")
        divRespuestas.innerHTML = ""

        let respuestas = [...this.preguntaActual.respuestas]

        if (this.respuestasExtrasActivas) {
            respuestas.push("Respuesta falsa 1")
            respuestas.push("Respuesta falsa 2")
        }

        respuestas.forEach((r, i) => {
            const boton = document.createElement("button")
            boton.innerText = r
            boton.onclick = () => this.responder(i)
            divRespuestas.appendChild(boton)
        })
    }

    responder(indice) {
        const botones = document.querySelectorAll("#respuestas button")
        clearInterval(this.intervalo)

        if (indice === this.preguntaActual.correcta) {
            botones[indice].classList.add("correct")

            let recompensa = this.preguntaActual.recompensa
            if (this.doblesPuntosActivo) recompensa *= 2

            this.dinero += recompensa

            setTimeout(() => {
                alert("Correcto +" + recompensa + "€")
                this.actualizarEstadisticas()
                this.siguientePregunta()
            }, 1000)

        } else {
            botones[indice].classList.add("incorrect")
            botones[this.preguntaActual.correcta].classList.add("correct")

            setTimeout(() => {
                if (!this.escudoActivo) {
                    this.vidas--
                } else {
                    this.escudoActivo = false
                    alert("¡El escudo te ha protegido!")
                }

                alert("Incorrecto")

                if (this.vidas <= 0) {
                    alert("Game Over")
                    location.reload()
                }

                this.actualizarEstadisticas()
                this.siguientePregunta()
            }, 1000)
        }
    }

    actualizarEstadisticas() {
        document.getElementById("money").innerText = this.dinero
        document.getElementById("lives").innerText = this.vidas
    }

    iniciarTemporizador() {
        clearInterval(this.intervalo)
        this.temporizador = 30

        this.intervalo = setInterval(() => {
            this.temporizador--
            document.getElementById("timer").innerText = this.temporizador

            if (this.temporizador <= 0) {
                clearInterval(this.intervalo)
                this.vidas--
                this.actualizarEstadisticas()
                this.siguientePregunta()
            }
        }, 1000)
    }

    plantarse() {
        alert("Te plantas con " + this.dinero + "€")
        location.reload()
    }

    usar5050() {
        const botones = document.querySelectorAll("#respuestas button")
        let eliminados = 0

        botones.forEach((boton, i) => {
            if (i !== this.preguntaActual.correcta && eliminados < 2) {
                boton.style.display = "none"
                eliminados++
            }
        })
    }

    cambiarPregunta() {
        this.siguientePregunta()
    }

    añadirTiempoExtra() {
        this.temporizador += 20
    }

    activarEscudo() {
        this.escudoActivo = true
    }

    activarRespuestasExtras() {
        this.respuestasExtrasActivas = true
    }

    activarDoblePuntos() {
        this.doblesPuntosActivo = true
    }

    girarRuleta(ganar) {
        const premios = ["+1 vida", "+200€", "Tiempo +20"]
        const castigos = ["-1 vida", "Pierdes 200€", "Tiempo -10"]

        const resultado = ganar
            ? premios[Math.floor(Math.random() * premios.length)]
            : castigos[Math.floor(Math.random() * castigos.length)]

        this.aplicarResultadoRuleta(resultado)
        alert("Ruleta: " + resultado)
    }

    aplicarResultadoRuleta(resultado) {
        switch (resultado) {
            case "+1 vida":         this.vidas++; break
            case "+200€":           this.dinero += 200; break
            case "Tiempo +20":      this.temporizador += 20; break
            case "-1 vida":         this.vidas--; break
            case "Pierdes 200€":    this.dinero -= 200; break
            case "Tiempo -10":      this.temporizador -= 10; break
        }
        this.actualizarEstadisticas()
    }

    activarModoRuleta() {
        this.ruleteActivo = true
    }
}

// Inicialización
const juego = new Juego()
juego.iniciarJuego()