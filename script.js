console.log("Jogo 1 carregado!");
const square = document.getElementById('square');
const gameArea = document.getElementById('game-area');
const timerSpan = document.getElementById('timer');
const scoreSpan = document.getElementById('score');
const endMessage = document.getElementById('end-message');
const finalScore = document.getElementById('final-score');

let score = 0;
let timeLeft = 15;
let gameInterval, timerInterval;

function getRandomPosition() {
  const maxX = gameArea.clientWidth - square.clientWidth;
  const maxY = gameArea.clientHeight - square.clientHeight;
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);
  return { x, y };
}

function moveSquare() {
  const pos = getRandomPosition();
  square.style.left = pos.x + 'px';
  square.style.top = pos.y + 'px';
}

function updateTimer() {
  timeLeft--;
  timerSpan.textContent = timeLeft;

  if (timeLeft <= 0) {
    endGame();
  }
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  square.style.display = 'none';
  finalScore.textContent = score;
  endMessage.style.display = 'block';
}

function restartGame() {
  score = 0;
  timeLeft = 15;
  scoreSpan.textContent = score;
  timerSpan.textContent = timeLeft;
  square.style.display = 'block';
  endMessage.style.display = 'none';
  moveSquare();
  gameInterval = setInterval(moveSquare, 1000);
  timerInterval = setInterval(updateTimer, 1000);
}

square.addEventListener('click', () => {
  score++;
  scoreSpan.textContent = score;
  moveSquare();
});

// Iniciar o jogo ao carregar a página
restartGame();
