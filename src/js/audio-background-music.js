import { AudioPlayer } from './audio-player';

export class BackgroundMusic extends AudioPlayer {
  constructor() {
    super(100, [
      {
        name: 'Default (My favorite!)',
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

  playDefault() {
    this.stop('Default');
    this.play('Default');
  }

  playTrack01() {
    this.stop('Track01');
    this.play('Track01');
  }

  playTrack02() {
    this.stop('Track02');
    this.play('Track02');
  }

  playTrack03() {
    this.stop('Track03');
    this.play('Track03');
  }

  playTrack04() {
    this.stop('Track04');
    this.play('Track04');
  }

  playTrack05() {
    this.stop('Track05');
    this.play('Track05');
  }

  stopAll() {
    this.audios.forEach((audio) => {
      this.stop(audio.key);
    });
  }
}
