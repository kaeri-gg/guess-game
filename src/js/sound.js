export class Sound {
  constructor() {
    this.sounds = {
      Default: 'music/bgm/default.mp3',
      Track1: 'music/bgm/tr1-cutesy-fantasy.mp3',
      Track2: 'music/bgm/tr2-fire-up-the-zone.mp3',
      Track3: 'music/bgm/tr3-lets-play-arcade.mp3',
      Track4: 'music/bgm/tr4-no-rush-just-chill.mp3',
      Track5: 'music/bgm/tr5-yes-like-when-you-were-a-kid.mp3',
    };
  }

  // gets and sets the selected sound
  setSound(selectedSound) {
    this.currentSound = selectedSound;
  }

  // return the source based on selected sounds
  setSource() {
    return this.sounds[this.currentSound];
  }

  reset() {
    return console.log(this.sounds.Default);
  }
}
