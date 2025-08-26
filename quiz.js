// quiz.js - Lógica principal do quiz com animações integradas
import animationManager from './animations.js';

class QuizManager {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedDifficulty = '';
        this.hasAnswered = false;
        this.init();
    }

    async init() {
        try {
            // Carrega as questões do JSON
            await this.loadQuestions();
            this.setupEventListeners();
            this.getDifficultyFromURL();
            
            if (this.selectedDifficulty) {
                await this.startQuiz(this.selectedDifficulty);
            }
        } catch (error) {
            console.error('Erro ao inicializar quiz:', error);
            this.showError('Erro ao carregar o quiz. Tente novamente.');
        }
    }

async loadQuestions() {
    try {
        // Aqui você coloca o caminho real do seu arquivo JSON
        const response = await fetch('./questions.json');  
        
        if (!response.ok) {
            throw new Error('Erro ao buscar o arquivo JSON');
        }

        const questionsData = await response.json(); // Converte o JSON em objeto JS
        this.allQuestions = questionsData; // Salva no atributo da classe

    } catch (error) {
        throw new Error('Falha ao carregar questões: ' + error.message);
    }
}


    getDifficultyFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        this.selectedDifficulty = urlParams.get('difficulty') || 
                                 sessionStorage.getItem('selectedDifficulty');
    }

    setupEventListeners() {
        // Event listeners para página de dificuldade
        const btnFacil = document.getElementById('btnFacil');
        const btnMedio = document.getElementById('btnMedio');
        const btnDificil = document.getElementById('btnDificil');

        if (btnFacil) {
            btnFacil.addEventListener('click', (e) => {
                e.preventDefault();
                this.selectDifficulty('easy');
            });
        }

        if (btnMedio) {
            btnMedio.addEventListener('click', (e) => {
                e.preventDefault();
                this.selectDifficulty('intermediate');
            });
        }

        if (btnDificil) {
            btnDificil.addEventListener('click', (e) => {
                e.preventDefault();
                this.selectDifficulty('hard');
            });
        }

        // Event listeners para página do quiz
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }

        // Event listeners para modal de resultado
        const btnRestart = document.getElementById('btnRestart');
        const btnHome = document.getElementById('btnHome');

        if (btnRestart) {
            btnRestart.addEventListener('click', () => this.restartQuiz());
        }

        if (btnHome) {
            btnHome.addEventListener('click', () => {
                animationManager.pageTransition('index.html');
            });
        }

        // Event listeners para opções
        this.setupOptionListeners();
    }

    setupOptionListeners() {
        document.querySelectorAll('.option').forEach((option, index) => {
            option.addEventListener('click', () => {
                if (!this.hasAnswered) {
                    this.selectAnswer(index, option);
                }
            });
        });
    }

    selectDifficulty(difficulty) {
        this.selectedDifficulty = difficulty;
        sessionStorage.setItem('selectedDifficulty', difficulty);
        
        // Animação de transição para página do quiz
        animationManager.pageTransition('quiz.html?difficulty=' + difficulty);
    }

    async startQuiz(difficulty) {
        try {
            this.questions = this.allQuestions.difficulty[difficulty].questions;
            this.currentQuestionIndex = 0;
            this.score = 0;
            this.hasAnswered = false;

            // Pequeno delay para garantir que as animações da página carregaram
            setTimeout(() => {
                this.displayQuestion();
            }, 500);

        } catch (error) {
            console.error('Erro ao iniciar quiz:', error);
            this.showError('Erro ao iniciar o quiz');
        }
    }

    async displayQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.finishQuiz();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        this.hasAnswered = false;

        // Reset das opções
        animationManager.enableOptions();
        
        // Oculta o botão próximo
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.style.display = 'none';
        }

        // Anima a pergunta
        await animationManager.animateQuestion(question.question);

        // Anima as opções
        await animationManager.animateOptions(question.options);

        // Atualiza progresso
        this.updateProgress();

        // Atualiza pontuação
        this.updateScore();
    }

    selectAnswer(answerIndex, optionElement) {
        if (this.hasAnswered) return;
        
        this.hasAnswered = true;
        const question = this.questions[this.currentQuestionIndex];
        const correctIndex = question.correct;
        
        // Desabilita todas as opções
        animationManager.disableOptions();

        if (answerIndex === correctIndex) {
            // Resposta correta
            this.score++;
            animationManager.animateCorrectAnswer(optionElement);
        } else {
            // Resposta incorreta
            const correctOption = document.getElementById(`option${correctIndex + 1}`);
            animationManager.animateIncorrectAnswer(optionElement, correctOption);
        }

        // Mostra o botão próximo após um delay
        setTimeout(() => {
            animationManager.animateNextButton();
        }, 1500);
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        
        // Anima a saída da pergunta atual
        gsap.to([".question", ".option-wrapper"], {
            duration: 0.4,
            x: -100,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.in",
            onComplete: () => {
                this.displayQuestion();
            }
        });
    }

    updateProgress() {
        const percentage = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        animationManager.animateProgressBar(percentage);
    }

    updateScore() {
        animationManager.animateScore(this.score, this.currentQuestionIndex);
    }

    finishQuiz() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        // Animação de celebração se teve boa pontuação
        if (percentage >= 70) {
            animationManager.celebrationAnimation();
        }

        // Mostra o modal de resultado após um pequeno delay
        setTimeout(() => {
            animationManager.animateResultModal(this.score, this.questions.length, percentage);
        }, 1000);

        // Atualiza progresso para 100%
        animationManager.animateProgressBar(100);
    }

    restartQuiz() {
        // Oculta o modal
        const modal = document.getElementById('resultModal');
        gsap.to(modal, {
            duration: 0.3,
            opacity: 0,
            onComplete: () => {
                modal.style.display = 'none';
                modal.classList.remove('show');
            }
        });

        // Reinicia o quiz
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.hasAnswered = false;

        // Pequeno delay antes de mostrar a primeira pergunta
        setTimeout(() => {
            this.displayQuestion();
        }, 500);
    }

    showError(message) {
        // Cria um modal de erro simples
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(124, 74, 74, 0.95);
            color: white;
            padding: 2rem;
            border-radius: 1rem;
            text-align: center;
            z-index: 9999;
            font-size: 1.5rem;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);

        // Remove após 3 segundos
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
}

// Inicializa o quiz quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new QuizManager();
});