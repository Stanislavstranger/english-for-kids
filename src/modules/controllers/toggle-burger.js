import {
  createFlipCard, clearElement, createTextCategory, setCardArray,
} from '../components/card';
import { cardContainer } from '../utils/var';
import cards from '../../data/cards';

const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
let number;

menuToggle.addEventListener('change', () => {
  document.body.style.overflow = menuToggle.checked ? 'hidden' : 'auto';
});

menu.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    document.body.style.overflow = 'auto';
    menuToggle.checked = false;
    number = event.target.id;

    const links = menu.querySelectorAll('a');
    links.forEach((link) => {
      link.classList.remove('_active');
    });

    event.target.classList.add('_active');

    clearElement(cardContainer);
    setCardArray(cards);
    createFlipCard(number);
    createTextCategory(number);
  }
});

export default menuToggle;
