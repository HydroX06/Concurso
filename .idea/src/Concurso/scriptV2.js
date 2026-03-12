const juego = {
    dinero: 0,
    vidas: 3,
    temporizador: 30,
    intervalo: null,

    preguntaActual : null,

    escudoActivo: false,
    doblesPuntosActivo: false,
    respuestasExtrasActivas: false,
    ruleteActivo: false,

    indiceLevelActual: 0,
    indicePreguntaActual: 0
}

let ordenNiveles = ["muyFacil", "facil", "medio", "dificil", "muyDificil"]


const preguntas = {

    muyFacil: [
        {
            p: "¿Qué lenguaje se usa mucho para hacer páginas web interactivas junto con HTML y CSS?",
            r: ["JavaScript", "C#", "Pascal", "Swift"],
            correcta: 0,
            recompensa: 100
        },
        {
            p: "En programación, ¿cómo se llama una 'caja' donde guardamos datos?",
            r: ["Bucle", "Variable", "Clase", "Función"],
            correcta: 1,
            recompensa: 100
        },
        {
            p: "¿Quién escribió Don Quijote de la Mancha?",
            r: ["Lope de Vega", "Miguel de Cervantes", "García Lorca", "Fernando de Rojas"],
            correcta: 1,
            recompensa: 100
        },
        {
            p: "¿Qué lenguaje se usa para estilos web?",
            r: ["HTML", "CSS", "Python", "C++"],
            correcta: 1,
            recompensa: 100
        }
    ],

    facil: [
        {
            p: "En Python, ¿qué símbolo se usa normalmente para comentarios de una sola línea?",
            r: ["//", "--", "#", "**"],
            correcta: 2,
            recompensa: 200
        },
        {
            p: "¿Cuál NO es un lenguaje de programación?",
            r: ["HTML", "Java", "Python", "PHP"],
            correcta: 0,
            recompensa: 200
        },
        {
            p: "¿Qué significa HTML?",
            r: [
                "HyperText Markup Language",
                "HighText Machine Language",
                "Hyper Transfer Mark",
                "Home Tool Markup"
            ],
            correcta: 0,
            recompensa: 200
        },
        {
            p: "¿Cuál es el país más grande del mundo?",
            r: ["Alemania", "Estados Unidos", "China", "Rusia"],
            correcta: 3,
            recompensa: 200
        },
        {
            p: "¿En qué continente se encuentra Egipto?",
            r: ["Asia", "Europa", "África", "América"],
            correcta: 2,
            recompensa: 200
        },
        {
            p: "¿En qué ciudad se encuentra el Museo del Louvre?",
            r: ["Londres", "Roma", "Berlín", "París"],
            correcta: 3,
            recompensa: 200
        }
    ],

    medio: [
        {
            p: "¿Qué método añade un elemento a un array en JavaScript?",
            r: ["push()", "add()", "insert()", "append()"],
            correcta: 0,
            recompensa: 300
        },
        {
            p: "¿Qué tipo de base de datos es MongoDB?",
            r: ["Relacional", "NoSQL", "Jerárquica", "Orientada a objetos"],
            correcta: 1,
            recompensa: 300
        },
        {
            p: "¿En qué año comenzó la Primera Guerra Mundial?",
            r: ["1920", "1910", "1914", "1933"],
            correcta: 2,
            recompensa: 300
        },
        {
            p: "¿Quién fue el primer presidente de España tras la muerte de Franco?",
            r: ["José Zapatero", "Mariano Rajoy", "Pedro Sánchez", "Adolfo Suárez"],
            correcta: 3,
            recompensa: 300
        },
        {
            p: "¿Cuál es el elemento más abundante en la corteza terrestre?",
            r: ["Hierro", "Nitrógeno", "Silicio", "Oxígeno"],
            correcta: 3,
            recompensa: 300
        }
    ],

    dificil: [
        {
            p: "¿Qué estructura almacena pares clave-valor?",
            r: ["Array", "Map", "Stack", "Queue"],
            correcta: 1,
            recompensa: 400
        },
        {
            p: "¿Qué civilización construyó Machu Picchu?",
            r: ["Azteca", "Maya", "Inca", "Olmeca"],
            correcta: 2,
            recompensa: 400
        },
        {
            p: "¿En qué año cayó el Imperio Romano de Occidente?",
            r: ["476 d.C.", "510 d.C.", "73 d.C.", "493 d.C."],
            correcta: 0,
            recompensa: 400
        },
        {
            p: "¿Qué río atraviesa más países de África?",
            r: ["Congo", "Zambeze", "Níger", "Nilo"],
            correcta: 3,
            recompensa: 400
        }
    ],

    muyDificil: [
        {
            p: "¿En qué país se originó el ajedrez?",
            r: ["Persia", "India", "China", "Grecia"],
            correcta: 1,
            recompensa: 500
        },
        {
            p: "¿Qué elemento tiene el punto de fusión más alto de la tabla periódica?",
            r: ["Titanio", "Wolframio", "Renio", "Osmio"],
            correcta: 1,
            recompensa: 500
        },
        {
            p: "¿En qué año fue publicada la 'Crítica de la Razón Pura' de Kant?",
            r: ["1762", "1790", "1781", "1820"],
            correcta: 2,
            recompensa: 500
        },
        {
            p: "¿Qué filósofo presocrático sostenía que el Ápeiron era el principio de todo?",
            r: ["Tales", "Heráclito", "Pitágoras", "Anaximandro"],
            correcta: 3,
            recompensa: 500
        }
    ]

}

