let money = 0
let lives = 3
let timer = 30
let interval

let currentQuestion
let shieldActive = false

let modoPruebaComodines = false
let extraAnswersActive = false
let ruletaActiva = false

let levelOrder = ["muyFacil", "easy", "medio", "dificil", "muyDificil"]
let currentLevelIndex = 0
let currentQuestionIndex = 0
let preguntasJugadas = []

const levelNames = {
    muyFacil:"BÁSICO", easy:"FÁCIL", medio:"MEDIO",
    dificil:"DIFÍCIL", muyDificil:"EXTREMO"
}

const questions = {
    muyFacil: [
        { q:"¿Qué lenguaje se usa mucho para hacer páginas web interactivas junto con HTML y CSS?", a:["JavaScript","C#","Pascal","Swift"], correct:0, reward:100 },
        { q:"¿Qué etiqueta HTML se usa para crear un enlace?", a:["<a>","<link>","<a>","<href>"], correct:2, reward:100 },
        { q:"¿Cuál es el océano más grande?", a:["Atlántico","Índico","Ártico","Pacífico"], correct:3, reward:100 },
        { q:"¿Qué estrella está en el centro del sistema solar?", a:["La Luna","El Sol","Marte","Júpiter"], correct:1, reward:100 },
        { q:"¿Cuántas patas tiene una araña?", a:["6","8","10","12"], correct:1, reward:100 },
        { q:"En programación, ¿cómo se llama una 'caja' donde guardamos datos?", a:["Bucle","Variable","Clase","Función"], correct:1, reward:100 },
        { q:"¿Quién escribió Don Quijote de la Mancha?", a:["Lope de Vega","Miguel de Cervantes","García Lorca","Fernando de Rojas"], correct:1, reward:100 },
        { q:"¿Cuántos planetas hay en el sistema solar?", a:["7","8","9","10"], correct:1, reward:100 },
        { q:"¿Quién pintó la Mona Lisa?", a:["Van Gogh","Picasso","Leonardo da Vinci","Miguel Ángel"], correct:2, reward:100 },
        { q:"¿Qué científico formuló la ley de la gravedad?", a:["Einstein","Newton","Galileo","Tesla"], correct:1, reward:100 },
        { q:"¿Qué idioma se habla principalmente en Brasil?", a:["Español","Portugués","Brasileño","Italiano"], correct:1, reward:100 },
        { q:"¿Qué lenguaje se usa para estilos web?", a:["HTML","CSS","Python","C++"], correct:1, reward:100 }
    ],
    easy: [
        { q:"En Python, ¿qué símbolo se usa para comentarios de una sola línea?", a:["//","--","#","**"], correct:2, reward:200 },
        { q:"¿Qué metal es líquido a temperatura ambiente?", a:["Hierro","Mercurio","Oro","Cobre"], correct:1, reward:200 },
        { q:"¿Cuál NO es un lenguaje de programación?", a:["HTML","Java","Python","PHP"], correct:0, reward:200 },
        { q:"¿Qué significa HTML?", a:["HyperText Markup Language","HighText Machine Language","Hyper Transfer Mark","Home Tool Markup"], correct:0, reward:200 },
        { q:"¿Cuál es el país más grande del mundo?", a:["Alemania","Estados Unidos","China","Rusia"], correct:3, reward:200 },
        { q:"¿En qué continente se encuentra Egipto?", a:["Asia","Europa","África","América"], correct:2, reward:200 },
        { q:"¿En qué ciudad se encuentra el Museo del Louvre?", a:["Londres","Roma","Berlín","París"], correct:3, reward:200 },
        { q:"¿Qué órgano filtra la sangre en el cuerpo?", a:["Riñones","Pulmones","Estómago","Hígado"], correct:0, reward:200 },
        { q:"¿Qué gas necesitan las plantas para la fotosíntesis?", a:["Oxígeno","Dióxido de carbono","Helio","Nitrógeno"], correct:1, reward:200 },
        { q:"¿Qué palabra clave en Python define una función?", a:["function","def","func","define"], correct:1, reward:200 },
        { q:"¿Cómo se llama una variable que no cambia su valor en JavaScript?", a:["let","const","var","static"], correct:1, reward:200 },
        { q:"¿Qué es una clave primaria en una base de datos?", a:["La primera columna","Una contraseña","Un identificador único","Un índice"], correct:2, reward:200 }
    ],
    medio: [
        { q:"¿Qué método añade un elemento a un array en JS?", a:["push()","add()","insert()","append()"], correct:0, reward:300 },
        { q:"¿Qué país tiene más volcanes activos?", a:["Japón","Indonesia","Chile","Estados Unidos"], correct:1, reward:300 },
        { q:"¿Qué tipo de base de datos es MongoDB?", a:["Relacional","NoSQL","Jerárquica","Orientada a objetos"], correct:1, reward:300 },
        { q:"¿Qué método en Java se ejecuta al crear un objeto?", a:["main()","constructor()","init()","start()"], correct:1, reward:300 },
        { q:"¿Qué operador compara igualdad estricta en JavaScript?", a:["==","===","!=","<>"], correct:1, reward:300 },
        { q:"¿Qué palabra clave detiene un bucle?", a:["exit","stop","break","halt"], correct:2, reward:300 },
        { q:"¿En qué año comenzó la Primera Guerra Mundial?", a:["1920","1910","1914","1933"], correct:2, reward:300 },
        { q:"¿Quién fue el primer presidente de España tras Franco?", a:["Zapatero","Rajoy","Pedro Sánchez","Adolfo Suárez"], correct:3, reward:300 },
        { q:"¿Cuál es el metal más abundante en la corteza terrestre?", a:["Hierro","Aluminio","Cobre","Plata"], correct:1, reward:300 },
        { q:"¿Qué instrumento mide la velocidad del viento?", a:["Barómetro","Anemómetro","Termómetro","Voltímetro"], correct:1, reward:300 },
        { q:"¿Qué significa SQL JOIN?", a:["Combinar filas de varias tablas","Eliminar tablas","Crear tablas","Ordenar tablas"], correct:0, reward:300 },
        { q:"¿Cuál es el elemento más abundante en la corteza terrestre?", a:["Hierro","Nitrógeno","Silicio","Oxígeno"], correct:3, reward:300 }
    ],
    dificil: [
        { q:"¿Qué estructura almacena pares clave-valor?", a:["Array","Map","Stack","Queue"], correct:1, reward:400 },
        { q:"¿Qué palabra clave en Java impide que una clase sea heredada?", a:["static","final","private","sealed"], correct:1, reward:400 },
        { q:"¿Qué civilización construyó Machu Picchu?", a:["Azteca","Maya","Inca","Olmeca"], correct:2, reward:400 },
        { q:"¿En qué año cayó el Imperio Romano de Occidente?", a:["476 d.C.","510 d.C.","73 d.C.","493 d.C."], correct:0, reward:400 },
        { q:"¿Quién escribió 'Cien años de soledad'?", a:["Mario Vargas Llosa","Gabriel García Márquez","Pablo Neruda","Jorge Luis Borges"], correct:1, reward:400 },
        { q:"¿Qué planeta tiene el día más largo del sistema solar?", a:["Mercurio","Venus","Marte","Júpiter"], correct:1, reward:400 },
        { q:"¿Qué científico propuso las tres leyes del movimiento planetario?", a:["Galileo Galilei","Johannes Kepler","Isaac Newton","Tycho Brahe"], correct:1, reward:400 },
        { q:"¿Qué país tiene más husos horarios?", a:["Estados Unidos","Rusia","China","Francia"], correct:3, reward:400 },
        { q:"¿Qué lenguaje se usa para consultas en bases de datos relacionales?", a:["Python","SQL","HTML","CSS"], correct:1, reward:400 },
        { q:"¿Cuál es la capital de Canadá?", a:["Toronto","Vancouver","Ottawa","Montreal"], correct:2, reward:400 },
        { q:"¿Cuál es el río más largo de Europa?", a:["Danubio","Volga","Rin","Tajo"], correct:1, reward:400 },
        { q:"¿Qué río atraviesa más países de África?", a:["Congo","Zambeze","Níger","Nilo"], correct:3, reward:400 }
    ],
    muyDificil: [
        { q:"¿En qué país se originó el ajedrez?", a:["Persia","India","China","Grecia"], correct:1, reward:500 },
        { q:"¿Qué matemático desarrolló la teoría de los logaritmos?", a:["Isaac Newton","John Napier","Carl Gauss","Leonhard Euler"], correct:1, reward:500 },
        { q:"¿Qué tratado puso fin a la Primera Guerra Mundial?", a:["Tratado de Utrecht","Tratado de París","Tratado de Versalles","Tratado de Tordesillas"], correct:2, reward:500 },
        { q:"¿Qué estructura de datos funciona con el principio LIFO?", a:["Queue","Stack","Tree","Graph"], correct:1, reward:500 },
        { q:"¿Qué físico propuso el principio de incertidumbre?", a:["Albert Einstein","Niels Bohr","Werner Heisenberg","Max Planck"], correct:2, reward:500 },
        { q:"¿Qué imperio fue gobernado por Mansa Musa?", a:["Imperio Songhai","Imperio de Malí","Imperio Otomano","Imperio Persa"], correct:1, reward:500 },
        { q:"¿Qué constante física representa la velocidad de la luz en el vacío?", a:["g","c","h","k"], correct:1, reward:500 },
        { q:"¿Qué científico descubrió la radiactividad natural en 1896?", a:["Marie Curie","Henri Becquerel","Ernest Rutherford","Niels Bohr"], correct:1, reward:500 },
        { q:"¿Qué tipo de excepción en Java debe declararse o manejarse obligatoriamente?", a:["Checked Exception","Runtime Exception","Error","NullPointerException"], correct:0, reward:500 },
        { q:"¿Qué elemento tiene el punto de fusión más alto de la Tabla Periódica?", a:["Titanio","Wolframio","Renio","Osmio"], correct:1, reward:500 },
        { q:"¿En qué año fue publicada la 'Crítica de la Razón Pura' de Kant?", a:["1762","1790","1781","1820"], correct:2, reward:500 },
        { q:"¿Qué filósofo presocrático sostenía que el Ápeiron era el principio de todo?", a:["Tales","Heráclito","Pitágoras","Anaximandro"], correct:3, reward:500 }
    ]
}

