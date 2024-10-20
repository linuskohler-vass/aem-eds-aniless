import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const teaserLink = document.createElement('a');
  teaserLink.href = block.children[1].querySelector('a').href;
  teaserLink.textContent = block.children[2].querySelector('p').innerHTML;
  teaserLink.classList.add('button');

  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();
  const pageFragment = await loadFragment(path);
  if (pageFragment) {
    const pageFragmentSection = pageFragment.querySelector(':scope .section');

    if (pageFragmentSection) {
      const teaserFragmentParent = block.closest('.teaser-fragment');
      const heroContainer = pageFragment.querySelector('.hero-container');
      const contentWrapper = pageFragment.querySelector('.default-content-wrapper');

      const pictureElement = heroContainer ? heroContainer.querySelector('picture') : null;
      const h1Element = contentWrapper ? contentWrapper.querySelector('h1') : null;

      // Clear out the existing content in the page-fragment
      teaserFragmentParent.innerHTML = '';

      if (pictureElement) {
        teaserFragmentParent.appendChild(pictureElement);
      }

      if (h1Element) {
        teaserFragmentParent.appendChild(h1Element);
      }

      teaserFragmentParent.appendChild(teaserLink);
    }
  }
}
