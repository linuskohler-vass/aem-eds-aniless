function setupInputElement(inputContainer) {
  const inputData = inputContainer.querySelectorAll('div');
  if (inputData.length === 3) {
    const [id, label, type] = [...inputData].map((div) => div.textContent.trim());

    if (id && label && type) {
      const inputWrapper = document.createElement('div');
      inputWrapper.className = 'input-wrapper';

      const labelElement = document.createElement('label');
      labelElement.htmlFor = id;
      labelElement.textContent = label;

      const inputElement = document.createElement('input');
      inputElement.type = type;
      inputElement.id = id;
      inputElement.name = id;

      inputWrapper.classList.add(`type-${inputElement.type}`);

      inputWrapper.appendChild(labelElement);
      inputWrapper.appendChild(inputElement);

      return inputWrapper;
    }
  }

  return null;
}

export default async function decorate(block) {
  const form = document.createElement('form');

  const linkElement = block.querySelector('a[href]');
  if (linkElement) {
    form.action = linkElement.href;
    form.method = 'POST'; // Set method to POST as per requirements
  }

  const inputContainers = block.querySelectorAll('.custom-form > div:nth-child(n+3)');

  inputContainers.forEach((inputContainer) => {
    const inputWrapper = setupInputElement(inputContainer);

    form.appendChild(inputWrapper);
  });

  const submitText = block.querySelector('.custom-form > div:nth-child(2) div')?.textContent.trim();

  if (submitText) {
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = submitText;
    form.appendChild(submitButton);
  }

  block.innerHTML = ''; // Clear the original block content
  block.appendChild(form);// For demonstration purposes
}
