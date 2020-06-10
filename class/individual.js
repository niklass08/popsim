import config from '../config/config.js';

export default class individual {
    constructor({ isSick }) {
        this.isSick = isSick;
    }

    init() {
        this.x = Math.random() * config.internalWidth;
        this.y = Math.random() * config.internalHeight;
        this.setNewGoal();
    }

    isGoalReached() {
        const dist = Math.abs(this.x - this.goal.x) + Math.abs(this.y - this.goal.y);
        if (dist < 5) return true;
        return false;

    }

    setNewGoal() {
        this.speed = 100 + Math.random() * 150;
        this.goal = {
            x: Math.random() * config.internalWidth,
            y: Math.random() * config.internalHeight
        }
        this.dx = (this.goal.x - this.x) / this.speed;
        this.dy = (this.goal.y - this.y) / this.speed;
    }

    move() {

        this.x += this.dx
        this.y += this.dy
        if (this.isGoalReached()) this.setNewGoal();
    }
}