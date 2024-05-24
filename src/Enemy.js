import MovingDirection from "./MovingDirection.js";
import AStar from './AStar.js';

export default class Enemy {
    constructor(x, y, tileSize, velocity, tileMap, isAStarGhost = false) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.isAStarGhost = isAStarGhost;
        // this.astar = new AStar(tileMap); // Initialize AStar instance
        // this.path = []; // Path to store the result of AStar pathfinding

        this.#loadImages();

        this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);

        this.directionTimerDefault = this.#random(10, 25);
        this.directionTimer = this.directionTimerDefault;

        this.scaredExpireTimerDefault = 10;
        this.scaredExpireTimer = this.scaredExpireTimerDefault;
    }

    draw(ctx, pause, pacman) {
        if (!pause) {
            this.#move();
            if (this.isAStarGhost) {
                this.FollowPacman(pacman);
            } else {
                this.#changeDirection();
            }
        }
        this.#setImage(ctx, pacman);
    }

    collideWith(pacman) {
        const size = this.tileSize / 2;
        if (this.x < pacman.x + size &&
            this.x + size > pacman.x &&
            this.y < pacman.y + size &&
            this.y + size > pacman.y
        ) {
            return true;
        }
        return false;
    }

    FollowPacman(pacman) {
        const pacX = pacman.x; // Pacman's x position
        const pacY = pacman.y; // Pacman's y position
        const start = [Math.floor(this.x / this.tileSize), Math.floor(this.y / this.tileSize)]; // Enemy's current position
        const end = [Math.floor(pacX / this.tileSize), Math.floor(pacY / this.tileSize)]; // Pacman's position

        const path = AStar(this.tileMap.map, start, end); // Calculate the shortest path using A* algorithm

        if (path.length > 1) {
            // If a path is found and it has at least one step
            // Determine the next move based on the next node in the path
            const nextNode = path[1]; // Assuming path[0] is the current position
            const nextX = nextNode[0] * this.tileSize; // Calculate the x position of the next node
            const nextY = nextNode[1] * this.tileSize; // Calculate the y position of the next node

            // Determine the new move direction based on the next node's position
            let newMoveDirection = null;
            if (nextX > this.x) {
                newMoveDirection = MovingDirection.right;
            } else if (nextX < this.x) {
                newMoveDirection = MovingDirection.left;
            } else if (nextY > this.y) {
                newMoveDirection = MovingDirection.down;
            } else if (nextY < this.y) {
                newMoveDirection = MovingDirection.up;
            }

            if (newMoveDirection != null && this.movingDirection != newMoveDirection) {
                if (
                    Number.isInteger(this.x / this.tileSize) &&
                    Number.isInteger(this.y / this.tileSize)
                ) {
                    if (!this.tileMap.didCollideEnv(this.x, this.y, newMoveDirection)) {
                        this.movingDirection = newMoveDirection;
                    }
                }
            }
        }
    }

    #changeDirection() {
        this.directionTimer--;
        let newMoveDirection = null;
        if (this.directionTimer == 0) {
            this.directionTimer = this.directionTimerDefault;
            newMoveDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);
        }
        if (newMoveDirection != null && this.movingDirection != newMoveDirection) {
            if (Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)) {
                if (!this.tileMap.didCollideEnv(this.x, this.y, newMoveDirection)) {
                    this.movingDirection = newMoveDirection;
                }
            }
        }
    }

    #move() {
        if (this.tileMap.didCollideEnv(this.x, this.y, this.movingDirection)) {
            this.#changeDirection();
        } else {
            switch (this.movingDirection) {
                case MovingDirection.up:
                    this.y -= this.velocity;
                    break;
                case MovingDirection.down:
                    this.y += this.velocity;
                    break;
                case MovingDirection.left:
                    this.x -= this.velocity;
                    break;
                case MovingDirection.right:
                    this.x += this.velocity;
                    break;
            }
        }
    }

    #random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    #loadImages() {
        this.normalGhost = new Image();
        this.normalGhost.src = '../assets/ghost.png';
        this.scaredGhost = new Image();
        this.scaredGhost.src = '../assets/scaredGhost.png';
        this.scaredGhost2 = new Image();
        this.scaredGhost2.src = '../assets/scaredGhost2.png';

        this.image = this.normalGhost;
    }

    #setImage(ctx, pacman) {
        if (pacman.powerDotActive) {
            this.#setImagePowerDotActive(pacman);
        } else {
            this.image = this.normalGhost;
        }
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
    }

    #setImagePowerDotActive(pacman) {
        if (pacman.powerDotExpire) {
            this.scaredExpireTimer--;
            if (this.scaredExpireTimer == 0) {
                this.scaredExpireTimer = this.scaredExpireTimerDefault;
                if (this.image === this.scaredGhost) {
                    this.image = this.scaredGhost2;
                } else {
                    this.image = this.scaredGhost;
                }
            }
        } else {
            this.image = this.scaredGhost;
        }
    }
}