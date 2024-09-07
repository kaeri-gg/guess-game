import '@fortawesome/fontawesome-free/css/all.min.css';
import { Game } from './game';
import { Countdown } from '../services/countdown';
import { Keyboard } from './onscreen-keyboard';
import { Sound } from './sound';

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
    this.elapsedTime = $('#elapsedTime');
    this.onScreenKeyboardDiv = $('#onScreenKeyboardDiv');

    this.soundTrack = $('input[name="sound"]');

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
    this.youWonScore = $('#youWonDiv>.score');
    this.youWonText = $('#youWonText');

    this.easyModeOption = $('#easyMode');
    this.normalModeOption = $('#normalMode');
    this.hardModeOption = $('#hardMode');

    this.settingsControl = $('.settings-control');
    this.soundToggle = $('.sound-toggle');
    this.modal = $('.modal');
    this.modalOverlay = $('.modal-overlay');
    this.modalContainer = $('.modal-container');
    this.closeModal = $('.modal-container>.close');

    this.enterGameSound = $('#enterGameSound')[0];
    this.newGameSound = $('#newGameSound')[0];
    this.hintSound = $('#hintSound')[0];
    this.winSound = $('#winSound')[0];
    this.errorSound = $('#errorSound')[0];
    this.backgroundSound = $('#backgroundSound');
    this.saveSound = $('#saveSound');
    this.resetSound = $('#resetSound');

    this.newBestSound = $('#newBestSound')[0];

    this.game = new Game();
    this.countdownTimer = new Countdown(3);
    this.keyboard = new Keyboard('#onScreenKeyboardDiv');
    this.sound = new Sound();

    //this.showStartGamePage();
    //this.showCountDownPage();
    this.showWelcomePage();
    this.subscribeEventListeners();
    this.resetEverything();
  }

  subscribeEventListeners() {
    // getting selected background music:
    this.soundTrack.on('click', () => {
      this.selectedSound = $('input[name="sound"]:checked').val();
      this.sound.setSound(this.selectedSound);

      //set html source
      this.backgroundSound.attr('src', this.sound.setSource());
    });

    // on-screen keyboard listeners
    this.keyboard.onClear = () => {
      this.hintDiv.fadeOut('fast');
      this.playerInput.val('');
    };

    this.keyboard.onBackspace = () => {
      const val = parseInt(this.playerInput.val());
      const div = Math.floor(val / 10);
      this.playerInput.val(div || '');
      this.hintDiv.fadeOut('fast');
    };

    this.keyboard.onNumber = (value) => {
      // clear input when user clicks on keyboard again
      if (this.playerSubmitBtn.attr('data-clicked') === 'true') {
        this.playerInput.val('');
        this.playerSubmitBtn.attr('data-clicked', 'false');
      }
      const val = parseInt(this.playerInput.val() || 0);
      const target = val * 10 + value;
      this.playerInput.val(target);
      this.hintDiv.fadeOut('fast');
    };

    this.game.onTick = (elapsedTime) => {
      this.elapsedTime.text(`${elapsedTime} sec`);
    };

    this.settingsControl.on('click', () => {
      this.modal.show('ease-out duration-300');
    });

    this.closeModal.on('click', () => {
      this.modal.hide('ease-in duration-200');
    });

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
      this.countdownTimer.start();
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
        this.hintDiv.fadeOut('fast');
      });

    this.modes.on('click', () => {
      this.hintSound.play();
    });

    this.countdownTimer.onStart = () => {
      this.showCountDownPage();
    };

    this.countdownTimer.onTick = (countDownValue) => {
      this.counterDiv.text(countDownValue);
    };

    this.countdownTimer.onFinish = () => {
      this.showNewSession();
      this.game.startTimer();
    };
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
    this.playerInput.removeAttr('disabled');

    this.playerInput.val('');
    this.hintDiv.hide();
    this.youWonDiv.hide();
    this.newGameButtonsDiv.hide();
    this.playerSubmitDiv.show('slow');
    this.onScreenKeyboardDiv.show();
  }

  tryAgain() {
    this.resetPartial();
    this.game.reset();
    this.countdownTimer.start();
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
    this.hintSound.play();
    this.hintDiv.fadeIn();
    this.playerInputDiv.effect('shake');
  }

  guess() {
    const inputValue = parseInt(this.playerInput.val());
    this.hintDiv.hide();
    this.playerSubmitBtn.attr('data-clicked', 'true');

    if (this.game.isGreaterThan(inputValue)) {
      this.hintIcon.removeClass('fa-arrow-up text-green-500').addClass('fa-arrow-down text-red-500');
      this.hintText.html(`Your number <b>(${inputValue})</b> is <b>lower</b> than target!`);
      this.markWrongInput();
    }

    if (this.game.isLessThan(inputValue)) {
      this.hintIcon.removeClass('fa-arrow-down text-red-500').addClass('fa-arrow-up text-green-500');
      this.hintText.html(`Your number <b>(${inputValue})</b> is <b>higher</b> than target`);
      this.markWrongInput();
    }

    if (this.game.isEqualTo(inputValue)) {
      this.winSound.play();
      this.youWonDiv.show();
      this.playerInput.attr('disabled', '');
      this.hintDiv.hide();
      this.playerSubmitDiv.hide();
      this.onScreenKeyboardDiv.hide();

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
      this.elapsedTime.text(formattedTime);
      this.youWonScore.text(`Time: ${formattedTime}`);
    }
  }
}

// Instantiate and start the session
const gameApp = new Session();
