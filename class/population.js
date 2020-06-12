import individual from './individual.js';
import config from '../config/config.js';

export default class population {
  constructor(size) {
    this.size = size;
    this._population = [];
    this.infectedArray = [0];
    this.deathArray = [0];
    this.healedArray = [0];
  }

  init() {
    for (let i = 0; i < this.size; i++) {
      const isSick = false;
      const indi = new individual({ isSick });
      indi.init();
      if (config.quarantine && Math.random() <= config.quarantineRate) {
        indi.canMove = false;
      }
      this._population.push(indi);
    }
  }

  createOneRandomSick() {
    let index = Math.floor(Math.random() * this.size);
    this._population[index].isSick = true;
    this.infectedArray.push(
      this.infectedArray[this.infectedArray.length - 1] + 1
    );
  }

  propagate(probability) {
    let numberOfInfected = 0;
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
        const dist =
          Math.abs(this._population[i].x - this._population[j].x) +
          Math.abs(this._population[i].y - this._population[j].y);
        if (dist > config.spreadDistance) {
          continue;
        }

        //no need to spread if one of the individual is dead
        if (this._population[i].isDead || this._population[j].isDead) {
          continue;
        }

        //no need to spread if one of the individual is healed
        if (this._population[i].isHealed || this._population[j].isHealed) {
          continue;
        }

        //Spreading
        if (this._population[i].isSick) {
          const isSpreading = Math.random() <= probability;
          this._population[j].isSick = isSpreading ? true : false;
          if (isSpreading) {
            numberOfInfected += 1;
          }
        }

        if (this._population[j].isSick) {
          const isSpreading = Math.random() <= probability;
          this._population[i].isSick = isSpreading ? true : false;
          if (isSpreading) {
            numberOfInfected += 1;
          }
        }
      }
    }
    const infectedCount = this._population.reduce((acc, current) => {
      if (current.isSick) {
        acc += 1;
      }
      return acc;
    }, 0);
    this.infectedArray.push(infectedCount);

    return this.infectedArray;
  }

  updateDeath() {
    for (let i = 0; i < this.size; i++) {
      if (!this._population[i].isSick) {
        continue;
      }
      const shouldDie = Math.random() <= config.deathRate;
      if (shouldDie) {
        this._population[i].die();
      }
    }

    const deathCount = this._population.reduce((acc, current) => {
      if (current.isDead) {
        acc += 1;
      }
      return acc;
    }, 0);
    this.deathArray.push(deathCount);
    return this.deathArray;
  }

  updateHeal() {
    for (let i = 0; i < this.size; i++) {
      if (!this._population[i].isSick) {
        continue;
      }
      const shouldHeal = Math.random() <= config.healRate;
      if (shouldHeal) {
        this._population[i].heal();
      }
    }
    const healCount = this._population.reduce((acc, current) => {
      if (current.isHealed) {
        acc += 1;
      }
      return acc;
    }, 0);
    this.healedArray.push(healCount);
    return this.healedArray;
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
