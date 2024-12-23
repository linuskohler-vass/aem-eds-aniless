function setupInputElement(inputContainer) {
  const inputData = inputContainer.querySelectorAll('div');
  if (inputData.length === 4) {
    const [id, label, type, maxLength] = [...inputData].map((div) => div.textContent.trim());

    if (id && label && type && maxLength) {
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
          Authorization: 'Basic YWRtaW46YWRtaW4=',
          'CSRF-Token': 'eyJleHAiOjE3MzQ1MTc0MjMsImlhdCI6MTczNDUxNjgyM30.H9B2TAZfQmu_fyIF70tLH0dG0Go46z3iToj9rqofRz8',
          mode: 'cors',
          credentials: 'include',
        },
        body: JSON.stringify(jsonData),
      });
      if (response.ok) {
        const responseData = await response.json();
        // eslint-disable-next-line no-console
        validationMessage.textContent = responseData.message;
        console.log(responseData.message);
      } else {
        const errorData = await response.json();
        // eslint-disable-next-line no-console
        validationMessage.textContent = `Form submission failed: ${errorData.message}`;
        console.error('Form submission failed:', errorData.error || response.statusText);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      validationMessage.textContent = 'Error submitting form.';
      console.error('Error submitting form:', error);
    }
  });

  if (!block.hasAttribute('data-aue-resource')) {
    block.innerHTML = '';
  }

  block.appendChild(form);
}
