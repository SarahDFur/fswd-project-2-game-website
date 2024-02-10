const cards = document.querySelectorAll('.memory-card');
const matchSound = new Audio("../data/sound/match.mp3");
const winSound = new Audio('../data/sound/win.mp3');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;

document.querySelector('.reset-button').addEventListener('click', resetGame);

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

function resetGame() {
    shuffle();
    cards.forEach(card => {
        card.classList.remove('flip');
        card.removeEventListener('click', flipCard); // 
        card.addEventListener('click', flipCard); //
    });
    setTimeout(() => {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
        score = 0; // אפס גם את הניקוד
        updateScore(0); // עדכן את התצוגה של הניקוד
    }, 100);
}


function updateScore(points) {
    score += points; // עדכון הניקוד בהתאם לפעולה
    document.getElementById('score').textContent = score; // עדכון התצוגה של הניקוד
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    // second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
        updateScore(10);
        matchSound.play(); // play match sound
    } else {
        unflipCards();
        updateScore(-1);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    const allFlipped = Array.from(document.querySelectorAll('.memory-card')).every(card => card.classList.contains('flip'));
    if (allFlipped) {
        winSound.play(); // play win sound
    }
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}



cards.forEach(card => card.addEventListener('click', flipCard));