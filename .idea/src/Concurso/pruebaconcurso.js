/* ═══════════════════════════════════════════════
   INVERSIÓN ARRIESGADA — GAME LOGIC v2
   ═══════════════════════════════════════════════ */

let money = 0
let lives = 3
let timer = 30
let interval

let currentQuestion
let shieldActive = false

let doublePointsActive  = false
let ruletaActiva        = false
let extraAnswersActive  = false
let modoPruebaComodines = false

let levelOrder = ["muyFacil","easy","medio","dificil","muyDificil"]
let currentLevelIndex    = 0
let currentQuestionIndex = 0
let preguntasJugadas     = []

/* Coste progresivo de comodines por nivel (índice 0→4) */
const comodinCostes = [75, 150, 250, 400, 600]

const levelNames = {
    muyFacil:"BÁSICO", easy:"FÁCIL", medio:"MEDIO",
    dificil:"DIFÍCIL", muyDificil:"EXTREMO"
}
const levelColors = {
    muyFacil:"#00f5ff", easy:"#00ff9f", medio:"#f5e642",
    dificil:"#ff8c00",  muyDificil:"#ff2a6d"
}

/* ═══════════════ PREGUNTAS ════════════════════════ */
const questions = {
    muyFacil: [
        { q:"¿Qué lenguaje se usa para hacer páginas web interactivas junto con HTML y CSS?", a:["JavaScript","C#","Pascal","Swift"], correct:0, reward:100 },
        { q:"¿Qué etiqueta HTML se usa para crear un enlace?", a:["<img>","<link>","<a>","<href>"], correct:2, reward:100 },
        { q:"¿Cuál es el océano más grande?", a:["Atlántico","Índico","Ártico","Pacífico"], correct:3, reward:100 },
        { q:"¿Qué estrella está en el centro del sistema solar?", a:["La Luna","El Sol","Marte","Júpiter"], correct:1, reward:100 },
        { q:"¿Cuántas patas tiene una araña?", a:["6","8","10","12"], correct:1, reward:100 },
        { q:"En programación, ¿cómo se llama la 'caja' donde guardamos datos?", a:["Bucle","Variable","Clase","Función"], correct:1, reward:100 },
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
        { q:"¿Quién fue el primer presidente del gobierno español tras Franco?", a:["Zapatero","Rajoy","Pedro Sánchez","Adolfo Suárez"], correct:3, reward:300 },
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
    fiftyFifty:1, cambiarPregunta:1, tiempoExtra:1, dobleOportunidad:1
}

/* ═══════════════ HELPERS ══════════════════════════ */
function updateLevelLabel(){
    const lvl = levelOrder[currentLevelIndex] || ""
    const el  = document.getElementById("levelLabel")
    if(el){
        el.textContent = levelNames[lvl] || lvl.toUpperCase()
        el.style.color = levelColors[lvl] || "var(--cyan)"
    }
}

function updateStats(){
    document.getElementById("money").innerText = money
    document.getElementById("lives").innerText  = lives
}

function refreshComodinCounts(){
    document.getElementById("countFiftyFifty").innerText       = usosComodines.fiftyFifty
    document.getElementById("countCambiarPregunta").innerText   = usosComodines.cambiarPregunta
    document.getElementById("countTiempoExtra").innerText       = usosComodines.tiempoExtra
    document.getElementById("countDobleOportunidad").innerText  = usosComodines.dobleOportunidad
}

/* Toast notification – replaces all alerts */
function showToast(msg, type="info"){
    const t = document.createElement("div")
    t.className = "game-toast toast-" + type
    t.innerText = msg
    document.body.appendChild(t)
    setTimeout(() => t.classList.add("toast-visible"), 10)
    setTimeout(() => {
        t.classList.remove("toast-visible")
        setTimeout(() => t.remove(), 400)
    }, 2200)
}

function hideAll(){
    document.querySelector(".juego").style.display         = "none"
    document.querySelector(".lifelines").style.display     = "none"
    document.querySelector(".potenciadores").style.display = "none"
    document.getElementById("levelScreen").style.display   = "none"
    document.getElementById("gameOverScreen").style.display= "none"
    document.getElementById("victoryScreen").style.display = "none"
    document.getElementById("plantarScreen").style.display = "none"
}

/* ═══════════════ GAME FLOW ════════════════════════ */
function comenzar(){
    document.getElementById("btnEmpezar").classList.add("oculto")
    document.getElementById("btnPlantar").classList.remove("oculto")
    document.querySelector(".lifelines").style.display   = ""
    document.querySelector(".potenciadores").style.display = ""

    currentLevelIndex    = 0
    currentQuestionIndex = 0
    money = 0; lives = 3
    preguntasJugadas = []
    usosComodines = { fiftyFifty:1, cambiarPregunta:1, tiempoExtra:1, dobleOportunidad:1 }
    extraAnswersActive  = false
    modoPruebaComodines = false

    refreshComodinCounts()
    updateStats()
    updateLevelLabel()
    nextQuestion()
}

function nextQuestion(){
    const level = levelOrder[currentLevelIndex]
    const qList = questions[level]
    if(!qList){ gameOver(); return }

    if(currentQuestionIndex >= qList.length){
        clearInterval(interval)
        showLevelScreen()
        return
    }

    preguntasJugadas.push(currentQuestionIndex)
    currentQuestion = qList[currentQuestionIndex]
    currentQuestionIndex++
    showQuestion()
    startTimer()
}

function showQuestion(){
    document.getElementById("question").innerText = currentQuestion.q

    const answersDiv = document.getElementById("respuestas")
    answersDiv.innerHTML = ""
    const letters = ["A","B","C","D","E","F"]
    let answers = [...currentQuestion.a]
    if(extraAnswersActive){ answers.push("Señal no identificada"); answers.push("Dato corrupto") }

    answers.forEach((a, i) => {
        const btn = document.createElement("button")
        btn.innerText = a
        btn.setAttribute("data-letter", letters[i] || "?")
        btn.onclick = () => answer(i)
        answersDiv.appendChild(btn)
    })
}

function answer(index){
    const buttons = document.querySelectorAll("#respuestas button")
    clearInterval(interval)

    if(index === currentQuestion.correct){
        buttons[index].classList.add("correct")
        let reward = currentQuestion.reward
        if(doublePointsActive) reward *= 2
        money += reward
        setTimeout(() => {
            showToast("✓ CORRECTO — +" + reward + " €", "success")
            updateStats(); resetBoosters(); nextQuestion()
        }, 900)
    } else {
        buttons[index].classList.add("incorrect")
        buttons[currentQuestion.correct].classList.add("correct")
        setTimeout(() => {
            if(shieldActive){
                showToast("🛡 ESCUDO ACTIVADO — Daño bloqueado", "shield")
                shieldActive = false
                document.getElementById("escudoIcono").style.visibility = "hidden"
            } else {
                lives--
            }
            updateStats()
            if(lives <= 0){ clearInterval(interval); setTimeout(gameOver, 400); return }
            resetBoosters(); nextQuestion()
        }, 900)
    }
}

function startTimer(){
    clearInterval(interval)
    timer = 30
    document.getElementById("timer").innerText = timer
    interval = setInterval(() => {
        timer--
        document.getElementById("timer").innerText = timer
        if(timer <= 0){
            clearInterval(interval)
            lives--; updateStats()
            if(lives <= 0){ setTimeout(gameOver, 400); return }
            resetBoosters(); nextQuestion()
        }
    }, 1000)
}

/* ═══════════════ LEVEL SCREEN ═════════════════════ */
function showLevelScreen(){
    hideAll()
    const screen = document.getElementById("levelScreen")
    screen.style.display = "flex"

    const completedLvl = levelOrder[currentLevelIndex]
    document.getElementById("levelCompletedName").innerText = levelNames[completedLvl] || completedLvl
    document.getElementById("levelCompletedName").style.color = levelColors[completedLvl] || "var(--cyan)"
    document.getElementById("levelMoney").innerText = money + " €"

    // Progress bar
    const total = questions[completedLvl]?.length || 1
    const pct = Math.round((currentQuestionIndex / total) * 100)
    document.getElementById("levelProgressBar").style.width = Math.min(pct,100) + "%"

    // Next level badge
    const nextIdx = currentLevelIndex + 1
    if(nextIdx < levelOrder.length){
        const nextLvl = levelOrder[nextIdx]
        document.getElementById("nextLevelName").innerText = levelNames[nextLvl]
        document.getElementById("nextLevelName").style.color = levelColors[nextLvl] || "var(--cyan)"
        document.getElementById("btnContinueLevel").style.display = ""
    } else {
        document.getElementById("nextLevelName").innerText = "VICTORIA"
        document.getElementById("nextLevelName").style.color = "#f5e642"
    }

    buildBuyPanel()
    drawRuleta(spinAngle)
    if(ruletaActiva){ setTimeout(spinRuleta, 600) }
}

function buildBuyPanel(){
    const coste = comodinCostes[currentLevelIndex] || 100
    document.getElementById("comodinCostLabel").innerText = coste + " €"
    const div = document.getElementById("comprarComodines")
    div.innerHTML = ""

    const lista = [
        { key:"fiftyFifty",       label:"◈ 50:50" },
        { key:"cambiarPregunta",  label:"↺ Cambiar Pregunta" },
        { key:"tiempoExtra",      label:"⊕ Tiempo Extra" },
        { key:"dobleOportunidad", label:"⬡ Escudo" }
    ]
    lista.forEach(c => {
        const btn = document.createElement("button")
        btn.className = "buy-lifeline-btn"
        btn.innerHTML = `
            <span class="buy-label">${c.label}</span>
            <span class="buy-cost">${coste} €</span>
            <span class="buy-stock">×${usosComodines[c.key]}</span>`
        btn.onclick = () => comprarUsoExtra(c.key, coste)
        div.appendChild(btn)
    })
}

function comprarUsoExtra(comodin, coste){
    if(coste === undefined) coste = comodinCostes[currentLevelIndex] || 100
    if(money < coste){ showToast("⚠ CAPITAL INSUFICIENTE", "error"); return }
    money -= coste
    usosComodines[comodin]++
    updateStats(); refreshComodinCounts()
    showToast("✓ " + comodin + " recargado", "success")
    buildBuyPanel()
}

function continueGame(){
    hideAll()
    document.querySelector(".juego").style.display         = ""
    document.querySelector(".lifelines").style.display     = ""
    document.querySelector(".potenciadores").style.display = ""

    currentLevelIndex++
    currentQuestionIndex = 0
    preguntasJugadas = []
    usosComodines = { fiftyFifty:1, cambiarPregunta:1, tiempoExtra:1, dobleOportunidad:1 }
    modoPruebaComodines = false
    refreshComodinCounts()

    if(currentLevelIndex >= levelOrder.length){ showVictoryScreen(); return }
    updateLevelLabel(); nextQuestion()
}

/* ═══════════════ PLANTAR ══════════════════════════ */
function plantar(){
    clearInterval(interval)
    hideAll()
    document.getElementById("plantarMoney").innerText = money + " €"
    document.getElementById("plantarScreen").style.display = "flex"
}

/* ═══════════════ GAME OVER ════════════════════════ */
function gameOver(){
    clearInterval(interval)
    hideAll()
    document.getElementById("gameOverMoney").innerText = money + " €"
    document.getElementById("gameOverScreen").style.display = "flex"
}

function retryGame(){ location.reload() }

/* ═══════════════ VICTORY ══════════════════════════ */
function showVictoryScreen(){
    hideAll()
    document.getElementById("victoryMoney").innerText = money + " €"
    document.getElementById("victoryScreen").style.display = "flex"
}

/* ═══════════════ COMODINES ════════════════════════ */
function extraTime(){ timer += 15 }
function escudo(){
    shieldActive = true
    document.getElementById("escudoIcono").style.visibility = "visible"
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
        showToast("⚠ Sin usos disponibles para este comodín", "error")
    }
}

