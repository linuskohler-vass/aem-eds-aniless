let impactCounter;

function impactValueToText(impactNumber) {
  switch (true) {
    case (impactNumber < 5):
      return 'Good';
    case (impactNumber < 10):
      return 'Okay';
    case (impactNumber < 20):
      return 'Bad';
    default:
      return 'Very bad';
  }
}
function calculateImpact() {
  const selectedFood = document.querySelectorAll('.foodmeter .food-selected');

  let totalImpact = 0;
  selectedFood.forEach((food) => {
    const impact = food.querySelector('.food__impact');
    const impactValue = parseFloat(impact.textContent) || 0;
    totalImpact += impactValue;
  });

  impactCounter.textContent = impactValueToText(totalImpact);
}

export default function decorate(block) {
  const impactLabel = block.querySelector('p');
  const impactCount = document.createElement('p');

  impactLabel.className = 'foodsummary__label';
  impactCount.className = 'foodsummary__count';

  impactLabel.parentElement.appendChild(impactCount);

  impactCounter = impactCount;

  calculateImpact();

  document.addEventListener('foodSelectionChange', calculateImpact);
}
