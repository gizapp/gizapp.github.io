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
function updateIcon(elem, icon, animatedState) {
  elem.setAttribute('viewBox', '0 0 64 64')
  elem.classList.add('inlineIcon')
  if (icon in animatedIconPaths) {
    let path = document.createElementNS(svgUrl, 'path')
    path.setAttribute('d', animatedIconPaths[icon]._static)
    path.style.fill = 'none'
    elem.appendChild(path)
    path = document.createElementNS(svgUrl, 'path')
    path.setAttribute('d', animatedIconPaths[icon][animatedState])
    elem.animated = path
    for (const name in animatedIconPaths[icon]) {
      if (name[0] === '_') continue
      const anim = document.createElementNS(svgUrl, 'animate')
      anim.id = name
      anim.setAttribute('dur', medAnimTime + 'ms')
      anim.setAttribute('fill', 'freeze')
      anim.setAttribute('attributeName', 'd')
      anim.setAttribute('begin', 'indefinite')
      anim.setAttribute('to', animatedIconPaths[icon][name])
      path.appendChild(anim)
    }
    elem.appendChild(path)
  } else {
    const path = document.createElementNS(svgUrl, 'path')
    path.setAttribute('d', iconPaths[icon])
    path.style.fill = 'none'
    elem.appendChild(path)
  }
  return elem
}
function createIcon(icon, animatedState) {
  return updateIcon(document.createElementNS(svgUrl, 'svg'), icon, animatedState)
}
window.addEventListener('load', () => {
  for (const icon in iconPaths)
    for (const elem of document.querySelectorAll('.insert-icon-' + icon))
      elem.appendChild(createIcon(icon))
  for (const icon in iconPaths)
    for (const elem of document.querySelectorAll('.prepend-icon-' + icon))
      elem.prepend(createIcon(icon))
  for (const group in animatedIconPaths)
    for (const item in animatedIconPaths[group])
      for (const elem of document.querySelectorAll(`.insert-icon-${group}-${item}`))
        elem.appendChild(createIcon(group, item))
})

const iconPaths = {
  enter:'M26,29 12,43 26,57M49,10V43H12',
  error:'m52,12 -40,40m0,-40 40,40',
  doubleExcl:'m42,56v-2h2 v2zM43,43V8M20,56v-2h2v2zM21,43V8',
  up:'M32,54V12M52,32 32,12 12,32',
  down:'M32,10V52M52,32 32,52 12,32',
  left:'M54,32H12M32,52 12,32 32,12',
  right:'M10,32H52M32,52 52,32 32,12',
  email:'M11 12A6 6 0 0 0 7.4 22.8L25 36q7 5.25 14 0L56.6 22.8A6 6 0 0 0 53 12ZM44.333 32 56.6 41.2A6 6 0 0 1 53 52H11A6 6 0 0 1 7.4 41.2L19.667 32M59 18V46M5 46V18',
  github:'M 32,4 C 16.53,4 4,16.53 4,32 c 0,12.39 8.015,22.855 19.145,26.565 1.4,0.245 1.925,-0.595 1.925,-1.33 0,-0.665 -0.035,-2.87 -0.035,-5.215 C 18,53.315 16.18,50.305 15.62,48.73 15.305,47.925 13.94,45.44 12.75,44.775 11.77,44.25 10.37,42.955 12.715,42.92 c 2.205,-0.035 3.78,2.03 4.305,2.87 2.52,4.235 6.545,3.045 8.155,2.31 0.245,-1.82 0.98,-3.045 1.785,-3.745 -6.23,-0.7 -12.74,-3.115 -12.74,-13.825 0,-3.045 1.085,-5.565 2.87,-7.525 -0.28,-0.7 -1.26,-3.57 0.28,-7.42 0,0 2.345,-0.735 7.7,2.87 2.24,-0.63 4.62,-0.945 7,-0.945 2.38,0 4.76,0.315 7,0.945 5.355,-3.64 7.7,-2.87 7.7,-2.87 1.54,3.85 0.56,6.72 0.28,7.42 1.785,1.96 2.87,4.445 2.87,7.525 0,10.745 -6.545,13.125 -12.775,13.825 1.015,0.875 1.89,2.555 1.89,5.18 0,3.745 -0.035,6.755 -0.035,7.7 0,0.735 0.525,1.61 1.925,1.33 A 28.0455,28.0455 0 0 0 60,32 C 60,16.53 47.47,4 32,4 Z',
}
const animatedIconPaths = {
  eye:{
    _static:'M39,32C39,36 36,39 32,39 28,39 25,36 25,32 25,28 28,25 32,25 36,25 39,28 39,32ZM32,14C16,14 10,32 10,32 10,32 16,50 32,50 48,50 54,32 54,32 54,32 48,14 32,14Z',
    open:'M 32,14 C 16,14 10,32 10,32 10,32 16,14 32,14 48,14 54,32 54,32 54,32 48,14 32,14 Z M 54,32 59,30 M 46,17 50,12 M 10,32 5,30 M 32,14 V 6 M 18,17 14,12',
    close:'M32,50C16,50 10,32 10,32 10,32 16,14 32,14 48,14 54,32 54,32 54,32 48,50 32,50ZM54,32 59,34M46,46 50,51M10,32 5,34M32,50V58M18,46 14,51',
  },
  clipboard:{
    _static:'M27,21c-3,0-5,-2-5,-5s2,-5 5,-5c0,-3 2,-5 5,-5s5,2 5,5c3,0 5,2 5,5s-2,5-5,5ZM42,16h9V58H13V16h9',
    empty:'M23,45h0M25,33h0',
    filled:'M23,45h18M23,33h18',
  },
}
