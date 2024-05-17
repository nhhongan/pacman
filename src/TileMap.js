import Pacman from './Pacman.js';
import Enemy from './Enemy.js';
import MovingDirection from './MovingDirection.js';

export default class TileMap {
    constructor(tileSize) {
        this.tileSize = tileSize;

        this.yellowDot = new Image();
        this.yellowDot.src = "../assets/yellowDot.png";

        this.pinkDot = new Image();
        this.pinkDot.src = "../assets/pinkDot.png";

        // this.wall = new Image();
        // this.wall.src = "../images/wall.png";
        this.wallColor = "#342DCA";
        this.wallSpaceWidth = this.tileSize / 1.5;
        this.wallOffset = (this.tileSize - this.wallSpaceWidth) / 2;
        this.wallInnerColor = "black";

        this.powerDot = this.pinkDot;
        this.powerDotAnmationTimerDefault = 30;
        this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault;

    }

    // 1 - wall
    // 2 - dots
    // 3 - power dot
    // 4 - pacman
    // 5 - ghosts
    // 6 - empty space
    // 21 columns // 23 rows
    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 4, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 3, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 1, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 2, 1],
        [1, 2, 2, 3, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 3, 1, 1],
        [1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 1, 1],
        [1, 2, 2, 1, 1, 2, 1, 2, 1, 5, 1, 1, 1, 2, 1, 2, 2, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 3, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 2, 2, 1, 5, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 5, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];


    draw(canvas, ctx) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile == 1) {
                    this.#drawWall(ctx, column, row);
                } else if (tile === 2) {
                    this.#drawDot(ctx, column, row, this.tileSize);
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

    #drawDot(ctx, column, row, size) {
        ctx.drawImage(
            this.yellowDot,
            column * this.tileSize,
            row * this.tileSize,
            size,
            size
        );
    }

    #drawPowerDot(ctx, column, row, size) {
        this.powerDotAnmationTimer--;
        if (this.powerDotAnmationTimer === 0) {
            this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault;
            if (this.powerDot == this.pinkDot) {
                this.powerDot = this.yellowDot;
            } else {
                this.powerDot = this.pinkDot;
            }
        }
        ctx.drawImage(this.powerDot, column * size, row * size, size, size);

    }

    getPacman(velocity) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile === 4) {
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

    getEnemies(velocity) {
        const enemies = [];
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                const tile = this.map[row][column];
                if (tile === 5) {
                    this.map[row][column] = 2;
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
            const tile = this.map[row][column];
            if (tile === 1) {
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

}