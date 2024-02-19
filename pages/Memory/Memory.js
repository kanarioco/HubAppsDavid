

import "./Memory.css";



const template = () => `
<div class="memory-game">
    <div class="cards" id="cards"></div>
    <button id="restart-button">Restart</button>    
  </div>
`;



const cardsArray = ['image1.gif', 'image1.gif', 'image2.gif', 'image2.gif', 'image3.gif', 'image3.gif', 'image4.gif', 'image4.gif', 'image5.gif', 'image5.gif', 'image6.gif', 'image6.gif', 'image7.gif', 'image7.gif', 'image8.gif', 'image8.gif', 'image9.gif', 'image9.gif'];
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCards() {
  const shuffledCards = shuffle(cardsArray);
  const cardsContainer = document.getElementById('cards');
  cardsContainer.innerHTML = ''; // Limpiar el contenedor de cartas antes de crear nuevas cartas
  shuffledCards.forEach(card => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.card = card;
    const img = document.createElement('img');
    img.src = "img/memory/tras.png"; // Imagen de reverso de la carta
    img.dataset.front = "img/memory/" + card; // Imagen frontal de la carta
    img.dataset.back = "img/memory/tras.png"; // Imagen de reverso de la carta
    div.appendChild(img);
    div.addEventListener('click', flipCard);
    cardsContainer.appendChild(div);
  });
}

function flipCard() {
  if (flippedCards.length < 2 && !flippedCards.includes(this)) {
    const img = this.querySelector('img');
    img.src = img.dataset.front; // Muestra la imagen frontal de la carta
    flippedCards.push(this);
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const card1 = flippedCards[0].dataset.card;
  const card2 = flippedCards[1].dataset.card;
  if (card1 === card2) {
    flippedCards.forEach(card => {
      card.removeEventListener('click', flipCard);
      card.classList.add('matched');
      matchedCards.push(card);
    });
    if (matchedCards.length === cardsArray.length) {
      alert('¡Felicidades! Has ganado el juego.');
    }
  } else {
    flippedCards.forEach(card => {
      const img = card.querySelector('img');
      img.src = img.dataset.back; // Muestra la imagen de reverso de la carta
    });
  }
  flippedCards = [];
}

function restartGame() { 
  matchedCards = [];
  createCards();
}

const addEventListener = () => {
document.getElementById('restart-button').addEventListener('click', restartGame);

createCards();
 
}


export const PrintMemoryPage = () => {
    document.querySelector("main").innerHTML = template();
  addEventListener();

}
