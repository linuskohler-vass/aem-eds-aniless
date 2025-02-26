function setupInputElement(inputContainer) {
  const inputData = inputContainer.querySelectorAll('div');
  if (inputData.length === 5) {
    const [id, label, type, maxLength,
      requiredInput] = [...inputData].map((div) => div.textContent.trim());

    if (id && label && type && maxLength && requiredInput) {
      const inputWrapper = document.createElement('div');
      inputWrapper.className = 'input-wrapper';

      const labelElement = document.createElement('label');
      labelElement.htmlFor = id;
      labelElement.textContent = label;

      const inputElement = document.createElement('input');
      inputElement.type = type;
      inputElement.id = id;
      inputElement.name = id;
      if (maxLength > 0) {
        inputElement.maxLength = maxLength;
      }
      inputElement.required = (requiredInput === 'true');

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

  const formId = block.querySelector('p')?.textContent.trim();

  const linkElement = block.querySelector('a[href]');
  if (linkElement) {
    form.action = linkElement.href;
    form.method = 'POST';
  }

  const inputContainers = block.querySelectorAll('.custom-form > div:nth-child(n+3)');

  inputContainers.forEach((inputContainer) => {
    const inputWrapper = setupInputElement(inputContainer);

    if (inputWrapper) {
      form.appendChild(inputWrapper);
    }
  });

  const validationMessage = document.createElement('div');
  validationMessage.classList.add('validation-message');
  form.appendChild(validationMessage);

  const submitText = block.querySelector('.custom-form > div:nth-child(3) div')?.textContent.trim();

  if (submitText) {
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = submitText;
    form.appendChild(submitButton);
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    jsonData.path = window.location.pathname;
    jsonData.formId = formId;

    const actionUrl = form.action || '/bin/eds-backend-demo/custom-form-data';
    try {
      const response = await fetch(actionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
      if (response.ok) {
        const responseData = await response.json();
        validationMessage.textContent = responseData.message;
        // eslint-disable-next-line no-console
        console.log(responseData.message);
      } else {
        const errorData = await response.json();
        validationMessage.textContent = `Form submission failed: ${errorData.message}`;
        // eslint-disable-next-line no-console
        console.error('Form submission failed:', errorData.error || response.statusText);
      }
    } catch (error) {
      validationMessage.textContent = 'Error submitting form.';
      // eslint-disable-next-line no-console
      console.error('Error submitting form:', error);
    }
  });

  if (!block.hasAttribute('data-aue-resource')) {
    block.innerHTML = '';
  }

  block.appendChild(form);
}
