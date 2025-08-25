class PageAnimations {
  constructor() {
    this.init();
  }

  // Animação do título
  animateTitle() {
    gsap.from(".inicial h1", {
      duration: 2,
      y: -150,
      opacity: 0,
      ease: "bounce"
    });
  }

  // Animação dos botões/links
  animateLinks() {
    gsap.from(".link", {
      duration: 2,
      opacity: 0,
      y: 90,
      stagger: 0.3,
      ease: "power2.out"
    });
  }

  // Executa todas as animações
  playAllAnimations() {
    this.animateTitle();
    this.animateLinks();
  }

  // Método para executar animações com delay customizado
  playAnimationsWithDelay(titleDelay = 0, linksDelay = 0.5) {
    setTimeout(() => this.animateTitle(), titleDelay * 1000);
    setTimeout(() => this.animateLinks(), linksDelay * 1000);
  }

  // Método de inicialização (executa automaticamente)
  init() {
    // Aguarda o DOM carregar antes de executar as animações
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.playAllAnimations();
      });
    } else {
      this.playAllAnimations();
    }
  }

  // Método para resetar elementos (útil para re-executar animações)
  resetElements() {
    gsap.set("h1", { y: 0, opacity: 1 });
    gsap.set(".link", { y: 0, opacity: 1 });
  }

  // Método para executar animações personalizadas
  customAnimation(selector, options = {}) {
    const defaultOptions = {
      duration: 1,
      opacity: 0,
      y: 50,
      ease: "power2.out"
    };
    
    const animationOptions = { ...defaultOptions, ...options };
    gsap.from(selector, animationOptions);
  }
}

// Exporta a classe
export default PageAnimations;