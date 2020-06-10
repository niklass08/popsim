import individual from './individual.js';
import config from '../config/config.js';

export default class population {
    constructor(size) {
        this.size = size;
        this._population = [];
    }

    init() {
        for (let i = 0; i < this.size; i++) {
            const isSick = false;
            const indi = new individual({ isSick });
            indi.init();
            this._population.push(indi);
        }
    }

    createOneRandomSick() {
        let index = Math.floor(Math.random() * this.size);
        this._population[index].isSick = true;
    }

    propagate(probability) {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                //check is comparing to same individual
                if (i == j) {
                    continue;
                }

                //no need to spread if both individuals are not sick
                if (!this._population[i].isSick && !this._population[j].isSick) {
                    continue;
                }

                //no need to spread if both individuals are sick
                if (this._population[i].isSick && this._population[j].isSick) {
                    continue;
                }

                //no need to spread if both individuals are fare enough
                const dist = Math.abs(this._population[i].x - this._population[j].x) + Math.abs(this._population[i].y - this._population[j].y);
                if (dist > config.spreadDistance) {
                    continue;
                }

                //Spreading
                if (this._population[i].isSick) {
                    const isSpreading = Math.random() <= probability;
                    this._population[j].isSick = isSpreading ? true : false;
                }

                if (this._population[j].isSick) {
                    const isSpreading = Math.random() <= probability;
                    this._population[i].isSick = isSpreading ? true : false;
                    if (isSpreading) {
                        console.log('atchoum');
                    }
                }
            }
        }
    }

    move() {
        for (let i = 0; i < this.size; i++) {
            this._population[i].move();

            if (this._population[i].x < 0) {
                this._population[i].x = 0;
            }

            if (this._population[i].y < 0) {
                this._population[i].y = 0;
            }

            if (this._population[i].x > config.internalWidth) {
                this._population[i].x = config.internalWidth;
            }

            if (this._population[i].y > config.internalHeight) {
                this._population[i].y = config.internalHeight;
            }
        }
    }
}