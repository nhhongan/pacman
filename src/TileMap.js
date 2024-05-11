import Pacman from './Pacman.js';

export default class TileMap {
    constructor(tileSize) {
        this.tileSize = tileSize;

        this.yellowDot = new Image();
        // this.yellowDot.src = "../images/yellowDot.png";

        // this.wall = new Image();
        // this.wall.src = "../images/wall.png";
        this.wallColor = "#342DCA";
        this.wallSpaceWidth = this.tileSize / 1.5;
        this.wallOffset = (this.tileSize - this.wallSpaceWidth)/2;
        this.wallInnerColor = "black";

    }

    // 1 - wall
    // 0 - dots
    // 21 columns // 23 rows
    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 0, 0, 0, 0, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 0, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 0, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
        [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 0, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];


    draw(canvas, ctx) {
        this.#createRect(ctx, 0, 0, canvas.width, canvas.height, "black");
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile === 1) {
                    this.#createRect(ctx, column * this.tileSize, 
                        row * this.tileSize, 
                        this.tileSize, this.tileSize, 
                        this.wallColor);
                    if (column > 0 & this.map[row][column - 1]==1) {
                        this.#createRect(ctx, 
                            column * this.tileSize, 
                            row * this.tileSize + this.wallOffset, 
                            this.wallSpaceWidth + this.wallOffset, 
                            this.wallSpaceWidth, 
                            this.wallInnerColor);
                    }
                    if (column < this.map[0].length - 1 && this.map[row][column + 1] == 1){
                        this.#createRect(ctx, 
                            column * this.tileSize + this.wallOffset, 
                            row * this.tileSize + this.wallOffset, 
                            this.wallSpaceWidth + this.wallOffset, 
                            this.wallSpaceWidth, 
                            this.wallInnerColor);
                    }
                    if (row > 0 && this.map[row - 1][column]==1) {
                        this.#createRect(ctx, 
                            column * this.tileSize + this.wallOffset, 
                            row * this.tileSize, 
                            this.wallSpaceWidth, 
                            this.wallSpaceWidth + this.wallOffset, 
                            this.wallInnerColor);
                    }
                    if (row < this.map.length - 1 && this.map[row + 1][column] == 1){
                        this.#createRect(ctx, 
                            column * this.tileSize + this.wallOffset, 
                            row * this.tileSize + this.wallOffset, 
                            this.wallSpaceWidth, 
                            this.wallSpaceWidth  + this.wallOffset, 
                            this.wallInnerColor);
                    }
                } 
                // ctx.strokeStyle = "yellow";
                // ctx.strokeRect(column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }


    #createRect(ctx, x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    // #drawWall(ctx, column, row, size) {
    //     this.#createRect(ctx, column * this.tileSize, row * this.tileSize, size, size, this.wallColor);
    // }

    // #drawDot(ctx, column, row, size) {
    //     ctx.drawImage(this.yellowDot, column * this.tileSize, row * this.tileSize, size, size);
    // }

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