/* Name: Nguyen Hoang Hong An
   Student code: ITDSIU22151
   Purpose: This module manages the core game logic for Minion Rush. It initializes the game, handles the game loop,
            manages the score, checks for game win/loss conditions, and updates the game state. The module follows
            the Singleton design pattern to ensure a single instance of the game is managed and interacted with.
*/



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