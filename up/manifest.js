'use strict';
const manifestElem = document.querySelector("link[rel~='manifest']");
const descriptionElem = document.querySelector("meta[property~='og:description']");
const titleElem = document.querySelector("meta[property~='og:title']");
descriptionElem.content = dynamicManifest.description
titleElem.content = dynamicManifest.name
document.addEventListener('themechange', e => {
  dynamicManifest.background_color = rootStyle.getPropertyValue('--color1')
  dynamicManifest.theme_color = rootStyle.getPropertyValue('--color1')
  dynamicManifest.icons = [{
    src:processIcon(iconTemplate, e.color, e.darkMode),
    sizes:'512x512',
    type:'image/svg+xml',
    purpose:'any',
  }]
  const blob = new Blob([JSON.stringify(dynamicManifest)], {type: 'application/json'});
  const manifestURL = URL.createObjectURL(blob);
  manifestElem.href = manifestURL
})
