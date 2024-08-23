//import '../styles/style.css';
import { Game } from './game';
import '@fortawesome/fontawesome-free/css/all.min.css';

try {
    const game = new Game(0, 10);

    console.log('Is equal to: 2', game.isEqualTo(2));
    console.log('Is greater than: 2', game.isGreaterThan(2));
    console.log('Is less than: 2', game.isLessThan(2));
} catch (error) {
    console.log(error.message);
}