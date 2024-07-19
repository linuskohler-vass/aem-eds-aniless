import { createOptimizedPicture, fetchPlaceholders } from '../../scripts/aem.js';

function getRatingValue(regex, content) {
  const matchForFirstNumber = content.match(regex);

  let rating = 0;
  if (matchForFirstNumber) {
    rating = parseInt(matchForFirstNumber[1], 10);

    if (rating > 10) {
      rating = 10;
    }

    if (rating < 1) {
      rating = 1;
    }
  }

  return rating;
}

function isRatingElement(element) {
  const content = element.innerHTML;

  const regexFirstNumber = /^(\d+)\/\d+$/;
  const regexSecondNumber = /^\d+\/(\d+)$/;

  const rating = getRatingValue(regexFirstNumber, content);
  const maxRating = getRatingValue(regexSecondNumber, content);

  return ((rating !== 0) && (maxRating !== 0)) ? [rating, maxRating] : null;
}

function isQuoteElement(element) {
  const emChild = element.querySelector('em');

  return emChild !== null;
}

function decorateImage(ratingImageContainer) {
  ratingImageContainer.classList.add('ratings-rating-image');

  ratingImageContainer.querySelectorAll('img').forEach((img) => {
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });
}

async function setupRatingText(element) {
  const placeholders = await fetchPlaceholders();
  const { rating } = placeholders;

  const infoText = document.createElement('span');
  infoText.textContent = rating;
  infoText.classList.add('rating-info');
  element.appendChild(infoText);
}

function decorateReview(ratingReviewContainer) {
  ratingReviewContainer.classList.add('ratings-rating-review');

  [...ratingReviewContainer.children].forEach((reviewChild) => {
    if (isQuoteElement(reviewChild)) {
      reviewChild.classList.add('quote');
    }

    const ratingCount = isRatingElement(reviewChild);
    if (ratingCount != null) {
      reviewChild.textContent = '';

      reviewChild.classList.add('rating-stars');

      for (let i = 0; i < ratingCount[1]; i += 1) {
        const star = document.createElement('span');

        if (i < ratingCount[0]) {
          star.className = 'star-active';
        } else {
          star.className = 'star-inactive';
        }

        reviewChild.appendChild(star);
      }
    }
  });
}

export default function decorate(block) {
  [...block.children].forEach((rating) => {
    rating.classList.add('rating');

    setupRatingText(rating);
    decorateImage(rating.children[0]);
    decorateReview(rating.children[1]);
  });
}
