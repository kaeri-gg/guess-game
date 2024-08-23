import { Generator } from './generator';

export class Game {
  constructor(min = 0, max = 100) {
    this.MIN = min;
    this.MAX = max;

    this.generator = new Generator();
    this.reset();
  }

  isEqualTo(value) {
    return value === this.numberToGuess;
  }

  isGreaterThan(value) {
    return this.numberToGuess > value;
  }

  isLessThan(value) {
    return this.numberToGuess < value;
  }

  reset() {
    this.numberToGuess = this.generator.generateNumber(this.MIN, this.MAX);
  }
}
