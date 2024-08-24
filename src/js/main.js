//import '../styles/style.css';
import { Game } from './game';
import $ from 'jquery';
import '@fortawesome/fontawesome-free/css/all.min.css';

export class Session {
  constructor() {
    this.countdownDiv = $('#countdownMainDiv');
    this.welcomeDiv = $('#welcomeMainDiv');
    this.startGameDiv = $('#startGameMainDiv');
    this.startButton = $('#gameStart');
    this.counterDiv = $('#counter');
    this.startNewDiv = $('#startNewDiv');

    this.playerNameInput = $('#playerNameInput');
    this.playerNameText = $('#playerNameText');
    this.playerInput = $('#playerInput');
    this.playerSubmitDiv = $('#playerSubmitDiv');
    this.playerSubmitButton = $('#playerSubmit');
    this.modeText = $('#modeText');
    this.hintText = $('#hintText');
    this.hintDiv = $('#hintDiv');
    this.youWonDiv = $('#youWonDiv');
    this.youWonText = $('#youWonText');

    this.easyModeOption = $('#easyMode');
    this.normalModeOption = $('#normalMode');
    this.hardModeOption = $('#hardMode');

    this.game = new Game();
    this.counter = 3;
    this.startGame = null;

    this.youWonDiv.hide();
    this.hintDiv.hide();

    this.initialize();
  }

  initialize() {
    this.startButton.click(() => {
      // TODO : .show / .hide
      this.welcomeDiv.addClass('hidden');
      this.countdownDiv.removeClass('hidden').addClass('flex');

      this.checkMode();
      const delay = 1000;
      this.startGame = setInterval(() => this.timer(), delay);
    });
  }

  checkMode() {
    this.selectedMode = $('input[name="mode"]:checked').val();
    this.game.setMode(this.selectedMode);
    console.log('Selected mode:', this.selectedMode);
  }

  timer() {
    if (--this.counter === 0) {
      this.showNewSession();
      clearInterval(this.showNewSession);
      return;
    }
    this.counterDiv.text(this.counter);
  }

  // show and start new session
  showNewSession() {
    this.countdownDiv.removeClass('flex').addClass('hidden');
    this.startGameDiv.removeClass('hidden').addClass('flex');
    this.playerSubmitDiv.removeClass('hidden').addClass('flex');
    this.startNewDiv.addClass('hidden');
    this.start();
  }

  start() {
    // TODO: display timer
    // TODO: display player name

    const mode = this.selectedMode;
    const formattedMode = mode + ' [' + this.game[mode][0] + ', ' + this.game[mode][1] + ']';

    this.playerNameText.text(this.playerNameInput.val());
    this.modeText.text(formattedMode);

    this.playerSubmitButton.on('click', () => {
      this.guess();
    });
  }

  guess() {
    // TODO: get the player name
    const inputValue = parseInt($('#playerInput').val());

    if (this.game.isGreaterThan(inputValue) === true) {
      this.hintDiv.show();
      this.hintText.text('higher!');
    } else if (this.game.isLessThan(inputValue) === true) {
      this.hintDiv.show();
      this.hintText.text('lower!');
    } else {
      this.youWonDiv.show();
      this.hintDiv.hide();
      this.playerSubmitDiv.hide();
      this.startNewDiv.show();
    }
  }
}

// Instantiate and start the GameApp
const gameApp = new Session();
