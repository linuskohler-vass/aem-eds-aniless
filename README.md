# Aniless EDS demo
VASS Switzerland demo project to showcase AEM based EDS

## Content source for authoring
https://author-p11338-e1404827.adobeaemcloud.com/ui#/aem/sites.html/content/aem-eds-aniless

## Environments
- Preview: https://main--aem-eds-aniless--linuskohler-vass.hlx.page/
- Live: https://main--aem-eds-aniless--linuskohler-vass.hlx.live/

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Repository creation hints

1. Create a new repository based on the `aem-boilerplate` template and add a mountpoint in the `fstab.yaml`
2. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository

## Local development
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
2. Start AEM Proxy: `npm start` (opens your browser at `http://localhost:3000`)

## Prerequisites

- nodejs 18.3.x or newer
- AEM Cloud Service release 2024.8 or newer (>= `17465`)

## Resources

### Documentation
- [Getting Started Guide](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/edge-dev-getting-started)
- [Creating Blocks](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/create-block)
- [Content Modelling](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/content-modeling)
- [Working with Tabular Data / Spreadsheets](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/tabular-data)

### Presentations and Recordings
- [Getting started with AEM Authoring and Edge Delivery Services](https://experienceleague.adobe.com/en/docs/events/experience-manager-gems-recordings/gems2024/aem-authoring-and-edge-delivery)
