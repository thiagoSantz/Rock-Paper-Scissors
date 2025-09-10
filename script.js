/*

function getComputerChoice() {
  const numero = Math.floor(Math.random() * 3);
  console.log("Número: " + numero);

  let jogadaPC;
  if (numero == 0) {
    jogadaPC = "Pedra";
  } else if (numero == 1) {
    jogadaPC = "Papel";
  } else {
    jogadaPC = "Tesoura";
  }

  console.log("Jogada PC: " + jogadaPC);

  return jogadaPC;
}

function getHumanChoice() {
  try {
    let escolha = prompt("Escolha: Pedra, Papel ou Tesoura");

    // Se usuário clicar cancelar
    if (escolha === null) {
      return "cancelado";
    }

    // Se usuário clicar OK sem digitar
    if (escolha.trim() === "") {
      return "vazio";
    }

    return escolha.toLowerCase().trim();
  } catch (error) {
    return "erro";
  }
}

function determinarVencedor(jogadaUsuario, jogadaComputador) {
  // Converter para minúsculas para evitar problemas de case
  const user = jogadaUsuario.toLowerCase();
  const pc = jogadaComputador.toLowerCase();

  switch (true) {
    // Empates
    case user === pc:
      return "Empate!";

    // Usuário ganha
    case user === "pedra" && pc === "tesoura":
    case user === "papel" && pc === "pedra":
    case user === "tesoura" && pc === "papel":
      return "Você ganhou!";

    // Computador ganha
    case pc === "pedra" && user === "tesoura":
    case pc === "papel" && user === "pedra":
    case pc === "tesoura" && user === "papel":
      return "Computador ganhou!";

    default:
      return "Jogada inválida!";
  }
}

function playGame() {
  let humanScore = 0;
  let pcScore = 0;

  for (let index = 0; index < 5; index++) {
    let jogadaPlayer = getHumanChoice();
    let jogadaPC = getComputerChoice();

    let result = determinarVencedor(jogadaPlayer, jogadaPC);

    if (result == "Você ganhou!") {
      humanScore++;
    } else if (result == "Computador ganhou!") {
      pcScore++;
    }

    console.log("resultado " + result);
  }

  let resultJogo;

  if (humanScore > pcScore) {
    resultJogo = "Fim de jogo. Você ganhou o jogo!";
  } else if (humanScore < pcScore) {
    resultJogo = "Fim de jogo. Computador ganhou o jogo!";
  } else {
    resultJogo = "Fim de jogo. Deu empate.";
  }
  
  console.log(resultJogo);
}
*/

// Variáveis globais
let humanScore = 0;
let pcScore = 0;
let jogadasRestantes = 5;
let jogoAtivo = true;

// Funções básicas (permanecem iguais)
function getComputerChoice() {
    const numero = Math.floor(Math.random() * 3);
    return ["pedra", "papel", "tesoura"][numero];
}

function determinarVencedor(jogadaUsuario, jogadaComputador) {
    const user = jogadaUsuario.toLowerCase();
    const pc = jogadaComputador.toLowerCase();

    if (user === pc) return "empate";
    if ((user === "pedra" && pc === "tesoura") ||
        (user === "papel" && pc === "pedra") ||
        (user === "tesoura" && pc === "papel")) {
        return "humano";
    }
    return "computador";
}

function highlightComputerChoice(jogadaPC) {
    document.querySelectorAll('.conteiner.pc button').forEach(btn => {
        btn.classList.remove('ativo');
    });
    
    const botaoPC = document.getElementById(`pc-${jogadaPC}`);
    if (botaoPC) {
        botaoPC.classList.add('ativo');
        setTimeout(() => botaoPC.classList.remove('ativo'), 1500);
    }
}

