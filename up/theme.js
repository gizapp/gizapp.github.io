'use strict';
const ThemeChangeEvent = () => {
  const event = new Event('themechange')
  event.darkMode = window.matchMedia ? window.matchMedia('(prefers-color-scheme:dark)').matches : false
  event.background = localStorage.themeBg || (event.darkMode ? 'darker' : 'white')
  event.color = localStorage.themeColor || 'lightBlue'
  return event
}
const colorList = ['pink', 'blue', 'red', 'lightBlue', 'cyan', 'black', 'white']
const theme = document.documentElement.style
function setTheme({color, background}={}) {
  let unchanged = true
  if (background != null && background != localStorage.themeBg) {
    localStorage.themeBg = background
    unchanged = false
  }
  if (color != null && color != localStorage.themeColor) {
    localStorage.themeColor = color
    unchanged = false
  }
  const event = ThemeChangeEvent()
  const currDarkMode = event.background !== 'white'
  const prefix = currDarkMode ? 'dark-' : ''
  if (!rootStyle.getPropertyValue(`--${prefix + event.color}`))
    return [true, 'Invalid theme!']
  theme.setProperty('--color1', `var(--${prefix + event.color})`)
  theme.setProperty('--selColor', `var(--${prefix + event.color}Sel)`)
  theme.setProperty('--colorFg', `var(--${prefix ? 'dark' : 'light'}Fg)`)
  theme.setProperty('--colorBg', event.background.startsWith('dark') ? `var(--${event.background}-${event.color}Bg)` : event.background)
  rootStyle = getComputedStyle(document.documentElement)
  document.dispatchEvent(event)
  const msg = unchanged ? 'Theme refreshed' : 'Theme changed!'
  if (window.matchMedia && currDarkMode !== event.darkMode)
    return [false, msg, 'inconsistent with system theme', `the page will switch to a ${event.darkMode ? 'dark' : 'light'} theme when refreshed to match with the system theme`]
  return [false, msg]
}
function setLocalColor(elem, color) {
  const background = localStorage.themeBg || 'white'
  elem.style.setProperty('--localColor', (color || null) && `var(--${background !== 'white' ? 'dark-' : ''}${color})`)
  elem.style.setProperty('--localBg', (color || null) && `var(--${background}-${color}Bg)`)
}
let rootStyle = getComputedStyle(document.documentElement)
theme.transition = 'none' // avoid-initial-transition
if (setTheme()[0]) {
  delete localStorage.themeBg
  delete localStorage.themeColor
  setTheme()
}
setTimeout(() => { // avoid-initial-transition
  theme.transition = null
}, 1)
// avoid-initial-transition: briefly set root transition to none to avoid the theme change transition when reloading the page
