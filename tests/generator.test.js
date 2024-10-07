import { describe, expect, it } from 'vitest';
import { Generator } from '../src/js/generator';

describe('Generator', () => {
    describe('generateNumber', () => {
        it('should generate number', () => {
            //arrange
            const generator = new Generator();

            //act
            const result = generator.generateNumber(2, 10);

            //assert
            expect(result).not.toBeNaN();
            expect(result).toBeGreaterThanOrEqual(2);
            expect(result).toBeLessThanOrEqual(10);
        });

        it('should throw an error', () => {
            //arrange
            const generator = new Generator();

            //act
            const act = () => generator.generateNumber(11, 10);

            //assert
            expect(act).toThrowError('Minimum should be less than maximum');
        });
    });
});