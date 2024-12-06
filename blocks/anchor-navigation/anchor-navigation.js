export default function decorate(block) {
  // Note: We can use the attributes here, because they are set by aem.js
  // for the default section component before

  // Otherwise we would need to parse a simpler html

  // Also: If we want to assign the section link in the section component,
  // we would need to build a custom component
  const anchorElements = document.querySelectorAll('[data-anchorId]');

  anchorElements.forEach((element) => {
    const anchorId = element.getAttribute('data-anchorId');

    // Assign the id to the element
    element.id = anchorId;

    // Create a new <a> element
    const anchorLink = document.createElement('a');
    anchorLink.href = `#${anchorId}`;
    anchorLink.textContent = `${anchorId}`;
    anchorLink.className = 'anchor-link';

    block.appendChild(anchorLink);
  });

  block.children[0].classList.add('anchor-navigation-label');
}
