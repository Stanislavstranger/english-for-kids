import cards from '../../data/cards';
import {
    createFlipCard,
    clearElement,
    createTextCategory,
    setCardArray,
} from '../components/card';
import { tableStatistics, buttonStatistics, cardContainer } from '../utils/var';

let arrayTable;

const storedArrayTable = localStorage.getItem('arrayTable');
if (storedArrayTable) {
    arrayTable = JSON.parse(storedArrayTable);
} else {
    arrayTable = [];
}

export function createArrayTable() {
    for (let i = 0; i < cards[0].length; i++) {
        for (let j = 0; j < cards[0].length; j++) {
            const id = `${i + 1}-${j}`;
            const existingElement = arrayTable.find((element) => element.id === id);

            if (existingElement) {
                continue;
            }

            arrayTable.push({
                id,
                category: cards[0][i],
                word: cards[i + 1][j].word,
                translation: cards[i + 1][j].translation,
                trained: 0,
                correct: 0,
                incorrect: 0,
                percent: '0.00%',
            });
        }
    }
    fillTable();
}

let table = document.createElement('table');
let thead = document.createElement('thead');
let headerRow = document.createElement('tr');

let categoriesHeader = createSortableHeader('Categories', 1);
headerRow.appendChild(categoriesHeader);

let wordsHeader = createSortableHeader('Words', 2);
headerRow.appendChild(wordsHeader);

let translationHeader = createSortableHeader('Translation', 3);
headerRow.appendChild(translationHeader);

let trainedHeader = createSortableHeader('Trained', 4);
headerRow.appendChild(trainedHeader);

let correctHeader = createSortableHeader('Correct', 5);
headerRow.appendChild(correctHeader);

let incorrectHeader = createSortableHeader('Incorrect', 6);
headerRow.appendChild(incorrectHeader);

let percentageHeader = createSortableHeader('%', 7);
headerRow.appendChild(percentageHeader);

thead.appendChild(headerRow);
table.appendChild(thead);

let tbody = document.createElement('tbody');

function fillTable() {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    for (let i = 1; i < arrayTable.length; i++) {
        let row = createTableRow(arrayTable[i]);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    tableStatistics.appendChild(table);
}

function createTableRow(data) {
    let row = document.createElement('tr');

    let keys = Object.keys(data);
    for (let i = 1; i < keys.length; i++) {
        let cell = document.createElement('td');
        cell.textContent = data[keys[i]];
        row.appendChild(cell);
    }

    let percentageCell = document.createElement('td');
    let correct = data.correct;
    let incorrect = data.incorrect;
    return row;
}

function createSortableHeader(label, columnIndex) {
    let header = document.createElement('th');
    header.textContent = label;

    let sortIcon = document.createElement('span');
    sortIcon.classList.add('sort-icon');
    sortIcon.textContent = '';

    header.appendChild(sortIcon);

    header.addEventListener('click', function () {
        let sortOrder = this.dataset.sortOrder || 'asc';

        if (sortOrder === 'asc') {
            this.dataset.sortOrder = 'desc';
            sortIcon.classList.remove('asc');
            sortIcon.classList.add('desc');
        } else {
            this.dataset.sortOrder = 'asc';
            sortIcon.classList.remove('desc');
            sortIcon.classList.add('asc');
        }

        let activeSortColumn = document.querySelector('.active-sort-column');
        if (activeSortColumn) {
            activeSortColumn.classList.remove('active-sort-column');
        }
        header.classList.add('active-sort-column');

        arrayTable.sort(function (a, b) {
            let valueA = a[Object.keys(a)[columnIndex]];
            let valueB = b[Object.keys(b)[columnIndex]];

            if (columnIndex === 7) {
                valueA = parseFloat(valueA);
                valueB = parseFloat(valueB);
            }

            if (sortOrder === 'asc') {
                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
            } else {
                if (valueA > valueB) return -1;
                if (valueA < valueB) return 1;
            }

            return 0;
        });

        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        for (let i = 0; i < arrayTable.length; i++) {
            let row = createTableRow(arrayTable[i]);
            tbody.appendChild(row);
        }
    });

    return header;
}

export function setElement(mode, id, trained = 0, correct = 0, incorrect = 0) {
    const index = arrayTable.findIndex((element) => {
        return element.id === id;
    });

    if (index !== -1) {
        arrayTable[index].trained += trained;
        arrayTable[index].correct += correct;
        arrayTable[index].incorrect += incorrect;
    }
    if (mode === 'play') {
        if (correct === 0 && incorrect === 0) {
            arrayTable[index].percent = '0.00%';
        } else  {
            arrayTable[index].percent = ((arrayTable[index].correct /
                (arrayTable[index].correct + arrayTable[index].incorrect)) *
                100).toFixed(2) + '%';
        }
    }

    localStorage.setItem('arrayTable', JSON.stringify(arrayTable));

    return index;
}

function getLowestPercentageWords() {
    const filteredArrayTable = arrayTable.filter(item =>
        parseFloat(item.percent) !== 0 && parseFloat(item.percent) < 51);
    const sortedArrayTable = filteredArrayTable.sort((a, b) =>
        parseFloat(a.percent) - parseFloat(b.percent));
    const slicedArrayTable = sortedArrayTable.slice(0, 8);
    return slicedArrayTable.map(item => item.id);
}

let repeatWordsArray;

function repeatWords(idArray) {
    console.log(idArray.length);
    if (idArray.length) {
        repeatWordsArray = [['repeat difficult words'], []];
        for (let i = 0; i < idArray.length; i++) {
            const card = {
                ...cards[idArray[i].split('-')[0]][idArray[i].split('-')[1]],
                id: idArray[i]
            };
            repeatWordsArray[1].push(card);
        }
        return repeatWordsArray;
    } else {
        repeatWordsArray = [['no difficult words'], []];
        return repeatWordsArray;
    }
}

buttonStatistics.addEventListener('click', function (event) {
    if (event.target.classList.contains('table-statistics__btn_reset')) {
        localStorage.clear();
        clearArrayTable();
        createArrayTable();
    } else if (event.target.classList.contains('table-statistics__btn_repeat-words')) {
        let idRepeatWordsArray = getLowestPercentageWords();
        repeatWordsArray = repeatWords(idRepeatWordsArray);

        clearElement(cardContainer);
        setCardArray(repeatWordsArray);
        createFlipCard(1);
        createTextCategory(1);
    }
});

function clearArrayTable() {
    arrayTable = [];
}

createArrayTable();