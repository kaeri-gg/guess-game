//import '../styles/style.css';
import { Game } from './game';
import $ from 'jquery';
import '@fortawesome/fontawesome-free/css/all.min.css';

export class Session {
  constructor() {
    this.countdownMainDiv = $('#countdownMainDiv');
    this.welcomeMainDiv = $('#welcomeMainDiv');
    this.startGameMainDiv = $('#startGameMainDiv');
    this.startButton = $('#gameStart');
    this.counterDiv = $('#counterText');
    this.startNewDiv = $('#startNewDiv');
    this.startNew = $('#startNew');
    this.reset = $('#reset');

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

    this.startNew.on('click', () => {
      console.log('start new click');
      //this.new();
      this.showWelcomePage();
    });

    this.reset.on('click', () => {
      console.log('reset click');
      this.start();
    });
  }

  initialize() {
    this.showWelcomePage();
    this.startButton.on('click', () => {
      this.showCountDownPage();

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
    this.showStartGamePage();
    this.playerSubmitDiv.removeClass('hidden').addClass('flex');
    this.startNewDiv.addClass('hidden');
    this.start();
  }

  showWelcomePage() {
    this.countdownMainDiv.hide();
    this.startGameMainDiv.hide();
    this.welcomeMainDiv.show(); // display

    // reset
  }

  showCountDownPage() {
    this.welcomeMainDiv.hide();
    this.startGameMainDiv.hide();
    this.countdownMainDiv.show();
  }

  showStartGamePage() {
    this.welcomeMainDiv.hide();
    this.countdownMainDiv.hide();
    this.startGameMainDiv.show();
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

    if (this.game.isGreaterThan(inputValue)) {
      this.hintDiv.show();
      this.hintText.text('lower!');
    }

    if (this.game.isLessThan(inputValue)) {
      this.hintDiv.show();
      this.hintText.text('higher!');
    }

    if (this.game.isEqualTo(inputValue)) {
      this.youWonDiv.show();
      this.hintDiv.hide();
      this.playerSubmitDiv.hide();
      this.startNewDiv.show();
    }
  }
}

// Instantiate and start the GameApp
const gameApp = new Session();
