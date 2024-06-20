import { startGame } from './Game.js';

const Navigator = {
    init() {
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
            this.restartGame();
        });

        document.getElementById('exitButton').addEventListener('click', () => {
            this.closeGame();
        });
    },

    hideLandingPage() {
        document.getElementById('landingPage').style.display = 'none';
    },

    showGamePage() {
        document.getElementById('gamePage').style.display = 'block';
    },

    showGameEndButtons() {
        document.getElementById('gameEndContainer').style.display = 'block';
    },

    hideGameEndButtons() {
        document.getElementById('gameEndContainer').style.display = 'none';
    },

    restartGame() {
        document.getElementById('gamePage').style.display = 'none';
        document.getElementById('gameEndContainer').style.display = 'none';
        location.reload();
    },

    closeGame() {
        window.close();
    }
};

export default Navigator;