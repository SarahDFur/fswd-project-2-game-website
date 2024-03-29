document.addEventListener('DOMContentLoaded', () => {
    const selectionButtons = document.querySelectorAll('[data-selection]');
    const resultDisplay = document.querySelector('[data-result]');
    const yourScoreSpan = document.querySelector('[data-your-score]');
    const computerScoreSpan = document.querySelector('[data-computer-score]');

    const SELECTIONS = [{
            name: 'rock',
            emoji: '✊',
            beats: 'scissors'
        },
        {
            name: 'paper',
            emoji: '✋',
            beats: 'rock'
        },
        {
            name: 'scissors',
            emoji: '✌',
            beats: 'paper'
        }
    ];

    selectionButtons.forEach(selectionButton => {
        selectionButton.addEventListener('click', e => {
            const selectionName = selectionButton.dataset.selection;
            const selection = SELECTIONS.find(selection => selection.name === selectionName);
            makeSelection(selection);
        });
    });

    function makeSelection(selection) {
        const computerSelection = randomSelection();
        const yourWinner = isWinner(selection, computerSelection);
        const computerWinner = isWinner(computerSelection, selection);

        if (yourWinner) {
            incrementScore(yourScoreSpan);
            resultDisplay.innerText = 'You won!';
            updateUserScore(1); // Increment user score by 1 on win
        } else if (computerWinner) {
            incrementScore(computerScoreSpan);
            resultDisplay.innerText = 'You lose.';
        } else {
            resultDisplay.innerText = 'It\'s a tie.';
        }
    }

    function incrementScore(scoreSpan) {
        scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
    }

    function isWinner(selection, opponentSelection) {
        return selection.beats === opponentSelection.name;
    }

    function randomSelection() {
        const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
        return SELECTIONS[randomIndex];
    }

    function updateUserScore(points) {
        const user = getUserFromLocalStorage();
        if (user) {
            user.rockPaperScissorsScore += points;
            saveUserToLocalStorage(user);
        }
    }

    function getUserFromLocalStorage() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    function saveUserToLocalStorage(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    loadUserScore(); // Load user score when the page loads
});

function loadUserScore() {
    const user = getUserFromLocalStorage();
    if (user) {
        const yourScoreSpan = document.querySelector('[data-your-score]');
        yourScoreSpan.innerText = user.rockPaperScissorsScore;
    }
}