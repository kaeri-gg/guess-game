//import '../styles/style.css';
import { Game } from './game';
import $ from 'jquery';
import '@fortawesome/fontawesome-free/css/all.min.css';

try {
  const game = new Game(0, 10);

  console.log('Is equal to: 2', game.isEqualTo(2));
  console.log('Is greater than: 2', game.isGreaterThan(2));
  console.log('Is less than: 2', game.isLessThan(2));
} catch (error) {
  console.log(error.message);
}

const startMyGame = () => {
  console.log('game started');
};

let counter = 4;
const timer = () => {
  if (--counter === 0) {
    startMyGame();
    clearInterval(startGame);
    return;
  }

  $('#counter').text(counter);
};

const oneSecond = 1000;
let startGame;

$('#gameStart').click(() => {
  $('#countdownMainDiv').removeClass('hidden');
  $('#countdownMainDiv').addClass('flex');

  $('#welcomeMainDiv').addClass('hidden');

  startGame = setInterval(timer, oneSecond);
});
