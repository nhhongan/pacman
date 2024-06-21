/* Name: Nguyen Hoang Hong An
   Student code: ITDSIU22151
   Purpose: This module handles the navigation between different pages and states of the Minion Rush game.
            It manages the display and hiding of the landing page, game page, and game end container, 
            ensuring a smooth user experience as players progress through the game.
*/



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