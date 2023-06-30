import cards from '../../data/cards';
import {
  createFlipCard,
  clearElement,
  createTextCategory,
  setCardArray,
} from './card';
import { buttonStatistics, cardContainer } from '../utils/var';
import { getLowestPercentageWords, clearArrayTable, createArrayTable } from '../controllers/create-array-table';

let repeatWordsArray;

function repeatWords(idArray) {
  if (idArray.length) {
    repeatWordsArray = [['repeat difficult words'], []];
    for (let i = 0; i < idArray.length; i += 1) {
      const card = {
        ...cards[idArray[i].split('-')[0]][idArray[i].split('-')[1]],
        id: idArray[i],
      };
      repeatWordsArray[1].push(card);
    }
    return repeatWordsArray;
  }
  repeatWordsArray = [['no difficult words'], []];
  return repeatWordsArray;
}

buttonStatistics.addEventListener('click', (event) => {
  if (event.target.classList.contains('table-statistics__btn_reset')) {
    localStorage.clear();
    clearArrayTable();
    createArrayTable();
  } else if (event.target.classList.contains('table-statistics__btn_repeat-words')) {
    const idRepeatWordsArray = getLowestPercentageWords();
    repeatWordsArray = repeatWords(idRepeatWordsArray);

    clearElement(cardContainer);
    setCardArray(repeatWordsArray);
    createFlipCard(1);
    createTextCategory(1);
  }
});

createArrayTable();
