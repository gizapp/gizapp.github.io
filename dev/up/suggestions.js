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
function createPlain() {
  const elem = document.createElement('span')
  const text = document.createElement('span')
  text.id = 'text'
  elem.appendChild(text)
  elem.textElem = text
  makeTooltipTrigger(elem)
  elem.onclick = () => appendCmd(text.innerText.trim())
  elem.setPlain = elem.setItem = function(item, suffix) {
    elem.textElem.innerText = item.text + suffix
    if (item.help)
      elem.tooltip.innerText = item.help
    elem.classList.toggle('tooltiptrigger', !!item.help)
    setLocalColor(elem, item.color)
  }
  return elem
}
suggestions.creator = {
  plain:createPlain,
  error:function() {
    const elem = createPlain()
    elem.className = 'strong'
    elem.onclick = function() {
      const range = document.createRange()
      range.setStart(input.childNodes[0], elem.range[0])
      range.setEnd(input.childNodes[0], elem.range[1])
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
    }
    elem.setItem = function(item, suffix) {
      elem.setPlain(item, suffix)
      elem.range = [item.start, item.end]
    }
    return elem
  },
  input:function() {
    const elem = suggestions.creator.plain()
    elem.activeTooltip = elem.tooltip
    elem.activeTooltip.classList.toggle('inactive', true)
    makeTooltipTrigger(elem)
    const input = document.createElement('span')
    input.id = 'input'
    input.contentEditable = true
    elem.input = input
    elem.appendChild(input)
    function trigger() {
      const elemName = elem.textElem.innerText
      if (!elemName.includes('<'))
        appendCmd(elemName.trim())
      appendCmd(input.innerText)
    }
    input.onkeydown = function(e) {
      if (e.keyCode === enterKey) e.preventDefault()
    }
    input.onkeyup = function(e) {
      if (e.keyCode === enterKey && input.innerText.trim !== '')
        trigger()
    }
    const enterBtn = createIcon('enter')
    enterBtn.id = 'enter'
    enterBtn.onclick = function(e) {
      trigger()
      e.stopPropagation()
    }
    elem.enterBtn = enterBtn
    elem.appendChild(enterBtn)
    input.onmousedown = e => e.inputClick = true
    elem.onmousedown = function(e)/*hold-focus*/{
      if (elem.classList.contains('active') && !e.inputClick)
        e.preventDefault()
    }
    elem.onclick = function() {
      if (!elem.classList.contains('active'))/*param-deploy*/{
        if (elem.noInput) {
          appendCmd(elem.textElem.innerText.trim())
        } else {
          input.innerText = elem.suggestion
          elem.classList.toggle('active', true)
          elem.activeTooltip.classList.toggle('inactive', false)
          elem.tooltip.classList.toggle('inactive', true)
          setTimeout(() => elem.triggerTooltip(), medAnimTime)
          selectElement(input)
        }
      }
    }
    input.onblur = function() {
      elem.classList.toggle('active', false)
      elem.activeTooltip.classList.toggle('inactive', true)
      elem.tooltip.classList.toggle('inactive', false)
    }
    elem.setItem = function(item, suffix) {
      elem.setPlain(item, suffix)
      elem.suggestion = item.suggestion
      const type = item.type
      if (!type.noInput) {
        let inputHelp = ''
        inputHelp = 'enter ' + type.desc
        elem.activeTooltip.innerText = inputHelp
      } else
        elem.noInput = type.noInput
    }
    return elem
    // param-deploy: check if the parameter is not already deployed. If so, deploy its content
    // hold-focus: if the parameter is deployed and a click lands outside the input but inside the param, cancel that click and keep the focus of the input so that the undeploy listener isn't triggered
  },
  options:function() {
    const elem = createPlain()
    elem.onclick = function() {
      if (elem.choices) {
        for (const choice of elem.choices)
          suggestions.animatedRemoveChild(choice)
        elem.choices = null
      } else {
        elem.choices = []
        for (const choiceItem of elem.options) {
          const choice = suggestions.creator.plain()
          choice.setItem(choiceItem, suggestions.suffix)
          suggestions.insertBefore(choice, elem)
          choice.onclick = function() {
            const paramName = elem.textElem.innerText
            if (!paramName.includes('<'))
              appendCmd(paramName.trim())
            appendCmd(choice.textElem.innerText.trim())
          }
          elem.choices.push(choice)
        }
      }
      elem.classList.toggle('strong', !!elem.choices)
    }
    elem.setItem = function(item, suffix) {
      elem.setPlain(item, suffix)
      elem.options = item.type.options
    }
    return elem
  },
}
