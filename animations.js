// animations.js - Sistema completo de animações

// Classe principal para gerenciar todas as animações
class AnimationManager {
    constructor() {
        this.timeline = gsap.timeline();
        this.init();
    }

    init() {
        // Detecta qual página estamos e executa animações apropriadas
        if (document.getElementById('pagina-inicial')) {
            this.animateHomePage();
        } else if (document.getElementById('pagina-dificuldade')) {
            this.animateDifficultyPage();
        } else if (document.getElementById('quiz')) {
            this.animateQuizPage();
        }

        this.setupPageTransitions();
    }

    // Animações da página inicial
    animateHomePage() {
        const tl = gsap.timeline();
        
        tl.from("h1", {
            duration: 3,
            y: -100,
            opacity: 0,
            ease: "bounce.out"
        })
        .from(".link", {
            duration: 1,
            y: 50,
            opacity: 0,
            scale: 0.8,
            ease: "back.out(1.7)",
            delay: 0.3
        })
        .to(".link", {
            duration: 0.5,
            y: 0,
            ease: "power2.out"
        });

        // Adiciona efeito de flutuação
        gsap.to(".link", {
            y: -10,
            duration: 5,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });
    }

    // Animações da página de dificuldade
    animateDifficultyPage() {
        const tl = gsap.timeline();
        
        tl.from("h2", {
            duration: 2,
            y: -80,
            opacity: 0,
            ease: "power3.out"
        })
        .from(".link .level", {
            duration: 0.8,
            y: 60,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.4)"
        });

