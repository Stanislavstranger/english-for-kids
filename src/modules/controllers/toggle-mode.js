import { arrayCards } from '../components/card';
import { startButton, repeatButton } from '../utils/var';

const sw = document.querySelector('.switch');
const modeText = document.querySelector('.mode__text');

sw.addEventListener('change', () => {
  if (modeText.textContent === 'Train') {
    modeText.innerText = 'Play';
    modeText.classList.add('red');
    arrayCards.forEach((item) => {
      item.classList.add('_play');
      item.classList.add('_no-flip');
      startButton.classList.remove('_hidden');
    });
  } else {
    modeText.innerText = 'Train';
    modeText.classList.remove('red');
    arrayCards.forEach((item) => {
      item.classList.remove('_play');
      item.classList.remove('_no-flip');
      startButton.classList.add('_hidden');
      repeatButton.classList.add('_hidden');
    });
  }
});
