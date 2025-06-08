// =========================
// Game.js - Lógica do Jogo
// =========================

// Constantes de naipes e valores
const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Estado do jogo encapsulado
const Game = {
  deck: [],
  playerHand: [],
  computerHand: [],
  discardPile: [],
  selectedCardIndex: null,
  playerTurn: true,
  hasDrawnThisTurn: false,
  manualMode: false,
  slotsState: Array(9).fill(null),
};

// Elementos da interface
const playerHandDiv = document.querySelector('#player-hand');
const computerCountSpan = document.querySelector('#computer-count');
const deckDiv = document.getElementById('deck');
const discardDiv = document.getElementById('discard-pile');
const drawDeckBtn = document.getElementById('draw-deck');
const drawDiscardBtn = document.getElementById('draw-discard');
const discardBtn = document.getElementById('discard');
const declareWinBtn = document.getElementById('declare-win');
const organizeAutoBtn = document.getElementById('organize-auto');
const organizeManualBtn = document.getElementById('organize-manual');
const restartBtn = document.getElementById('restart');
const clearSlotsBtn = document.getElementById('clear-slots');
const messageDiv = document.getElementById('message');
const slotsDivs = document.querySelectorAll('.slot');

// Áudio
const bgMusic = document.getElementById('bg-music');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');

bgMusic.volume = 0.3;
bgMusic.play();

// =========================
// Funções utilitárias
// =========================

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createDeck() {
  Game.deck = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      Game.deck.push({ suit, rank });
    });
  });
  shuffle(Game.deck);
}

function startGame() {
  createDeck();
  Game.playerHand = [];
  Game.computerHand = [];
  Game.discardPile = [];
  Game.selectedCardIndex = null;
  Game.playerTurn = true;
  Game.hasDrawnThisTurn = false;
  Game.manualMode = false;
  Game.slotsState = Array(9).fill(null);
  messageDiv.textContent = '';

  for (let i = 0; i < 9; i++) {
    Game.playerHand.push(Game.deck.pop());
    Game.computerHand.push(Game.deck.pop());
  }
  Game.discardPile.push(Game.deck.pop());

  updateAllUI();
}

function updateAllUI() {
  updatePlayerHandUI();
  updateComputerUI();
  updateDeckDiscardUI();
  updateButtons();
  updateSlotsUI();
}

function updatePlayerHandUI() {
  playerHandDiv.innerHTML = '';
  Game.playerHand.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', getSuitClass(card.suit));
    if (Game.selectedCardIndex === index) cardDiv.classList.add('selected');
    cardDiv.textContent = card.rank + card.suit;
    cardDiv.onclick = () => {
      if (!Game.playerTurn || !Game.hasDrawnThisTurn || Game.manualMode) return;
      Game.selectedCardIndex = Game.selectedCardIndex === index ? null : index;
      updateAllUI();
    };
    playerHandDiv.appendChild(cardDiv);
  });
}

function updateComputerUI() {
  computerCountSpan.textContent = Game.computerHand.length;
}

function updateDeckDiscardUI() {
  deckDiv.textContent = Game.deck.length ? '?' : '';
  deckDiv.classList.toggle('back', Game.deck.length > 0);

  if (Game.discardPile.length > 0) {
    const top = Game.discardPile.at(-1);
    discardDiv.className = 'card ' + getSuitClass(top.suit);
    discardDiv.textContent = top.rank + top.suit;
  } else {
    discardDiv.textContent = '';
    discardDiv.className = 'card';
  }
}

function updateButtons() {
  drawDeckBtn.disabled = !Game.playerTurn || Game.hasDrawnThisTurn || !Game.deck.length;
  drawDiscardBtn.disabled = !Game.playerTurn || Game.hasDrawnThisTurn || !Game.discardPile.length;
  discardBtn.disabled = !Game.playerTurn || !Game.hasDrawnThisTurn || Game.selectedCardIndex === null;
  declareWinBtn.disabled = !Game.playerTurn || !canDeclareWin(Game.playerHand);
  organizeAutoBtn.disabled = !Game.playerTurn;
  organizeManualBtn.disabled = !Game.playerTurn;
  clearSlotsBtn.disabled = Game.slotsState.every(s => s === null);
}

function getSuitClass(suit) {
  return {
    '♠': 'spade',
    '♥': 'heart',
    '♦': 'diamond',
    '♣': 'club',
  }[suit] || '';
}

function canDeclareWin(hand) {
  if (hand.length !== 9) return false;
  const counts = {};
  hand.forEach(card => counts[card.rank] = (counts[card.rank] || 0) + 1);
  let trincaCount = 0;
  for (const rank in counts) {
    if (counts[rank] >= 3) trincaCount++;
  }
  return trincaCount >= 3;
}

function endGame() {
  Game.playerTurn = false;
  Game.hasDrawnThisTurn = false;
  drawDeckBtn.disabled = true;
  drawDiscardBtn.disabled = true;
  discardBtn.disabled = true;
  declareWinBtn.disabled = true;
  organizeAutoBtn.disabled = true;
  organizeManualBtn.disabled = true;
}

// Demais códigos (draw, discard, turnos, organização) continuam iguais ao exemplo anterior e devem ser mantidos.

startGame();
