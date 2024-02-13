const cards = document.querySelectorAll('.memory-card');
const matchSound = new Audio("../data/sound/match.mp3");
const winSound = new Audio('../data/sound/win.mp3');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;

document.querySelector('.reset-button').addEventListener('click', resetGame);
document.querySelector('.save-score-button').addEventListener('click', saveUserScore);
setInterval(checkSessionExpiration, 1000);


function getUserFromLocalStorage() {
    try {
        const userJson = localStorage.getItem('currentUser');
        return userJson ? JSON.parse(userJson) : null;
    } catch (e) {
        console.log(e)
        window.location.href = 'login.html';
    }
}

// Load user score from local storage
function loadUserScore() {
    const currentUser = getUserFromLocalStorage();
    if (currentUser && currentUser.memoryGameScore !== undefined) {
        score = currentUser.memoryGameScore;
        document.getElementById('score').textContent = score;
    } else {
        console.log('No score found for current user or current user is not defined.');
    }
}


function saveUserScore() {
    let currentUser = getUserFromLocalStorage();
    if (!currentUser) {
        console.error('No current user found.');
        return;
    }
    currentUser.memoryGameScore = score;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
    } else {
        console.error('Current user not found in users array.');
        return;
    }
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('users', JSON.stringify(users));
}

function checkSessionExpiration() {
    try {
        saveUserScore()
        const user = getUserFromLocalStorage();
        if (!user || !user.sessionExpiration) return;
        const now = new Date();
        const sessionExpiration = new Date(user.sessionExpiration);
        if (sessionExpiration <= now) {
            alert("Your session has expired. Please log in again.");
            window.location.href = 'login.html';
        }
    } catch (e) {
        console.log(e)
        window.location.href = 'login.html';
    }
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

function resetGame() {
    saveUserScore()
    shuffle();
    cards.forEach(card => {
        card.classList.remove('flip');
        card.removeEventListener('click', flipCard); // 
        card.addEventListener('click', flipCard); //
    });
    setTimeout(() => {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
        loadUserScore();

    }, 100);
}


function updateScore(points) {
    if (score + points >= 0) {
        score += points;
        document.getElementById('score').textContent = score;

        user = getUserFromLocalStorage();
        user.memoryGameScore = score;
        localStorage.setItem('currentUser', JSON.stringify(user)); // Update currentUser
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
        console.log('match');
        updateScore(10);
        matchSound.play(); // play match sound
    } else {
        unflipCards();
        console.log('unmatch');
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