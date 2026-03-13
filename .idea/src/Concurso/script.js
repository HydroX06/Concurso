let money = 0
let lives = 3
let timer = 30
let interval

let currentQuestion
let shieldActive = false

let doublePointsActive = false
let extraAnswersActive = false
let ruletaActiva = false

let levelOrder = ["muyFacil","easy","medium","dificil","muyDificil"]
let currentLevelIndex = 0
let currentQuestionIndex = 0

const questions = {

    muyFacil: [

        {
            q:"¿Qué lenguaje se usa mucho para hacer páginas web interactivas junto con HTML y CSS?",
            a:["JavaScript","C#","Pascal","Swift"],
            correct:0,
            reward:100
        },

        {
            q:"En programación, ¿cómo se llama una 'caja' donde guardamos datos?",
            a:["Bucle","Variable","Clase","Función"],
            correct:1,
            reward:100
        },

        {
            q:"¿Quién escribió Don Quijote de la Mancha?",
            a:["Lope de Vega","Miguel de Cervantes","García Lorca","Fernando de Rojas"],
            correct:1,
            reward:100
        },

        {
            q:"¿Qué lenguaje se usa para estilos web?",
            a:["HTML","CSS","Python","C++"],
            correct:1,
            reward:100
        }

    ],

    easy: [

        {
            q:"En Python, ¿qué símbolo se usa normalmente para comentarios de una sola línea?",
            a:["//","--","#","**"],
            correct:2,
            reward:200
        },

        {
            q:"¿Cuál NO es un lenguaje de programación?",
            a:["HTML","Java","Python","PHP"],
            correct:0,
            reward:200
        },

        {
            q:"¿Qué significa HTML?",
            a:[
                "HyperText Markup Language",
                "HighText Machine Language",
                "Hyper Transfer Mark",
                "Home Tool Markup"
            ],
            correct:0,
            reward:200
        },

        {
            q:"¿Cuál es el país más grande del mundo?",
            a:["Alemania","Estados Unidos","China","Rusia"],
            correct:3,
            reward:200
        },

        {
            q:"¿En qué continente se encuentra Egipto?",
            a:["Asia","Europa","África","América"],
            correct:2,
            reward:200
        },

        {
            q:"¿En qué ciudad se encuentra el Museo del Louvre?",
            a:["Londres","Roma","Berlín","París"],
            correct:3,
            reward:200
        }

    ],

    medium: [

        {
            q:"¿Qué método añade un elemento a un array en JavaScript?",
            a:["push()","add()","insert()","append()"],
            correct:0,
            reward:300
        },

        {
            q:"¿Qué tipo de base de datos es MongoDB?",
            a:["Relacional","NoSQL","Jerárquica","Orientada a objetos"],
            correct:1,
            reward:300
        },

        {
            q:"¿En qué año comenzó la Primera Guerra Mundial?",
            a:["1920","1910","1914","1933"],
            correct:2,
            reward:300
        },

        {
            q:"¿Quién fue el primer presidente de España tras la muerte de Franco?",
            a:["José Zapatero","Mariano Rajoy","Pedro Sánchez","Adolfo Suárez"],
            correct:3,
            reward:300
        },

        {
            q:"¿Cuál es el elemento más abundante en la corteza terrestre?",
            a:["Hierro","Nitrógeno","Silicio","Oxígeno"],
            correct:3,
            reward:300
        }

    ],

    dificil:[

        {
            q:"¿Qué estructura almacena pares clave-valor?",
            a:["Array","Map","Stack","Queue"],
            correct:1,
            reward:400
        },

        {
            q:"¿Qué civilización construyó Machu Picchu?",
            a:["Azteca","Maya","Inca","Olmeca"],
            correct:2,
            reward:400
        },

        {
            q:"¿En qué año cayó el Imperio Romano de Occidente?",
            a:["476 d.C.","510 d.C.","73 d.C.","493 d.C."],
            correct:0,
            reward:400
        },

        {
            q:"¿Qué río atraviesa más países de África?",
            a:["Congo","Zambeze","Níger","Nilo"],
            correct:3,
            reward:400
        }

    ],

    muyDificil:[

        {
            q:"¿En qué país se originó el ajedrez?",
            a:["Persia","India","China","Grecia"],
            correct:1,
            reward:500
        },

        {
            q:"¿Qué elemento tiene el punto de fusión más alto de la tabla periódica?",
            a:["Titanio","Wolframio","Renio","Osmio"],
            correct:1,
            reward:500
        },

        {
            q:"¿En qué año fue publicada la 'Crítica de la Razón Pura' de Kant?",
            a:["1762","1790","1781","1820"],
            correct:2,
            reward:500
        },

        {
            q:"¿Qué filósofo presocrático sostenía que el Ápeiron era el principio de todo?",
            a:["Tales","Heráclito","Pitágoras","Anaximandro"],
            correct:3,
            reward:500
        }

    ]

}

