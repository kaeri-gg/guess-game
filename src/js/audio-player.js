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

export class SoundEffect extends AudioPlayer {
  constructor() {
    super(100, [
      { key: 'EnterGame', src: 'music/effects/enter-game.mp3' },
      { key: 'NewGame', src: 'music/effects/new-game.mp3' },
      { key: 'Hint', src: 'music/effects/hint.mp3' },
      { key: 'Win', src: 'music/effects/win.mp3' },
      { key: 'NewBest', src: 'music/effects/new-best.mp3' },
      { key: 'Error', src: 'music/effects/error.mp3' },
    ]);
  }

  playEnterGame() {
    this.play('EnterGame');
  }

  playError() {
    this.play('Error');
  }
}

export class BackgroundMusic extends AudioPlayer {
  constructor() {
    super(100, [
      {
        name: 'Default (My favorite)',
        key: 'Default',
        src: 'music/bgm/default.mp3',
      },
      {
        name: 'Cutesy Fantasy',
        key: 'Track01',
        src: 'music/bgm/tr1-cutesy-fantasy.mp3',
      },
      {
        name: 'Fire up the zone',
        key: 'Track02',
        src: 'music/bgm/tr2-fire-up-the-zone.mp3',
      },
      {
        name: "Let's play arcade",
        key: 'Track03',
        src: 'music/bgm/tr3-lets-play-arcade.mp3',
      },
      {
        name: 'No rush, just chill',
        key: 'Track04',
        src: 'music/bgm/tr4-no-rush-just-chill.mp3',
      },
      {
        name: 'Yes, like when you are a kid',
        key: 'Track05',
        src: 'music/bgm/tr5-yes-like-when-you-were-a-kid.mp3',
      },
    ]);
  }

  playTrack01() {
    this.stop('Track01');
    this.play('Track01');
  }

  stopAll() {
    this.audios.forEach((audio) => {
      this.stop(audio.key);
    });
  }
}
