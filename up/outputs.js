'use strict';
outputs.createPlain = text => {
  const elem = document.createElement('div')
  const textElem = document.createElement('span')
  textElem.innerText = text
  textElem.id = 'text'
  textElem.onclick = () => cmdBuffer.elemClick.call(elem)
  elem.textElem = textElem
  elem.appendChild(textElem)
  elem.id = 'c' + outputs.count++
  return elem
}
outputs.creators = {
  plain:outputs.createPlain,
  error:text => {
    const elem = outputs.createPlain(' ' + text)
    const svg = createIcon('error')
    svg.style.stroke = 'var(--colorFg)'
    elem.prepend(svg)
    return elem
  },
  subtext:(text, subtext, tooltip) => {
    console.log(text, subtext, tooltip)
    const elem = outputs.createPlain(text)
    if (subtext != null) {
      let subElem = document.createElement('span')
      subElem.className = 'subtext'
      subElem.innerText = ' - '
      elem.appendChild(subElem)
      subElem = document.createElement('span')
      subElem.className = 'subtext'
      subElem.innerText = subtext
      if (tooltip != null) {
        makeTooltipTrigger(subElem)
        subElem.tooltip.innerText = tooltip
      }
      elem.appendChild(subElem)
    }
    return elem
  },
  hidable:(text, subtext, tooltip) => {
    input.toggleHideBtn.classList.remove('emptyHidden')
    const elem = outputs.createPlain(text + ' ')
    elem.classList.add('hidable')
    const coveredText = document.createElement('span')
    let cover = document.createElement('span')
    cover.id = 'cover'
    cover.innerText = '···'
    coveredText.appendChild(cover)
    elem.removeChild(elem.textElem)
    coveredText.appendChild(elem.textElem)
    cover = document.createElement('span')
    cover.id = 'cover'
    cover.innerText = '···'
    coveredText.appendChild(cover)
    elem.oncopy = () => {
      const covers = elem.querySelectorAll('#cover')
      covers.forEach(item => item.style.userSelect = 'none')
      if (doubleBuffer.activeCopy != copy)
        copyBtn.activate()
      else
        copyBtn.triggerTooltip()
      setTimeout(() => covers.forEach(item => item.style.userSelect = null), 1)
    }
    coveredText.ondblclick = () => {
      if (input.hideResult)
        selectElement(coveredText)
    }
    makeTooltipTrigger(coveredText, 'you can select these dots and copy the hidden text').classList.add('coveredOnly')
    elem.appendChild(coveredText)
    if (subtext != null) {
      let subElem = document.createElement('span')
      subElem.className = 'subtext'
      subElem.innerText = '- '
      elem.appendChild(subElem)
      subElem = document.createElement('span')
      subElem.className = 'subtext'
      subElem.innerText = subtext + ' '
      if (tooltip != null) {
        makeTooltipTrigger(subElem)
        subElem.tooltip.innerText = tooltip
      }
      elem.appendChild(subElem)
    }
    const copy = createIcon('clipboard', 'empty')
    copy.animated.style.stroke = 'none'
    copy.querySelector('#empty').onend = () => {
      copy.animated.style.stroke = 'none'
      copyBtn.classList.add('hoverAppear')
    }
    const copyBtn = document.createElement('span')
    copyBtn.className = 'button hoverAppear'
    copyBtn.appendChild(copy)
    makeTooltipTrigger(copyBtn, 'after using the text you copied, remember to click this button to clear the clipboard')
    copyBtn.tooltip.classList.add('serious')
    copyBtn.activate = () => {
      if (doubleBuffer.activeCopy != null)
        doubleBuffer.activeCopy.querySelector('#empty').beginElement()
      doubleBuffer.activeCopy = copy
      copy.animated.style.stroke = null
      copy.querySelector('#filled').beginElement()
      copyBtn.triggerTooltip()
      copyBtn.classList.remove('hoverAppear')
    }
    copyBtn.onclick = () => {
      if (doubleBuffer.activeCopy === copy) {
        navigator.clipboard.writeText('').then(()=>{})
        copy.querySelector('#empty').beginElement()
        doubleBuffer.activeCopy = null
        copyBtn.classList.remove('triggered')
        copyBtn.classList.add('hoverAppear')
      } else {
        copyBtn.activate()
        navigator.clipboard.writeText(elem.textElem.innerText).then(()=>{})
      }
    }
    elem.appendChild(copyBtn)
    return elem
  },
}
