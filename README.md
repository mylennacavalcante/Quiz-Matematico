# Quiz Matemático

Projeto de estudo de um quiz de matemática para navegador, com seleção de dificuldade, perguntas de múltipla escolha e apresentação de resultados.

## Tecnologias

- HTML5 e CSS3
- JavaScript com módulos
- JSON para o banco de perguntas
- GSAP para animações

## Recursos presentes no código

- Escolha de dificuldade
- Carregamento das perguntas com `fetch`
- Conferência de respostas e contagem de pontos
- Barra de progresso e resultado final
- Reinício do quiz
- Animações de interface

## Como executar localmente

```bash
git clone https://github.com/mylennacavalcante/Quiz-Matematico.git
cd Quiz-Matematico
```

Sirva a pasta com um servidor HTTP local, por exemplo com a extensão Live Server. Abra `index.html` pelo endereço fornecido pelo servidor.

**Não abra apenas pelo protocolo `file://`:** o projeto utiliza módulos JavaScript e carregamento de JSON, que precisam de um servidor local para funcionar de forma adequada. A biblioteca GSAP é carregada por CDN e depende de conexão com a internet.

## Organização

- `index.html`: página inicial
- `dificuldade.html`: escolha do nível
- `quiz.html`: interface do quiz
- `questions.json`: perguntas e alternativas
- `quiz.js`: gerenciamento das perguntas, respostas e pontuação
- `animations.js`: animações
- `style.css`: estilos

Há outros scripts de estudo no repositório. Consulte os arquivos HTML para identificar os módulos utilizados em cada página.

## Estado do projeto

Projeto de estudo em evolução. Os recursos listados descrevem a implementação no código; ainda podem existir ajustes de integração, interface e comportamento.

## Aprendizados explorados

Manipulação do DOM, eventos, lógica de programação, leitura de JSON, uso de `sessionStorage` e organização de interações em JavaScript.

---

Projeto de estudo de [Mylenna Cavalcante](https://github.com/mylennacavalcante).
