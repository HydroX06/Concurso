let money = 0
let lives = 3
let timer = 30
let interval

let currentQuestion
let shieldActive = false

let doublePointsActive = false
let extraAnswersActive = false
let rouletteActive = false

const questions = {

    veryEasy:[
        {
            q:"Qué lenguaje se usa mucho para hacer páginas web interactivas junto con HTML y CSS?",
            a:["JavaScript", "C#", "Pascal", "Swift"],
            correct:0,
            reward:100
        },
        {
            q:"En programación, ¿cómo se llama una “caja” donde guardamos datos?",
            a:["Bucle", "Variable", "Clase", "Función"],
            correct:2,
            reward:100
        }
    ],
    easy:[
    {
    q:"¿Qué lenguaje se usa para estilos web?",
    a:["HTML","CSS","Python","C++"],
    correct:1,
    reward:200
    },
    {
        q:"En Python, ¿qué símbolo se usa normalmente para comentarios de una sola línea?",
        a:["//","<!-- -->","#","**"],
        correct:2,
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
    }
    ],

    medium:[
    {
        q:"¿Qué método añade un elemento a un array en JS?",
        a:["push()","add()","insert()","append()"],
        correct: 0,
        reward: 300
    },

    {
        q:"¿Qué tipo de base de datos es MongoDB?",
        a: ["Relacional", "NoSQL", "Jerárquica", "Orientada a objetos"],
        correct:1,
        reward: 300
    }
    ],

    hard:[
    {
        q:"¿Qué estructura almacena pares clave-valor?",
        a:["Array","Map","Stack","Queue"],
        correct:1,
        reward:400
    },
    {
        q: "¿Qué civilización construyó el Machu Picchu?",
        a: ["Azteca", "Maya", "Inca", "Olmeca"],
        correct: 2,
        reward: 200
    }
    ],

    muyDificil: [
        {
            q: "¿En qué país se originó el ajedrez?",
            a: ["Persia", "India", "China", "Grecia"],
            correct:1,
            reward:500
        }
    ]

}

function startGame(){

nextQuestion()

}

function nextQuestion(){

let levels = ["easy","medium","hard"]
let level = levels[Math.floor(Math.random()*levels.length)]

let qList = questions[level]

currentQuestion = qList[Math.floor(Math.random()*qList.length)]

showQuestion()

startTimer()

}

function showQuestion(){

document.getElementById("question").innerText=currentQuestion.q

let answersDiv=document.getElementById("answers")

answersDiv.innerHTML=""

let answers=[...currentQuestion.a]

if(extraAnswersActive){

answers.push("Respuesta falsa 1")
answers.push("Respuesta falsa 2")

}

answers.forEach((a,i)=>{

let btn=document.createElement("button")

btn.innerText=a

btn.onclick=()=>answer(i)

answersDiv.appendChild(btn)

})

}

function answer(index){

    let buttons = document.querySelectorAll("#answers button")

    clearInterval(interval)

    if(index == currentQuestion.correct){

        buttons[index].classList.add("correct")

        let reward = currentQuestion.reward

        if(doublePointsActive) reward *= 2

        money += reward

        setTimeout(()=>{

            alert("Correcto +" + reward + "€")

            updateStats()
            nextQuestion()

        },1000)

    }else{

        buttons[index].classList.add("incorrect")
        buttons[currentQuestion.correct].classList.add("correct")

        setTimeout(()=>{

            lives--

            alert("Incorrecto")

            if(lives<=0){

                alert("Game Over")
                location.reload()

            }

            updateStats()
            nextQuestion()

        },1000)

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

function stand(){

alert("Te plantas con "+money+"€")

location.reload()

}

function use5050(){

let buttons=document.querySelectorAll("#answers button")

let removed=0

buttons.forEach((btn,i)=>{

if(i!=currentQuestion.correct && removed<2){

btn.style.display="none"

removed++

}

})

}

function changeQuestion(){

nextQuestion()

}

function extraTime(){

timer+=20

}

function shield(){

shieldActive=true

}

function extraAnswers(){

extraAnswersActive=true

}

function doublePoints(){

doublePointsActive=true

}

function roulette(win){

let good=[
"+1 vida",
"+200€",
"Tiempo +20"
]

let bad=[
"-1 vida",
"Pierdes 200€",
"Tiempo -10"
]

let result

if(win){

result=good[Math.floor(Math.random()*good.length)]

}else{

result=bad[Math.floor(Math.random()*bad.length)]

}

alert("Ruleta: "+result)

}

function rouletteMode(){

rouletteActive=true

}