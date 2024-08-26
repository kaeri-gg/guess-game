//import '../styles/style.css';
import { Game } from './game';
import $ from 'jquery';
import '@fortawesome/fontawesome-free/css/all.min.css';

export class Session {
  constructor() {
    this.countdownMainDiv = $('#countdownMainDiv');
    this.welcomeMainDiv = $('#welcomeMainDiv');
    this.startGameMainDiv = $('#startGameMainDiv');
    this.startButton = $('#startButton');
    this.counterDiv = $('#counterText');
    this.newGameButtonsDiv = $('#newGameButtonsDiv');
    this.startNew = $('#startNew');
    this.reset = $('#reset');
    this.modes = $('input[name="mode"]');

    this.playerNameInput = $('#playerNameInput');
    this.playerNameText = $('#playerNameText');
    this.playerInput = $('#playerInput');
    this.playerSubmitDiv = $('#playerSubmitDiv');
    this.playerSubmitButton = $('#playerSubmit');
    this.modeText = $('#modeText');
    this.hintText = $('#hintText');
    this.hintIcon = $('#hintIcon');
    this.hintDiv = $('#hintDiv');
    this.youWonDiv = $('#youWonDiv');
    this.youWonText = $('#youWonText');

    this.easyModeOption = $('#easyMode');
    this.normalModeOption = $('#normalMode');
    this.hardModeOption = $('#hardMode');

    this.game = new Game();

    this.showWelcomePage();
    this.subscribeEventListeners();
    this.resetFields();
  }

  subscribeEventListeners() {
    this.startButton.on('click', () => {
      this.showCountDownPage();

      this.checkMode();
      this.timerId = setInterval(() => this.countDown(), 1000);
    });

    this.startNew.on('click', () => {
      console.log('start new click');
      this.showWelcomePage();
    });

    this.reset.on('click', () => {
      console.log('reset click');
    });

    this.playerSubmitButton.on('click', () => {
      this.guess();
    });
  }

  checkMode() {
    this.selectedMode = $('input[name="mode"]:checked').val();
    this.game.setMode(this.selectedMode);
    console.log('Selected mode:', this.selectedMode);
  }

  countDown() {
    this.counter--;
    this.counterDiv.text(this.counter);

    if (this.counter === 0) {
      this.showNewSession();
    }
  }

  // show and start new session
  showNewSession() {
    clearInterval(this.timerId);
    this.showStartGamePage();
    this.showGameDetails();
  }

  showWelcomePage() {
    this.countdownMainDiv.hide();
    this.startGameMainDiv.hide();
    this.welcomeMainDiv.show(); // display
    this.resetFields();
  }

  showCountDownPage() {
    this.welcomeMainDiv.hide();
    this.startGameMainDiv.hide();
    this.countdownMainDiv.show();
  }

  showStartGamePage() {
    this.welcomeMainDiv.hide();
    this.countdownMainDiv.hide();
    this.newGameButtonsDiv.hide();

    this.startGameMainDiv.show();
    this.playerSubmitDiv.show();
  }

  resetFields() {
    this.counter = 1;
    this.counterDiv.text(this.counter);

    this.modes.prop('checked', false); // clear the radio button
    this.playerNameInput.val('Harry'); // clear the radio button
    this.playerInput.val(''); //reset player input in start game page
    this.hintDiv.hide();
    this.youWonDiv.hide();
    this.newGameButtonsDiv.hide();
    this.playerSubmitDiv.show('slow');
    this.startButton.show('slow');
  }

  showGameDetails() {
    const mode = this.selectedMode;
    const formattedMode = mode + ' [' + this.game[mode][0] + ', ' + this.game[mode][1] + ']';

    this.playerNameText.text(this.playerNameInput.val());
    this.modeText.text(formattedMode);
  }

  guess() {
    // TODO: get the player name
    const inputValue = parseInt($('#playerInput').val());
    this.hintDiv.hide();

    if (this.game.isGreaterThan(inputValue)) {
      this.hintDiv.fadeIn();
      this.hintIcon.removeClass('fa-arrow-up text-green-500').addClass('fa-arrow-down text-red-500');
      this.hintText.text('lower!');
    }

    if (this.game.isLessThan(inputValue)) {
      this.hintDiv.fadeIn();
      this.hintIcon.removeClass('fa-arrow-down text-red-500').addClass('fa-arrow-up text-green-500');
      this.hintText.text('higher!');
    }

    if (this.game.isEqualTo(inputValue)) {
      this.youWonDiv.show();
      this.hintDiv.hide();
      this.playerSubmitDiv.hide();
      this.newGameButtonsDiv.show('fast');
    }
  }
}

// Instantiate and start the GameApp
const gameApp = new Session();
