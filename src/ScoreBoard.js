class ScoreBoard {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
    }

    update(score) {
        this.element.textContent = `Score: ${score}`;
        console.log(`ScoreBoard updated. New score: ${score}`);
    }
}

export default ScoreBoard;
