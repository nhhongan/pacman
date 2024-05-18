import TileMap from "./TileMap.js";
import Pacman from "./Pacman.js";

const tileSize = 32;
const velocity = 2;
const fps = 75;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');

// const pacmanFrames = document.getElementById("animations")
// const ghostFrames = document.getElementById("ghost")

const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;

function gameLoop() {
    tileMap.draw(canvas, ctx);
    pacman.draw(ctx, pause());
    enemies.forEach(enemy => enemy.draw(ctx, pause(), pacman));
}

function pause() {
    return !pacman.madeFirstMove;
}


tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / fps);