function comodinesInfinitos(){

    let coste = 300  // precio del potenciador

    if(money < coste){
        showToast("⚠ CAPITAL INSUFICIENTE", "error")
        return
    }

    money -= coste
    modoPruebaComodines = true

    document.getElementById("countFiftyFifty").innerText      = "∞"
    document.getElementById("countTiempoExtra").innerText      = "∞"
    document.getElementById("countDobleOportunidad").innerText = "∞"

    updateStats()

    showToast("♾️ Comodines infinitos activados", "success")
}

function tiempoExtra(){
    if(usosComodines.tiempoExtra > 0 || modoPruebaComodines){

        if(!modoPruebaComodines){
            usosComodines.tiempoExtra--
            document.getElementById("countTiempoExtra").innerText = usosComodines.tiempoExtra
        }

        extraTime()

    } else {
        showToast("⚠ Sin usos disponibles para este comodín", "error")
    }
}

function dobleOportunidad(){
    if(usosComodines.dobleOportunidad > 0 || modoPruebaComodines){

        if(!modoPruebaComodines){
            usosComodines.dobleOportunidad--
            document.getElementById("countDobleOportunidad").innerText = usosComodines.dobleOportunidad
        }

        escudo()

    } else {
        showToast("⚠ Sin usos disponibles para este comodín", "error")
    }
}

