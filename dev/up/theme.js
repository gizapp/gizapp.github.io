/*
Understandable Passwords - make random, yet understandable sentences to use as passwords
Copyright 2022 Đặng Văn Quân

This file is part of Understandable Passwords.

Understandable Passwords is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Understandable Passwords is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with Understandable Passwords. If not, see <https://www.gnu.org/licenses/>.

Contact email: gizapp@tutanota.com
*/
'use strict';

//favicon
const myEncodeURI = text => encodeURIComponent(text)
  .replaceAll('%20', ' ').replaceAll('%2F', '/')
  .replaceAll('%3A', ':').replaceAll('%3D', '=')
  .replaceAll('%3C', '<').replaceAll('%3E', '>')
let favicon = document.querySelector("link[rel~='icon']");
let previewElem = document.querySelector("meta[property~='og:image']");
let themeColor = document.querySelector("meta[name~='theme-color']");
let processIcon = (template, color, darkMode) => 'data:image/svg+xml,' + myEncodeURI(template
    .replaceAll('{color1}', rootStyle.getPropertyValue(`--theme-${color}`))
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

//theme
const ThemeChangeEvent = () => {
  const event = new Event('themechange')
  event.darkMode = window.matchMedia ? window.matchMedia('(prefers-color-scheme:dark)').matches : false
  event.background = localStorage.themeBg || (event.darkMode ? 'darker' : 'white')
  event.color = localStorage.themeColor || 'lightBlue'
  return event
}
const colorList = ['pink', 'blue', 'red', 'lightBlue', 'cyan', 'violet', 'black', 'white']
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
  for (const c of colorList)
    theme.setProperty(`--theme-${c}`, `var(--${prefix + c})`)
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
const rem2px = parseFloat(rootStyle.fontSize)
const medAnimTime = parseFloat(rootStyle.getPropertyValue('--medAnimTime'))*1000
theme.setProperty('--animTime', 0) // avoid-initial-transition
theme.setProperty('--medAnimTime', 0) // avoid-initial-transition
theme.setProperty('--longAnimTime', 0) // avoid-initial-transition
if (setTheme()[0]) {
  delete localStorage.themeBg
  delete localStorage.themeColor
  setTheme()
}
const color1 = theme.getPropertyValue('--color1')
const colorFg = theme.getPropertyValue('--colorFg')
const colorBg = theme.getPropertyValue('--colorBg')
theme.setProperty('--color1', colorBg)
theme.setProperty('--colorFg', colorBg)
setTimeout(() => { // avoid-initial-transition
  theme.setProperty('--animTime', null)
  theme.setProperty('--medAnimTime', null)
  theme.setProperty('--longAnimTime', null)
}, 1)
const showPage = () => {
  if (color1 != null) {
    theme.setProperty('--color1', color1)
    theme.setProperty('--colorFg', colorFg)
    color1 = null
    colorFg = null
    colorBg = null
  }
}
setTimeout(showPage, 1000)
document.fonts.ready.then(showPage)

// avoid-initial-transition: briefly set root transition to none to avoid the theme change transition when reloading the page
