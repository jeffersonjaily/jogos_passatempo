const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let deck = [];
let playerHand = [];
let computerHand = [];
let discardPile = [];
let selectedCardIndex = null;
let playerTurn = true;
let hasDrawnThisTurn = false;

const playerHandDiv = document.querySelector('#player-hand .cards');
const deckDiv = document.getElementById('deck');
const discardDiv = document.getElementById('discard-pile');
const drawDeckBtn = document.getElementById('draw-deck');
const drawDiscardBtn = document.getElementById('draw-discard');
const discardBtn = document.getElementById('discard');
const declareWinBtn = document.getElementById('declare-win');
const messageDiv = document.getElementById('message');

function createDeck() {
  deck = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      deck.push({ suit, rank });
    });
  });
  shuffle(deck);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGame() {
  createDeck();
  playerHand = [];
  computerHand = [];
  discardPile = [];
  selectedCardIndex = null;
  playerTurn = true;
  hasDrawnThisTurn = false;
  messageDiv.textContent = '';

  for (let i = 0; i < 9; i++) {
    playerHand.push(deck.pop());
    computerHand.push(deck.pop());
  }

  discardPile.push(deck.pop());

  updateUI();
  setButtons();
}

function updateUI() {
  playerHandDiv.innerHTML = '';
  playerHand.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    if (selectedCardIndex === index) cardDiv.classList.add('selected');
    cardDiv.textContent = card.rank + card.suit;
    cardDiv.addEventListener('click', () => {
      if (!playerTurn || !hasDrawnThisTurn) return;
      if (selectedCardIndex === index) {
        selectedCardIndex = null;
      } else {
        selectedCardIndex = index;
      }
      updateUI();
      setButtons();
    });
    playerHandDiv.appendChild(cardDiv);
  });

  deckDiv.textContent = deck.length > 0 ? '?' : '';

  if (discardPile.length > 0) {
    const top = discardPile[discardPile.length - 1];
    discardDiv.textContent = top.rank + top.suit;
  } else {
    discardDiv.textContent = '';
  }
}

function setButtons() {
  drawDeckBtn.disabled = !playerTurn || hasDrawnThisTurn || deck.length === 0;
  drawDiscardBtn.disabled = !playerTurn || hasDrawnThisTurn || discardPile.length === 0;
  discardBtn.disabled = !playerTurn || !hasDrawnThisTurn || selectedCardIndex === null;
  declareWinBtn.disabled = !playerTurn || !canDeclareWin(playerHand);
}

// Botões eventos

drawDeckBtn.addEventListener('click', () => {
  if (!playerTurn || hasDrawnThisTurn || deck.length === 0) return;
  playerHand.push(deck.pop());
  hasDrawnThisTurn = true;
  messageDiv.textContent = 'Você comprou do monte.';
  updateUI();
  setButtons();
});

drawDiscardBtn.addEventListener('click', () => {
  if (!playerTurn || hasDrawnThisTurn || discardPile.length === 0) return;
  playerHand.push(discardPile.pop());
  hasDrawnThisTurn = true;
  messageDiv.textContent = 'Você comprou do descarte.';
  updateUI();
  setButtons();
});

discardBtn.addEventListener('click', () => {
  if (!playerTurn || !hasDrawnThisTurn || selectedCardIndex === null) return;
  const discarded = playerHand.splice(selectedCardIndex, 1)[0];
  discardPile.push(discarded);
  selectedCardIndex = null;
  hasDrawnThisTurn = false;
  messageDiv.textContent = `Você descartou ${discarded.rank}${discarded.suit}.`;
  updateUI();
  setButtons();

  if (canDeclareWin(playerHand)) {
    messageDiv.textContent += ' Você pode bater!';
    declareWinBtn.disabled = false;
  }

  playerTurn = false;

  setTimeout(computerTurn, 1200);
});

declareWinBtn.addEventListener('click', () => {
  if (!playerTurn) return;
  if (canDeclareWin(playerHand)) {
    messageDiv.textContent = 'Parabéns! Você bateu e ganhou!';
    endGame();
  } else {
    messageDiv.textContent = 'Você não pode bater ainda.';
  }
});

function computerTurn() {
  messageDiv.textContent = 'Turno do computador...';

  setTimeout(() => {
    // Compra do descarte ou monte aleatoriamente
    let pickDiscard = Math.random() < 0.5 && discardPile.length > 0;
    if (pickDiscard) {
      computerHand.push(discardPile.pop());
      messageDiv.textContent = 'Computador comprou do descarte.';
    } else if (deck.length > 0) {
      computerHand.push(deck.pop());
      messageDiv.textContent = 'Computador comprou do monte.';
    }

    // Descartar carta aleatória
    let discardIndex = Math.floor(Math.random() * computerHand.length);
    let discarded = computerHand.splice(discardIndex, 1)[0];
    discardPile.push(discarded);

    messageDiv.textContent = 'Computador descartou ' + discarded.rank + discarded.suit + '.';
    updateUI();

    if (canDeclareWin(computerHand)) {
      setTimeout(() => {
        messageDiv.textContent = 'Computador bateu e ganhou!';
        endGame();
      }, 1000);
      return;
    }

    playerTurn = true;
    hasDrawnThisTurn = false;
    setButtons();
  }, 1500);
}

function canDeclareWin(hand) {
  // Verifica se existem pelo menos 3 trincas (3 cartas iguais de rank)

  const rankCount = {};
  hand.forEach(c => {
    rankCount[c.rank] = (rankCount[c.rank] || 0) + 1;
  });

  let setsOfThree = 0;
  for (const r in rankCount) {
    if (rankCount[r] >= 3) setsOfThree++;
  }

  return setsOfThree >= 3;
}

function endGame() {
  drawDeckBtn.disabled = true;
  drawDiscardBtn.disabled = true;
  discardBtn.disabled = true;
  declareWinBtn.disabled = true;
}

// Começa o jogo automaticamente
startGame();
