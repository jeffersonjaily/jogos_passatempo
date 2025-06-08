const mario = document.getElementById('mario');
const obstacleContainer = document.getElementById('obstacle-container');
const gameContainer = document.getElementById('game-container');

let isJumping = false;
let score = 0;
let distance = 0;
const winDistance = 2000; // Distância necessária para vencer (em px)

// Cria HUD de pontuação
const scoreDisplay = document.createElement('div');
scoreDisplay.style.position = 'fixed';
scoreDisplay.style.top = '10px';
scoreDisplay.style.left = '10px';
scoreDisplay.style.color = 'white';
scoreDisplay.style.fontSize = '24px';
scoreDisplay.style.zIndex = '100';
document.body.appendChild(scoreDisplay);

// Movimento
document.addEventListener('keydown', (e) => {
  switch(e.code) {
    case 'KeyW': jump(); break;
    case 'KeyD': moveRight(); break;
    case 'KeyA': moveLeft(); break;
  }
});

function moveRight() {
  let left = parseInt(getComputedStyle(mario).left);
  mario.style.left = left + 20 + 'px';
  distance += 20;
  updateScore();
  checkWin();
}

function moveLeft() {
  let left = parseInt(getComputedStyle(mario).left);
  if (left > 0) mario.style.left = left - 20 + 'px';
}

function jump() {
  if (isJumping) return;
  isJumping = true;
  document.getElementById('jump-sound').play();
  mario.classList.add('jump');
  setTimeout(() => {
    mario.classList.remove('jump');
    isJumping = false;
  }, 600);
}

// Gera obstáculos
function createObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.left = window.innerWidth + 'px';
  obstacleContainer.appendChild(obstacle);

  let pos = window.innerWidth;
  const speed = 2;

  const move = setInterval(() => {
    pos -= speed;
    obstacle.style.left = pos + 'px';

    // Colisão
    const mRect = mario.getBoundingClientRect();
    const oRect = obstacle.getBoundingClientRect();
    const collided =
      mRect.left < oRect.right &&
      mRect.right > oRect.left &&
      mRect.bottom > oRect.top &&
      mRect.top < oRect.bottom;

    if (collided) {
      clearInterval(move);
      gameOver();
    }

    if (pos + obstacle.offsetWidth < 0) {
      clearInterval(move);
      obstacle.remove();
    }
  }, 20);
}

// Gera plataformas
function createPlatform() {
  const platform = document.createElement('div');
  platform.classList.add('platform');
  platform.style.left = window.innerWidth + 'px';
  platform.style.bottom = (100 + Math.random() * 200) + 'px';
  gameContainer.appendChild(platform);

  let pos = window.innerWidth;
  const speed = 2;

  const move = setInterval(() => {
    pos -= speed;
    platform.style.left = pos + 'px';

    if (pos + 100 < 0) {
      clearInterval(move);
      platform.remove();
    }
  }, 20);
}

// Checa colisão com plataformas
setInterval(() => {
  const mRect = mario.getBoundingClientRect();
  const platforms = document.querySelectorAll('.platform');

  platforms.forEach(platform => {
    const pRect = platform.getBoundingClientRect();

    const isOnTop =
      mRect.bottom <= pRect.top + 10 &&
      mRect.bottom >= pRect.top - 10 &&
      mRect.right > pRect.left &&
      mRect.left < pRect.right;

    if (isOnTop && !isJumping) {
      mario.style.bottom = (window.innerHeight - pRect.top) + 'px';
    }
  });
}, 30);

// Atualiza pontuação
function updateScore() {
  score = Math.floor(distance / 10);
  scoreDisplay.textContent = `Pontos: ${score}`;
}

// Vitória
function checkWin() {
  if (distance >= winDistance) {
    alert("🎉 Você venceu!");
    location.reload();
  }
}

// Game over
function gameOver() {
  document.getElementById('gameover-sound').play();
  alert('Game Over!');
  location.reload();
}

// Inicia geração
setInterval(createObstacle, 2000);
setInterval(createPlatform, 3000);