function updatePlacar(vencedor) {
    const humanScoreElement = document.getElementById('human-score');
    const pcScoreElement = document.getElementById('pc-score');
    
    // Remove todas as classes de destaque
    humanScoreElement.classList.remove('destaque-positivo', 'destaque-negativo', 'destaque-amarelo');
    pcScoreElement.classList.remove('destaque-positivo', 'destaque-negativo', 'destaque-amarelo');

    if (vencedor === "humano") {
        humanScore++;
        humanScoreElement.textContent = humanScore;
        humanScoreElement.classList.add('destaque-positivo');
        
    } else if (vencedor === "computador") {
        pcScore++;
        pcScoreElement.textContent = pcScore;
        pcScoreElement.classList.add('destaque-negativo');
        
    } else if (vencedor === "empate") {
        // EMPATE: ambas as pontuações ficam amarelas
        humanScoreElement.classList.add('destaque-amarelo');
        pcScoreElement.classList.add('destaque-amarelo');
    }
}

// FUNÇÃO PRINCIPAL MODIFICADA - sem mostrar resultado a cada jogada
function jogar(jogadaUsuario) {
    if (!jogoAtivo) return;
    
    const jogadaPC = getComputerChoice();
    highlightComputerChoice(jogadaPC);

    const vencedor = determinarVencedor(jogadaUsuario, jogadaPC);
    updatePlacar(vencedor);
    
    // Atualiza jogadas restantes
    jogadasRestantes--;
    document.getElementById('jogadas-restantes').textContent = jogadasRestantes;
    
    // Verifica se acabaram as jogadas
    if (jogadasRestantes === 0) {
        jogoAtivo = false;
        setTimeout(mostrarResultadoFinal, 500);
    }
}

// FUNÇÃO PARA MOSTRAR RESULTADO FINAL (apenas no final)
function mostrarResultadoFinal() {
    const resultadoFinal = document.createElement('div');
    resultadoFinal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.95);
        color: white;
        padding: 30px;
        border-radius: 15px;
        border: 3px solid grey;
        z-index: 1000;
        text-align: center;
        font-size: 1.4rem;
        font-weight: bold;
        min-width: 300px;
        white-space: pre-line; /* ⭐ LINHA MÁGICA */
    `;
    
    let mensagem;
    if (humanScore > pcScore) {
        mensagem = `VOCÊ VENCEU! \n\nPlacar: ${humanScore} x ${pcScore}`;
    } else if (pcScore > humanScore) {
        mensagem = `VOCÊ PERDEU! \n\nPlacar: ${humanScore} x ${pcScore}`;
    } else {
        mensagem = `EMPATE! \n\nPlacar: ${humanScore} x ${pcScore}`;
    }
    
    mensagem += `\n\nReiniciando em 3 segundos...`;
    resultadoFinal.textContent = mensagem;
    document.body.appendChild(resultadoFinal);
    
    // Contagem regressiva
    let segundos = 3;
    const intervalo = setInterval(() => {
        segundos--;
        if (segundos > 0) {
            resultadoFinal.textContent = mensagem.replace('3 segundos', `${segundos} segundos`);
        } else {
            clearInterval(intervalo);
            document.body.removeChild(resultadoFinal);
            resetGame();
        }
    }, 1000);
}

// FUNÇÃO RESET SIMPLIFICADA
function resetGame() {
    humanScore = 0;
    pcScore = 0;
    jogadasRestantes = 5;
    jogoAtivo = true;
    
    document.getElementById('human-score').textContent = '0';
    document.getElementById('pc-score').textContent = '0';
    document.getElementById('jogadas-restantes').textContent = '5';
    
    document.getElementById('human-score').classList.remove('destaque-positivo', 'destaque-negativo', 'destaque-amarelo');
    document.getElementById('pc-score').classList.remove('destaque-positivo', 'destaque-negativo', 'destaque-amarelo');
    
    document.querySelectorAll('.conteiner.pc button').forEach(btn => {
        btn.classList.remove('ativo');
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    const botaoReset = document.getElementById('botaoReset');
    if (botaoReset) {
        botaoReset.addEventListener('click', resetGame);
        botaoReset.style.cursor = 'pointer';
        botaoReset.title = 'Reiniciar Jogo';
    }
});