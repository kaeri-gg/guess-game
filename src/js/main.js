//import '../styles/style.css';
import { Game } from './game';
import '@fortawesome/fontawesome-free/css/all.min.css';

export class Session {
  constructor() {
    this.countdownMainDiv = $('#countdownMainDiv');
    this.welcomeMainDiv = $('#welcomeMainDiv');
    this.startGameMainDiv = $('#startGameMainDiv');
    this.startBtn = $('#startBtn');
    this.counterDiv = $('#counterText');
    this.newGameButtonsDiv = $('#newGameButtonsDiv');
    this.startNewBtn = $('#startNewBtn');
    this.startAgainBtn = $('#startAgainBtn');
    this.modeDiv = $('#modeDiv');
    this.modes = $('input[name="mode"]');

    this.playerNameInput = $('#playerNameInput');
    this.playerNameText = $('#playerNameText');
    this.playerInput = $('#playerInput');
    this.playerSubmitDiv = $('#playerSubmitDiv');
    this.playerSubmitBtn = $('#playerSubmitBtn');
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
    this.startBtn.on('click', () => {
      this.selectedMode = $('input[name="mode"]:checked').val();

      if (!this.playerNameInput.val()) {
        this.playerNameInput.effect('shake');
        return;
      }
      if (!this.selectedMode) {
        this.modeDiv.effect('shake');
        return;
      }

      this.showCountDownPage();
      this.checkMode(this.selectedMode);
      this.timerId = setInterval(() => this.countDown(), 1000);
    });

    this.playerSubmitBtn.on('click', () => {
      this.guess();
    });

    this.startNewBtn.on('click', () => {
      this.showWelcomePage();
    });

    this.startAgainBtn.on('click', () => {
      // wip
      // this.playerInput.val('');
    });

    this.playerInput.on('click', () => {
      console.log('click');
      this.playerInput.val('');
    });
  }

  checkMode(selectedMode) {
    this.game.setMode(selectedMode);
  }

  countDown() {
    this.counter--;
    this.showCountDownPage();

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
    this.counter = 3;
    this.counterDiv.text(this.counter);

    this.modes.prop('checked', false); // clear the radio button
    this.playerNameInput.val('Harry'); // clear the radio button
    this.playerInput.val(''); //reset player input in start game page
    this.hintDiv.hide();
    this.youWonDiv.hide();
    this.newGameButtonsDiv.hide();
    this.playerSubmitDiv.show('slow');
    this.startBtn.show('slow');
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
