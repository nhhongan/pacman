import TileMap from "./TileMap.js";
import Pacman from "./Pacman.js";

const tileSize = 32;
const velocity = 2;
const fps = 75;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');

const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;
const gameOverSound = new Audio('../assets/sounds/gameOver.wav');
const gameWinSound = new Audio('../assets/sounds/gameWin.wav');

function gameLoop() {
    tileMap.draw(canvas, ctx);
    pacman.draw(ctx, pause());
    enemies.forEach(enemy => enemy.draw(ctx, pause(), pacman));
    checkGameOver();
}

function checkGameOver() {
    if (!gameOver) {
        gameOver = isGameOver();
        if (gameOver) {
            gameOverSound.play();
        }
    }
}

function isGameOver() {
    return enemies.some(
        enemy => !pacman.powerDotActive && enemy.collideWith(pacman));
}

function pause() {
    return !pacman.madeFirstMove || gameOver;
}


tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / fps);