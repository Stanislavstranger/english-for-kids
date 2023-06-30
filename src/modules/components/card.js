import {
  cardContainer,
  subHeader,
  startButton,
  answerIcon,
  mode,
  repeatButton,
  tableStatistics,
  buttonStatistics,
} from '../utils/var';

import cards from '../../data/cards';
import { createArrayTable, setElement } from '../controllers/create-array-table';

const modeText = document.querySelector('.mode__text');
const arrayCards = [];
let currentCards = [];

function setCardArray(array) {
  currentCards = array;
}

function clearElement(element) {
  if (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}

function handleCardBlur(event) {
  const blurredCard = event.target.closest('.flip-card');

  if (blurredCard && cardContainer.contains(blurredCard)) {
    const flipCardInner = blurredCard.querySelector('.flip-card-inner');
    flipCardInner.classList.remove('flipped');
  }
}

function createFlipCard(number) {
  if (number !== `${currentCards.length}`) {
    tableStatistics.classList.add('_hidden');
    buttonStatistics.classList.add('_hidden');

    for (let i = 0; i < currentCards[number].length; i += 1) {
      const divFlipCard = document.createElement('div');
      divFlipCard.classList.add('flip-card');

      const divFlipCardInner = document.createElement('div');
      divFlipCardInner.classList.add('flip-card-inner');

      const divFlipCardFront = document.createElement('div');
      divFlipCardFront.classList.add('flip-card-front');

      const imgFlipCardFront = document.createElement('img');
      imgFlipCardFront.classList.add('flip-card__image');

      const titleFlipCardFront = document.createElement('h3');
      titleFlipCardFront.classList.add('title');

      const textFlipCardFront = document.createElement('h4');
      textFlipCardFront.classList.add('title__text');

      const controllerFlipCardInner = document.createElement('div');
      controllerFlipCardInner.classList.add('controll');

      const imgRepeatControllerFlipCardInner = document.createElement('img');
      imgRepeatControllerFlipCardInner.classList.add('flip-card__rotate');

      const divFlipCardBack = document.createElement('div');
      divFlipCardBack.classList.add('flip-card-back');

      const imgFlipCardBack = document.createElement('img');
      imgFlipCardBack.classList.add('flip-card__image');

      const titleFlipCardBack = document.createElement('h3');
      titleFlipCardBack.classList.add('title');

      const textFlipCardBack = document.createElement('h4');
      textFlipCardBack.classList.add('title__text');

      if (number === '0') {
        imgFlipCardFront.src = `./data/img/${currentCards[0][i]}.png`;
        imgFlipCardFront.alt = `${currentCards[0][i]}`;
        titleFlipCardFront.innerText = `${currentCards[0][i]}`;
        textFlipCardFront.innerText = `${currentCards[i + 1].length} cards`;
        divFlipCard.classList.add('_no-flip');
        divFlipCard.id = `0-${i + 1}`;
      } else {
        imgFlipCardFront.src = `./data/${currentCards[number][i].image}`;
        imgFlipCardFront.alt = `${currentCards[number][i].word}`;
        titleFlipCardFront.innerText = `${currentCards[number][i].word}`;

        imgRepeatControllerFlipCardInner.src = './data/img/rotate.png';
        imgRepeatControllerFlipCardInner.alt = 'rotate';

        imgFlipCardBack.src = `./data/${currentCards[number][i].image}`;
        imgFlipCardBack.alt = `${currentCards[number][i].translation}`;
        titleFlipCardBack.innerText = `${currentCards[number][i].translation}`;

        if (currentCards[number][i].id) {
          divFlipCard.id = currentCards[number][i].id;
        } else {
          divFlipCard.id = `${number}-${i}`;
        }

        divFlipCard.dataset.audioSrc = currentCards[number][i].audioSrc;

        if (modeText.textContent === 'Play') {
          divFlipCard.classList.add('_play');
          divFlipCard.classList.add('_no-flip');
          startButton.classList.remove('_hidden');
        }
        arrayCards.push(divFlipCard);
      }

      divFlipCardBack.appendChild(imgFlipCardBack);
      divFlipCardBack.appendChild(titleFlipCardBack);
      controllerFlipCardInner.appendChild(imgRepeatControllerFlipCardInner);
      divFlipCardFront.appendChild(imgFlipCardFront);
      divFlipCardFront.appendChild(titleFlipCardFront);
      divFlipCardFront.appendChild(controllerFlipCardInner);
      divFlipCardFront.appendChild(textFlipCardFront);
      divFlipCardInner.appendChild(divFlipCardFront);
      divFlipCardInner.appendChild(divFlipCardBack);
      divFlipCard.appendChild(divFlipCardInner);
      cardContainer.append(divFlipCard);
    }
  } else {
    tableStatistics.classList.remove('_hidden');
    buttonStatistics.classList.remove('_hidden');
    startButton.classList.add('_hidden');
    createArrayTable();
  }
}

function createTextCategory(number) {
  clearElement(subHeader);
  clearElement(answerIcon);
  repeatButton.classList.add('_hidden');
  const textCategory = document.createElement('h2');
  textCategory.classList.add('category');
  const menu = document.getElementById('menu');

  if (number === '0') {
    mode.classList.add('_hidden');
    startButton.classList.add('_hidden');
    textCategory.innerText = 'Main page';
    const links = menu.querySelectorAll('a');
    links.forEach((link) => {
      if (link.id !== '0') {
        link.classList.remove('_active');
      } else {
        link.classList.add('_active');
      }
    });
  } else if (number !== `${currentCards.length}`) {
    mode.classList.remove('_hidden');
    textCategory.innerText = `${currentCards[0][Number(number) - 1]}`;
    const links = menu.querySelectorAll('a');
    links.forEach((link) => {
      if (link.id !== String(number)) {
        link.classList.remove('_active');
      } else {
        link.classList.add('_active');
      }
    });
  } else {
    mode.classList.add('_hidden');
    textCategory.innerText = 'Statistics';
  }
  subHeader.appendChild(textCategory);
}

setCardArray(cards);
createTextCategory('0');
createFlipCard('0');

let isMouseOut = false;

function handleMouseOut(event) {
  const { relatedTarget } = event;
  const flipCardInner = event.target.closest('.flip-card-inner');

  // Проверяем, если связанный элемент не находится внутри flipCardInner,
  // значит курсор действительно покинул элемент
  if (!flipCardInner.contains(relatedTarget)) {
    handleCardBlur(event);
    flipCardInner.removeEventListener('mouseout', handleMouseOut, true);
    isMouseOut = false;
  }
}

function handleCardClick(event) {
  const clickedCard = event.target.closest('.flip-card');

  if (clickedCard && cardContainer.contains(clickedCard)) {
    const cardId = clickedCard.id;

    if (cardId.split('-')[0] === '0') {
      clearElement(cardContainer);
      createFlipCard(cardId.split('-')[1], 10);
      createTextCategory(cardId.split('-')[1], 10);
    } else {
      const flipCardInner = clickedCard.querySelector('.flip-card-inner');

      // Проверяем, что клик был на передней стороне карты
      if (!flipCardInner.classList.contains('flipped') && modeText.textContent !== 'Play') {
        const index = parseInt(cardId.split('-')[1], 10);
        const audioFile = cards[cardId.split('-')[0]][index].audioSrc;
        const audioElement = document.createElement('audio');
        audioElement.src = audioFile;
        audioElement.play();
        setElement('train', cardId, 1);
      }
    }
  }

  const clickedCardRepeat = event.target.closest('.flip-card__rotate');
  if (clickedCardRepeat && cardContainer.contains(clickedCardRepeat)) {
    const flipCardInner = clickedCardRepeat.closest('.flip-card-inner');
    flipCardInner.classList.toggle('flipped');

    // Добавляем обработчик события mouseout только при первом клике
    if (!isMouseOut) {
      flipCardInner.addEventListener('mouseout', handleMouseOut, true);
      isMouseOut = true;
    }
  }
}

cardContainer.addEventListener('click', handleCardClick);

export {
  createFlipCard,
  clearElement,
  createTextCategory,
  arrayCards,
  setCardArray,
};