function respuestasExtra()  { extraAnswersActive  = true; showToast("◉ Respuestas extra activadas", "info") }
function doblePuntos()     { doublePointsActive = true; showToast("✦ Doble puntos activados",    "info") }

/* ═══════════════ POTENCIADORES ════════════════════════ */

function girarRuleta()     { ruletaActiva = true;       showToast("⟳ Modo ruleta — úsalo en fin de tramo", "info") }

function resetBoosters(){
    doublePointsActive  = false
    ruletaActiva        = false
    modoPruebaComodines = false
    extraAnswersActive  = false
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
            showToast("⚠ No hay más preguntas en este tramo", "error")
            return
        }

        let elegida = disponibles[Math.floor(Math.random() * disponibles.length)]
        preguntasJugadas.push(questions[levelOrder[currentLevelIndex]].indexOf(elegida))
        currentQuestion = elegida

        clearInterval(interval)
        showQuestion()
        startTimer()

    } else {
        showToast("⚠ Sin usos disponibles para este comodín", "error")
    }
}

/* ═══════════════ RULETA CANVAS ════════════════════ */
const sectoresCanvas = [
    {texto:"+250€",  color:"#00b4d8"},
    {texto:"-250€",  color:"#c1121f"},
    {texto:"+1 vida",color:"#2dc653"},
    {texto:"-1 vida",color:"#c1121f"},
    {texto:"+500€",  color:"#f5e642"},
    {texto:"-500€",  color:"#c1121f"},
    {texto:"+20s",   color:"#b86bff"},
    {texto:"-10s",   color:"#e07800"}
]
let spinAngle = 0, spinning = false

