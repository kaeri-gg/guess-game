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
    this.onEnter = () => {};
    this.onNumber = () => {};

    $(document).on('keydown', (event) => {
      if (!$(selector).is(':visible')) return;

      if (event.code === 'Enter') return this.onEnter();
      if (event.code === 'Backspace') return this.onClear();

      const key = event.which || event.keyCode;

      // Check if it's a number key (0-9)
      if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
        // 48-57 are number keys (0-9) on the keyboard
        // 96-105 are number keys (0-9) on the numpad
        const numberValue = String.fromCharCode(key);
        this.onNumber(parseInt(numberValue));
      }
    });
  }
}
