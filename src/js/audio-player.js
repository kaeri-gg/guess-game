/**
 * @typedef {Object} AudioType - Audio properties
 * @property {string} AudioType.key - Audio key (Unique key)
 * @property {string} [AudioType.name] - Audio name (For HTML to display)
 * @property {number} [AudioType.startAt = 0] - Starting point in seconds
 * @property {number} [AudioType.stopAt] - Stopping point in seconds. (Defaults to the length of audio)
 * @property {HTMLAudioElement} [AudioType.player] - Audio instance
 */

/**
 * @abstract - it should not be instantiated directly! But extended. :P
 */
export class AudioPlayer {
  /**
   * @param {AudioType[]} audios - Audios to register
   */
  constructor(audios) {
    this.audios = audios;
    this.current = null;
  }

  /**
   * @param {number} volume - Default volume between [0 - 100]
   */
  setVolume(volume) {
    this.volume = volume / 100;
    this.audios = this.audios.map((audio) => {
      audio.player.volume = this.volume;

      return audio;
    });
  }

  play(key) {
    const { player } = this.getAudioBy(key);
    player.play();
  }

  stop(key) {
    const { player } = this.getAudioBy(key);
    player.pause();
    player.current = 0;
  }

  playOnLoop(key) {
    const { player } = this.getAudioBy(key);
    player.loop = true;
  }

  getAudioBy(key) {
    const audioFound = this.audios.find((audio) => audio.key === key);

    if (!audioFound) throw new Error(`Audio by key: ${key} not found!`);

    return audioFound;
  }
}