function iniciarJuego() {
    indiceLevelActual = 0
    indicePreguntaActual = 0
    dinero = 0
    vidas = 3
    actualizarEstadisticas()
    siguientePregunta()
}

function siguientePregunta() {
    let nivel = ordenNiveles[indiceLevelActual]
    let listaPreguntas = preguntas[nivel]

    if (indicePreguntaActual >= listaPreguntas.length) {
        let continuar = confirm("Has terminado este nivel. ¿Quieres continuar o retirarte con " + dinero + "€?")

        if (!continuar) {
            plantarse()
            return
        }

        indiceLevelActual++
        indicePreguntaActual = 0

        if (indiceLevelActual >= ordenNiveles.length) {
            alert("¡Has ganado el juego con " + dinero + "€!")
            location.reload()
            return
        }

        nivel = ordenNiveles[indiceLevelActual]
        listaPreguntas = preguntas[nivel]
    }

    preguntaActual = listaPreguntas[indicePreguntaActual]
    indicePreguntaActual++

    mostrarPregunta()
    iniciarTemporizador()
}

function mostrarPregunta() {
    document.getElementById("question").innerText = preguntaActual.p

    let divRespuestas = document.getElementById("respuestas")
    divRespuestas.innerHTML = ""

    let respuestas = [...preguntaActual.r]

    if (respuestasExtrasActivas) {
        respuestas.push("Respuesta falsa")
        respuestas.push("Otra respuesta falsa")
    }

    respuestas.forEach((r, i) => {
        let boton = document.createElement("button")
        boton.innerText = r
        boton.onclick = () => responder(i)
        divRespuestas.appendChild(boton)
    })
}

function responder(indice) {
    let botones = document.querySelectorAll("#respuestas button")
    clearInterval(intervalo)

    if (indice == preguntaActual.correcta) {
        botones[indice].classList.add("correct")

        let recompensa = preguntaActual.recompensa
        if (doblesPuntosActivo) recompensa *= 2

        dinero += recompensa

        setTimeout(() => {
            alert("Correcto +" + recompensa + "€")
            actualizarEstadisticas()
            reiniciarPotenciadores()
            siguientePregunta()
        }, 1000)

    } else {
        botones[indice].classList.add("incorrect")
        botones[preguntaActual.correcta].classList.add("correct")

        setTimeout(() => {
            vidas--
            alert("Incorrecto")

            if (vidas <= 0) {
                alert("Game Over")
                location.reload()
            }

            actualizarEstadisticas()
            reiniciarPotenciadores()
            siguientePregunta()
        }, 1000)
    }
}

function actualizarEstadisticas() {
    document.getElementById("money").innerText = dinero
    document.getElementById("lives").innerText = vidas
}

function iniciarTemporizador() {
    clearInterval(intervalo)
    temporizador = 30

    intervalo = setInterval(() => {
        temporizador--
        document.getElementById("timer").innerText = temporizador

        if (temporizador <= 0) {
            clearInterval(intervalo)
            vidas--
            actualizarEstadisticas()
            siguientePregunta()
        }
    }, 1000)
}

function plantarse() {
    alert("Te plantas con " + dinero + "€")
    location.reload()
}

function usar5050() {
    let botones = document.querySelectorAll("#respuestas button")
    let eliminados = 0

    botones.forEach((boton, i) => {
        if (i != preguntaActual.correcta && eliminados < 2) {
            boton.style.display = "none"
            eliminados++
        }
    })
}

function cambiarPregunta() {
    siguientePregunta()
}

function tiempoExtra() {
    temporizador += 20
}

function activarEscudo() {
    escudoActivo = true
}

function activarRespuestasExtras() {
    respuestasExtrasActivas = true
    alert("Las próximas respuestas tendrán opciones extra")
}

function activarDoblePuntos() {
    doblesPuntosActivo = true
    alert("La próxima pregunta tendrá puntos dobles")
}

function girarRuleta(ganar) {
    let premios = ["+1 vida", "+200€", "Tiempo +20"]
    let castigos = ["-1 vida", "Pierdes 200€", "Tiempo -10"]

    let resultado = ganar
        ? premios[Math.floor(Math.random() * premios.length)]
        : castigos[Math.floor(Math.random() * castigos.length)]

    alert("Ruleta: " + resultado)
}

function activarModoRuleta() {
    ruleteActivo = true
}

function reiniciarPotenciadores() {
    doblesPuntosActivo = false
    respuestasExtrasActivas = false
    ruleteActivo = false
}