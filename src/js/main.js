import '@fortawesome/fontawesome-free/css/all.min.css';
import { Game } from './game';
import { Countdown } from '../services/countdown';
import { Keyboard } from './onscreen-keyboard';
import { SoundEffect } from './audio-sound-effect';
import { BackgroundMusic } from './audio-background-music';
import { SimpleStorage } from '../services/storage';

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
    this.newBestText = $('#newBestText');

    this.easyModeOption = $('#easyMode');
    this.normalModeOption = $('#normalMode');
    this.hardModeOption = $('#hardMode');

    this.settingsControl = $('.settings-control');
    this.volumnToggle = $('.volume-toggle');
    this.volumnIcon = $('.volume-toggle-icon');
    this.modal = $('.modal');
    this.closeModal = $('.modal-container>.close');
    this.selectBackgroundAudios = $('#background-audios');
    this.saveSound = $('#saveSound');
    this.resetSound = $('#resetSound');
    this.effectSound = $('#effectSound');
    this.bgSound = $('#bgSound');

    this.game = new Game();
    this.countdownTimer = new Countdown(3);
    this.backgroundMusic = new BackgroundMusic();
    this.soundEffect = new SoundEffect();
    this.store = new SimpleStorage();
    this.keyboard = new Keyboard('#onScreenKeyboardDiv');

    this.showWelcomePage();
    this.subscribeEventListeners();
    this.resetEverything();
    this.registerAudios();
    this.restoreLocalSettings();
    this.displayInitialHighScores();

    this.playerNameInput.val(this.store.getPlayerName());
  }

  restoreLocalSettings() {
    this.store.resetAudio();

    const { audio } = this.store.getAll();
    const currentTrack = this.store.getBackgroundMusic();

    this.effectSound.val(audio.volume.effect);
    this.bgSound.val(audio.volume.background);

    $(`#${currentTrack}`).prop('checked', true);
    this.backgroundMusic.setVolume(audio.volume.background);
    this.soundEffect.setVolume(audio.volume.effect);

    this.backgroundMusic.play(currentTrack, { loop: true });
  }

  subscribeEventListeners() {
    $(document).one('click', () => {
      if (this.store.getAudioIsEnabled()) {
        const currentTrack = this.store.getBackgroundMusic();
        this.backgroundMusic.play(currentTrack, { loop: true });
      }
    });

    this.effectSound.on('change', () => {
      this.store.updateEffectVolume(+this.effectSound.val());
      this.soundEffect.setVolume(+this.effectSound.val());
    });

    this.bgSound.on('change', () => {
      this.store.updateBackgroundVolume(+this.bgSound.val());
      this.backgroundMusic.setVolume(+this.bgSound.val());
    });

    this.settingsControl.on('click', () => {
      this.soundEffect.playClick();
      this.modal.show('ease-out duration-300');
      $(`#${this.store.getBackgroundMusic()}`).prop('checked', true);
    });

    this.closeModal.on('click', () => {
      const currentTrack = this.store.getBackgroundMusic();

      this.soundEffect.playClick();
      this.backgroundMusic.stopAll();
      this.backgroundMusic.play(currentTrack, { loop: true });

      this.modal.hide('ease-in duration-200');
    });

    this.saveSound.on('click', () => {
      const selectedAudioKey = $('input[name="sound"]:checked').val();

      this.store.updateBackgroundMusic(selectedAudioKey);
      this.soundEffect.playClick();
      this.modal.hide('ease-in duration-200');
    });

    this.volumnToggle.on('click', () => {
      this.soundEffect.playClick();

      if (this.store.getAudioIsEnabled()) {
        //update the audio to false
        this.store.updateAudioEnabled(false);
        this.volumnIcon.removeClass('fa-volume-low').addClass('fa-volume-xmark');
        this.backgroundMusic.stopAll();
        return;
      }

      if (!this.store.getAudioIsEnabled()) {
        //update the audio to true
        const currentTrack = this.store.getBackgroundMusic();

        this.store.updateAudioEnabled(true);
        this.volumnIcon.removeClass('fa-volume-xmark').addClass('fa-volume-low');
        this.backgroundMusic.play(currentTrack, { loop: true });
        return;
      }
    });

    // selecting background music:
    this.selectBackgroundAudios.on('change', 'input[name="sound"]', () => {
      this.soundEffect.playClick();

      const selectedAudioKey = $('input[name="sound"]:checked').val();

      this.backgroundMusic.stopAll();
      this.backgroundMusic.play(selectedAudioKey, { loop: true });
    });

    this.resetSound.on('click', () => {
      this.soundEffect.playClick();
      this.backgroundMusic.stopAll();
      this.restoreLocalSettings();
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

    // player engangements
    this.startBtn.on('click', () => {
      this.soundEffect.playEnterGame();

      const playerName = this.playerNameInput.val();
      this.selectedMode = $('input[name="mode"]:checked').val();

      if (!playerName) {
        this.soundEffect.playError();
        this.playerNameInput.effect('shake');
        return;
      }
      if (!this.selectedMode) {
        this.soundEffect.playError();
        this.modeDiv.effect('shake');
        return;
      }

      this.store.updatePlayerName(playerName);
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
      this.displayInitialHighScores();
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
    this.newBestText.hide();
  }

  displayInitialHighScores() {
    const highScores = this.store.getHighScores();
    const bestSc = (score) => (score / 1000).toFixed(2);

    $('#best-name-Easy').text(highScores.Easy.playerName);
    $('#best-name-Normal').text(highScores.Normal.playerName);
    $('#best-name-Hard').text(highScores.Hard.playerName);

    $('#best-score-Easy').text(bestSc(highScores.Easy.bestScore));
    $('#best-score-Normal').text(bestSc(highScores.Normal.bestScore));
    $('#best-score-Hard').text(bestSc(highScores.Hard.bestScore));
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
    this.playerNameText.text(this.playerNameInput.val());
    this.modeText.html(this.game.getFormattedMode());

    this.currentScoreName.text(this.playerNameInput.val());
    this.currentScoreTime.text('0.00');

    this.displayHighScoreDetails();
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
      this.game.stopTimer();

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

      const timeMs = this.game.getPlayerTime();
      this.store.addScores(this.playerNameInput.val(), this.game.getSelectedMode(), timeMs);

      this.evaluateBestScore();
    }
  }

  displayScoreDetails() {
    const timeMs = this.game.getPlayerTime();
    const timeSc = timeMs / 1000;
    const currentSessionScore = timeSc.toFixed(2);

    // update elements with current score
    this.currentScoreTime.text(currentSessionScore);
    this.elapsedTime.text(currentSessionScore);
    this.youWonScore.text(`Time: ${currentSessionScore}`);
  }

  displayHighScoreDetails() {
    const highScores = this.store.getHighScores();
    const currentMode = this.game.getSelectedMode();
    const currentHighScorer = highScores[currentMode];
    this.bestScoreName.text(currentHighScorer.playerName);
    this.bestScoreTime.text((currentHighScorer.bestScore / 1000).toFixed(2));
  }

  evaluateBestScore() {
    const currentMode = this.game.getSelectedMode();
    const allScores = this.store.getAllScores();

    const highScore = {
      Easy: {
        playerName: 'No name',
        bestScore: 999999,
      },
      Normal: {
        playerName: 'No name',
        bestScore: 999999,
      },
      Hard: {
        playerName: 'No name',
        bestScore: 999999,
      },
    };

    for (let scoreObj of allScores[currentMode]) {
      if (scoreObj.score < highScore[currentMode].bestScore) {
        highScore[currentMode].bestScore = scoreObj.score;
        highScore[currentMode].playerName = scoreObj.playerName;
      }
    }

    this.store.updateAllHighScores(highScore[currentMode], currentMode);

    const newScore = allScores[currentMode][allScores[currentMode].length - 1];

    if (newScore.score == highScore[currentMode].bestScore) {
      this.displayScoreDetails();
      this.displayHighScoreDetails();
      this.displayBestConfetti();
      this.newBestText.show();
      this.youWonText.text('Congratulations!');
    } else {
      this.displayScoreDetails();
      this.displayConfetti();
    }
  }

  displayBestConfetti() {
    const end = Date.now() + 15 * 350;

    const colors = ['#29cdff', '#78ff44', '#a864fd'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  displayConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  registerAudios() {
    this.backgroundMusic.audios.forEach((audio) => {
      this.selectBackgroundAudios.append(`
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
