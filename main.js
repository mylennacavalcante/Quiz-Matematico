// main.js

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Carrega JSON de perguntas
async function loadQuestions(difficulty) {
    const response = await fetch("questions.json"); // nome do seu arquivo
    const data = await response.json();
    questions = data.difficulty[difficulty].questions;
    startQuiz();
}

// Página de seleção de dificuldade
document.addEventListener("DOMContentLoaded", () => {
    const btnFacil = document.getElementById("btnFacil");
    const btnMedio = document.getElementById("btnMedio");
    const btnDificil = document.getElementById("btnDificil");

    if (btnFacil) {
        btnFacil.addEventListener("click", () => {
            localStorage.setItem("difficulty", "easy");
            window.location.href = "quiz.html";
        });
    }

    if (btnMedio) {
        btnMedio.addEventListener("click", () => {
            localStorage.setItem("difficulty", "intermediate");
            window.location.href = "quiz.html";
        });
    }

    if (btnDificil) {
        btnDificil.addEventListener("click", () => {
            localStorage.setItem("difficulty", "hard");
            window.location.href = "quiz.html";
        });
    }

    // Se estiver na página do quiz
    if (document.getElementById("quiz")) {
        const difficulty = localStorage.getItem("difficulty") || "easy";
        loadQuestions(difficulty);
    }
});

// ---------------- QUIZ ----------------
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const questionObj = questions[currentQuestionIndex];
    const questionEl = document.getElementById("question").querySelector("p");
    const optionsEls = document.querySelectorAll(".option");

    questionEl.textContent = questionObj.question;
    optionsEls.forEach((opt, i) => {
        opt.textContent = questionObj.options[i];
        opt.style.cursor = "pointer";
        opt.onclick = () => checkAnswer(i);
    });

    updateProgress();
}

function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correct;
    if (selectedIndex === correctIndex) {
        score++;
    }

    currentQuestionIndex++;
    showQuestion();
}

function updateProgress() {
    const progressBar = document.querySelector(".progress-bar");
    const scoreEl = document.querySelector(".pontuacao p");

    progressBar.style.width = `${((currentQuestionIndex) / questions.length) * 100}%`;
    scoreEl.textContent = `Pontuação ${score}/${questions.length}`;
}

function endQuiz() {
    const quizEl = document.getElementById("quiz");
    quizEl.innerHTML = `
        <h2>Quiz finalizado!</h2>
        <p>Sua pontuação: ${score} de ${questions.length}</p>
        <a href="dificuldade.html">Jogar novamente</a>
    `;
}
