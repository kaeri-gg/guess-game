export class Keyboard {
    constructor(selector) {
        $(selector)
            .find('button')
            .on('click', ({ target }) => {
                // const { target } = e; // obj destructure

                const value = target.dataset.value;
                if (value === 'Clear') this.onClear();
                else if (value === 'Backspace') this.onBackspace();
                else this.onNumber(parseInt(value));
            });

        this.onClear = () => {};
        this.onBackspace = () => {};
        this.onNumber = () => {};
    }
}