// const dataEndpointUrl = '/bin/jobteaser/data';

// function loadTitle(jobTeaserTitleContainer) {
//   const elementWithTitle = jobTeaserTitleContainer.querySelector('p');
//   const title = elementWithTitle.textContent;
//
//   if (title != null) {
//     const headingElementWithTitle = document.createElement('h2');
//     headingElementWithTitle.textContent = title;
//     jobTeaserTitleContainer.appendChild(headingElementWithTitle);
//   }
// }
//
// async function getJobTeaserData() {
//   // eslint-disable-next-line no-undef
//   const response = await fetch(dataEndpointUrl, {
//     method: 'GET',
//   });
//
//   if (response.ok) {
//     const responseObject = await response.json();
//
//     if (responseObject) {
//       return responseObject.map(results => ({
//         apiUrl: results.apiUrl,
//         baseFilterUrl: results.baseFilterUrl,
//         baseTeaserUrl: results.baseTeaserUrl,
//       }));
//     }
//   }
//   return {};
// }
//
// async function getJobTeaserTiles(jobTeaserData) {
//   const apiUrl = jobTeaserData.apiUrl;
//   if (apiUrl) {
//     // eslint-disable-next-line no-undef
//     const response = await fetch(apiUrl, {
//       method: 'GET',
//     });
//
//     if (response.ok) {
//       const responseObject = await response.json();
//
//       if (responseObject) {
//         return responseObject
//           .flatMap(results => results['jobs'])
//           .map(job => ({
//             title: job.title.value,
//             dateModified: job.dateModified,
//             link: job.link,
//             htmlContent: job.htmlContent
//           }));
//       }
//     }
//   }
//
//   return [];
// }
//
// function createContentTile(teaserTile) {
//   const tileTitle = document.createElement('h3');
//   tileTitle.classList.add('jobteaser__content-tile__title');
//   tileTitle.textContent = teaserTile.title;
//   const tileDate = document.createElement('p');
//   tileTitle.classList.add('jobteaser__content-tile__date');
//   tileDate.textContent = teaserTile.dateModified;
//   const tileLink = document.createElement('a');
//   tileTitle.classList.add('jobteaser__content-tile__link');
//   tileLink.href = teaserTile.link;
//   tileLink.textContent = 'Link to Site';
//
//   const tileContainer = document.createElement('div');
//   tileContainer.classList.add('jobteaser__content-tile')
//   tileContainer.appendChild(tileTitle);
//   tileContainer.appendChild(tileDate);
//   tileContainer.appendChild(tileLink);
//
//   return tileContainer;
// }
//
// async function loadContent(jobTeaserContentContainer) {
//   const jobTeaserData = await getJobTeaserData();
//   console.log(jobTeaserData);
//   const jobTeaserTiles = await getJobTeaserTiles(jobTeaserData);
//   console.log(jobTeaserTiles);
//
//   for (const teaserTile of jobTeaserTiles) {
//     const tileContainer = createContentTile(teaserTile);
//     jobTeaserContentContainer.appendChild(tileContainer);
//   }
// }

// export default function decorate(block) {
//   const jobTeaserTitle = block.children[0];
//   jobTeaserTitle.classList.add('jobteaser__title');
//   // loadTitle(jobTeaserTitle);
//
//   const jobTeaserContent = block.children[1];
//   jobTeaserContent.classList.add('jobteaser__content');
//   // loadContent(jobTeaserContent);
// }