let usosComodines = {
    fiftyFifty: 1,
    cambiarPregunta: 1,
    tiempoExtra: 1,
    dobleOportunidad: 1
}

function updateLevelLabel(){
    const lvl = levelOrder[currentLevelIndex] || ""
    document.getElementById("levelLabel").textContent = levelNames[lvl] || lvl.toUpperCase()
}

function comprarUsoExtra(comodin){
    let coste = 100
    if(money < coste){ alert("⚠ CAPITAL INSUFICIENTE"); return }
    money -= coste
    updateStats()
    usosComodines[comodin]++
    alert("✓ Módulo " + comodin + " recargado")
}

function comenzar(){
    document.getElementById("btnEmpezar").classList.add("oculto")
    document.getElementById("btnPlantar").classList.remove("oculto")
    document.querySelector(".lifelines").style.display = ""
    document.querySelector(".potenciadores").style.display = ""

    currentLevelIndex = 0
    currentQuestionIndex = 0
    money = 0
    lives = 3
    preguntasJugadas = []

    updateStats()
    updateLevelLabel()
    nextQuestion()
}

function showLevelScreen(){
    document.querySelector(".lifelines").style.display = "none"
    document.querySelector(".potenciadores").style.display = "none"
    document.querySelector(".juego").style.display = "none"
    document.getElementById("levelScreen").style.display = "flex"
    document.getElementById("levelMoney").innerText = "// CAPITAL ACUMULADO: " + money + " €"

    let div = document.getElementById("comprarComodines")
    div.innerHTML = ""
    for(let comodin in usosComodines){
        if(usosComodines[comodin] !== undefined){
            div.innerHTML += `<button onclick="comprarUsoExtra('${comodin}')">↺ ${comodin} (100€)</button>`
        }
    }
}

