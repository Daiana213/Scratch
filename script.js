const questions = [
    {
        question: "¿Qué es un 'Sprite' u 'Objeto' en Scratch?",
        options: [
            "Un bloque de código.",
            "El escenario donde ocurre el juego.",
            "Un personaje o elemento gráfico que puedes programar.",
            "Una variable que guarda el puntaje."
        ],
        correctAnswer: 2,
        explanation: "Los Sprites son los personajes y objetos a los que les damos instrucciones para que se muevan y actúen en el escenario."
    },
    {
        question: "¿De qué color son los bloques de 'Movimiento'?",
        options: [
            "Amarillos",
            "Azules",
            "Naranjas",
            "Verdes"
        ],
        correctAnswer: 1,
        explanation: "Los bloques azules controlan el movimiento de los objetos, como avanzar, girar o ir a una posición específica."
    },
    {
        question: "¿Qué bloque necesitas para que una acción se repita para siempre?",
        options: [
            "Repetir 10",
            "Por siempre",
            "Esperar 1 segundo",
            "Si... entonces"
        ],
        correctAnswer: 1,
        explanation: "El bloque 'por siempre' es un bucle infinito que repite las instrucciones en su interior sin parar hasta que se detiene el programa."
    },
    {
        question: "¿Para qué sirven las 'Variables' en Scratch?",
        options: [
            "Para cambiar el disfraz de un personaje.",
            "Para guardar información, como el puntaje o las vidas.",
            "Para agregar nuevos sonidos al proyecto.",
            "Para compartir el juego con otros."
        ],
        correctAnswer: 1,
        explanation: "Las variables son como cajas donde podemos guardar datos que cambian durante el juego (puntaje, tiempo, nombres, etc.)."
    },
    {
        question: "¿Qué categoría de bloques usamos para preguntarle algo al usuario?",
        options: [
            "Sensores",
            "Apariencia",
            "Eventos",
            "Control"
        ],
        correctAnswer: 0,
        explanation: "El bloque 'preguntar y esperar' se encuentra en la categoría Sensores (color celeste) y guarda la respuesta en el bloque 'respuesta'."
    },
    {
        question: "Si quieres que algo suceda cuando presionas la bandera verde, ¿qué bloque usas al principio?",
        options: [
            "Al presionar tecla espacio",
            "Al hacer clic en este objeto",
            "Al presionar bandera verde",
            "Esperar hasta que"
        ],
        correctAnswer: 2,
        explanation: "El bloque 'Al presionar bandera verde' (categoría Eventos) es el evento principal que da inicio a casi todos los proyectos de Scratch."
    },
    {
        question: "¿Qué es un 'Condicional' (el bloque 'Si... entonces')?",
        options: [
            "Un bloque que dibuja líneas en el escenario.",
            "Una instrucción que solo se ejecuta si se cumple una condición.",
            "Un mensaje que detiene todo el programa.",
            "Un bloque que clona un objeto automáticamente."
        ],
        correctAnswer: 1,
        explanation: "Los condicionales ayudan a que el programa tome decisiones. Por ejemplo: SI tocando el borde, ENTONCES rebotar."
    },
    {
        question: "¿Qué eje controla el movimiento horizontal (izquierda a derecha)?",
        options: [
            "Eje Y",
            "Eje Z",
            "Eje X",
            "Eje W"
        ],
        correctAnswer: 2,
        explanation: "El eje X va de izquierda a derecha (horizontal) y el eje Y va de arriba hacia abajo (vertical)."
    },
    {
        question: "¿Cómo puedes hacer que un objeto parezca que está caminando?",
        options: [
            "Cambiando su tamaño rápidamente.",
            "Cambiando al siguiente disfraz constantemente.",
            "Escondiéndolo y mostrándolo.",
            "Cambiando el fondo del escenario."
        ],
        correctAnswer: 1,
        explanation: "Al alternar entre varios disfraces rápidamente usando el bloque 'siguiente disfraz', creamos la ilusión de movimiento o animación."
    },
    {
        question: "¿Qué hace el bloque 'Enviar mensaje'?",
        options: [
            "Muestra un texto de diálogo en la pantalla.",
            "Envía un correo electrónico al creador.",
            "Permite que un objeto se comunique con otros objetos de forma invisible.",
            "Termina el juego instantáneamente."
        ],
        correctAnswer: 2,
        explanation: "Los mensajes son eventos internos que sirven para coordinar acciones entre distintos objetos. Por ejemplo, al ganar el juego enviar el mensaje 'mostrar pantalla de victoria'."
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Elementos del DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionSpan = document.getElementById('current-question');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackText = document.getElementById('feedback-text');
const scoreSpan = document.getElementById('score');
const endMessage = document.getElementById('end-message');
const progressBarFill = document.getElementById('progress-bar-fill');
const progressCat = document.getElementById('progress-cat');

// Event Listeners
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', resetGame);

function startGame() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function updateProgress() {
    const progressPercentage = (currentQuestionIndex / questions.length) * 100;
    progressBarFill.style.width = `${progressPercentage}%`;
    progressCat.style.left = `${progressPercentage}%`;
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    questionText.textContent = question.question;
    
    updateProgress();
    
    optionsContainer.innerHTML = '';
    feedbackContainer.classList.add('hidden');
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedIndex, selectedButton) {
    const question = questions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    
    // Deshabilitar botones
    buttons.forEach(btn => btn.disabled = true);
    
    // Mostrar si es correcta o incorrecta
    if (selectedIndex === question.correctAnswer) {
        selectedButton.classList.add('correct');
        score++;
        feedbackText.innerHTML = `<strong>¡Correcto!</strong> ${question.explanation}`;
    } else {
        selectedButton.classList.add('wrong');
        buttons[question.correctAnswer].classList.add('correct');
        feedbackText.innerHTML = `<strong>Incorrecto.</strong> ${question.explanation}`;
    }
    
    feedbackContainer.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showEndScreen();
    }
}

function showEndScreen() {
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    scoreSpan.textContent = score;
    
    if (score === 10) {
        endMessage.textContent = "¡Excelente! Eres un experto en Scratch. 🏆";
    } else if (score >= 7) {
        endMessage.textContent = "¡Muy bien! Conoces muy bien cómo programar en Scratch. 🌟";
    } else if (score >= 4) {
        endMessage.textContent = "Buen trabajo. Sigue practicando y creando proyectos para mejorar. 👍";
    } else {
        endMessage.textContent = "¡A seguir practicando! Vuelve a intentar para aprender más sobre Scratch. 💻";
    }
}

function resetGame() {
    endScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}
