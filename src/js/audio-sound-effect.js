import { AudioPlayer } from './audio-player';

export class SoundEffect extends AudioPlayer {
  constructor() {
    super(100, [
      { key: 'EnterGame', src: 'music/effects/enter-game.mp3' },
      { key: 'NewGame', src: 'music/effects/new-game.mp3' },
      { key: 'Click', src: 'music/effects/click.mp3' },
      { key: 'Win', src: 'music/effects/win.mp3' },
      { key: 'NewBest', src: 'music/effects/new-best.mp3' },
      { key: 'Error', src: 'music/effects/error.mp3' },
    ]);
  }

  playEnterGame() {
    this.play('EnterGame');
  }

  playNewGame() {
    this.play('NewGame');
  }

  playClick() {
    this.play('Click');
  }

  playWin() {
    this.play('Win');
  }

  playNewBest() {
    this.play('NewBest');
  }

  playError() {
    this.play('Error');
  }
}
