import {loadFragment} from '../fragment/fragment.js';

export default async function decorate(block) {
  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();
  const pageFragment = await loadFragment(path);
  if (pageFragment) {
    const pageFragmentSection = pageFragment.querySelector(':scope .section');
    if (pageFragmentSection) {
      const pageFragmentParent = block.closest('.page-fragment');
      pageFragmentParent.innerHTML = '';
      [...pageFragment.childNodes].forEach(
        (childNode) => pageFragmentParent.appendChild(childNode));
    }
  }
}