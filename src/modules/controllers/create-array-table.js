import { tableStatistics } from '../utils/var';
import cards from '../../data/cards';

let arrayTable;

const storedArrayTable = localStorage.getItem('arrayTable');
if (storedArrayTable) {
  arrayTable = JSON.parse(storedArrayTable);
} else {
  arrayTable = [];
}

const tbody = document.createElement('tbody');

function createTableRow(data) {
  const row = document.createElement('tr');

  const keys = Object.keys(data);
  for (let i = 1; i < keys.length; i += 1) {
    const cell = document.createElement('td');
    cell.textContent = data[keys[i]];
    row.appendChild(cell);
  }

  return row;
}

function createSortableHeader(label, columnIndex) {
  const header = document.createElement('th');
  header.textContent = label;

  const sortIcon = document.createElement('span');
  sortIcon.classList.add('sort-icon');
  sortIcon.textContent = '';

  header.appendChild(sortIcon);

  header.addEventListener('click', function handleHeaderClick() {
    const sortOrder = this.dataset.sortOrder || 'asc';

    if (sortOrder === 'asc') {
      this.dataset.sortOrder = 'desc';
      sortIcon.classList.remove('asc');
      sortIcon.classList.add('desc');
    } else {
      this.dataset.sortOrder = 'asc';
      sortIcon.classList.remove('desc');
      sortIcon.classList.add('asc');
    }

    const activeSortColumn = document.querySelector('.active-sort-column');
    if (activeSortColumn) {
      activeSortColumn.classList.remove('active-sort-column');
    }
    header.classList.add('active-sort-column');

    arrayTable.sort((a, b) => {
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

    for (let i = 0; i < arrayTable.length; i += 1) {
      const row = createTableRow(arrayTable[i]);
      tbody.appendChild(row);
    }
  });

  return header;
}

const table = document.createElement('table');
const thead = document.createElement('thead');
const headerRow = document.createElement('tr');

const categoriesHeader = createSortableHeader('Categories', 1);
headerRow.appendChild(categoriesHeader);

const wordsHeader = createSortableHeader('Words', 2);
headerRow.appendChild(wordsHeader);

const translationHeader = createSortableHeader('Translation', 3);
headerRow.appendChild(translationHeader);

const trainedHeader = createSortableHeader('Trained', 4);
headerRow.appendChild(trainedHeader);

const correctHeader = createSortableHeader('Correct', 5);
headerRow.appendChild(correctHeader);

const incorrectHeader = createSortableHeader('Incorrect', 6);
headerRow.appendChild(incorrectHeader);

const percentageHeader = createSortableHeader('%', 7);
headerRow.appendChild(percentageHeader);

thead.appendChild(headerRow);
table.appendChild(thead);

function fillTable() {
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  for (let i = 1; i < arrayTable.length; i += 1) {
    const row = createTableRow(arrayTable[i]);
    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  tableStatistics.appendChild(table);
}

export function createArrayTable() {
  for (let i = 0; i < cards[0].length; i += 1) {
    for (let j = 0; j < cards[0].length; j += 1) {
      const id = `${i + 1}-${j}`;
      const existingElement = arrayTable.find((element) => element.id === id);

      if (!existingElement) {
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
  }
  fillTable();
}

export function setElement(mode, id, trained = 0, correct = 0, incorrect = 0) {
  const index = arrayTable.findIndex((element) => element.id === id);

  if (index !== -1) {
    arrayTable[index].trained += trained;
    arrayTable[index].correct += correct;
    arrayTable[index].incorrect += incorrect;
  }
  if (mode === 'play') {
    if (correct === 0 && incorrect === 0) {
      arrayTable[index].percent = '0.00%';
    } else {
      arrayTable[index].percent = `${((arrayTable[index].correct
                / (arrayTable[index].correct + arrayTable[index].incorrect))
                * 100).toFixed(2)}%`;
    }
  }

  localStorage.setItem('arrayTable', JSON.stringify(arrayTable));

  return index;
}

export function getLowestPercentageWords() {
  const filteredArrayTable = arrayTable.filter(
    (item) => parseFloat(item.percent) !== 0 && parseFloat(item.percent) < 51,
  );
  const sortedArrayTable = filteredArrayTable.sort(
    (a, b) => parseFloat(a.percent) - parseFloat(b.percent),
  );
  const slicedArrayTable = sortedArrayTable.slice(0, 8);
  return slicedArrayTable.map((item) => item.id);
}

export function clearArrayTable() {
  arrayTable = [];
}
