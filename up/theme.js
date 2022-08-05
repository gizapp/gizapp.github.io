'use strict';
const colorList = ['pink', 'blue', 'red', 'lightBlue', 'cyan', 'black', 'white']
const theme = document.documentElement.style
function setTheme({color, background}={}) {
  const unchanged = background == null && color == null
  if (background != null)
    localStorage.themeBg = background
  background = localStorage['themeBg'] || 'white'
  const prefix = background !== 'white' ? 'dark-' : ''
  if (color != null)
    localStorage.themeColor = color
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
  return [false, unchanged ? 'Theme refreshed' : 'Theme changed!']
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

