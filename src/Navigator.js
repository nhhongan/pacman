import { startGame } from './Game.js';

document.addEventListener('DOMContentLoaded', () => {
    let selectedLevel = "easy";

    document.querySelectorAll('.game__level input').forEach(button => {
        button.addEventListener('change', () => {
            selectedLevel = button.value;
            console.log(`Selected level: ${selectedLevel}`);
        });
    });

    document.getElementById('playButton').addEventListener('click', () => {
        console.log(`Play button clicked with selected level: ${selectedLevel}`);
        startGame(selectedLevel);
    });

    document.getElementById('newGameButton').addEventListener('click', () => {
        restartGame();
    });

    document.getElementById('exitButton').addEventListener('click', () => {
        closeGame();
    });
});

function restartGame() {
    // Hide the game page
    document.getElementById('gamePage').style.display = 'none';
    // Hide game end buttons
    document.getElementById('gameEndContainer').style.display = 'none';
    // Reload the page to reset the game
    location.reload();
}

function closeGame() {
    // Close the game tab
    window.close();
}