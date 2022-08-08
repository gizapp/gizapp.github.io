'use strict';
const myEncodeURI = text =>
  encodeURIComponent(text).replaceAll('%20', ' ').replaceAll('%2F', '/').replaceAll('%3A', ':').replaceAll('%3D', '=').replaceAll('%3C', '<').replaceAll('%3E', '>')
const faviconTemplate = '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="960"><path style="fill:{color1}" d="M600 635.2h99c185 0 261-89 261-238v-69c0-151-76-237-261-237H549.5l33.3 148.4c30.4 21.6 50.4 44.8 76.8 70.4l4.8-3.2C658.8 281.2 654 258 646.8 228.4 640.4 202 635.6 187.6 624.4 166c15.2-5.6 36.8-9.6 63.2-9.6 52 0 66.4 24 56 85.6-4.8 26.4-11.2 44-20 64.8l4 3.2c27.2-26.4 48.8-44.8 112-92 12 13.6 18.4 21.6 24 31.2 21.6 36.8 17.6 67.2-12 78.4-40.8 16-66.4 23.2-99.2 32.8v4.8c44.8 15.2 74.4 26.4 137.6 52.8-4.8 16.8-9.6 27.2-15.2 36.8-20.8 36.8-49.6 48-73.6 28.8-34.4-27.2-48.8-41.6-76-68l-4.8 2.4c7.2 28 10.4 47.2 14.4 72 5.6 34.4 11.2 50.4 21.6 72-22.4 5.6-39.2 8-60 8-56.8 0-70.4-26.4-56.8-85.6 5.6-24 11.2-44 19.2-65.6l-4-3.2c-37.6 32.8-64.8 55.2-109.6 89.6z"/><path style="fill:{color2}" d="M630 358c-47.2-16.8-80-29.6-136-52.8 4-12 8-25.6 15.2-37.6 21.6-35.2 48-46.4 73.6-28 6.228 4.425 12.02 8.918 17.52 13.486V202.08C600.32 116.96 570.08 80 484.96 80 464.8 80 442.4 83.36 425.6 91.2V564.96C361.76 653.44 280 696 208.32 696 193.76 696 182.56 693.76 172.48 688.16 203.84 503.36 217.28 371.2 217.28 248 217.28 118.08 166.88 80 75.04 80 48.16 80 26.88 82.24 0 91.2c12.32 35.84 17.92 77.28 17.92 123.2v464.8c0 131.04 86.24 207.2 170.24 207.2 84 0 179.2-36.96 230.72-187.04h6.72c3.36 162.4 48.16 184.8 118.72 184.8 29.12 0 59.36-3.36 77.28-8.96-14.56-35.84-21.28-71.68-21.28-113.12V461.746c-16.395 13.376-33.757 27.05-55.12 43.455-8.8-8.8-18.4-19.2-25.6-32-19.2-34.4-16-65.6 12.8-77.6C567.6 380.4 594 374 630 362.8"/></svg>'
let favicon = document.querySelector("link[rel~='icon']");
if (!favicon) {
  favicon = document.createElement('link')
  favicon.rel = 'icon'
  document.getElementsByTagName('head')[0].appendChild(favicon)
}
function updateFavicon(color) {
  let style = getComputedStyle(document.documentElement)
  let darkMode = window.matchMedia ? window.matchMedia('(prefers-color-scheme:dark)').matches : false
  let svg = faviconTemplate.replaceAll('{color2}', style.getPropertyValue('--' + (darkMode ? 'dark-' : '') + color)).replaceAll('{color1}', darkMode ? '#FFF' : '#000')
  favicon.href = 'data:image/svg+xml,' + myEncodeURI(svg)
  return darkMode
}
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change', e=>updateFavicon(localStorage.themeColor))
  let darkMode = window.matchMedia('(prefers-color-scheme:dark)').matches
  if (darkMode !== (localStorage.themeBg !== 'white'))
    localStorage.themeBg = darkMode ? 'darker' : 'white'
}
const colorList = ['pink', 'blue', 'red', 'lightBlue', 'cyan', 'black', 'white']
const theme = document.documentElement.style
function setTheme({color, background}={}) {
  let unchanged = true
  if (background != null && background !== localStorage.themeBg) {
    localStorage.themeBg = background
    unchanged = false
  }
  background = localStorage['themeBg'] || 'darker'
  const currDarkMode = background !== 'white'
  const prefix = currDarkMode ? 'dark-' : ''
  if (color != null && color !== localStorage.themeColor) {
    localStorage.themeColor = color
    unchanged = false
  }
  color = localStorage['themeColor'] || 'lightBlue'
  if (!rootStyle.getPropertyValue(`--${prefix + color}`))
    return [true, 'Invalid theme!']
  theme.setProperty('--color1', `var(--${prefix + color})`)
  theme.setProperty('--selColor', `var(--${prefix + color}Sel)`)
  theme.setProperty('--colorFg', `var(--${prefix ? 'dark' : 'light'}Fg)`)
  if (background !== 'white') {
    if (background === 'black')
      theme.setProperty('--colorBg', 'black')
    else
      theme.setProperty('--colorBg', `var(--${background}-${color}Bg)`)
  } else
    theme.setProperty('--colorBg', 'white')
  const sysDarkMode = updateFavicon(color)
  const msg = unchanged ? 'Theme refreshed' : 'Theme changed!'
  if (window.matchMedia && currDarkMode !== sysDarkMode)
    return [false, msg, 'inconsistent with system theme', `the page will switch to a ${sysDarkMode ? 'dark' : 'light'} theme when refreshed to match with the system theme`]
  return [false, msg]
}
function setLocalColor(elem, color) {
  const background = localStorage.themeBg || 'white'
  elem.style.setProperty('--localColor', (color || null) && `var(--${background !== 'white' ? 'dark-' : ''}${color})`)
  elem.style.setProperty('--localBg', (color || null) && `var(--${background}-${color}Bg)`)
}
const rootStyle = getComputedStyle(document.documentElement)
theme.transition = 'none'
if (setTheme()[0]) {
  delete localStorage.themeBg
  delete localStorage.themeColor
  setTheme()
}
setTimeout(() => {
  theme.transition = null
}, 1)
