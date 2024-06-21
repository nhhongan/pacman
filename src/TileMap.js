/* Name: Nguyen Hoang Hong An
   Student code: ITDSIU22151
   Purpose: This module defines the TileMap class, which represents the game map for the Minion Rush game.
            It handles the rendering of the map, placement of Minion and enemies, collision detection,
            and dot/power dot consumption by Minion. TileMap initializes based on different game levels
            and provides methods to interact with game elements, facilitating gameplay mechanics and
            visual representation.
*/



import Pacman from './Pacman.js';
import Enemy from './Enemy.js';
import MovingDirection from './MovingDirection.js';

export default class TileMap {
    constructor(tileSize, map) {
        this.tileSize = tileSize;
        this.map = map;

        this.yellowDot = new Image();
        this.yellowDot.src = "../assets/yellowDot.png";

        this.banana = new Image();
        this.banana.src = "../assets/banana.jpg";

        this.pinkDot = new Image();
        this.pinkDot.src = "../assets/pinkDot.png";

        this.wallColor = "#342DCA";
        this.wallSpaceWidth = this.tileSize / 1.5;
        this.wallOffset = (this.tileSize - this.wallSpaceWidth) / 2;
        this.wallInnerColor = "black";

        this.powerDot = this.pinkDot;
        this.powerDotAnimationTimerDefault = 30;
        this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;

    }

    draw(canvas, ctx) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile == 1) {
                    this.#drawWall(ctx, column, row);
                } else if (tile == 2) {
                    this.#drawBanana(ctx, column, row, this.tileSize);
                } else if (tile == 3) {
                    this.#drawPowerDot(ctx, column, row, this.tileSize);
                } else {
                    this.#createRect(ctx, column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize, "black");
                }
            }
        }
    }


    #createRect(ctx, x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    #drawWall(ctx, column, row) {
        this.#createRect(ctx, column * this.tileSize,
            row * this.tileSize,
            this.tileSize, this.tileSize,
            this.wallColor);
        if (column > 0 && this.map[row][column - 1] == 1) {
            this.#createRect(ctx,
                column * this.tileSize,
                row * this.tileSize + this.wallOffset,
                this.wallSpaceWidth + this.wallOffset,
                this.wallSpaceWidth,
                this.wallInnerColor);
        }
        if (column < this.map[0].length - 1 && this.map[row][column + 1] == 1) {
            this.#createRect(ctx,
                column * this.tileSize + this.wallOffset,
                row * this.tileSize + this.wallOffset,
                this.wallSpaceWidth + this.wallOffset,
                this.wallSpaceWidth,
                this.wallInnerColor);
        }
        if (row > 0 && this.map[row - 1][column] == 1) {
            this.#createRect(ctx,
                column * this.tileSize + this.wallOffset,
                row * this.tileSize,
                this.wallSpaceWidth,
                this.wallSpaceWidth + this.wallOffset,
                this.wallInnerColor);
        }
        if (row < this.map.length - 1 && this.map[row + 1][column] == 1) {
            this.#createRect(ctx,
                column * this.tileSize + this.wallOffset,
                row * this.tileSize + this.wallOffset,
                this.wallSpaceWidth,
                this.wallSpaceWidth + this.wallOffset,
                this.wallInnerColor);
        }
    }

    #drawBanana(ctx, column, row, size) {
        ctx.drawImage(
            this.banana,
            column * this.tileSize,
            row * this.tileSize,
            size,
            size
        );
    }

    #drawPowerDot(ctx, column, row, size) {
        this.powerDotAnimationTimer--;
        if (this.powerDotAnimationTimer == 0) {
            this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
            if (this.powerDot == this.pinkDot) {
                this.powerDot = this.yellowDot;
            } else {
                this.powerDot = this.pinkDot;
            }
        }
        ctx.drawImage(this.powerDot, column * size, row * size, size, size);
    }

    #dotsLeft() {
        return this.map.flat().filter(tile => (tile == 2 || tile == 3)).length;
    }

    didWin() {
        return this.#dotsLeft() == 0;
    }

    getPacman(velocity) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile == 4) {
                    this.map[row][column] = 2;
                    return new Pacman(
                        column * this.tileSize,
                        row * this.tileSize,
                        this.tileSize,
                        velocity,
                        this
                    );
                }
            }
        }
    }

    getEnemies(velocity, level) {
        let aStarGhostsToCreate = level == 'hard' ? 2 : 1;
        const enemies = [];
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile == 5) {
                    this.map[row][column] = 2;
                    if (aStarGhostsToCreate > 0 && ((row === 21 && column === 16) || (row === 12 && column === 9))) {
                        enemies.push(new Enemy(
                            column * this.tileSize,
                            row * this.tileSize,
                            this.tileSize,
                            velocity,
                            this,
                            true // Set isAStarGhost to true for AStar enemies
                        ));
                        aStarGhostsToCreate--;
                    } else {
                        enemies.push(new Enemy(
                            column * this.tileSize,
                            row * this.tileSize,
                            this.tileSize,
                            velocity,
                            this
                        ));
                    }
                }
            }
        }
        return enemies;
    }
    

    setCanvasSize(canvas) {
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }

    didCollideEnv(x, y, direction) {
        if (direction == null) {
            return;
        }

        if (
            Number.isInteger(x / this.tileSize) &&
            Number.isInteger(y / this.tileSize)
        ) {
            let column = 0;
            let row = 0;
            let nextColumn = 0;
            let nextRow = 0;

            switch (direction) {
                case MovingDirection.right:
                    nextColumn = x + this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.left:
                    nextColumn = x - this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.up:
                    nextRow = y - this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
                case MovingDirection.down:
                    nextRow = y + this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
            }
            let tile = this.map[row][column];
            if (tile == 1) {
                return true;
            }
        }
        return false;
    }

    eatDot(x, y) {
        const row = y/this.tileSize;
        const column = x/this.tileSize;
        if (Number.isInteger(row) && Number.isInteger(column)) {
            if (this.map[row][column] == 2) {
                this.map[row][column] = 6;
                return true;
            }
        }
        return false;
    }

    eatPowerDot(x, y) {
        const row = y/this.tileSize;
        const column = x/this.tileSize;
        if (Number.isInteger(row) && Number.isInteger(column)) {
            if (this.map[row][column] == 3) {
                this.map[row][column] = 6;
                return true;
            }
        }
        return false;
    }
}