import { moveInstrumentation, fetchI18NPlaceholders } from '../../scripts/scripts.js';
import { createOptimizedPicture } from '../../scripts/aem.js';

import ffetch from '../../scripts/ffetch.js';

let titleFoodSelectionText;
let titleFoodUnSelectionText;

function dispatchSelectionChange() {
  const event = new CustomEvent('foodSelectionChange', { detail: {} });
  document.dispatchEvent(event);
}

async function loadTitleFromPlaceholders(foodElement) {
  const placeholders = await fetchI18NPlaceholders();
  const entries = await ffetch('placeholders.json');
  // eslint-disable-next-line no-restricted-syntax
  for await (const entry of entries) {
    console.log(entry);
  }

  titleFoodSelectionText = placeholders.titleSelectFood;
  titleFoodUnSelectionText = placeholders.titleUnselectFood;

  foodElement.title = titleFoodSelectionText;
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'food';

    loadTitleFromPlaceholders(li);

    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    li.children[0].className = 'food__image';
    li.children[1].className = 'food__body';
    li.children[2].className = 'food__impact';
    ul.append(li);

    li.addEventListener('click', (event) => {
      event.currentTarget.classList.toggle('food-selected');

      if (event.currentTarget.classList.contains('food-selected')) {
        li.title = titleFoodUnSelectionText;
      } else {
        li.title = titleFoodSelectionText;
      }

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
