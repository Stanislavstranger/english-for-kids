import { result } from '../utils/var'

export default function resultOption(count) {

    const imgResult = document.createElement('img');
    imgResult.classList.add('result-image');

    const textResult = document.createElement('h2');
    textResult.classList.add('result-text');

    if (count === 0) {
        imgResult.src = `../../data/img/happy capybara.png`;
        imgResult.alt = 'happy capybara';
        textResult.innerText = 'You w-o-o-o-o-n !!!';
    } else {
        imgResult.src = `../../data/img/sad capybara.png`;
        imgResult.alt = 'sad capybara.png';
        textResult.innerText = `Try again. Total: ${count} errors`;
    }

    result.appendChild(imgResult);
    result.appendChild(textResult);
}