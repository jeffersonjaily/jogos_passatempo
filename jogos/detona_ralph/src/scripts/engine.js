const state = {
  view: {
    squares: document.querySelectorAll('.square'),
    countdown: document.querySelector('#timeLeft'),
    score: document.querySelector('#score'),
    playerLives: document.querySelector('#playerLives'),
    btnSound: document.querySelector('#btnSound'),
    volumeControl: document.querySelector('#volumeControl'),
    difficultyMenu: document.getElementById('difficulty-menu'),
    rankingContainer: document.getElementById('ranking-container'),
    rankingList: document.getElementById('ranking'),
    btnRestart: document.getElementById('btnRestart'),
    lastScoreDisplay: document.getElementById('lastScore'),
    highScoreDisplay: document.getElementById('highScoreDisplay')
  },
  values: {
    timerId: null,
    countdownTimerId: null,
    gameSpeed: 1000,
    countdown: 30,
    score: 0,
    lives: 4,
    hitPosition: null,
    hasGameStarted: false,
    canClick: true,
    gameMusic: new Audio('../src/audios/gamer.mp3'),
    iniciarSound: new Audio('../src/audios/iniciar.m4a'),
    currentVolume: 0.5
  }
};

// Bloqueio zoom toque duplo mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  let now = Date.now();
  if (now - lastTouchEnd <= 300) e.preventDefault();
  lastTouchEnd = now;
}, false);

window.addEventListener('DOMContentLoaded', () => {
  state.values.currentVolume = parseFloat(state.view.volumeControl.value) || 0.5;
  state.values.gameMusic.volume = state.values.currentVolume;
  state.values.iniciarSound.volume = state.values.currentVolume;

  addListeners();

  document.querySelectorAll('.btn-difficulty').forEach(button => {
    button.addEventListener('click', () => {
      const level = button.getAttribute('data-level');
      setDifficulty(level);
      state.view.difficultyMenu.style.display = 'none';
      runGame();
    });
  });

  if (state.view.btnRestart) {
    state.view.btnRestart.addEventListener('click', resetGame);
  }

  setDifficulty('normal');
  updateUI();

  fetchRankingDoServidor();

  state.view.volumeControl.addEventListener('input', (e) => {
    const volume = parseFloat(e.target.value);
    state.values.currentVolume = volume;
    state.values.gameMusic.volume = volume;
    state.values.iniciarSound.volume = volume;
  });

  if (state.view.btnSound) {
    state.view.btnSound.addEventListener('click', () => {
      if (state.values.gameMusic.paused) {
        state.values.gameMusic.play();
        state.view.btnSound.textContent = '🔊';
        state.view.btnSound.classList.remove('muted');
      } else {
        state.values.gameMusic.pause();
        state.view.btnSound.textContent = '🔈';
        state.view.btnSound.classList.add('muted');
      }
    });
  }
});

function updateUI() {
  state.view.score.textContent = state.values.score;
  state.view.playerLives.textContent = 'x' + state.values.lives;
  state.view.countdown.textContent = state.values.countdown;
}

function setDifficulty(level) {
  switch (level) {
    case 'easy':
      state.values.gameSpeed = 1200;
      state.values.lives = 5;
      state.values.countdown = 40;
      break;
    case 'hard':
      state.values.gameSpeed = 700;
      state.values.lives = 3;
      state.values.countdown = 20;
      break;
    default:
      state.values.gameSpeed = 1000;
      state.values.lives = 4;
      state.values.countdown = 30;
  }
  updateUI();
}

function randomSquare() {
  state.view.squares.forEach(sq => sq.classList.remove('enemy'));
  const idx = Math.floor(Math.random() * state.view.squares.length);
  const square = state.view.squares[idx];
  square.classList.add('enemy');
  state.values.hitPosition = square.id;
}

function moveEnemy() {
  if (state.values.timerId) return;
  state.values.timerId = setInterval(randomSquare, state.values.gameSpeed);
}

function startCountdown() {
  state.view.countdown.textContent = state.values.countdown;
  if (state.values.countdownTimerId) clearInterval(state.values.countdownTimerId);
  state.values.countdownTimerId = setInterval(() => {
    state.values.countdown--;
    state.view.countdown.textContent = state.values.countdown;
    if (state.values.countdown <= 0) {
      clearInterval(state.values.countdownTimerId);
      clearInterval(state.values.timerId);
      endGame('⏰ Tempo esgotado!');
    }
  }, 1000);
}

