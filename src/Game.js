import Config from './Config.js';
import TileMap from "./TileMap.js";
import ScoreSubject from './ScoreSubject.js';
import ScoreBoard from './ScoreBoard.js';
import Navigator from './Navigator.js';

const scoreBoard = new ScoreBoard('scoreBoard');
ScoreSubject.addObserver(scoreBoard);

class Game {
    constructor() {
        if (Game.instance) {
            return Game.instance;
        }

        this.canvas = document.getElementById(Config.canvas.id);
        this.ctx = this.canvas.getContext('2d');
        this.tileMap = null;
        this.pacman = null;
        this.enemies = [];
        this.gameOver = false;
        this.gameWin = false;
        this.gameOverSound = new Audio(Config.sounds.gameOver);
        this.gameWinSound = new Audio(Config.sounds.gameWin);

        Game.instance = this;
    }

    static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    startGame(level) {
        const config = Config;

        // Your game initialization logic based on the selected level
        console.log(`Starting game with level: ${level}`);
        console.log(`Tile size: ${config.tileSize}`);
        console.log(`FPS: ${config.fps}`);
        console.log(`Level velocity: ${config.levels[level].velocity}`);
        console.log(`Level map:`);
        console.log(config.levels[level].map);
        console.log(`Starting game with level: ${level}`);
        if (!Config.levels[level]) {
            console.error(`Level ${level} not found in config.`);
            return;
        }

        try {
            const velocity = Config.levels[level].velocity;
            const map = Config.levels[level].map;

            this.tileMap = new TileMap(Config.tileSize, map);
            this.pacman = this.tileMap.getPacman(velocity);
            this.enemies = this.tileMap.getEnemies(velocity, level);

            Navigator.hideLandingPage();
            Navigator.showGamePage();

            ScoreSubject.resetScore();

            // document.getElementById(config.pages.landingPage).style.display = 'none';
            // document.getElementById(config.pages.gamePage).style.display = 'block';

            this.tileMap.setCanvasSize(this.canvas);
            setInterval(this.gameLoop.bind(this, level), 1000 / Config.fps);
        } catch (error) {
            console.error('Error initializing game:', error);
        }
    }

    gameLoop(level) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.tileMap.draw(this.canvas, this.ctx);
        this.drawGameEnd(level);
        this.pacman.draw(this.ctx, this.pause(), this.enemies);
        this.enemies.forEach(enemy => {
            enemy.draw(this.ctx, this.pause(), this.pacman);
        });
        this.checkGameOver();
        this.checkGameWin();
        this.updateScore();
    }

    drawGameEnd(level) {
        if (this.gameOver || this.gameWin) {
            let text = "You Win!!!";
            if (this.gameOver) {
                text = "Game Over";
            }
            this.ctx.fillStyle = Config.textStyles.fillStyle;
            this.ctx.fillRect(0, this.canvas.height / 2.5, this.canvas.width, 150);
            this.ctx.font = Config.textStyles.font;
            const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
            Config.textStyles.textGradient.forEach(stop => {
                gradient.addColorStop(stop.offset, stop.color);
            });
            this.ctx.fillStyle = gradient;
            this.ctx.fillText(text, Config.levels[level].endGameTextPosition, this.canvas.height / 1.9);
        }
    }

    checkGameWin() {
        if (!this.gameWin) {
            this.gameWin = this.tileMap.didWin();
            if (this.gameWin) {
                this.gameWinSound.play();
                Navigator.showGameEndButtons();
            }
        }
    }

    checkGameOver() {
        if (!this.gameOver) {
            this.gameOver = this.isGameOver();
            if (this.gameOver) {
                this.gameOverSound.play();
                Navigator.showGameEndButtons();
            }
        }
    }

    isGameOver() {
        return this.enemies.some(
            enemy => !this.pacman.powerDotActive && enemy.collideWith(this.pacman)
        );
    }

    updateScore() {
        console.log('Updating score...');
        if (this.pacman.dotEaten) {
            console.log('Pacman ate a dot. Increasing score by 10.');
            ScoreSubject.incrementScore(10); // Increment score by 10 for each dot
            this.pacman.dotEaten = false;
        } else if (this.pacman.powerDotEaten) {
            console.log('Pacman ate a power dot. Increasing score by 20.');
            ScoreSubject.incrementScore(20);
            this.pacman.powerDotEaten = false;
        }
    }

    pause() {
        return !this.pacman.madeFirstMove || this.gameOver || this.gameWin;
    }

    showGameEndButtons() {
        document.getElementById(Config.gameEndContainer.id).style.display = 'block';
    }
}

