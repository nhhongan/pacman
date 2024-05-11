import TileMap from "./TileMap.js";

const tileSize = 20;
const velocity = 1;
const fps = 75;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');

const pacmanFrames = document.getElementById("animations")
const ghostFrames = document.getElementById("ghost")

const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);


function gameLoop() {
    tileMap.draw(canvas, ctx);
}

let update = () => {
    // todo
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000/fps);