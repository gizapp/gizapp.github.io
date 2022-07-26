'use strict';
const colorList = ['pink', 'blue', 'red', 'lightBlue', 'cyan']
let themeColor = 'blue'
let themeBg = 'dark'
const theme = document.documentElement.style
function setTheme({color, background}={}) {
  if (background != null)
    themeBg = background
  const prefix = themeBg !== 'white' ? 'dark-' : ''
  if (color != null)
    themeColor = color
  theme.setProperty('--color1', `var(--${prefix + themeColor})`)
  theme.setProperty('--selColor', `var(--${prefix + themeColor}Sel)`)
  theme.setProperty('--colorFg', `var(--${prefix ? 'dark' : 'light'}Fg)`)
  if (themeBg !== 'white') {
    if (themeBg === 'black')
      theme.setProperty('--colorBg', 'black')
    else
      theme.setProperty('--colorBg', `var(--${themeBg}-${themeColor}Bg)`)
  } else
    theme.setProperty('--colorBg', 'white')
  updateIcons()
  return 'Theme changed!'
}
const rootStyle = getComputedStyle(document.documentElement)
setTimeout(() => setTheme({color:themeColor, background:themeBg}), 1)

