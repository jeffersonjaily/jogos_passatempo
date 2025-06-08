const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // linhas
  [0,3,6], [1,4,7], [2,5,8], // colunas
  [0,4,8], [2,4,6]           // diagonais
];

function handleCellClick(e) {
  const idx = e.target.dataset.index;

  if (!gameActive || board[idx] !== null) return;

  board[idx] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    status.textContent = `Jogador ${currentPlayer} venceu! 🎉`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== null)) {
    status.textContent = 'Empate! 🤝';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Turno do jogador: ${currentPlayer}`;
}

function checkWin() {
  return winningCombos.some(combo => {
    const [a,b,c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function restartGame() {
  board.fill(null);
  gameActive = true;
  currentPlayer = 'X';
  status.textContent = `Turno do jogador: ${currentPlayer}`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
