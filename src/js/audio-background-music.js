import { AudioPlayer } from './audio-player';

export class BackgroundMusic extends AudioPlayer {
  constructor() {
    super([
      {
        name: 'Default (My favorite!)',
        key: 'Default',
        player: new Audio('music/bgm/default.mp3'),
      },
      {
        name: 'Cutesy Fantasy',
        key: 'Track01',
        player: new Audio('music/bgm/tr1-cutesy-fantasy.mp3'),
      },
      {
        name: 'Fire up the zone',
        key: 'Track02',
        player: new Audio('music/bgm/tr2-fire-up-the-zone.mp3'),
      },
      {
        name: "Let's play arcade",
        key: 'Track03',
        player: new Audio('music/bgm/tr3-lets-play-arcade.mp3'),
      },
      {
        name: 'No rush, just chill',
        key: 'Track04',
        player: new Audio('music/bgm/tr4-no-rush-just-chill.mp3'),
      },
      {
        name: 'Yes, like when you are a kid',
        key: 'Track05',
        player: new Audio('music/bgm/tr5-yes-like-when-you-were-a-kid.mp3'),
      },
    ]);
  }

  playDefault() {
    this.stop('Default');
    this.play('Default');
  }

  stopAll() {
    this.audios.forEach((audio) => {
      this.stop(audio.key);
    });
  }
}
