import { createOptimizedPicture } from '../../scripts/aem.js';

function getRatingStarsCount(element) {
  const pText = element.textContent;
  const ratingCount = parseInt(pText, 10);

  if (Number.isNaN(ratingCount)) {
    return null;
  }

  return ratingCount;
}

function loadOptimizedPicture(ratingImageContainer) {
  ratingImageContainer.querySelectorAll('img').forEach((img) => {
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });
}

function createRatingStars(ratingStarsContainer) {
  const elementWithNumber = ratingStarsContainer.querySelector('p');
  const ratingCount = getRatingStarsCount(elementWithNumber);

  const maxRatingCount = 5;

  if (ratingCount != null) {
    ratingStarsContainer.textContent = '';

    for (let i = 0; i < maxRatingCount; i += 1) {
      const star = document.createElement('span');

      if (i < ratingCount) {
        star.className = 'rating__star--active';
      } else {
        star.className = 'rating__star--inactive';
      }

      ratingStarsContainer.appendChild(star);
    }
  }
}

export default function decorate(block) {
  const ratingImage = block.children[0];
  ratingImage.classList.add('rating__image');
  loadOptimizedPicture(ratingImage);

  const ratingReview = block.children[1];
  ratingReview.classList.add('rating__review');

  const ratingStars = block.children[2];
  ratingStars.classList.add('rating__stars');
  createRatingStars(ratingStars);
}
