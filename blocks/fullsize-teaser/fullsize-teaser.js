export default function decorate(block) {
  const paragraphs = block.querySelectorAll('p');

  if (paragraphs[0]) {
    paragraphs[0].classList.add('tag');
  }

  if (paragraphs[1]) {
    const h2 = document.createElement('h2');
    h2.innerHTML = paragraphs[1].innerHTML; // Transfer the content
    paragraphs[1].replaceWith(h2);
  }

  // Update the third paragraph to have the class "teasertext"
  if (paragraphs[2]) {
    paragraphs[2].classList.add('teasertext');
  }

  const links = block.querySelectorAll('a');
  if (paragraphs[3]) {
    links[0].textContent = paragraphs[4].textContent;
    links[0].classList.add('button');
    paragraphs[4].remove();
  }

  if (paragraphs[5]) {
    links[1].textContent = paragraphs[6].textContent;
    links[1].classList.add('button');
    paragraphs[6].remove();
  }
}
