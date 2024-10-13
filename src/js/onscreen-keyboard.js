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

    const map = {
      Enter: () => this.onEnter(),
      NumpadEnter: () => this.onEnter(),

      Backspace: () => this.onBackspace(),
      Digit0: () => this.onNumber(0),
      Digit1: () => this.onNumber(1),
      Digit2: () => this.onNumber(2),
      Digit3: () => this.onNumber(3),
      Digit4: () => this.onNumber(4),
      Digit5: () => this.onNumber(5),
      Digit6: () => this.onNumber(6),
      Digit7: () => this.onNumber(7),
      Digit8: () => this.onNumber(8),
      Digit9: () => this.onNumber(9),

      Numpad0: () => this.onNumber(0),
      Numpad1: () => this.onNumber(1),
      Numpad2: () => this.onNumber(2),
      Numpad3: () => this.onNumber(3),
      Numpad4: () => this.onNumber(4),
      Numpad5: () => this.onNumber(5),
      Numpad6: () => this.onNumber(6),
      Numpad7: () => this.onNumber(7),
      Numpad8: () => this.onNumber(8),
      Numpad9: () => this.onNumber(9),
    };

    $(document).on('keydown', (event) => {
      if (!$(selector).is(':visible')) return;

      const action = map[event.code];

      if (action) action();
    });
  }
}
