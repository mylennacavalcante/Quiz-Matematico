// main.js - Script principal atualizado com integração de animações
import animationManager from './animations.js';

// Configurações globais
const CONFIG = {
    transitionDuration: 0.5,
    animationDelay: 100,
    questionsFile: 'questions.json' // Caminho para seu arquivo JSON
};

// Classe principal da aplicação
class QuizApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupGlobalListeners();
        this.handlePageSpecificLogic();
    }

    setupGlobalListeners() {
        // Listener para transições entre páginas
        document.addEventListener('DOMContentLoaded', () => {
            this.initializePage();
        });

        // Listener para navegação com teclas
        document.addEventListener('keydown', (e) => {
            this.handleKeyNavigation(e);
        });

        // Listener para redimensionamento
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    initializePage() {
        // Aplica fade-in inicial na página
        gsap.from('body', {
            duration: 0.8,
            opacity: 0,
            ease: "power2.out"
        });

        // Detecta e configura a página atual
        const currentPage = this.getCurrentPage();
        this.configurePageAnimations(currentPage);
    }

    getCurrentPage() {
        if (document.getElementById('pagina-inicial')) {
            return 'home';
        } else if (document.getElementById('pagina-dificuldade')) {
            return 'difficulty';
        } else if (document.getElementById('quiz')) {
            return 'quiz';
        }
        return 'unknown';
    }

    configurePageAnimations(page) {
        switch (page) {
            case 'home':
                this.setupHomePageAnimations();
                break;
            case 'difficulty':
                this.setupDifficultyPageAnimations();
                break;
            case 'quiz':
                this.setupQuizPageAnimations();
                break;
        }
    }

    setupHomePageAnimations() {
        // Animações específicas da página inicial
        const btnIniciar = document.getElementById('btnIniciar');
        
        if (btnIniciar) {
            btnIniciar.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateWithAnimation('dificuldade.html');
            });

            // Efeito de pulso no botão
            gsap.to('.link', {
                scale: 1.02,
                duration: 1.5,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1
            });
        }
    }

    setupDifficultyPageAnimations() {
        // Animações específicas da página de dificuldade
        const difficultyButtons = [
            { id: 'btnFacil', difficulty: 'easy', color: '#4a7c59' },
            { id: 'btnMedio', difficulty: 'intermediate', color: '#d5c84a' },
            { id: 'btnDificil', difficulty: 'hard', color: '#d54a4a' }
        ];

        difficultyButtons.forEach(({ id, difficulty, color }) => {
            const btn = document.getElementById(id);
            if (btn) {
                // Efeito hover personalizado
                btn.addEventListener('mouseenter', () => {
                    gsap.to(btn.parentElement, {
                        backgroundColor: color,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });

                btn.addEventListener('mouseleave', () => {
                    gsap.to(btn.parentElement, {
                        backgroundColor: '#bfc5bbb2',
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });

                // Navegação com animação
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.selectDifficultyAndNavigate(difficulty);
                });
            }
        });

        // Botão voltar
        const btnVoltar = document.getElementById('btnVoltarDificuldade');
        if (btnVoltar) {
            btnVoltar.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateWithAnimation('index.html');
            });
        }
    }

    setupQuizPageAnimations() {
        // As animações do quiz são gerenciadas pelo QuizManager
        // Aqui apenas configuramos alguns eventos globais
        this.setupQuizKeyboardNavigation();
    }

    selectDifficultyAndNavigate(difficulty) {
        // Salva a dificuldade selecionada
        sessionStorage.setItem('selectedDifficulty', difficulty);
        
        // Animação de seleção
        const selectedButton = document.getElementById(
            difficulty === 'easy' ? 'btnFacil' : 
            difficulty === 'intermediate' ? 'btnMedio' : 'btnDificil'
        );

        gsap.to(selectedButton.parentElement, {
            scale: 0.95,
            duration: 0.2,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                this.navigateWithAnimation(`quiz.html?difficulty=${difficulty}`);
            }
        });
    }

    navigateWithAnimation(url) {
        const tl = gsap.timeline();
        
        tl.to('body', {
            duration: CONFIG.transitionDuration,
            opacity: 0,
            scale: 0.98,
            ease: "power2.in",
            onComplete: () => {
                window.location.href = url;
            }
        });
    }

    selectOptionByIndex(index) {
        const option = document.getElementById(`option${index + 1}`);
        if (option && !option.classList.contains('disabled')) {
            option.click();
        }
    }

    triggerNextQuestion() {
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn && nextBtn.style.display !== 'none') {
            nextBtn.click();
        }
    }

    showQuitConfirmation() {
        if (confirm('Deseja sair do quiz? Seu progresso será perdido.')) {
            this.navigateWithAnimation('index.html');
        }
    }


    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    refreshWithAnimation() {
        gsap.to('body', {
            duration: 0.3,
            opacity: 0,
            onComplete: () => {
                location.reload();
            }
        });
    }

    handleResize() {
        // Ajusta animações baseado no tamanho da tela
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            // Ajustes para mobile
            gsap.set('.link', { width: '80%' });
        } else {
            // Ajustes para desktop
            gsap.set('.link', { width: '30%' });
        }
    }

    // Método para carregar questões de arquivo externo (se necessário)
    async loadQuestionsFromFile() {
        try {
            const response = await fetch(CONFIG.questionsFile);
            if (!response.ok) {
                throw new Error('Arquivo de questões não encontrado');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar questões:', error);
            return null;
        }
    }

    // Método para debug (remove em produção)
    enableDebugMode() {
        if (window.location.href.includes('debug=true')) {
            // Mostra informações de debug
            const debugInfo = document.createElement('div');
            debugInfo.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 10px;
                border-radius: 5px;
                font-size: 12px;
                z-index: 9999;
            `;
            debugInfo.innerHTML = `
                <strong>Debug Info:</strong><br>
                Página: ${this.getCurrentPage()}<br>
                Resolução: ${window.innerWidth}x${window.innerHeight}<br>
                User Agent: ${navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}
            `;
            document.body.appendChild(debugInfo);
        }
    }
}

// Inicializa a aplicação
const app = new QuizApp();

// Exporta para uso global se necessário
window.QuizApp = app;