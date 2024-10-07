export class Generator {
    generateNumber(min, max) {
        if (min >= max) throw new Error('Minimum should be less than maximum.');

        return Math.floor(Math.random() * (max - min) + min);
    }
}

export const generator = new Generator();