function drawRuleta(angle){
    const canvas = document.getElementById("ruleta")
    if(!canvas) return
    const ctx = canvas.getContext("2d")
    const cx = canvas.width/2, cy = canvas.height/2, r = cx - 8
    const slice = (2*Math.PI)/sectoresCanvas.length
    ctx.clearRect(0,0,canvas.width,canvas.height)

    ctx.save()
    ctx.beginPath(); ctx.arc(cx,cy,r+5,0,2*Math.PI)
    ctx.strokeStyle="rgba(0,245,255,0.6)"; ctx.lineWidth=2
    ctx.shadowColor="#00f5ff"; ctx.shadowBlur=20
    ctx.stroke(); ctx.restore()

    sectoresCanvas.forEach((s,i) => {
        const start=angle+i*slice, end=start+slice
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,start,end)
        ctx.fillStyle=s.color; ctx.fill()
        ctx.strokeStyle="rgba(0,0,0,0.5)"; ctx.lineWidth=1.5; ctx.stroke()
        ctx.save(); ctx.translate(cx,cy); ctx.rotate(start+slice/2)
        ctx.textAlign="right"; ctx.fillStyle="#fff"
        ctx.font="bold 11px 'Orbitron',monospace"
        ctx.shadowColor="rgba(0,0,0,0.9)"; ctx.shadowBlur=4
        ctx.fillText(s.texto, r-10, 4); ctx.restore()
    })

    // Hub
    ctx.beginPath(); ctx.arc(cx,cy,16,0,2*Math.PI)
    const g=ctx.createRadialGradient(cx,cy,2,cx,cy,16)
    g.addColorStop(0,"#00f5ff"); g.addColorStop(1,"#003344")
    ctx.fillStyle=g; ctx.fill()
    ctx.strokeStyle="#00f5ff"; ctx.lineWidth=2; ctx.shadowColor="#00f5ff"; ctx.shadowBlur=10; ctx.stroke()

    // Pointer
    ctx.beginPath()
    ctx.moveTo(cx-8, cy-r-10)
    ctx.lineTo(cx+8, cy-r-10)
    ctx.lineTo(cx,   cy-r+4)
    ctx.closePath()
    ctx.fillStyle="#ff2a6d"; ctx.shadowColor="#ff2a6d"; ctx.shadowBlur=10; ctx.fill()
}

