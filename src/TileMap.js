import Pacman from './Pacman.js';

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
    // 21 columns // 23 rows
    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 4, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 3, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 1, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 2, 1],
        [2, 2, 2, 3, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 3, 1, 1],
        [1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
        [1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 1, 1, 1, 1],
        [1, 1, 2, 2, 1, 2, 1, 2, 1, 5, 1, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1],
        [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 3, 1, 2, 1, 1, 1, 2, 1, 5, 1, 2, 1],
        [1, 2, 2, 2, 1, 5, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];


    draw(canvas, ctx) {
        this.#createRect(ctx, 0, 0, canvas.width, canvas.height, "black");
        this.#drawWall(ctx);
        this.#drawDot(ctx, this.tileSize);
        this.#drawPowerDot(ctx, this.tileSize);
    }


    #createRect(ctx, x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    #drawWall(ctx) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile === 1) {
                    this.#createRect(ctx, column * this.tileSize,
                        row * this.tileSize,
                        this.tileSize, this.tileSize,
                        this.wallColor);
                    if (column > 0 & this.map[row][column - 1] == 1) {
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
            }
        }
    }

    #drawDot(ctx, size) {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[0].length; j++) {
                if (this.map[i][j] == 2) {
                    ctx.drawImage(
                        this.yellowDot,
                        j * this.tileSize,
                        i * this.tileSize,
                        size,
                        size
                    );
                }
            }
        }
    }

    #drawPowerDot(ctx, size) {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[0].length; j++) {
                if (this.map[i][j] == 3) {
                    this.powerDotAnmationTimer--;
                    if (this.powerDotAnmationTimer === 0) {
                        this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault;
                        if (this.powerDot == this.pinkDot) {
                            this.powerDot = this.yellowDot;
                        } else {
                            this.powerDot = this.pinkDot;
                        }
                    }
                    ctx.drawImage(this.powerDot, j * size, i * size, size, size);
                }
            }
        }
    }

    getPacman(velocity) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile === 4) {
                    this.map[row][column] = 0;
                    return new Pacman();
                }
            }
        }
    }

    setCanvasSize(canvas) {
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }
}