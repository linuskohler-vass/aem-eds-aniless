const DATA_ENDPOINT_URL = '/bin/jobteaser/data';

function loadTitle(jobTeaserTitleContainer) {
  const elementWithTitle = jobTeaserTitleContainer.querySelector('p');
  elementWithTitle.className = 'jobteaser__title';
}

async function getJobTeaserData() {
  // eslint-disable-next-line no-undef
  const response = await fetch(DATA_ENDPOINT_URL, {
    method: 'GET',
  });

  if (response.ok) {
    const responseObject = await response.json();

    if (responseObject) {
      return {
        apiUrl: responseObject.apiUrl,
        baseFilterUrl: responseObject.baseFilterUrl,
        baseTeaserUrl: responseObject.baseTeaserUrl,
      };
    }
  }
  return {};
}

async function getJobTeaserTiles(jobTeaserData) {
  const { apiUrl } = jobTeaserData;
  if (apiUrl) {
    // eslint-disable-next-line no-undef
    const response = await fetch(apiUrl, {
      method: 'GET',
    });
    if (response.ok) {
      const responseObject = await response.json();
      if (responseObject) {
        return responseObject.jobs.slice(0, 15)
          .map((job) => ({
            title: job.title.value,
            dateModified: job.dateModified,
            link: job.link,
            htmlContent: job.htmlContent,
          }));
      }
    }
  }
  return [];
}

function createContentTile(teaserTile) {
  const tileTitle = document.createElement('h4');
  tileTitle.classList.add('jobteaser__content-tile__title');
  tileTitle.textContent = teaserTile.title;
  const tileDate = document.createElement('p');
  tileDate.classList.add('jobteaser__content-tile__date');
  tileDate.textContent = teaserTile.dateModified;
  const tileLink = document.createElement('a');
  tileLink.classList.add('jobteaser__content-tile__link');
  tileLink.href = teaserTile.link;
  tileLink.textContent = 'Link to Site';

  const tileContainer = document.createElement('div');
  tileContainer.classList.add('jobteaser__content-tile');
  tileContainer.appendChild(tileTitle);
  tileContainer.appendChild(tileDate);
  tileContainer.appendChild(tileLink);

  return tileContainer;
}

async function loadContent(block) {
  const jobTeaserData = await getJobTeaserData();
  const jobTeaserTiles = await getJobTeaserTiles(jobTeaserData);

  const jobTeaserContentContainer = document.createElement('div');
  jobTeaserContentContainer.classList.add('jobteaser__content');
  for (let i = 0; i < jobTeaserTiles.length; i += 1) {
    jobTeaserContentContainer.appendChild(createContentTile(jobTeaserTiles[i]));
  }
  block.appendChild(jobTeaserContentContainer);
}

export default async function decorate(block) {
  const container = block.children[0];
  loadTitle(container);
  await loadContent(container);
}