let usosComodines = {
    fiftyFifty: 1,
    cambiarPregunta: 1,
    tiempoExtra: 1,
    dobleOportunidad: 1
}

function buyExtraUse(comodin){

    let cost = 100  // puedes ajustar el precio
    if(money < cost){
        alert("No tienes suficiente dinero")
        return
    }

    money -= cost
    updateStats()

    usedComodines[comodin] = false // se puede usar otra vez este comodín
    alert("Comprado extra para "+comodin)
}

function comenzar(){

    currentLevelIndex = 0
    currentQuestionIndex = 0
    money = 0
    lives = 3

    updateStats()

    nextQuestion()

}

function showLevelScreen(){

    // ocultar juego, mostrar el panel de tramo
    document.querySelector(".juego").style.display="none"
    document.getElementById("levelScreen").style.display="block"
    document.getElementById("levelMoney").innerText="Dinero actual: "+money+"€"

    // Mostrar solo los comodines usados
    let div = document.getElementById("comprarComodines")
    div.innerHTML=""

    for(let comodin in usedComodines){
        if(usedComodines[comodin]){
            div.innerHTML += `<button onclick="buyExtraUse('${comodin}')">Comprar extra para ${comodin}</button>`
        }
    }

}

function nextQuestion(){

    let level = levelOrder[currentLevelIndex]
    let qList = questions[level]

    if(currentQuestionIndex >= qList.length){

        clearInterval(interval)

        showLevelScreen()

        return
    }

    currentQuestion = qList[currentQuestionIndex]

    currentQuestionIndex++

    showQuestion()

    startTimer()

}

function continueGame(){

    document.getElementById("levelScreen").style.display="none"

    document.querySelector(".juego").style.display="block"

    currentLevelIndex++
    currentQuestionIndex=0

    if(currentLevelIndex>=levelOrder.length){

        alert("¡Has ganado el juego con "+money+"€!")

        location.reload()

        return
    }

    nextQuestion()

}

function showQuestion(){

    document.getElementById("question").innerText=currentQuestion.q

    let answersDiv=document.getElementById("respuestas")
    answersDiv.innerHTML=""

    let answers=[...currentQuestion.a]

    if(extraAnswersActive){

        answers.push("Respuesta falsa")
        answers.push("Otra respuesta falsa")

    }

    answers.forEach((a,i)=>{

        let btn=document.createElement("button")
        btn.innerText=a
        btn.onclick=()=>answer(i)

        answersDiv.appendChild(btn)

    })

}

function answer(index){

    let buttons=document.querySelectorAll("#respuestas button")

    clearInterval(interval)

    if(index==currentQuestion.correct){

        buttons[index].classList.add("correct")

        let reward=currentQuestion.reward

        if(doublePointsActive) reward*=2

        money+=reward

        setTimeout(()=>{

            alert("Correcto +"+reward+"€")

            updateStats()

            resetBoosters()

            nextQuestion()

        },1000)

    } else {

        buttons[index].classList.add("incorrect")
        buttons[currentQuestion.correct].classList.add("correct")

        setTimeout(()=>{

            if(shieldActive){
                alert("¡El escudo te ha protegido!")
                shieldActive = false
                document.getElementById("escudoIcono").style.display = "none"
            } else {
                lives--
            }

            if(lives <= 0){
                alert("Has perdido.")
                location.reload()
            }

            updateStats()
            resetBoosters()
            nextQuestion()

        }, 1000)

    }

}

function updateStats(){

    document.getElementById("money").innerText=money
    document.getElementById("lives").innerText=lives

}

function startTimer(){

    clearInterval(interval)

    timer=30

    interval=setInterval(()=>{

        timer--

        document.getElementById("timer").innerText=timer

        if(timer<=0){

            clearInterval(interval)

            lives--

            updateStats()

            nextQuestion()

        }

    },1000)

}

function extraTime() {
    timer += 15
}

function shield() {
    shieldActive = true
    document.getElementById("escudoIcono").style.visibility = "visible"
}

