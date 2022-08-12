'use strict';
const myEncodeURI = text => encodeURIComponent(text)
  .replaceAll('%20', ' ').replaceAll('%2F', '/')
  .replaceAll('%3A', ':').replaceAll('%3D', '=')
  .replaceAll('%3C', '<').replaceAll('%3E', '>')
let favicon = document.querySelector("link[rel~='icon']");
let previewElem = document.querySelector("meta[property~='og:image']");
let themeColor = document.querySelector("meta[name~='theme-color']");
let processIcon = (template, color, darkMode) => 'data:image/svg+xml,' + myEncodeURI(template
    .replaceAll('{color1}', rootStyle.getPropertyValue(`--${darkMode ? 'dark-' : ''}${color}`))
    .replaceAll('{colorFg}', darkMode ? '#FFF' : '#000')
    .replaceAll('{colorBg}', darkMode ? rootStyle.getPropertyValue(`--darker-${color}Bg`) : 'white'))
const updateFavicon = e => {
  themeColor.content = rootStyle.getPropertyValue('--color1')
  favicon.href = processIcon(faviconTemplate, e.color, e.darkMode)
}
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change', e=>updateFavicon(ThemeChangeEvent()))
  let darkMode = window.matchMedia('(prefers-color-scheme:dark)').matches
  if (localStorage.themeBg && darkMode !== (localStorage.themeBg !== 'white'))
    localStorage.themeBg = darkMode ? 'darker' : 'white'
}
document.addEventListener('themechange', updateFavicon)