const instance = Game.getInstance(); // Ensure instance is initialized

export function startGame(level) {
    instance.startGame(level);
}

export default instance;



// import TileMap from "./TileMap.js";
// import Pacman from "./Pacman.js";
// import config from "./Config.js";

// const canvas = document.getElementById(config.canvas.id);
// const ctx = canvas.getContext('2d');

// let tileMap, pacman, enemies;
// let gameOver = false;
// let gameWin = false;
// const gameOverSound = new Audio(config.sounds.gameOver);
// const gameWinSound = new Audio(config.sounds.gameWin);

// function startGame(level) {
//     console.log(`Starting game with level: ${level}`);
//     if (!config.levels[level]) {
//         console.error(`Level ${level} not found in config.`);
//         return;
//     }

//     try {
//         const velocity = config.levels[level].velocity;
//         const map = config.levels[level].map;

//         tileMap = new TileMap(config.tileSize, map);
//         pacman = tileMap.getPacman(velocity);
//         enemies = tileMap.getEnemies(velocity, level);

//         // Hide the landing page and show the game page
//         document.getElementById(config.pages.landingPage).style.display = 'none';
//         document.getElementById(config.pages.gamePage).style.display = 'block';

//         // Set canvas size
//         tileMap.setCanvasSize(canvas);

//         // Start game loop
//         setInterval(() => gameLoop(level), 1000 / config.fps);
//     } catch (error) {
//         console.error('Error initializing game:', error);
//     }
// }

// function gameLoop(level) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing
//     tileMap.draw(canvas, ctx);
//     drawGameEnd(level);
//     pacman.draw(ctx, pause(), enemies);
//     enemies.forEach(enemy => {
//         enemy.draw(ctx, pause(), pacman);
//     });
//     checkGameOver();
//     checkGameWin();
// }

// function checkGameWin() {
//     if (!gameWin) {
//         gameWin = tileMap.didWin();
//         if (gameWin) {
//             gameWinSound.play();
//             showGameEndButtons();
//         }
//     }
// }

// function checkGameOver() {
//     if (!gameOver) {
//         gameOver = isGameOver();
//         if (gameOver) {
//             gameOverSound.play();
//             showGameEndButtons();
//         }
//     }
// }

// function isGameOver() {
//     return enemies.some(
//         enemy => !pacman.powerDotActive && enemy.collideWith(pacman));
// }

// function pause() {
//     return !pacman.madeFirstMove || gameOver || gameWin;
// }

// function drawGameEnd(level) {
//     if (gameOver || gameWin) {
//         let text = "You Win!!!";
//         if (gameOver) {
//             text = "Game Over";
//         }
//         ctx.fillStyle = config.textStyles.fillStyle;
//         ctx.fillRect(0, canvas.height / 2.5, canvas.width, 150);
//         ctx.font = config.textStyles.font;
//         const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//         config.textStyles.textGradient.forEach(stop => {
//             gradient.addColorStop(stop.offset, stop.color);
//         });
//         ctx.fillStyle = gradient;
//         ctx.fillText(text, config.levels[level].endGameTextPosition, canvas.height / 1.9);
//     }
// }

// function showGameEndButtons() {
//     document.getElementById(config.gameEndContainer.id).style.display = 'block';
// }

// export { startGame };