        // Efeito de hover aprimorado
        document.querySelectorAll('.link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    // Animações da página do quiz
    animateQuizPage() {
        const tl = gsap.timeline();
        
        tl.from(".quiz-container .container", {
            duration: 1,
            scale: 0.8,
            opacity: 0,
            ease: "back.out(1.2)"
        })
        .from(".progress", {
            duration: 0.6,
            scaleX: 0,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.5")
        .from(".pontuacao", {
            duration: 0.5,
            y: -30,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.3");
    }

    // Animações específicas do quiz
    animateQuestion(questionText) {
        const tl = gsap.timeline();
        
        tl.to("#question", {
            duration: 0.3,
            x: -50,
            opacity: 0,
            ease: "power2.in"
        })
        .call(() => {
            document.getElementById('questionText').textContent = questionText;
        })
        .to("#question", {
            duration: 0.8,
            x: 0,
            opacity: 1,
            ease: "back.out(1.4)"
        });

        return tl;
    }

    animateOptions(options) {
        // Limpa animações anteriores das opções
        gsap.set([".option-wrapper"], {
            x: 100,
            opacity: 0
        });

        // Popula as opções
        options.forEach((option, index) => {
            document.getElementById(`option${index + 1}`).textContent = option;
        });

        // Anima entrada das opções
        const tl = gsap.timeline();
        tl.to(".option-wrapper", {
            duration: 0.6,
            x: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "back.out(1.2)"
        });

        return tl;
    }

    animateCorrectAnswer(optionElement) {
        const tl = gsap.timeline();
        
        tl.to(optionElement, {
            duration: 0.1,
            scale: 1.1,
            ease: "power2.out"
        })
        .to(optionElement, {
            duration: 0.5,
            backgroundColor: "#4a7c59",
            scale: 1.05,
            boxShadow: "0 0 30px rgba(74, 124, 89, 0.8)",
            ease: "power2.out"
        })
        .to(optionElement, {
            duration: 0.3,
            scale: 1,
            ease: "elastic.out(1, 0.5)"
        });

        // Adiciona classe para manter o estado
        optionElement.classList.add('correct');
        
        return tl;
    }

    animateIncorrectAnswer(optionElement, correctElement) {
        const tl = gsap.timeline();
        
        // Animação da resposta incorreta
        tl.to(optionElement, {
            duration: 0.15,
            x: -10,
            ease: "power2.out"
        })
        .to(optionElement, {
            duration: 0.15,
            x: 10,
            ease: "power2.out"
        })
        .to(optionElement, {
            duration: 0.15,
            x: -5,
            ease: "power2.out"
        })
        .to(optionElement, {
            duration: 0.15,
            x: 0,
            backgroundColor: "#7c4a4a",
            boxShadow: "0 0 20px rgba(124, 74, 74, 0.6)",
            ease: "power2.out"
        });

        // Adiciona classes
        optionElement.classList.add('incorrect');
        
        // Anima a resposta correta após um delay
        setTimeout(() => {
            this.animateCorrectAnswer(correctElement);
        }, 600);

        return tl;
    }

    animateProgressBar(percentage) {
        gsap.to(".progress-bar", {
            width: `${percentage}%`,
            duration: 0.8,
            ease: "power2.out"
        });
    }

    animateScore(score, total) {
        const scoreElement = document.getElementById('scoreDisplay');
        if (scoreElement) {
            gsap.to(scoreElement, {
                duration: 0.3,
                scale: 1.1,
                ease: "power2.out",
                onComplete: () => {
                    scoreElement.textContent = `Pontuação ${score}/${total}`;
                    gsap.to(scoreElement, {
                        duration: 0.3,
                        scale: 1,
                        ease: "power2.out"
                    });
                }
            });
        }
    }

    animateNextButton() {
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            gsap.set(nextBtn, { display: 'block' });
            gsap.from(nextBtn, {
                duration: 0.6,
                y: 30,
                opacity: 0,
                scale: 0.8,
                ease: "back.out(1.4)"
            });
        }
    }

    animateResultModal(score, total, percentage) {
        const modal = document.getElementById('resultModal');
        const scoreDisplay = document.getElementById('finalScore');
        const messageElement = document.getElementById('resultMessage');
        
        // Determina a mensagem baseada na pontuação
        let message = '';
        let emoji = '';
        
        if (percentage >= 90) {
            message = 'Perfeito! Você é um gênio da matemática!';
            emoji = '🏆';
        } else if (percentage >= 70) {
            message = 'Muito bem! Excelente desempenho!';
            emoji = '🎉';
        } else if (percentage >= 50) {
            message = 'Bom trabalho! Continue praticando!';
            emoji = '👍';
        } else {
            message = 'Não desista! A prática leva à perfeição!';
            emoji = '💪';
        }

        // Atualiza conteúdo
        scoreDisplay.textContent = `${percentage}%`;
        messageElement.textContent = `${emoji} ${message}`;
        
        // Anima modal
        modal.style.display = 'flex';
        const tl = gsap.timeline();
        
        tl.to(modal, {
            duration: 0.3,
            opacity: 1,
            ease: "power2.out"
        })
        .from(".result-content", {
            duration: 0.6,
            scale: 0.7,
            y: 50,
            ease: "back.out(1.4)"
        })
        .from(".final-score", {
            duration: 0.8,
            scale: 0,
            ease: "elastic.out(1, 0.3)"
        })
        .from(".result-message", {
            duration: 0.5,
            opacity: 0,
            y: 20,
            ease: "power2.out"
        })
        .from(".result-buttons button", {
            duration: 0.4,
            opacity: 0,
            y: 20,
            stagger: 0.1,
            ease: "power2.out"
        });

        modal.classList.add('show');
    }

    // Configurar transições entre páginas
    setupPageTransitions() {
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.href && !link.href.includes('#')) {
                    e.preventDefault();
                    this.pageTransition(link.href);
                }
            });
        });
    }

    pageTransition(url) {
        const tl = gsap.timeline();
        
        tl.to("body", {
            duration: 0.5,
            opacity: 0,
            scale: 0.95,
            ease: "power2.in",
            onComplete: () => {
                window.location.href = url;
            }
        });
    }

    // Métodos utilitários
    disableOptions() {
        document.querySelectorAll('.option').forEach(option => {
            option.classList.add('disabled');
        });
    }

    enableOptions() {
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('disabled', 'correct', 'incorrect');
            gsap.set(option, {
                backgroundColor: "",
                boxShadow: "",
                x: 0,
                scale: 1
            });
        });
    }

    celebrationAnimation() {
        // Animação de celebração para quando termina o quiz
        const colors = ['#4a7c59', '#b6d4a3', '#efefef'];
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1001;
            `;
            document.body.appendChild(particle);

            gsap.to(particle, {
                duration: 1.5,
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
                opacity: 0,
                scale: 0,
                ease: "power2.out",
                onComplete: () => {
                    particle.remove();
                }
            });
        }
    }

    // Animação de loading
    showLoadingAnimation(element) {
        const tl = gsap.timeline();
        tl.to(element, {
            duration: 0.5,
            opacity: 0.5,
            scale: 0.98,
            ease: "power2.out"
        })
        .to(element, {
            duration: 0.5,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            yoyo: true,
            repeat: -1
        });
        return tl;
    }

    // Reset de todas as animações
    resetAnimations() {
        gsap.killTweensOf("*");
        gsap.set("*", { clearProps: "all" });
    }
}

// Instância global do gerenciador de animações
const animationManager = new AnimationManager();

// Exporta para uso em outros arquivos
export default animationManager;