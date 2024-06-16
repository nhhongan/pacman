import TileMap from "./TileMap.js";
import Pacman from "./Pacman.js";
import config from "./Config.js";

const canvas = document.getElementById(config.canvas.id);
const ctx = canvas.getContext('2d');

let tileMap, pacman, enemies;
let gameOver = false;
let gameWin = false;
const gameOverSound = new Audio(config.sounds.gameOver);
const gameWinSound = new Audio(config.sounds.gameWin);

function startGame(level) {
    console.log(`Starting game with level: ${level}`);
    if (!config.levels[level]) {
        console.error(`Level ${level} not found in config.`);
        return;
    }

    try {
        const velocity = config.levels[level].velocity;
        const map = config.levels[level].map;

        tileMap = new TileMap(config.tileSize, map);
        pacman = tileMap.getPacman(velocity);
        enemies = tileMap.getEnemies(velocity, level);

        // Hide the landing page and show the game page
        document.getElementById(config.pages.landingPage).style.display = 'none';
        document.getElementById(config.pages.gamePage).style.display = 'block';

        // Set canvas size
        tileMap.setCanvasSize(canvas);

        // Start game loop
        setInterval(() => gameLoop(level), 1000 / config.fps);
    } catch (error) {
        console.error('Error initializing game:', error);
    }
}

function gameLoop(level) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing
    tileMap.draw(canvas, ctx);
    drawGameEnd(level);
    pacman.draw(ctx, pause(), enemies);
    enemies.forEach(enemy => {
        enemy.draw(ctx, pause(), pacman);
    });
    checkGameOver();
    checkGameWin();
}

function checkGameWin() {
    if (!gameWin) {
        gameWin = tileMap.didWin();
        if (gameWin) {
            gameWinSound.play();
            showGameEndButtons();
        }
    }
}

function checkGameOver() {
    if (!gameOver) {
        gameOver = isGameOver();
        if (gameOver) {
            gameOverSound.play();
            showGameEndButtons();
        }
    }
}

function isGameOver() {
    return enemies.some(
        enemy => !pacman.powerDotActive && enemy.collideWith(pacman));
}

function pause() {
    return !pacman.madeFirstMove || gameOver || gameWin;
}

function drawGameEnd(level) {
    if (gameOver || gameWin) {
        let text = "You Win!!!";
        if (gameOver) {
            text = "Game Over";
        }
        ctx.fillStyle = config.textStyles.fillStyle;
        ctx.fillRect(0, canvas.height / 2.5, canvas.width, 150);
        ctx.font = config.textStyles.font;
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        config.textStyles.textGradient.forEach(stop => {
            gradient.addColorStop(stop.offset, stop.color);
        });
        ctx.fillStyle = gradient;
        ctx.fillText(text, config.levels[level].gameOverText, canvas.height / 1.9);
    }
}

function showGameEndButtons() {
    document.getElementById(config.gameEndContainer.id).style.display = 'block';
}

export { startGame };
