document.addEventListener('DOMContentLoaded', () => {
    const selectionButtons = document.querySelectorAll('[data-selection]');
    const finalColumn = document.querySelector('[data-final-column]');
    const computerScoreSpan = document.querySelector('[data-computer-score]');
    const yourScoreSpan = document.querySelector('[data-your-score]');
    const resultDisplay = document.querySelector('[data-result]'); // Add this line if you have a dedicated element for showing the result.

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

        // Remove previous result text
        resultDisplay.innerText = ''; // Clear previous results

        if (yourWinner) {
            incrementScore(yourScoreSpan);
            resultDisplay.innerText = 'You won!'; // Display winning message
        } else if (computerWinner) {
            incrementScore(computerScoreSpan);
            resultDisplay.innerText = 'You lose.'; // Display losing message
        } else {
            resultDisplay.innerText = 'It\'s a tie.'; // Display tie message if no one wins
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
});