function nextQuestion(){
    let level = levelOrder[currentLevelIndex]
    let qList = questions[level]
    if(!qList){ alert("Error: nivel no encontrado"); return }

    if(currentQuestionIndex >= qList.length){
        clearInterval(interval)
        showLevelScreen()
        return
    }

    preguntasJugadas.push(currentQuestionIndex)
    currentQuestion = qList[currentQuestionIndex]
    // Normalise field names (some entries use q/a/correct/reward, others use pregunta/respuestas/correcta/recompensa)
    if(currentQuestion.pregunta) currentQuestion.q = currentQuestion.pregunta
    if(currentQuestion.respuestas) currentQuestion.a = currentQuestion.respuestas
    if(currentQuestion.correcta !== undefined) currentQuestion.correct = currentQuestion.correcta
    if(currentQuestion.recompensa) currentQuestion.reward = currentQuestion.recompensa
    currentQuestionIndex++
    updateLevelLabel()
    showQuestion()
    startTimer()
}

function continueGame(){
    document.querySelector(".lifelines").style.display = ""
    document.querySelector(".potenciadores").style.display = ""
    document.getElementById("levelScreen").style.display = "none"
    document.querySelector(".juego").style.display = ""

    currentLevelIndex++
    currentQuestionIndex = 0
    preguntasJugadas = []

    if(currentLevelIndex >= levelOrder.length){
        alert("🏆 ¡VICTORIA TOTAL! Capital final: " + money + " €")
        location.reload()
        return
    }

    updateLevelLabel()
    nextQuestion()
}

