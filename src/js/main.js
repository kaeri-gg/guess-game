import '@fortawesome/fontawesome-free/css/all.min.css';
import { Game } from './game';
import { Countdown } from '../services/countdown';
import { Keyboard } from './onscreen-keyboard';
import { Sound } from './sound';
import { SoundEffect } from './audio-sound-effect';
import { BackgroundMusic } from './audio-background-music';

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

    this.backgroundSound = $('#backgroundSound');
    this.saveSound = $('#saveSound');
    this.resetSound = $('#resetSound');

    this.game = new Game();
    this.countdownTimer = new Countdown(3);
    this.keyboard = new Keyboard('#onScreenKeyboardDiv');
    this.sound = new Sound();
    this.backgroundMusic = new BackgroundMusic();
    this.soundEffect = new SoundEffect();

    //this.showStartGamePage();
    //this.showCountDownPage();
    this.showWelcomePage();
    this.subscribeEventListeners();
    this.resetEverything();
    this.registerAudios();
    //this.backgroundMusic.playDefault();
  }

  subscribeEventListeners() {
    // getting selected background music:
    this.soundTrack.on('click', () => {
      this.soundEffect.playClick();
      this.selectedSound = $('input[name="sound"]:checked').val();
      this.sound.setSound(this.selectedSound);

      //set html source
      this.backgroundSound.attr('src', this.sound.setSource());
    });

    this.resetSound.on('click', () => {
      this.soundEffect.playClick();

      this.backgroundSound.attr('src', this.sound.reset());
      //$('input[name="sound"]:checked').val();
    });

    this.soundToggle.on('click', () => {
      this.soundEffect.playClick();
      this.backgroundMusic.stopAll();
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
      this.soundEffect.playClick();
      this.modal.show('ease-out duration-300');
    });

    this.closeModal.on('click', () => {
      this.soundEffect.playClick();
      this.modal.hide('ease-in duration-200');
    });

    this.startBtn.on('click', () => {
      this.selectedMode = $('input[name="mode"]:checked').val();

      if (!this.playerNameInput.val()) {
        this.soundEffect.playError();
        this.playerNameInput.effect('shake');
        return;
      }
      if (!this.selectedMode) {
        this.soundEffect.playError();
        this.modeDiv.effect('shake');
        return;
      }

      this.soundEffect.playEnterGame();
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
      this.soundEffect.playEnterGame();
      this.showWelcomePage();
    });

    this.startAgainBtn.on('click', () => {
      this.soundEffect.playEnterGame();
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
      this.soundEffect.playClick();
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
    this.soundEffect.playClick();
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
      this.soundEffect.playWin();
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

  registerAudios() {
    this.backgroundMusic.audios.forEach((audio) => {
      $('#background-audios').append(`
        <div class="inline-flex items-center">
         <label class="relative flex cursor-pointer items-center rounded-full p-2" for="${audio.key}">
           <input
             name="sound"
             type="radio"
             class="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 checked:border-default-bg-default-orange peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border text-gray-900 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-8 before:w-8 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:before:bg-default-orange hover:before:opacity-10"
             id="${audio.key}"
             value="${audio.key}"
           />
 
           <span
             class="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-default-orange opacity-0 transition-opacity peer-checked:opacity-100"
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               class="h-3.5 w-3.5"
               viewBox="0 0 16 16"
               fill="currentColor"
             >
               <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
             </svg>
           </span>
         </label>
         <label class="mt-px cursor-pointer select-none text-sm text-gray-500" for="${audio.key}">
           ${audio.name}
         </label>
       </div>
      `);
    });
  }
}

// Instantiate and start the session
const gameApp = new Session();
