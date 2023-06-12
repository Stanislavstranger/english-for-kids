import { createFlipCard, clearElement, createTextCategory } from '../components/card';
import { cardContainer } from '../utils/var';

let menuToggle = document.getElementById('menu-toggle');
let menu = document.getElementById('menu');
let number;

menuToggle.addEventListener('change', function () {
    document.body.style.overflow = menuToggle.checked ? 'hidden' : 'auto';
});

menu.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
        document.body.style.overflow = 'auto';
        menuToggle.checked = false;
        number = event.target.id;

        const links = menu.querySelectorAll('a');
        links.forEach(link => {
            link.classList.remove('_active');
        });

        event.target.classList.add('_active');

        clearElement(cardContainer);
        createFlipCard(number);
        createTextCategory(number);
    }
});

export { number, menuToggle };
