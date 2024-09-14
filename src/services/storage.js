export class SimpleStorage {
  constructor() {
    this._storeName = 'GUESS-GAME-DATA';
    this._defaultData = {
      playerName: '',
      highScore: {
        Easy: {
          playerName: '',
          bestScore: 9999999,
        },
        Normal: {
          playerName: '',
          bestScore: 9999999,
        },
        Hard: {
          playerName: '',
          bestScore: 9999999,
        },
      },
      audio: {
        enabled: true,
        volume: {
          background: 35,
          effect: 80,
        },
        activeBackgroundMusic: 'Default',
      },
      scores: [],
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

  //scores
  getAllScoresMode() {
    const scores = this._get().scores;
    const allModes = scores.map((score) => score.mode); // Map to get the 'mode' property from each object
    return allModes; // Return the array of modes
  }

  getAllScores() {
    const scores = this._get().scores;
    return scores;
  }

  getAllEasyScores() {
    const easyScores = this._get()
      .scores.filter((score) => score.mode === 'Easy')
      .map((score) => score.score);

    return easyScores;
  }

  addScores(playerName, mode, score) {
    const data = this._get();

    data.scores.push({
      playerName,
      mode,
      score,
    });

    // Ensure scores is an array
    //const scores = Array.isArray(data.scores) ? data.scores : [];

    // append new score to the object of scores
    // const newScore = [
    //   ...data.scores, // existing scores
    //   {
    //     playerName,
    //     mode,
    //     score,
    //   },
    // ];

    this._save(data);
  }

  //highscores
  getHighScores() {
    return this._get().highScore;
  }

  // updateHighScoreByMode(mode, score, name) {
  //   const data = this._get();
  //   data.highScore[mode].bestScore = score;
  //   data.highScore[mode].playerName = name;

  //   this._save(data);
  // }

  updateAllHighScores(highScore) {
    const data = this._get();
    data.highScore = highScore;

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