function showQuestion(){
    document.getElementById("question").innerText = currentQuestion.q

    let answersDiv = document.getElementById("respuestas")
    answersDiv.innerHTML = ""

    let answers = [...currentQuestion.a]

    if(extraAnswersActive){
        answers.push("Señal no identificada")
        answers.push("Dato corrupto")
    }

    const labels = ["A","B","C","D","E","F"]
    answers.forEach((a,i)=>{
        let btn = document.createElement("button")
        btn.innerText = a
        btn.setAttribute("data-letter", labels[i]||"?")
        btn.onclick = ()=> answer(i)
        answersDiv.appendChild(btn)
    })
}

function answer(index){
    let buttons = document.querySelectorAll("#respuestas button")
    clearInterval(interval)

    if(index === currentQuestion.correct){
        buttons[index].classList.add("correct")
        let reward = currentQuestion.reward
        if(doublePointsActive) reward *= 2
        money += reward

        setTimeout(()=>{
            alert("✓ CORRECTO — +" + reward + " €")
            updateStats()
            resetBoosters()
            nextQuestion()
        }, 900)
    } else {
        buttons[index].classList.add("incorrect")
        buttons[currentQuestion.correct].classList.add("correct")

        setTimeout(()=>{
            if(shieldActive){
                alert("🛡 ESCUDO ACTIVADO — Daño bloqueado")
                shieldActive = false
                document.getElementById("escudoIcono").style.visibility = "hidden"
            } else {
                lives--
            }

            if(lives <= 0){
                alert("✗ PROTOCOLO TERMINADO — Todos los créditos perdidos")
                location.reload()
            }

            updateStats()
            resetBoosters()
            nextQuestion()
        }, 900)
    }
}

function updateStats(){
    document.getElementById("money").innerText = money
    document.getElementById("lives").innerText = lives
}

function startTimer(){
    clearInterval(interval)
    timer = 30
    interval = setInterval(()=>{
        timer--
        document.getElementById("timer").innerText = timer
        if(timer <= 0){
            clearInterval(interval)
            lives--
            updateStats()
            nextQuestion()
        }
    }, 1000)
}

function extraTime(){ timer += 15 }

function shield(){
    shieldActive = true
    document.getElementById("escudoIcono").style.visibility = "visible"
}

function plantar(){
    alert("⏹ PROTOCOLO DETENIDO — Capital retirado: " + money + " €")
    location.reload()
}

