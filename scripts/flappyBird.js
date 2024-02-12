let score = 0;

const bird = document.querySelector('.bird');
const gameDisplay = document.querySelector('.game-container');
const ground = document.querySelector('.ground');

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
}

let gameTimerId = setInterval(startGame, 20); // invoke every 20ms
// clearInterval(timerId); //stop the interval


// jumping - fight against gravity
function control(e) {
    if (e.keyCode === 38) // if it's the up arrow key
        jump();
}

function jump() {
    // limit bird from leaving grid
    if (birdBottom < 500) { // able to add
        birdBottom += 50;
    }
    bird.style.bottom = birdBottom + 'px';
    console.log(birdBottom);
}
document.addEventListener('keydown', control);


// Obstacles - Yippie
function generateObstacle() {

    let obstacleLeft = 500;
    let randomHeight = Math.random() * 60;
    let obstacleBottom = randomHeight; // form the bottom of the game grid

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
        obstacleLeft -= 2;
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
    }

    // timer for moving obstacles
    let timerId = setInterval(moveObstacle, 20);

    // generate a new obstacle of random height every 3 seconds ↓
    if (!isGameOver) setTimeout(generateObstacle, 3000);
}
generateObstacle();

// game over 
function gameOver() {
    clearInterval(gameTimerId);
    isGameOver = true;
    document.removeEventListener('keydown', control);
}

// update score
function updateScore() {
    // check if statment
    // if (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
    //     (birdBottom < obstacleBottom + 153 ||
    //         birdBottom > obstacleBottom + gap - 200)) {
                score+=10;
                document.getElementById('score').textContent = score;
            // }
}

localStorage.setItem('score', JSON.stringify(score));