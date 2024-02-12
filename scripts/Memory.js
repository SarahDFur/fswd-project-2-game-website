const cards = document.querySelectorAll('.memory-card');
const matchSound = new Audio("../data/sound/match.mp3");
const winSound = new Audio('../data/sound/win.mp3');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;

document.querySelector('.reset-button').addEventListener('click', resetGame);

function getUserFromLocalStorage() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Load user score from local storage
function loadUserScore() {
    const user = getUserFromLocalStorage();
    if (user && user.memoryGameScore !== undefined) {
        score = user.memoryGameScore; // Set score from stored value
        updateScore(0); // Update UI
    }
}

function saveUserScore() {
    const user = getUserFromLocalStorage();
    if (user) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            users[userIndex].memoryGameScore = score; // Update the score
            localStorage.setItem('users', JSON.stringify(users)); // Save updated users array
            saveUserToLocalStorage(users[userIndex]); // Update current user in local storage
        }
    }
}

// Save user score to local storage
function saveUserToLocalStorage(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

//
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
    }, 100);
}


function updateScore(points) {
    if (score + points >= 0) {
        score += points; //
        document.getElementById('score').textContent = score; //
    }
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
        saveUserScore();
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

document.addEventListener('DOMContentLoaded', () => {
    shuffle(); //
    loadUserScore(); //
});