import MovingDirection from "./MovingDirection.js";

export default class Pacman {
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.pacmanAnimationTimerDefault = 10;
        this.pacmanAnimationTimer = null;

        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;

        this.pacmanRotation = this.Rotation.right;
        this.wakaSound = new Audio('../assets/sounds/collectingsound.ogg');

        this.powerDotSound = new Audio('../assets/sounds/power_dot.wav');
        this.powerDotActive = false;
        this.powerDotExpire = false;
        this.timers = [];

        this.eatGhostSound = new Audio('../assets/sounds/eat_ghost.wav');

        this.madeFirstMove = false;

        document.addEventListener("keydown", this.#keydown);

        this.#loadPacmanImages();
    }

    Rotation = {
        right: 0,
        down: 1,
        left: 2,
        up: 3,
    };

    draw(ctx, pause, enemies) {
        if (!pause) {
            this.#move();
            this.#animate();
        }
        this.#eatDot();
        this.#eatPowerDot();
        this.#eatGhost(enemies);

        const size = this.tileSize / 2;

        ctx.save();
        ctx.translate(this.x + size, this.y + size);
        ctx.rotate((this.pacmanRotation * 90 * Math.PI) / 180);
        ctx.drawImage(
            this.pacmanImages[this.pacmanImageIndex],
            -size,
            -size,
            this.tileSize * 1.3,
            this.tileSize * 1.3
        );
        ctx.restore();
    }

    #loadPacmanImages() {
        this.pacmanImages = [];

        for (let i = 1; i <= 20; i++) {
            const img = new Image();
            img.src = `../assets/minion/minion${i}.png`;
            this.pacmanImages.push(img);
        }

        this.pacmanImageIndex = 0;
    }

    #keydown = (event) => {
        // up
        if (event.keyCode == 38) {
            if (this.currentMovingDirection == MovingDirection.down) {
                this.currentMovingDirection = MovingDirection.up;
            }
            this.requestedMovingDirection = MovingDirection.up;
            this.madeFirstMove = true;
        }
        // down
        if (event.keyCode == 40) {
            if (this.currentMovingDirection == MovingDirection.up) {
                this.currentMovingDirection = MovingDirection.down;
            }
            this.requestedMovingDirection = MovingDirection.down;
            this.madeFirstMove = true;
        }
        // left
        if (event.keyCode == 37) {
            if (this.currentMovingDirection == MovingDirection.right) {
                this.currentMovingDirection = MovingDirection.left;
            }
            this.requestedMovingDirection = MovingDirection.left;
            this.madeFirstMove = true;
        }
        // right
        if (event.keyCode == 39) {
            if (this.currentMovingDirection == MovingDirection.left) {
                this.currentMovingDirection = MovingDirection.right;
            }
            this.requestedMovingDirection = MovingDirection.right;
            this.madeFirstMove = true;
        }
    }

    #move() {
        if (this.currentMovingDirection !== this.requestedMovingDirection) {
            if (Number.isInteger(this.x / this.tileSize) &&
                Number.isInteger(this.y / this.tileSize)
            ) {
                if (!this.tileMap.didCollideEnv(this.x, this.y, this.requestedMovingDirection)) {
                    this.currentMovingDirection = this.requestedMovingDirection;
                }
            }
        }
        if (this.tileMap.didCollideEnv(this.x, this.y, this.currentMovingDirection)) {
            this.pacmanAnimationTimer = null;
            this.pacmanImageIndex = 1;
            return;
        } else if (this.currentMovingDirection != null && this.pacmanAnimationTimer == null) {
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
        }

        switch (this.currentMovingDirection) {
            case MovingDirection.up:
                this.y -= this.velocity;
                this.pacmanRotation = this.Rotation.up;
                break;
            case MovingDirection.down:
                this.y += this.velocity;
                this.pacmanRotation = this.Rotation.down;
                break;
            case MovingDirection.left:
                this.x -= this.velocity;
                this.pacmanRotation = this.Rotation.left;
                break;
            case MovingDirection.right:
                this.x += this.velocity;
                this.pacmanRotation = this.Rotation.right;
                break;
        }
    }

    #animate() {
        if (this.pacmanAnimationTimer == null) {
            return;
        }
        this.pacmanAnimationTimer--;
        if (this.pacmanAnimationTimer == 0) {
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
            this.pacmanImageIndex++;
            if (this.pacmanImageIndex == this.pacmanImages.length) {
                this.pacmanImageIndex = 0;
            }
        }
    }

    #eatDot() {
        if (this.tileMap.eatDot(this.x, this.y) && this.madeFirstMove) {
            this.wakaSound.play();
        }
    }

    #eatPowerDot() {
        if (this.tileMap.eatPowerDot(this.x, this.y)) {
            this.powerDotSound.play();
            this.powerDotActive = true;
            this.powerDotExpire = false;
            this.timers.forEach((timer) => clearTimeout(timer));
            this.timers = [];
            let powerDotTimer = setTimeout(() => {
                this.powerDotActive = false;
                this.powerDotExpire = false;
            }, 1000 * 6);
            this.timers.push(powerDotTimer);

            let powerDotExpireTimer = setTimeout(() => {
                this.powerDotExpire = true;
            }, 1000 * 3);
            this.timers.push(powerDotExpireTimer);
        }
    }

    #eatGhost(enemies) {
        if (this.powerDotActive) {
            const collideEnemies = enemies.filter((enemy) => enemy.collideWith(this));
            collideEnemies.forEach((enemy) => {
                enemies.splice(enemies.indexOf(enemy), 1);
                this.eatGhostSound.play();
            });
        }
    }

} 