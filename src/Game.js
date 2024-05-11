import TileMap from "./TileMap.js";
import Pacman from "./Pacman.js";

const tileSize = 20;
const velocity = 1;
const fps = 75;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');

const pacmanFrames = document.getElementById("animations")
const ghostFrames = document.getElementById("ghost")

const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
// const enemies = tileMap.getEnemies(velocity);

function gameLoop() {
    tileMap.draw(canvas, ctx);
    pacman.draw(ctx, pause());
}

function pause() {
    return !pacman.madeFirstMove || gameOver || gameWin;
}

let update = () => {
    // todo
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / fps);