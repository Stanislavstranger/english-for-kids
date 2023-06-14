import cards from '../../data/cards';
import { createMenuItem, nav, ul } from '../utils/create-menu-items';
import { header } from '../utils/var';

['Main page', ...cards[0],'Statistics'].map(createMenuItem).forEach(item => ul.appendChild(item));

nav.innerHTML = `
    <input type="checkbox" id="menu-toggle">
    <label id="trigger" for="menu-toggle"></label>
    <label id="burger" for="menu-toggle"></label>`;
nav.appendChild(ul);

header.prepend(nav);