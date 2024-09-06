const dataEndpointUrl = '/bin/jobteaser/data';

function loadTitle(jobTeaserTitleContainer) {
  const elementWithTitle = jobTeaserTitleContainer.querySelector('p');
  const title = elementWithTitle.textContent;

  if (title != null) {
    elementWithTitle.textContent = title;
  }
}

async function getApiResult() {
  // eslint-disable-next-line no-undef
  const response = await fetch(dataEndpointUrl, {
    method: 'GET'
  });

  if (response.ok) {
    const responseObject = await response.json();

    if (responseObject) {
      return responseObject.map(results => ({
        apiUrl: results.apiUrl,
        baseFilterUrl: results.baseFilterUrl,
        baseTeaserUrl: results.baseTeaserUrl,
      }));
    }
  }
  return false;
}

async function loadContent(jobTeaserContent) {
  const jobTeaserInfoData = getApiResult();
  console.log(jobTeaserInfoData);
  console.log(jobTeaserContent);
}

export default function decorate(block) {
  const jobTeaserTitle = block.children[0];
  jobTeaserTitle.classList.add('jobteaser__title');
  loadTitle(jobTeaserTitle);

  const jobTeaserContent = block.children[1];
  jobTeaserContent.classList.add('jobteaser__content');
  loadContent(jobTeaserContent);
}
