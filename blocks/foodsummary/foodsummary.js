export default function decorate(block) {
  const impactLabel = block.querySelector('p');
  const impactCount = document.createElement('p');

  impactLabel.className = 'foodsummary-label';
  impactCount.className = 'foodsummary-count';

  impactLabel.parentElement.appendChild(impactCount);
}
