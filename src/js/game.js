import { Generator, generator } from './generator';

export class Game {
  constructor() {
    // try {
    //   const game = new Game(0, 10);
    //   console.log('Is equal to:', inputValue, this.game.isEqualTo(inputValue));
    //   console.log('Is greater than:', inputValue, this.game.isGreaterThan(inputValue));
    //   console.log('Is less than:', inputValue, this.game.isLessThan(inputValue));
    // } catch (error) {
    //   console.log(this.error.message);
    // }

    this.Easy = [1, 10];
    this.Normal = [1, 100];
    this.Hard = [1, 1000];
  }

  setMode(mode) {
    switch (mode) {
      case 'Hard':
        this.numberToGuess = generator.generateNumber(...this.Hard);
        break;
      case 'Normal':
        this.numberToGuess = generator.generateNumber(...this.Normal);
        break;
      case 'Easy':
        this.numberToGuess = generator.generateNumber(...this.Easy);
        break;
      default:
        throw new Error(`Mode "${mode}" doesn't exists.`);
    }
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
}
