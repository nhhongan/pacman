import MovingDirection from "./MovingDirection.js";

export default class Pacman {
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.frameCount = 7;
        this.currentFrame = 1;
        this.pacmanGIF = new Image();
        this.pacmanGIF.src = "../assets/animations.gif";
        this.pacmanAnimationTimerDefault = 10;
        this.pacmanAnimationTimer = null;

        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;

        this.pacmanRotation = this.Rotation.right;

        // this.#loadPacmanImages();
    }

    Rotation = {
        right: 0,
        down: 1,
        left: 2,
        up: 3,
    };

    draw(ctx, pause, enemies) {
        if (!pause) {
            // this.#move();
            // this.#animate();
        }
        // this.#eatDot();
        // this.#eatPowerDot();
        // this.#eatGhost(enemies);

        const size = this.tileSize / 2;

        ctx.save();
        ctx.translate(this.x + size, this.y + size);
        ctx.rotate((this.pacmanRotation * 90 * Math.PI) / 180);
        ctx.translate(-this.x - size, -this.y - size);
        ctx.drawImage(
            this.pacmanGIF,
            this.pacmanImageIndex * this.tileSize, // Use current frame index to select appropriate frame
            0,
            this.tileSize,
            this.tileSize,
            -size,
            -size,
            this.tileSize,
            this.tileSize
        );

        ctx.restore();
    }

    #changeAnimation() {
        this.currentFrame =
            this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    }
} 