const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');
const difficultySelect = document.getElementById('difficulty');
const timerDisplay = document.getElementById('timer');
const chancesDisplay = document.getElementById('chances');

let cardsSymbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🥝', '🍉', '🍒', '🍑'];
let cards = [];
let flippedCards = [];
let matchedCount = 0;
let maxChances = 20;
let currentChances = 0;
let timer = 60;
let interval;

const difficultySettings = {
  'easy': 6,
  'medium': 8,
  'hard': 10,
  'very-hard': 12
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startTimer() {
  clearInterval(interval);
  timer = 60;
  timerDisplay.textContent = `Tempo: ${timer}`;
  interval = setInterval(() => {
    timer--;
    timerDisplay.textContent = `Tempo: ${timer}`;
    if (timer === 0) {
      clearInterval(interval);
      endGame(false);
    }
  }, 1000);
}

function createCards() {
  cards = [];
  flippedCards = [];
  matchedCount = 0;
  currentChances = 20;
  chancesDisplay.textContent = `Viradas restantes: ${currentChances}`;
  message.style.display = 'none';
  gameBoard.innerHTML = '';

  const difficulty = difficultySelect.value;
  const numPairs = difficultySettings[difficulty];
  const selectedSymbols = cardsSymbols.slice(0, numPairs);
  const gameSymbols = [...selectedSymbols, ...selectedSymbols];
  shuffle(gameSymbols);

  gameSymbols.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    const span = document.createElement('span');
    span.textContent = '';
    card.appendChild(span);
    card.addEventListener('click', onCardClick);
    gameBoard.appendChild(card);
    cards.push(card);
  });

  startTimer();
}

function onCardClick(e) {
  const card = e.currentTarget;

  if (
    card.classList.contains('flipped') ||
    card.classList.contains('matched') ||
    flippedCards.length === 2
  ) {
    return;
  }

  if (currentChances <= 0) return;

  flipCard(card);
  flippedCards.push(card);
  currentChances--;
  chancesDisplay.textContent = `Viradas restantes: ${currentChances}`;

  if (flippedCards.length === 2) {
    checkMatch();
  }

  if (currentChances === 0 && matchedCount !== cards.length) {
    setTimeout(() => endGame(false), 1000);
  }
}

function flipCard(card) {
  card.classList.add('flipped');
  card.firstChild.textContent = card.dataset.symbol;
}

function unflipCards() {
  flippedCards.forEach(card => {
    card.classList.remove('flipped');
    card.firstChild.textContent = '';
  });
  flippedCards = [];
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    flippedCards = [];
    matchedCount += 2;

    if (matchedCount === cards.length) {
      clearInterval(interval);
      setTimeout(() => endGame(true), 300);
    }
  } else {
    setTimeout(unflipCards, 800);
  }
}

function endGame(won) {
  clearInterval(interval);
  message.style.display = 'block';
  message.textContent = won ? '🎉 Parabéns, você venceu!' : '😢 Tempo ou chances esgotadas!';
}

document.getElementById('start-button').addEventListener('click', createCards);
document.getElementById('restart-button').addEventListener('click', createCards);
