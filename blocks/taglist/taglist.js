export default function decorate(block) {
  [...block.children].forEach((tag) => {
    tag.classList.add('tag');

    const stylingOptionDiv = tag.children[1];
    const newClass = stylingOptionDiv.querySelector('p').textContent;

    tag.classList.add(`tag-${newClass}`);

    stylingOptionDiv.remove();

    const tagDiv = tag.children[0];
    tag.innerHTML = tagDiv.querySelector('p').textContent;

    tagDiv.remove();
  });
}
