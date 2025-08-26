// Animação do título
gsap.from(".container h1", {
  duration: 2,
  y: -150,
  opacity: 1,
  ease: "bounce"
});

// Animação dos botões, um depois do outro
gsap.from(".link a", {
  duration: 2,
  opacity: 0,
  y: 90,
  stagger: 0.3, // intervalo entre cada botão
  ease: "power2.out"
});

const paginaInicial = document.getElementById("pagina-inicial");
const paginaQuiz = document.getElementById("pagina-quiz");
const paginaDificuldade = document.getElementById("pagina-dificuldade");

const btnIniciar = document.getElementById("btnIniciar");
const btnDificuldade = document.getElementById("btnDificuldade");
const btnVoltarQuiz = document.getElementById("btnVoltarQuiz");
const btnVoltarDificuldade = document.getElementById("btnVoltarDificuldade");

// Função para trocar de página com animação
function trocarPagina(saindo, entrando) {
  gsap.to(saindo, {
    duration: 0.6,
    x: -300,
    opacity: 0,
    onComplete: () => {
      saindo.style.display = "none";
      saindo.style.transform = "";

      entrando.style.display = "block";
      gsap.fromTo(entrando,
        { x: 300, opacity: 0 },
        { duration: 0.6, x: 0, opacity: 1 }
      );
    }
  });
}

// Clique em Iniciar Quiz
btnIniciar.addEventListener("click", () => {
  trocarPagina(paginaInicial, paginaQuiz);

  // 👉 Aqui depois você chama uma função para começar o quiz
  // Exemplo: iniciarQuiz();
});

// Clique em Dificuldade
btnDificuldade.addEventListener("click", () => {
  trocarPagina(paginaInicial, paginaDificuldade);
});

// Clique em Voltar (na página do Quiz)
btnVoltarQuiz.addEventListener("click", () => {
  trocarPagina(paginaQuiz, paginaInicial);
});

// Clique em Voltar (na página de Dificuldade)
btnVoltarDificuldade.addEventListener("click", () => {
  trocarPagina(paginaDificuldade, paginaInicial);
});
