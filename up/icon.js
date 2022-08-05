'use strict';
function updateIcon(elem, icon, animatedState) {
  elem.setAttribute('viewBox', '0 0 64 64')
  elem.classList.add('inline-icon')
  if (icon in animatedIconPaths) {
    let path = document.createElementNS("http://www.w3.org/2000/svg", 'path')
    path.setAttribute('d', animatedIconPaths[icon]._static)
    path.style.fill = 'none'
    elem.appendChild(path)
    path = document.createElementNS("http://www.w3.org/2000/svg", 'path')
    path.setAttribute('d', animatedIconPaths[icon][animatedState])
    elem.animated = path
    for (const name in animatedIconPaths[icon]) {
      if (name[0] === '_') continue
      const anim = document.createElementNS("http://www.w3.org/2000/svg", 'animate')
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
    const path = document.createElementNS("http://www.w3.org/2000/svg", 'path')
    path.setAttribute('d', iconPaths[icon])
    path.style.fill = 'none'
    elem.appendChild(path)
  }
  return elem
}
function createIcon(icon, animatedState) {
  return updateIcon(document.createElementNS("http://www.w3.org/2000/svg", 'svg'), icon, animatedState)
}
setTimeout(() => {
  for (const icon in iconPaths)
    for (const elem of document.querySelectorAll('.insert-icon-' + icon))
      elem.appendChild(createIcon(icon))
  for (const group in animatedIconPaths)
    for (const item in animatedIconPaths[group])
      for (const elem of document.querySelectorAll(`.insert-icon-${group}-${item}`))
        elem.appendChild(createIcon(group, item))
}, 1)

const iconPaths = {enter:'M26,29 12,43 26,57M49,10V43H12', error:'m52,12 -40,40m0,-40 40,40', doubleExcl:'m42,56v-2h2 v2zM43,43V8M20,56v-2h2v2zM21,43V8', up:'M32,54V12M52,32 32,12 12,32', down:'M32,10V52M52,32 32,52 12,32', left:'M54,32H12M32,52 12,32 32,12', right:'M10,32H52M32,52 52,32 32,12'}
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
