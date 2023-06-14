import {
    startButton,
    repeatButton,
    cardContainer,
    answerIcon,
    subHeader,
    mode,
    result
} from '../utils/var';

import { createFlipCard, clearElement, createTextCategory, setCardArray } from './card';
import resultOption from '../controllers/output-result';
import { setElement } from './table-statistics';
import cards from '../../data/cards';

let selectedCardId;
let count = 0;

startButton.addEventListener('click', () => {
    const activeCards = document.querySelectorAll('.flip-card:not(.inactive)');
    const activeCardIds = Array.from(activeCards).map(card => card.id);
    const randomIndex = Math.floor(Math.random() * activeCardIds.length);
    selectedCardId = activeCardIds[randomIndex];

    const selectedCard = document.getElementById(selectedCardId);
    const audioSrc = selectedCard.dataset.audioSrc;

    const audioElement = new Audio(audioSrc);
    audioElement.play();

    startButton.classList.add('_hidden');
    repeatButton.classList.remove('_hidden');

    activeCards.forEach(card => {
        card.addEventListener('click', handleCardGuess);
    });

});

function handleCardGuess(event) {
    const clickedCard = event.target.closest('.flip-card');

    if (!clickedCard.classList.contains('inactive')) {
        const clickedCardId = clickedCard.id;

        if (clickedCardId === selectedCardId) {
            // Правильный ответ
            clickedCard.classList.add('inactive');
            clickedCard.classList.add('correct-guess');

            const newActiveCards = document.querySelectorAll('.flip-card:not(.inactive)');
            const newActiveCardIds = Array.from(newActiveCards).map(card => card.id);

            playSuccessSound();
            setElement('play', clickedCardId, undefined, 1);

            if (newActiveCardIds.length === 0) {
                // Все слова угаданы правильно
                playResultSound();
                showSuccessScreen();
            } else {
                // Продолжение игры со случайным словом
                const randomIndex = Math.floor(Math.random() * newActiveCardIds.length);
                const nextCardId = newActiveCardIds[randomIndex];
                const nextCard = document.getElementById(nextCardId);
                const nextAudioSrc = nextCard.dataset.audioSrc;

                setTimeout(() => {
                    const audioElement = new Audio(nextAudioSrc);
                    audioElement.play();
                    selectedCardId = nextCardId; // Обновляем значение selectedCardId
                }, 1000);
            }
        } else {
            // Неправильный ответ
            playErrorSound();
            setElement('play', selectedCardId, undefined, undefined, 1);
            clickedCard.classList.add('incorrect-guess');
            count++;
        }
    }
}

function playResultSound() {

    if (count === 0) {
        const resultSound = new Audio('../../data/audio/success.mp3');
        resultSound.play();
    } else {
        const resultSound = new Audio('../../data/audio/failure.mp3');
        resultSound.play();
    }
}

function playSuccessSound() {
    const successSound = new Audio('../../data/audio/correct.mp3');
    successSound.play();

    const imgAnswerIcon = document.createElement('img');
    imgAnswerIcon.classList.add('answer-icon__img');
    imgAnswerIcon.src = `../../data/img/correct.png`;
    imgAnswerIcon.alt = `correct`;
    answerIcon.prepend(imgAnswerIcon);
}

function playErrorSound() {
    const errorSound = new Audio('../../data/audio/error.mp3');
    errorSound.play();

    const imgAnswerIcon = document.createElement('img');
    imgAnswerIcon.classList.add('answer-icon__img');
    imgAnswerIcon.src = `../../data/img/incorrect.png`;
    imgAnswerIcon.alt = `incorrect`;
    answerIcon.prepend(imgAnswerIcon);
}

function showSuccessScreen() {
    repeatButton.classList.add('_hidden');
    clearElement(subHeader);
    clearElement(cardContainer);
    clearElement(answerIcon);

    document.body.classList.add('_result');
    mode.classList.add('_hidden');
    resultOption(count);
    count = 0;

    setTimeout(() => {
        clearElement(cardContainer);
        clearElement(result);
        setCardArray(cards);
        createFlipCard('0');
        createTextCategory('0');
        document.body.classList.remove('_result');
    }, 3000);

}

repeatButton.addEventListener('click', repeatWord);

function repeatWord() {
    const selectedCard = document.getElementById(selectedCardId);
    const audioSrc = selectedCard.dataset.audioSrc;

    const audioElement = new Audio(audioSrc);
    audioElement.play();
}