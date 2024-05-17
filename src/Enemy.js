export default class Enemy {
    constructor(x, y, tileSize, velocity, tileMap){
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.#loadImages();
    }

    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
    }

    #loadImages(){
        this.normalGhost = new Image();
        this.normalGhost.src = '../assets/ghost.png';
        this.scaredGhost = new Image();
        this.scaredGhost.src = '../assets/scaredGhost.png';
        this.scaredGhost2 = new Image();
        this.image = this.normalGhost;

    }
}