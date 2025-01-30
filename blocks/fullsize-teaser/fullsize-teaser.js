import ffetch from '../../scripts/ffetch.js';

async function checkArticlesData() {
  const entries = ffetch('https://main--aem-eds-ue-aniless--likodevelopment.hlx.live/article-index.json');
  // eslint-disable-next-line no-restricted-syntax
  for await (const entry of entries) {
    console.log(entry.title);
  }
}

export default function decorate(block) {
  checkArticlesData();

  const paragraphs = block.querySelectorAll('p');

  const teaserCol = document.createElement('div');
  teaserCol.classList.add('teasercol');

  const contentCol = document.createElement('div');
  contentCol.classList.add('contentcol');

  const pictures = block.querySelectorAll('picture');
  pictures.forEach((picture) => teaserCol.appendChild(picture));

  if (paragraphs[0]) {
    paragraphs[0].classList.add('tag');
    contentCol.appendChild(paragraphs[0]);
  }

  if (paragraphs[1]) {
    const h2 = document.createElement('h2');
    h2.innerHTML = paragraphs[1].innerHTML; // Transfer the content
    paragraphs[1].replaceWith(h2);
    contentCol.appendChild(h2);
  }

  // Update the third paragraph to have the class "teasertext"
  if (paragraphs[2]) {
    paragraphs[2].classList.add('teasertext');
    contentCol.appendChild(paragraphs[2]);
  }

  const links = block.querySelectorAll('a');
  if (paragraphs[3]) {
    links[0].textContent = paragraphs[4].textContent;
    links[0].classList.add('button');
    paragraphs[4].remove();
    contentCol.appendChild(links[0]);
  }

  if (paragraphs[5]) {
    links[1].textContent = paragraphs[6].textContent;
    links[1].classList.add('button');
    paragraphs[6].remove();
    contentCol.appendChild(links[1]);
  }

  const childDivs = block.querySelectorAll(':scope > div');

  childDivs.forEach((div) => {
    if (!div.classList.length) {
      div.remove();
    }
  });

  block.appendChild(teaserCol);
  block.appendChild(contentCol);
}
