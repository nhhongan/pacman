/* Name: Nguyen Hoang Hong An
   Student code: ITDSIU22151
   Purpose: This module defines the ScoreSubject class, which implements the Observer design pattern.
            It maintains the game score and notifies all registered observers (such as ScoreBoard) 
            whenever the score is updated. This allows for a decoupled design where the score management 
            is separated from the display logic.
*/



class ScoreSubject {
    constructor() {
        this.score = 0;
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update(this.score));
    }

    incrementScore(amount) {
        this.score += amount;
        this.notifyObservers();
        console.log(`Score incremented. New score: ${this.score}`);
    }

    resetScore() {
        this.score = 0;
        this.notifyObservers();
        console.log(`Score reset. New score: ${this.score}`);
    }

    getScore() {
        return this.score;
    }
}

export default new ScoreSubject();