// Seleciona o tabuleiro
const tabuleiro = document.getElementById('tabuleiro');

// Dimensões do tabuleiro
const linhas = 10;
const colunas = 10;

// Criação do tabuleiro
for (let i = 0; i < linhas * colunas; i++) {
  const celula = document.createElement('div');
  celula.classList.add('celula');
  celula.dataset.index = i; // Adiciona um índice para referência
  tabuleiro.appendChild(celula);
}

// Posiciona o jogador inicial
let posicaoJogador = 0;
const jogador = document.createElement('div');
jogador.classList.add('jogador');

// Adiciona o jogador na célula inicial
tabuleiro.children[posicaoJogador].appendChild(jogador);

// Seleciona o modal e o botão de fechar
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

let modalAberto = false; // Variável de controle do estado do modal

// Função para exibir o modal
function mostrarModal() {
  modal.style.display = 'flex';
  modalAberto = true; // Impede o movimento
}

// Função para fechar o modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  modalAberto = false; // Permite o movimento
});

// Movimento do jogador com chance de encontrar um item raro
document.addEventListener('keydown', (e) => {
  if (modalAberto) return; // Bloqueia a movimentação se o modal estiver aberto

  let colAtual = posicaoJogador % colunas;
  let linhaAtual = Math.floor(posicaoJogador / colunas);

  switch (e.key) {
    case 'ArrowUp':
      linhaAtual = (linhaAtual - 1 + linhas) % linhas;
      break;
    case 'ArrowDown':
      linhaAtual = (linhaAtual + 1) % linhas;
      break;
    case 'ArrowLeft':
      colAtual = (colAtual - 1 + colunas) % colunas;
      break;
    case 'ArrowRight':
      colAtual = (colAtual + 1) % colunas;
      break;
  }

  // Atualiza a posição do jogador
  posicaoJogador = linhaAtual * colunas + colAtual;
  Array.from(tabuleiro.children).forEach((celula) => (celula.innerHTML = ''));
  tabuleiro.children[posicaoJogador].appendChild(jogador);

  // Exibe a posição atual no console
  console.log(`Jogador está na célula: Linha ${linhaAtual}, Coluna ${colAtual}`);

  // Verifica se encontra um item raro (50% de chance)
  if (Math.random() < 0.5) {
    mostrarModal();
  }
});
