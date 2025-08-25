        // Variáveis globais
        let currentDifficulty = '';
        let currentQuestions = [];
        let currentQuestionIndex = 0;
        let score = 0;
        let hasAnswered = false;

        // Inicializar animações da tela inicial
        function initializeApp() {
            anime({
                targets: 'h1',
                opacity: [0, 1],
                translateY: [-20, 0],
                duration: 800,
                easing: 'easeOutCubic'
            });

            anime({
                targets: '.difficulty-btn',
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(200, {start: 400}),
                duration: 600,
                easing: 'easeOutCubic'
            });
        }