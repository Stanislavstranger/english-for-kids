let menuItemCounter = 0;

export function createMenuItem(text) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = '#';
  a.textContent = text;
  a.id = `${menuItemCounter}`;
  menuItemCounter += 1;
  li.appendChild(a);
  return li;
}

export const nav = document.createElement('nav');
export const ul = document.createElement('ul');
ul.id = 'menu';