function playHitSound() {
  const audio = new Audio('../src/audios/hit.m4a');
  audio.volume = state.values.currentVolume;
  audio.play();
}

function playGameOverSound() {
  const audio = new Audio('../src/audios/gameover.m4a');
  audio.volume = state.values.currentVolume;
  audio.play();
}

function playGameSound() {
  if (state.values.gameMusic.paused) state.values.gameMusic.play();
}

function addListeners() {
  state.view.squares.forEach(square => {
    square.addEventListener('mousedown', () => {
      if (!state.values.canClick) return;
      state.values.canClick = false;

      setTimeout(() => {
        state.values.canClick = true;
      }, 300);

      if (!state.values.hasGameStarted) {
        playGameSound();
        startCountdown();
        state.values.hasGameStarted = true;
      }

      if (square.id === state.values.hitPosition) {
        playHitSound();
        state.values.score++;
        updateUI();
        state.values.hitPosition = null;
        randomSquare();
      } else {
        loseLife();
      }
    });
  });
}

function loseLife() {
  if (!state.values.hasGameStarted) return;
  state.values.lives--;
  updateUI();
  if (state.values.lives <= 0) {
    clearInterval(state.values.timerId);
    clearInterval(state.values.countdownTimerId);
    endGame('💀 Você perdeu todas as vidas!');
  }
}

function salvarPontuacaoNoServidor(nome, pontuacao) {
  fetch('/pontuacao', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({nome, pontuacao})
  })
  .then(res => res.json())
  .then(data => {
    console.log('Pontuação salva:', data);
    fetchRankingDoServidor();
  })
  .catch(err => {
    console.error('Erro ao salvar pontuação:', err);
  });
}

function fetchRankingDoServidor() {
  fetch('/pontuacao')
    .then(res => res.json())
    .then(pontuacoes => {
      state.view.rankingList.innerHTML = '';
      if (pontuacoes.length === 0) {
        state.view.rankingList.innerHTML = '<li>Nenhuma pontuação registrada ainda.</li>';
        return;
      }
      pontuacoes.forEach(({nome, pontuacao}, i) => {
        const li = document.createElement('li');
        li.textContent = `${i + 1}º ${nome} - ${pontuacao}`;
        state.view.rankingList.appendChild(li);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar ranking:', err);
    });
}

function endGame(message) {
  playGameOverSound();
  state.values.gameMusic.pause();
  state.values.gameMusic.currentTime = 0;

  const currentScore = state.values.score;
  const storedHighScore = parseInt(localStorage.getItem('highScore') || '0', 10);

  if (currentScore > storedHighScore) localStorage.setItem('highScore', currentScore);

  state.view.lastScoreDisplay.textContent = `🧾 Última pontuação: ${currentScore}`;
  state.view.highScoreDisplay.textContent = `🥇 Melhor pontuação: ${localStorage.getItem('highScore')}`;

  state.view.rankingContainer.style.display = 'block';

  const nomeJogador = prompt('Digite seu nome para salvar a pontuação:') || 'Anônimo';
  salvarPontuacaoNoServidor(nomeJogador, currentScore);

  alert(`${message}\n🏆 Pontuação final: ${currentScore}`);
}



function resetGame() {
  clearInterval(state.values.timerId);
  clearInterval(state.values.countdownTimerId);
  state.values.timerId = null;
  state.values.countdownTimerId = null;

  state.values.score = 0;
  state.values.hasGameStarted = false;
  state.values.canClick = true;

  state.view.score.textContent = 0;
  state.view.squares.forEach(sq => sq.classList.remove('enemy'));
  state.view.difficultyMenu.style.display = 'block';
  state.view.rankingContainer.style.display = 'none';

  setDifficulty('normal');
  updateUI();
}

function runGame() {
  alert('Clique no inimigo para começar!');
  const iniciar = state.values.iniciarSound;
  iniciar.loop = true;
  iniciar.volume = state.values.currentVolume;
  iniciar.play().catch(() => {});

  randomSquare();
  moveEnemy();
}
