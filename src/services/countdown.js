/**
 * Annotations below are from JSDocs @link - https://jsdoc.app/
 */

/**
 * The `Countdown` class provides a countdown timer that can be used to display a "get ready" countdown
 * before gameplay begins. This class utilizes the callback design pattern to allow the caller
 * to execute custom functions at each tick of the countdown and upon completion.
 *
 * @example
 * const countdown = new Countdown(3);
 * countdown.onTick = (timeLeft) => console.log(timeLeft);
 * countdown.onFinish = () => console.log('Go!');
 * countdown.start();
 *
 * @class
 */
export class Countdown {
  /**
   * Creates an instance of the Countdown class.
   *
   * @constructor
   * @param {number} start - The starting value for the countdown, in seconds.
   */
  constructor(start) {
    /**
     * @private - Marked as private to make sure it won't show up in IDE suggestions (but it still can be used, because it is Javascript afterall 😀)
     * @type {number} - We need to save it in the context because we want to reset timer, so we know what the original reset value is
     */
    this.defaultTime = start;

    /**
     * @private
     */
    this.callback = {
      onStart: () => {},
      onTick: () => {},
      onFinish: () => {},
    };
  }

  /**
   * Sets the callback function to be called on every tick of the countdown.
   *
   * @param {function(number): void} callback - The function to call on each tick. Receives the remaining time as an argument.
   */
  set onTick(callback) {
    this.callback.onTick = callback;
  }

  /**
   * Sets the callback function to be called when the countdown finishes.
   *
   * @param {function(): void} callback - The function to call when the countdown reaches zero.
   */
  set onFinish(callback) {
    this.callback.onFinish = callback;
  }

  /**
   * Sets the callback function to be called when the countdown starts(before the 1st tick).
   *
   * @param {function(): void} callback - The function to call when start is invoked
   */
  set onStart(callback) {
    this.callback.onStart = callback;
  }

  /**
   * Starts the countdown timer. The `onTick` callback is invoked every second,
   * and the `onFinish` callback is invoked when the countdown reaches zero.
   *
   * @method
   */
  start() {
    let counter = this.defaultTime; // Reset timer to a default start value

    this.callback.onStart(); // Call onStart function/callback
    this.callback.onTick(counter); // Invoke it immediately

    // Set up the timer for subsequent ticks
    const timerId = setInterval(() => {
      counter--; // Decrement counter value

      if (counter === 0) {
        // Signal that the countdown has finished
        this.callback.onFinish();
        // Stop the timer when it reaches zero
        return clearInterval(timerId);
      }

      // Continue ticking and invoke the onTick callback
      this.callback.onTick(counter);
    }, 1000);
  }
}

function FunctionContructorTimer(start = 3) {
  const callback = {
    onTick: null,
    onFinish: null,
  };

  this.setOnTick = (fn) => (callback.onTick = fn);
  this.setOnFInish = (fn) => (callback.onFinish = fn);

  this.start = () => {
    let counter = start;

    callback.onTick(--counter);

    const timerId = setInterval(() => {
      if (counter === 0) {
        callback.onFinish();
        return clearInterval(timerId);
      }

      callback.onTick(--counter);
    }, 1000);
  };
}
