document.addEventListener('DOMContentLoaded', () => {
    let selectedLevel = null;

    document.querySelectorAll('.game__level').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.game__level').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedLevel = button.id;
        });
    });

    document.getElementById('newGameButton').addEventListener('click', () => {
        restartGame();
    });

    document.getElementById('exitButton').addEventListener('click', () => {
        closeGame();
    });
});

function startGame(level) {
    document.getElementById('landingPage').style.display = 'none';

    document.getElementById('gamePage').style.display = 'block';
    
    console.log(`Starting game with level: ${level}`);
    // Example:
    // new Game(level).start();
}

function restartGame() {
    // Hide the game page
    document.getElementById('gamePage').style.display = 'none';
    // Show the landing page
    // document.getElementById('landingPage').style.display = 'block';
    // Hide game end buttons
    document.getElementById('gameEndContainer').style.display = 'none';
    // Reload the page to reset the game
    location.reload();
}

function closeGame() {
    // Close the game tab
    window.close();
}