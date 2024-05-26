document.addEventListener('DOMContentLoaded', () => {
    let selectedLevel = null;

    document.querySelectorAll('.level-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.level-button').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedLevel = button.id;
        });
    });

    document.getElementById('play').addEventListener('click', () => {
        if (selectedLevel) {
            startGame(selectedLevel);
        } else {
            alert('Please select a level to play');
        }
    });

    document.getElementById('newGameButton').addEventListener('click', () => {
        restartGame();
    });

    document.getElementById('exitButton').addEventListener('click', () => {
        closeGame();
    });
});

function startGame(level) {
    // Hide the landing page
    document.getElementById('landingPage').style.display = 'none';
    // Show the game page
    document.getElementById('gamePage').style.display = 'block';
    // Initialize the game with the selected level
    console.log(`Starting game with level: ${level}`);
    // Example:
    // new Game(level).start();
}

function restartGame() {
    // Hide the game page
    document.getElementById('gamePage').style.display = 'none';
    // Show the landing page
    document.getElementById('landingPage').style.display = 'block';
    // Hide game end buttons
    document.getElementById('gameEndContainer').style.display = 'none';
    // Reload the page to reset the game
    location.reload();
}

function closeGame() {
    // Close the game tab
    window.close();
}
