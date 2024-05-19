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
    drawGameEnd();
    pacman.draw(ctx, pause(), enemies);
    enemies.forEach(enemy => enemy.draw(ctx, pause(), pacman));
    checkGameOver();
    checkGameWin();
}

function checkGameWin() {
    if (!gameWin){
        gameWin = tileMap.didWin();
        if (gameWin) {
            gameWinSound.play();
        }
    }
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
    return !pacman.madeFirstMove || gameOver || gameWin;
}

function drawGameEnd() {
    if (gameOver || gameWin) {
        let text = "You Win!!!";
        if (gameOver) {
            text = "Game Over";
        }
        ctx.fillStyle = "black";
        ctx.fillRect(0, canvas.height/2.5, canvas.width, 150);
        ctx.font = '80px comic sans';
        const gradient = ctx.createLinearGradient(0,0,canvas.width, canvas.height, 0);
        gradient.addColorStop('0','magenta');
        gradient.addColorStop('0.5','blue');
        gradient.addColorStop('1.0','red');
        ctx.fillStyle = gradient;
        ctx.fillText(text, 150, canvas.height/1.9);
    }
}


tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / fps);