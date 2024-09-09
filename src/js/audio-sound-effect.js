import { AudioPlayer } from './audio-player';

export class SoundEffect extends AudioPlayer {
  constructor() {
    super([
      { key: 'EnterGame', player: new Audio('music/effects/enter-game.mp3') },
      { key: 'NewGame', player: new Audio('music/effects/new-game.mp3') },
      { key: 'Click', player: new Audio('music/effects/click.mp3') },
      { key: 'Win', player: new Audio('music/effects/win.mp3') },
      { key: 'NewBest', player: new Audio('music/effects/new-best.mp3') },
      { key: 'Error', player: new Audio('music/effects/error.mp3') },
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
