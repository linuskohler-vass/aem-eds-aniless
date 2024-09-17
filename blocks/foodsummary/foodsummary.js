function calculateImpact() {
  const selectedFood = document.querySelectorAll('.foodmeter .food-selected');

  let totalImpact = 0;
  selectedFood.forEach((food) => {
    const impact = food.querySelector('.food__impact');
    const impactValue = parseFloat(impact.textContent) || 0;
    totalImpact += impactValue;
  });

  const impactCount = document.querySelector('.foodsummary__count');
  impactCount.textContent = `${totalImpact}`;
}

export default function decorate(block) {
  const impactLabel = block.querySelector('p');
  const impactCount = document.createElement('p');

  impactLabel.className = 'foodsummary__label';
  impactCount.className = 'foodsummary__count';

  impactLabel.parentElement.appendChild(impactCount);

  calculateImpact();

  document.addEventListener('foodSelectionChange', calculateImpact);
}
