/* Name: Nguyen Hoang Hong An
   Student code: ITDSIU22151
   Purpose: This module defines the ScoreBoard class, which is responsible for updating and displaying
            the current score of the player on the screen. It works in conjunction with the ScoreSubject
            class to receive updates whenever the score changes.
*/



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