function fiftyFifty(){
    if(usosComodines.fiftyFifty > 0 || modoPruebaComodines){

        if(!modoPruebaComodines){
            usosComodines.fiftyFifty--
            document.getElementById("countFiftyFifty").innerText = usosComodines.fiftyFifty
        }

        let buttons = document.querySelectorAll("#respuestas button")
        let eliminadas = 0

        for(let i = 0; i < buttons.length; i++){
            if(i !== currentQuestion.correct && eliminadas < 2) {
                buttons[i].disabled = true
                buttons[i].style.opacity = "0.3"
                eliminadas++
            }
        }
    } else {
        alert("Ya no puedes usar este comodín en este tramo.")
    }
}

function cambiarPregunta(){
    if (usosComodines.cambiarPregunta > 0 || modoPruebaComodines) {

        if(!modoPruebaComodines){
            usosComodines.cambiarPregunta--
            document.getElementById("countCambiarPregunta").innerText = usosComodines.cambiarPregunta
        }
        let level = levelOrder[currentLevelIndex]
        let qList = questions[level]
        let disponibles = []

        for(let i = 0; i < qList.length; i++){
            if(!preguntasJugadas.includes(i))   {
                disponibles.push(qList[i])
            }
        }

        if (disponibles.length === 0) {
            alert("No hay más preguntas en este tramo.")
            return
        }

        usosComodines.cambiarPregunta--
        document.getElementById("countCambiarPregunta").innerText = usosComodines.cambiarPregunta

        let elegida = disponibles[Math.floor(Math.random() * disponibles.length)]
        preguntasJugadas.push(elegida.i)
        currentQuestion = elegida.q

        clearInterval(interval)
        showQuestion()
        startTimer()

    } else {
        alert("Ya no puedes usar este comodín en este tramo.")
    }
}
function tiempoExtra(){
    if(usosComodines.tiempoExtra > 0 || modoPruebaComodines){

        if(!modoPruebaComodines){
            usosComodines.tiempoExtra--
            document.getElementById("countTiempoExtra").innerText = usosComodines.tiempoExtra
        }

        extraTime()

    } else {
        alert("Ya no puedes usar este comodín en este tramo")
    }
}

function dobleOportunidad(){
    if(usosComodines.dobleOportunidad > 0 || modoPruebaComodines){

        if(!modoPruebaComodines){
            usosComodines.dobleOportunidad--
            document.getElementById("countDobleOportunidad").innerText = usosComodines.dobleOportunidad
        }

        shield()

    } else {
        alert("Ya no puedes usar este comodín en este tramo.")
    }
}

function modoPrueba(){

    let coste = 300  // precio del potenciador

    if(money < coste){
        alert("No tienes suficiente dinero")
        return
    }

    money -= coste
    modoPruebaComodines = true

    updateStats()

    alert("◉ Modo prueba activado: puedes usar comodines sin gastar usos en esta pregunta")
}

function doblePuntos(){
    doublePointsActive = true
    alert("✦ Modo doble puntuación activado")
}

let sectores = [
    {texto:"+250€",  tipo:"dinero", valor:250},
    {texto:"-250€",  tipo:"dinero", valor:-250},
    {texto:"+1 vida",tipo:"vida",   valor:1},
    {texto:"-1 vida",tipo:"vida",   valor:-1},
    {texto:"+500€",  tipo:"dinero", valor:500},
    {texto:"-500€",  tipo:"dinero", valor:-500},
    {texto:"+20s",   tipo:"tiempo", valor:20},
    {texto:"-10s",   tipo:"tiempo", valor:-10}
]

function spinRuleta(){
    // overridden by index.html canvas spin — fallback only
    let index = Math.floor(Math.random() * sectores.length)
    let resultado = sectores[index]
    document.getElementById("ruletaResultado").innerText = "▶ " + resultado.texto
    if(resultado.tipo==="dinero"){ money += resultado.valor; updateStats() }
    else if(resultado.tipo==="vida"){ lives = Math.max(0, lives + resultado.valor); updateStats() }
    else if(resultado.tipo==="tiempo"){ timer += resultado.valor }
}

function girarRuleta(){
    ruletaActiva = true
    alert("⟳ Modo ruleta activo — disponible al terminar el tramo")
}

function resetBoosters(){
    doublePointsActive = false
    extraAnswersActive = false
    ruletaActiva = false
}