function spinRuleta(){
    if(spinning) return
    spinning = true
    document.getElementById("ruletaResultado").textContent = "⟳ Girando..."
    const totalSpin=Math.PI*2*(5+Math.random()*4), duration=3200
    const startTime=performance.now(), startAngle=spinAngle

    function frame(now){
        const elapsed=now-startTime, t=Math.min(elapsed/duration,1)
        const ease=1-Math.pow(1-t,4)
        spinAngle=startAngle+totalSpin*ease; drawRuleta(spinAngle)
        if(t<1){ requestAnimationFrame(frame); return }

        const slice=(2*Math.PI)/sectoresCanvas.length
        const norm=(((-spinAngle-Math.PI/2)%(2*Math.PI))+2*Math.PI)%(2*Math.PI)
        const idx=Math.floor(norm/slice)%sectoresCanvas.length
        const res=sectoresCanvas[idx]
        document.getElementById("ruletaResultado").textContent="▶ "+res.texto
        spinning=false

        const txt=res.texto
        if(txt.includes("€")){
            const val=parseInt(txt.replace(/[^0-9]/g,""))*(txt.startsWith("+") ? 1:-1)
            money+=val; updateStats()
        } else if(txt.includes("vida")){
            lives=Math.max(0,lives+(txt.startsWith("+") ? 1:-1)); updateStats()
        } else if(txt.includes("s")){
            const val=parseInt(txt.replace(/[^0-9]/g,""))*(txt.startsWith("+") ? 1:-1)
            timer+=val
        }
        showToast("🎲 Ruleta: "+txt, txt.startsWith("-") ? "error":"success")
    }
    requestAnimationFrame(frame)
}

window.addEventListener("load", ()=>{
    drawRuleta(0)

    /* ── Boot typewriter ────────────────────────── */
    const msgs = [
        "// SISTEMA DE EVALUACIÓN DE RIESGO v7.3.1",
        "// CONEXIÓN SEGURA ESTABLECIDA...",
        "// CARGANDO BASE DE DATOS DE PREGUNTAS...",
        "// PROTOCOLO DE INVERSIÓN ACTIVO"
    ]
    let mi=0, ci=0
    const bootEl=document.getElementById("bootText")
    function typeNext(){
        if(ci<msgs[mi].length){ bootEl.textContent=msgs[mi].slice(0,++ci); setTimeout(typeNext,45) }
        else{ setTimeout(()=>{ mi=(mi+1)%msgs.length; ci=0; typeNext() },2600) }
    }
    typeNext()

    /* ── A/B/C/D labels via MutationObserver ─────── */
    const labels=["A","B","C","D","E","F"]
    new MutationObserver(()=>{
        document.querySelectorAll("#respuestas button").forEach((b,i)=>b.setAttribute("data-letter",labels[i]||"?"))
    }).observe(document.getElementById("respuestas"),{childList:true})

    /* ── Timer warning ────────────────────────────── */
    const timerEl=document.getElementById("timer")
    const statsEl=document.querySelector(".stats")
    new MutationObserver(()=>{
        parseInt(timerEl.textContent)<=8
            ? statsEl.classList.add("timer-warning")
            : statsEl.classList.remove("timer-warning")
    }).observe(timerEl,{childList:true,characterData:true,subtree:true})
})