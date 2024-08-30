//import '../styles/style.css';
import { Game } from './game';
import '@fortawesome/fontawesome-free/css/all.min.css';

export class Session {
  constructor() {
    this.countdownMainDiv = $('#countdownMainDiv');
    this.welcomeMainDiv = $('#welcomeMainDiv');
    this.startGameMainDiv = $('#startGameMainDiv');
    this.newGameButtonsDiv = $('#newGameButtonsDiv');
    this.modeDiv = $('#modeDiv');
    this.counterDiv = $('#counterText');
    this.startBtn = $('#startBtn');
    this.startNewBtn = $('#startNewBtn');
    this.startAgainBtn = $('#startAgainBtn');
    this.modes = $('input[name="mode"]');

    this.playerInputDiv = $('#playerInputDiv');
    this.playerNameInput = $('#playerNameInput');
    this.playerNameText = $('#playerNameText');
    this.playerInput = $('#playerInput');
    this.playerSubmitDiv = $('#playerSubmitDiv');
    this.playerSubmitBtn = $('#playerSubmitBtn');

    this.bestScoreName = $('#score>.best>.name');
    this.bestScoreTime = $('#score>.best>.time');
    this.currentScoreName = $('#score>.current>.name');
    this.currentScoreTime = $('#score>.current>.time');

    this.modeText = $('#modeText');
    this.hintText = $('#hintText');
    this.hintIcon = $('#hintIcon');
    this.hintDiv = $('#hintDiv');
    this.youWonDiv = $('#youWonDiv');
    this.youWonText = $('#youWonText');

    this.easyModeOption = $('#easyMode');
    this.normalModeOption = $('#normalMode');
    this.hardModeOption = $('#hardMode');

    this.enterGameSound = $('#enterGameSound')[0];
    this.newGameSound = $('#newGameSound')[0];
    this.hintSound = $('#hintSound')[0];
    this.winSound = $('#winSound')[0];
    this.errorSound = $('#errorSound')[0];

    this.newBestSound = $('#newBestSound')[0];

    this.game = new Game();

    this.showStartGamePage();
    //this.showWelcomePage();
    this.subscribeEventListeners();
    this.resetEverything();
  }

  subscribeEventListeners() {
    this.startBtn.on('click', () => {
      this.selectedMode = $('input[name="mode"]:checked').val();

      if (!this.playerNameInput.val()) {
        this.errorSound.play();
        this.playerNameInput.effect('shake');
        return;
      }
      if (!this.selectedMode) {
        this.errorSound.play();
        this.modeDiv.effect('shake');
        return;
      }

      this.enterGameSound.play();
      this.game.setMode(this.selectedMode);
      this.startTimer();
      this.showCountDownPage();
    });

    this.playerSubmitBtn.on('click', () => {
      this.guess();
    });

    this.startGameMainDiv.on('keydown', (event) => {
      if (event.code === 'Enter') {
        this.guess();
      }
    });

    this.startNewBtn.on('click', () => {
      this.newGameSound.play();
      this.showWelcomePage();
    });

    this.startAgainBtn.on('click', () => {
      this.newGameSound.play();
      this.tryAgain();
    });

    this.playerInput
      .on('click', () => {
        this.playerInput.val('');
      })
      .on('keydown', () => {
        this.hintDiv.hide('fast');
      });

    this.modes.on('click', () => {
      this.hintSound.play();
    });
  }

  startTimer() {
    this.timerId = setInterval(() => this.countDown(), 1000);
  }

  stopTimer() {
    clearInterval(this.timerId);
  }

  countDown() {
    this.counter--;
    this.counterDiv.text(this.counter);

    if (this.counter === 0) {
      this.showNewSession();
      this.stopTimer();
      this.game.startTimer();
    }
  }

  // show and start new session
  showNewSession() {
    this.showStartGamePage();
    this.showGameDetails();
  }

  showWelcomePage() {
    this.countdownMainDiv.hide();
    this.startGameMainDiv.hide();
    this.welcomeMainDiv.show();
    this.resetEverything();
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

  resetEverything() {
    this.resetPartial();
    this.modes.prop('checked', false);
    this.playerNameInput.val('');
  }

  resetPartial() {
    this.counter = 3;
    this.counterDiv.text(this.counter);
    this.playerInput.removeAttr('disabled');

    this.playerInput.val('');
    this.hintDiv.hide();
    this.youWonDiv.hide();
    this.newGameButtonsDiv.hide();
    this.playerSubmitDiv.show('slow');
  }

  tryAgain() {
    this.resetPartial();
    this.game.reset();
    this.showCountDownPage();
    this.startTimer();
  }

  showGameDetails() {
    const mode = this.selectedMode;

    this.playerNameText.text(this.playerNameInput.val());
    this.modeText.html(this.game.getFormattedMode());

    this.currentScoreName.text(this.playerNameInput.val());
    this.currentScoreTime.text('0.00');

    this.bestScoreName.text('Unknown');
    this.bestScoreTime.text('0.00');
  }

  markWrongInput() {
    this.playerInput.focus();
    this.playerInput.select();
    this.playerInputDiv.effect('shake');
  }

  guess() {
    const inputValue = parseInt(this.playerInput.val());
    this.hintDiv.hide();

    if (this.game.isGreaterThan(inputValue)) {
      this.hintSound.play();
      this.hintDiv.fadeIn();
      this.hintIcon.removeClass('fa-arrow-up text-green-500').addClass('fa-arrow-down text-red-500');
      this.hintText.html(`Your number <b>(${inputValue})</b> is <b>lower</b> than target!`);
      this.markWrongInput();
    }

    if (this.game.isLessThan(inputValue)) {
      this.hintSound.play();
      this.hintDiv.fadeIn();
      this.hintIcon.removeClass('fa-arrow-down text-red-500').addClass('fa-arrow-up text-green-500');
      this.hintText.html(`Your number <b>(${inputValue})</b> is <b>higher</b> than target!`);
      this.markWrongInput();
    }

    if (this.game.isEqualTo(inputValue)) {
      this.winSound.play();
      this.youWonDiv.show();
      this.playerInput.attr('disabled', '');
      this.hintDiv.hide();
      this.playerSubmitDiv.hide();

      this.newGameButtonsDiv.fadeIn();

      setTimeout(() => {
        this.newGameButtonsDiv.addClass('animate-bounce');
      }, 2300);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      this.game.stopTimer();

      const timeMs = this.game.getPlayerTime();
      const timeSc = timeMs / 1000;
      const formattedTime = timeSc.toFixed(2);
      this.currentScoreTime.text(formattedTime);
    }
  }
}

// Instantiate and start the GameApp
const gameApp = new Session();
