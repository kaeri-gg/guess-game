export class SimpleStorage {
  constructor() {
    this._storeName = 'GUESS-GAME-DATA';
    this._defaultData = {
      playerName: '',
      highScore: {
        Easy: 0,
        Normal: 0,
        Hard: 0,
      },
      audio: {
        enabled: true,
        volume: {
          background: 35,
          effect: 80,
        },
        activeBackgroundMusic: 'Default',
      },
    };
  }

  // Private Methods (_get, _save):
  // Retrieves data from localStorage. If no data is found, it returns the _defaultData.
  _get() {
    const data = localStorage.getItem(this._storeName);

    if (data) return JSON.parse(data);

    return this._defaultData;
  }

  // Saves the provided data back into localStorage after converting it to a JSON string.
  _save(data) {
    localStorage.setItem(this._storeName, JSON.stringify(data));
  }

  // Public Methods:
  getAll() {
    return this._get();
  }

  //player name
  getPlayerName() {
    return this._get().playerName;
  }

  updatePlayerName(name) {
    const data = this._get();
    this._save({
      ...data, // spreading old data
      playerName: name, // overriding only 1 property
    });

    // or
    // this._save({
    //   playerName: 'Katie',
    //   highScore: data.highScore,
    //   audio: data.audio,
    // });

    // or
    // data.playerName = 'Katie';
    // this._save(data);
  }

  //highscores
  getHighScores() {
    return this._get().highScore;
  }

  updateHighScoreByMode(mode, score) {
    const data = this._get();
    data.highScore[mode] = score;

    this._save(data);
  }

  // audio:
  getAudioIsEnabled() {
    return this._get().audio.enabled;
  }

  getAudioVolume() {
    return this._get().audio.volume;
  }

  updateAudioEnabled(enabled) {
    const data = this._get();
    data.audio.enabled = enabled;

    this._save(data);
  }

  updateBackgroundVolume(volume) {
    const data = this._get();
    data.audio.volume.background = volume;

    this._save(data);
  }

  updateEffectVolume(volume) {
    const data = this._get();
    data.audio.volume.effect = volume;

    this._save(data);
  }

  // background music:
  getBackgroundMusic() {
    return this._get().audio.activeBackgroundMusic;
  }

  updateBackgroundMusic(name) {
    const data = this._get();
    data.audio.activeBackgroundMusic = name;

    this._save(data);
  }

  resetAudio() {
    const data = this._get();
    const { audio } = this._defaultData;
    this._save({
      ...data,
      audio: audio,
    });
  }
}
