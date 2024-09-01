import { generator } from './generator';

export class Game {
    constructor() {
        this.modes = {
            Easy: [1, 10],
            Normal: [1, 100],
            Hard: [1, 1000],
        };
        this.startedAt = +Infinity;
        this.stoppedAt = +Infinity;
    }

    setMode(mode) {
        this.currentMode = mode;

        const selectedMode = this.modes[mode];

        if (!selectedMode) throw new Error(`Mode "${mode}" doesn't exists.`);

        this.numberToGuess = generator.generateNumber(...selectedMode);
    }

    getFormattedMode() {
        const [min, max] = this.modes[this.currentMode]; //destructure

        return `${this.currentMode} <b>[${min}, ${max}]</b>`;
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
        this.setMode(this.currentMode);
    }

    startTimer() {
        this.startedAt = Date.now();
    }

    stopTimer() {
        this.stoppedAt = Date.now();
    }

    getPlayerTime() {
        return this.stoppedAt - this.startedAt;
    }
}