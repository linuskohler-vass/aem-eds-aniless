import { moveInstrumentation } from '../../scripts/scripts.js';
import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'food';
    li.title = 'Select or deselect food';

    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    li.children[0].className = 'food__image';
    li.children[1].className = 'food__body';
    li.children[2].className = 'food__impact';
    ul.append(li);

    li.addEventListener('click', (event) => {
      event.currentTarget.classList.toggle('food-selected');
      dispatchSelectionChange();
    });
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}

function dispatchSelectionChange() {
  const event = new CustomEvent('foodSelectionChange', { detail: {} });
  document.dispatchEvent(event);
}