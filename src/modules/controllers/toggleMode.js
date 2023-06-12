import { arrayCards } from '../components/card';
import { startButton, repeatButton } from '../utils/var';

let sw = document.querySelector('.switch');
let modeText = document.querySelector('.mode__text');

sw.addEventListener('change', function () {
    if (modeText.textContent === 'Train') {
        modeText.innerText = 'Play';
        modeText.classList.add('red');
        arrayCards.forEach(item => {
            item.classList.add('_play');
            item.classList.add('_no-flip');
            startButton.classList.remove('_hidden');
        });
    } else {
        modeText.innerText = 'Train';
        modeText.classList.remove('red');
        arrayCards.forEach(item => {
            item.classList.remove('_play');
            item.classList.remove('_no-flip');
            startButton.classList.add('_hidden');
            repeatButton.classList.add('_hidden');
        });
    }
});

export default modeText;