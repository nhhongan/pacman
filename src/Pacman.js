export default class Pacman {
    constructor(x, y, tileSize, speed, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.speed = speed;
        this.tileMap = tileMap;
        this.#loadPacmanImages();
    }

    draw(ctx){

    }

    moveProcess() {
        this.changeDirectionPossible();
        this.moveForwards();
        if (this.checkCollision()){
            this.checkCollision();
        }
    }

    eat() {

    }

    // moveBackwards() {

    // }

    // moveForwards() {

    // }

    checkCollision() {

    }

    checkGhostCollision() {

    }

    changeDirectionPossible(){}

    changeAnimation(){}

    #loadPacmanImages(){
        this.pacmanImages = new Image();
        this.pacmanImages.src = "../assets/animations.gif";
    }
}