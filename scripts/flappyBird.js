const gameSound = new Audio("../data/sound/game-music-loop.mp3");

let score = 0;

const bird = document.querySelector('.bird');
const gameDisplay = document.querySelector('.game-container');
const ground = document.querySelector('.ground');

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
    if (currentUser && currentUser.flappyBirdScore !== undefined) {
        score = currentUser.flappyBirdScore;
        document.getElementById('score').textContent = score;
    } else {
        console.log('No score found for current user or current user is not defined.');
    }
}

function saveUserScore() {
    let currentUser = getUserFromLocalStorage(); // טען את המשתמש הנוכחי מ-localStorage
    if (!currentUser) {
        console.error('No current user found.');
        return;
    }
    currentUser.flappyBirdScore = score; // עדכון ניקוד המשחק של המשתמש הנוכחי

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

// move bird to center of game screen
// px changes
let birdLeft = 220;
let birdBottom = 100;
let gravity = 3;
let isGameOver = false;
let gap = 430;

// game
function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + 'px';
    bird.style.left = birdLeft + 'px';
    gameSound.play();

}

let gameTimerId = setInterval(startGame, 20); // invoke every 20ms
// clearInterval(timerId); //stop the interval

// jumping - fight against gravity
function control(e) {
    if (e.keyCode === 38) // if it's the up arrow key
        jump();
    if (e.key === 'r') {
        resetGame();
    }
}

function jump() {
    // limit bird from leaving grid
    if (birdBottom < 500) { // able to add
        birdBottom += 50;
    }
    bird.style.bottom = birdBottom + 'px';
    // console.log(birdBottom);
}
document.addEventListener('keydown', control);


// Obstacles - Yippie
function generateObstacle() {
    let obstacleLeft = 500;
    let randomHeight = Math.random() * 60;
    let obstacleBottom = randomHeight; // form the bottom of the game grid

    // create obstacles
    const obstacle = document.createElement('div');
    const topObstacle = document.createElement('div');
    if (!isGameOver) {
        obstacle.classList.add('obstacle'); // add only if not over
        topObstacle.classList.add('topObstacle');
    }
    // insert obstacle into the game display
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);
    // change position of obstacle
    obstacle.style.left = obstacleLeft + 'px';
    topObstacle.style.left = obstacleLeft + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';
    topObstacle.style.bottom = obstacleBottom + gap + 'px';

    // moving obstacle from right to left
    function moveObstacle() {
        if (score >= 100) { // level 2
            obstacleLeft -= 5;
        } else { // level 1
            obstacleLeft -= 2;
        }
        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        if (obstacleLeft === -60) { // when the entire obstacle is out of view
            clearInterval(timerId);
            gameDisplay.removeChild(obstacle); // remove from display
            gameDisplay.removeChild(topObstacle);
        }

        if (
            obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
            (birdBottom < obstacleBottom + 150 ||
                birdBottom > obstacleBottom + gap - 200) ||
            birdBottom === 0) { // make bird and obstacles stop
            gameOver();
            clearInterval(timerId); // obstacle stops on impact
        }
        if (obstacleLeft < birdLeft) {
            updateScore(obstacleLeft);
        }
    }

    // timer for moving obstacles
    let timerId = setInterval(moveObstacle, 20);
    if (score >= 100 && !isGameOver) {
        setTimeout(generateObstacle, 1000); // half a second
    } else {
        if (!isGameOver) setTimeout(generateObstacle, 3000); // half a second
    }
    // generate a new obstacle of random height every 3 seconds ↓

}
generateObstacle();

// game over 
function gameOver() {
    clearInterval(gameTimerId);
    isGameOver = true;
    if (score > localStorage.getItem('score')) {
        localStorage.setItem('score', JSON.stringify(score));
        document.getElementById('highest-score').innerHTML = score;

    }
    gameSound.pause();
}

// update score
function updateScore(obstacleLeft) {
    // check if statment
    // if bird is after obstacles score += 10
    if (obstacleLeft < 220 && obstacleLeft > 217 || (score >= 100 && obstacleLeft < 220 && obstacleLeft > 210)) {
        score += 10;
        console.log(score);
        document.getElementById('score').innerHTML = score;
        if (score >  (JSON.parse(localStorage.getItem('currentUser'))).flappyBirdScore||score> localStorage.getItem('score') )
         {
            saveUserScore()
            document.getElementById('highest-score').innerHTML = score;
        }
        return;
    }
}

// reset game
function resetGame() {
    document.getElementById('score').innerHTML = score;
    document.getElementById('highest-score').textContent = (JSON.parse(localStorage.getItem('currentUser'))).flappyBirdScore;
    window.location.href = 'flappyBird.html';

}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('highest-score').textContent = (JSON.parse(localStorage.getItem('currentUser'))).flappyBirdScore;
    document.getElementById('score').innerHTML = '0';
});