/**
 * @typedef {Object} AudioType - Audio properties
 * @property {string} AudioType.key - Audio key (Unique key)
 * @property {string} AudioType.src - Audio source (Absolute path)
 * @property {string} [AudioType.name] - Audio name (For HTML to display)
 * @property {number} [AudioType.startAt = 0] - Starting point in seconds
 * @property {number} [AudioType.stopAt] - Stopping point in seconds. (Defaults to the length of audio)
 */

export class AudioPlayer {
  /**
   * @param {number} volume - Default volume between [0 - 100]
   * @param {AudioType[]} audios - Audios to register
   */
  constructor(volume, audios) {
    this.audios = audios;
    this.volume = volume / 100;
    this.current = null;

    this.audios = this.audios.map((audio) => {
      audio.player = new Audio(audio.src);
      audio.player.value = this.volume;

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

  getAudioBy(key) {
    const audioFound = this.audios.find((audio) => audio.key === key);

    if (!audioFound) throw new Error(`Audio by key: ${key} not found!`);

    return audioFound;
  }
}