function plantar(){

    alert("Te plantas con "+ money + "€")

    location.reload()

}

function fiftyFifty(){
    if(usosComodines.fiftyFifty > 0){
        usosComodines.fiftyFifty--
        document.getElementById("countFiftyFifty").innerText = usosComodines.fiftyFifty

        let buttons = document.querySelectorAll("#respuestas button")
        let eliminadas = 0

        buttons.forEach((btn, i) => {
            if(i !== currentQuestion.correct && eliminadas < 2){
                btn.disabled = true
                btn.style.opacity = "0.3"
                eliminadas++
            }
        })

    } else {
        alert("Ya no puedes usar este comodín en este tramo")
    }
}

function cambiarPregunta(){ // La pregunta se salta de dos en dos porque queria que dijera que no hay más del mismo nivel.
    if(usosComodines.cambiarPregunta > 0) {
        usosComodines.cambiarPregunta--
        document.getElementById("countCambiarPregunta").innerText = usosComodines.cambiarPregunta

        let level = levelOrder[currentLevelIndex]
        let qList = questions[level]

        if (qList.length === 0) {
            alert("No hay más preguntas en esta etapa.")
            return
        }

        currentQuestion = qList[Math.floor(Math.random() * qList.length)]
        clearInterval(interval)
        showQuestion()
        startTimer()

    } else if (qList.length === 1) {
        alert("No hay más preguntas en esta etapa.")
    } else {
        alert("Ya no puedes usar este comodín en este tramo")
    }
}

function tiempoExtra(){
    if(usosComodines.tiempoExtra > 0){
        usosComodines.tiempoExtra--
        document.getElementById("countTiempoExtra").innerText = usosComodines.tiempoExtra
        extraTime()
    } else {
        alert("Ya no puedes usar este comodín en este tramo")
    }
}

function dobleOportunidad(){
    if(usosComodines.dobleOportunidad > 0){
        usosComodines.dobleOportunidad--
        document.getElementById("countDobleOportunidad").innerText = usosComodines.dobleOportunidad
        shield()
    } else {
        alert("Ya no puedes usar este comodín en este tramo")
    }
}

function respuestasExtra(){

    extraAnswersActive=true

    alert("Las próximas respuestas tendrán opciones extra")

}

function doblePuntos(){

    doublePointsActive=true

    alert("La próxima pregunta tendrá puntos dobles")

}

function ruleta(win){

    let buena=["+1 vida", "Ganas 200€", "Tiempo +20s", "Ganas 500€"]

    let mala=["-1 vida", "Pierdes 200€", "Tiempo -10s", "Pierdes 500€"]

    let result

    if(win){
        result=buena[Math.floor(Math.random()*buena.length)]
    }else{
        result=mala[Math.floor(Math.random()*mala.length)]
    }

    if(result == "+1 vida")      lives++
    if(result == "+200€")        money += 200
    if(result == "Tiempo +20")   timer += 20
    if(result == "-1 vida")      lives--
    if(result == "Pierdes 200€") money -= 200
    if(result == "Tiempo -10")   timer -= 10

    alert("Ruleta: "+result)

}

let sectores = [
    {texto:"+250€", tipo:"dinero", valor:250},
    {texto:"-250€", tipo:"dinero", valor:-250},
    {texto:"+1 vida", tipo:"vida", valor:1},
    {texto:"-1 vida", tipo:"vida", valor:-1},
    {texto:"+500€", tipo:"dinero", valor:500},
    {texto:"-500€", tipo:"dinero", valor:-500},
    {texto:"+20s", tipo:"tiempo", valor:20},
    {texto:"-10s", tipo:"tiempo", valor:-10}
]

function spinRuleta(){
    // resultado aleatorio
    let index = Math.floor(Math.random()*sectores.length)

    let resultado = sectores[index]
    document.getElementById("ruletaResultado").innerText = "Resultado: "+resultado.texto

    // Aplica el efecto:
    if(resultado.tipo=="dinero"){
        money += resultado.valor
        updateStats()
    } else if(resultado.tipo=="vida"){
        lives += resultado.valor
        if(lives<0) lives=0
        updateStats()
    } else if(resultado.tipo=="tiempo"){
        timer += resultado.valor
    }

}

function girarRuleta(){
    let win = Math.random() > 0.5
    ruleta(win)
    ruletaActiva=true

}

function resetBoosters(){

    doublePointsActive=false
    extraAnswersActive=false
    ruletaActiva=false

}