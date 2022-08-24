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

//buffer
const doubleBuffer = document.getElementById('doubleBuffer')
const cmdBuffer = byClass(doubleBuffer, 'cmd')
const outputs = byClass(doubleBuffer, 'result')
doubleBuffer.cachedCmd = {}
doubleBuffer.selected = null
cmdBuffer.count = 0
cmdBuffer.elemClick = function()/*func-required*/{
  if (window.getSelection().toString() === '')
    doubleBuffer.setSelected(Number(this.id.substring(1)))
}
cmdBuffer.add = function(command, hidables) {
  const elem = document.createElement('div')
  elem.command = command
  let pos = 0
  if (hidables.length > 0) {
    elem.className = 'hidable'
    for (const [start, end] of hidables) {
      elem.appendChild(document.createTextNode(command.substring(pos, start)))
      let cover = document.createElement('span')
      cover.id = 'cover'
      cover.innerText = '"··'
      elem.appendChild(cover)
      const hidden = document.createElement('span')
      hidden.id = 'text'
      hidden.innerText = command.substring(start, end)
      elem.appendChild(hidden)
      cover = document.createElement('span')
      cover.id = 'cover'
      cover.innerText = '··"'
      elem.appendChild(cover)
      pos = end
    }
  }
  elem.appendChild(document.createTextNode(command.substring(pos)))
  elem.id = 'c' + this.count++
  elem.onclick = this.elemClick
  this.prepend(elem)
  return elem
}
outputs.count = 0
outputs.add = (type, ...args) => {
  outputs.prepend(outputs.creators[type](...args))
}
doubleBuffer.setSelected = function(value) {
  if (doubleBuffer.cachedCmd[this.selected] != null && doubleBuffer.cachedCmd[this.selected] != input.innerText)
    doubleBuffer.cachedCmd[this.selected] = input.innerText
  if (this.selected != null) {
    cmdBuffer.querySelector('#c' + this.selected)?.classList?.toggle('selected', false)
    outputs.querySelector('#c' + this.selected)?.classList?.toggle('selected', false)
  }
  let newSel = null
  if (value != null) {
    if (value < 0) value = 0
    newSel = cmdBuffer.querySelector('#c' + value)
    newSel?.classList?.toggle('selected', true)
    outputs.querySelector('#c' + value)?.classList?.toggle('selected', true)
    if (!(value in doubleBuffer.cachedCmd))
      doubleBuffer.cachedCmd[value] = newSel?.command
    input.changeText(doubleBuffer.cachedCmd[value] || '')
  }
  this.selected = value
}
// func-required: the function uses 'this' and is meant to be assigned to other element's click event, it can't be converted to a lambda expression

//outputs
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

//input
const shell = document.getElementById('shell')
const input = byClass(shell, 'input')
input.shellPrefix = byClass(shell, 'prefix')
input.navUp = byClass(shell, 'insert-icon-up')
input.navDown = byClass(shell, 'insert-icon-down')
input.toggleHideBtn = byClass(shell, 'insert-icon-eye-open')
shell.sendCommand = function() {
  if (input.innerText.trim().length > 0) {
    this.oncommand(input.innerText)
    input.changeText('')
    for (const member in doubleBuffer.cachedCmd) delete doubleBuffer.cachedCmd[member]
  } else {
    input.focus()
  }
}
input.resetSelection = function () {
  // Select the end of input text
  input.focus()
  if (input.innerText) {
    const range = document.createRange();
    range.selectNodeContents(input);
    range.setStart(range.startContainer, 1)
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}
input.resetSelection()
function bgClick(e) {
  if (e.target == this)
    input.resetSelection()
}
root.addEventListener('click', bgClick)
const enterKey = 13
const downKey = 40
const upKey = 38
input.onkeydown = function(e)/*Intercept Enter, Up, and Down key*/{
  if ([enterKey, upKey, downKey].includes(e.keyCode))
    e.preventDefault()
}
input.changeText = function(text) {
  text = text.replaceAll('\u2011', '-').replaceAll(nonbreakSpace, ' ')
  this.innerText = text
  this.onchange(text)
  input.resetSelection()
}
input.onkeyup = function(e) {
  if (e.keyCode === enterKey) {
    this.parentNode.sendCommand()
    e.preventDefault()
  }
  if (e.keyCode === downKey) this.onnavigate(-1)
  if (e.keyCode === upKey) this.onnavigate(1)
  this.onchange(this.innerText)
}
input.onblur = () => input.onchange(input.innerText)
setTimeout(() =>
  input.toggleHideAnim = {true:input.toggleHideBtn.querySelector('#close'), false:input.toggleHideBtn.querySelector('#open')}
, 1)
input.hideResult = false
input.toggleHide = () => {
  input.hideResult = !input.hideResult
  doubleBuffer.classList.toggle('hiding', input.hideResult)
  input.toggleHideAnim[input.hideResult].beginElement()
}
input.updateArrow = function() {
  if (doubleBuffer.selected == null) {
    this.navUp.classList.add('hidden')
    this.navDown.classList.toggle('hidden', cmdBuffer.count <= 0)
  } else {
    this.navUp.classList.remove('hidden')
    this.navDown.classList.remove('hidden')
    if (doubleBuffer.selected === 0)
      this.navDown.classList.add('hidden')
    if (doubleBuffer.selected >= cmdBuffer.count)
      this.navUp.classList.add('hidden')
  }
}
input.onnavigate = function(delta) {
  let selected = doubleBuffer.selected
  if (selected == null) {
    if (delta < 0 && cmdBuffer.count > 0) {
      selected = cmdBuffer.count + delta
      cmdBuffer.draftCommand = input.innerText
    }
  } else if (selected + delta >= -1)
    selected += delta
  if (selected >= cmdBuffer.count) {
    doubleBuffer.setSelected(null)
    input.changeText(cmdBuffer.draftCommand || '')
  } else if (selected !== null)
    doubleBuffer.setSelected(selected)
  input.updateArrow()
}
input.onchange = function(text) {
  if (text == input.oldCmd) return
  input.oldCmd = text
  input.updateArrow()
  processCmd(text, input.commands, input)
  const empty = !text.trim()
  shell.classList.toggle('empty', empty)
  suggestions.classList.toggle('hot', empty)
  const noError = input.errorArr.length === 0
  shell.classList.toggle('valid', noError && !empty)
  let updater = suggestions.childUpdater()
  for (const item of input.errorArr) updater.next('error', item)
  for (const item of input.paramArr) updater.next(...item)
  updater.stop()
}
shell.oncommand = function(cmd) {
  cmd = cmd.trimEnd().trimStart()
  cmdBuffer.add(cmd, input.hidables)
  input.onchange(cmd)
  if (input.errorArr.length > 0) {
    outputs.add('error', input.errorArr.map(item => item.text).join(', '))
  } else {
    try {
      const output = input.cmdObj.base(input.paramValues)
      outputs.add(...output)
    } catch (error) {
      console.error(error)
      outputs.add('unknown error, see console')
    }
  }
}
function addCommand() {
  input.changeText(this.innerText + ' ')
  window.scrollTo(0, 0)
}
window.addEventListener('load', () => {
  for (const elem of document.getElementsByTagName('cmd'))
    elem.onclick = addCommand
})

//commands
const paramType = {
  int:{
    desc:'an integer',
    shortDesc:'int',
    check:num => !isNaN(num),
    parse:str => Number(str),
  },
  none:{
    noInput:true,
    parse:val => val,
    check:val => false,
  },
  string:{
    desc:'a string',
    parse:val => val,
    check:val => false,
  },
}
paramType.intFrom = min => ({...paramType.int,
  desc:'an integer ≥ '+min,
  shortDesc:`intFrom(${min})`,
  check:num => isNaN(num) || num < min,
})
paramType.intUpto = max => ({...paramType.int,
  desc:'an integer ≤ '+max,
  shortDesc:`intUpto(${max})`,
  check:num => isNaN(num) || num > max,
})
paramType.intBetween = (min, max) => ({...paramType.int,
  desc:`an integer between ${min} and ${max}`,
  shortDesc:`intBetween(${min}, ${max})`,
  check:num => isNaN(num) || num < min || num > max,
})
paramType.choices = (name, choices, mapper) => ({...paramType.string,
  desc:'one of '+choices.join(', '),
  shortDesc:name,
  check:val => !choices.includes(val),
  options:choices.map(mapper),
})
function onCommandDefined(command) {
  function prepCommand(command) {
    if (command.exclusions)
      for (let group of command.exclusions)
        for (let i = 0; i < group.length; i++)
          if (typeof group[i] === 'string')
            group[i] = [group[i]]
    if (command.prioritizedParam)
      command.prioritizedParam.reverse()
    else
      command.prioritizedParam = []
    if (command.defaultParam == null)
      command.defaultParam = {}
    if (command.param)
      for (let name in command.param) {
        const param = command.param[name]
        param.suggestion = param.suggestion || command.defaultParam[name] || name
        if (param.type == null)
          param.type = paramType.none
      }
    for (let child in command.children)
      prepCommand(command.children[child])
  }
  prepCommand(command)
  input.onchange(input.innerText)
}
function getExclusions(command, name) {
  const result = []
  if (command.exclusions)
    for (let group of command.exclusions) {
      let inItem = null
      for (let item of group)
        if (item.includes(name)) {
          inItem = item
          break
        }
      if (inItem != null)
        for (let item of group)
          if (item !== inItem)
            result.push(...item)
    }
  return result
}
function processCmd(text, commands, result) {
  let cmdObj = null
  result.paramValues = {}
  let noSuggestions = false
  let paramNames = null
  let paramIndex = 0
  function setCurrentCmd(value) {
    cmdObj = value
    paramNames = cmdObj.param
    paramIndex = 0
    if (paramNames)
      paramNames = Object.keys(paramNames)
  }
  setCurrentCmd(commands)
  let expectingParamName = null
  let excludedParams = []
  result.errorArr = []
  result.hidables = []
  let commandStart = 0
  let commandEnd = 0
  function addError(text, help) {
    result.errorArr.push({text, help, start, end})
  }
  let i = 0
  for (var [word, start, end] of tokenize(text)) {
    if (result.errorArr.length > 0)
      noSuggestions = true
    if (expectingParamName) {
      if (!word.startsWith('-')) {
        const param = cmdObj.param[expectingParamName]
        word = param.type.parse(word)
        if (param.type.check(word))
          addError(`${expectingParamName} must be ${param.type.shortDesc}`, `parameter ${expectingParamName} must be ${param.type.desc}`)
        result.paramValues[expectingParamName] = word
        if (param.hidable)
          result.hidables.push([start, end])
        expectingParamName = null
        continue
      } else
        addError(`expecting value for "${expectingParamName}"`)
    }
    if (cmdObj.children && word in cmdObj.children) {
      commandStart = start
      commandEnd = end
      excludedParams.push(...getExclusions(cmdObj, word))
      setCurrentCmd(cmdObj.children[word])
      continue
    } else if (paramNames) {
      if (word.startsWith('--')) {
        word = word.substring(2)
        if (word in cmdObj.param) {
          excludedParams.push(...getExclusions(cmdObj, word))
          if ('variantOf' in cmdObj.param[word])
            word = cmdObj.param[word].variantOf
          result.paramValues[word] = true
          const param = cmdObj.param[word]
          if (word in cmdObj.defaultParam || param.required)
            expectingParamName = word
        } else addError(`unknown switch --${word}`)
        continue
      } else {
        for (; paramIndex < paramNames.length; paramIndex++) {
          const paramName = paramNames[paramIndex]
          const param = cmdObj.param[paramName]
          if (param.positional) {
            word = param.type.parse(word)
            if (param.type.check(word))
              addError(`$${paramIndex+1} must be ${param.type.shortDesc}`, `parameter ${paramIndex+1} must be ${param.type.desc}`)
            else
              excludedParams.push(...getExclusions(cmdObj, paramName))
            result.paramValues[paramName] = word
            if (param.hidable)
              result.hidables.push([start, end])
            word = null
            paramIndex++
            break
          }
        }
        if (word == null) continue
      }
    }
    addError(`unexpected "${word}"`)
    i++
  }
  start = text.length
  end = text.length
  for (const param in cmdObj.param)
    if (!(param in result.paramValues) && cmdObj.param[param].required)
      addError('expecting value for ' + param)
  result.paramArr = []
  if (!noSuggestions) {
    const names = []
    if (cmdObj.param != null)
      names.push(...Object.keys(cmdObj.param).map(item => ['input', item]))
    if (cmdObj.children != null)
      names.push(...Object.keys(cmdObj.children).map(item => ['plain', item]))
    for (const prioritized of cmdObj.prioritizedParam) {
      const index = names.findIndex(item => item[1] === prioritized)
      if (index >= 0) names.unshift(...names.splice(index, 1))
    }
    let firstPositional = true
    result.paramArr.push(...names
      .map(item => {
        if (excludedParams.includes(item[1]))
          return null
        if (item[0] === 'plain')
          return ['plain', {text:item[1], help:cmdObj.children[item[1]]?.help}]
        let param = cmdObj.param[item[1]]
        if ('variantOf' in param || item[1] in result.paramValues)
          return null
        const obj = {...param, text:''}
        if (param.positional) {
          if (firstPositional) {
            firstPositional = false
            obj.text = '<' + item[1] + '>'
          }
        }
        if (!obj.text)
          obj.text = '--' + item[1]
        if (param.type.options != null)
          item[0] = 'options'
        return [item[0], obj]
      })
      .filter(item => item != null)
    )
  }
  result.cmdObj = cmdObj
  result.paramValues = {...cmdObj.defaultParam, ...result.paramValues}
}

//suggestions
const suggestions = document.getElementById('suggestions')
suggestions.msg = document.querySelector('#suggestions>.msg')
suggestions.msg.innerText = (isTouchDevice() ? 'Tap and hold ' : 'Hover ') + suggestions.msg.innerText
if (document.documentElement.clientWidth < rem2px * 48) {
  suggestions.removeChild(suggestions.msg)
  suggestions.parentNode.prepend(suggestions.msg)
}
suggestions.animatedRemoveChild = function(child) {
  if (child.classList.contains('hidden')) return
  child.classList.add('hidden')
  setTimeout(() => suggestions.removeChild(child), medAnimTime*2)
}
suggestions.firstStatic = suggestions.childNodes[0]
suggestions.suffix = nonbreakSpace
suggestions.updateChild = function(type, item, i) {
  if (type === 'error')
    this.errList.push(item)
  for (; this.childNodes[i] !== this.firstStatic && this.childNodes[i].classList.contains('hidden'); i++);
  const existing = this.childNodes[i]
  if (existing != null) {
    if (existing.type === type && similar(existing.textElem.innerText, item.text + this.suffix)) {
      existing.setItem(item, this.suffix)
      return ++i
    } else if (existing !== this.firstStatic) {
      this.animatedRemoveChild(existing)
    }
  }
  const elem = this.creator[type]()
  elem.setItem(item, this.suffix)
  elem.type = type
  this.insertBefore(elem, this.childNodes[i] || this.firstStatic)
  return ++i
}
suggestions.childUpdater = function() {
  let i = 0
  suggestions.errList = []
  function next(type, item) {
    i = suggestions.updateChild(type, item, i)
  }
  function stop() {
    for (; i < suggestions.childNodes.length; i++) {
      const item = suggestions.childNodes[i]
      if (item !== suggestions.firstStatic)
        suggestions.animatedRemoveChild(item)
      else break
    }
  }
  return {next, stop}
}
function appendCmd(text) {
  if (text === '') return
  if (text.includes(' ') || text.includes('"') || text.includes("'")) {
    text = '"' +  text.replaceAll('\\', '\\\\').replaceAll('"', '\\"') + '"'
  }
  let cmd = input.innerText
  if (suggestions.errList.length > 0) {
    input.changeText(cmd.slice(0, suggestions.errList[0].start) + text + cmd.slice(suggestions.errList[0].end))
  } else {
    if (cmd.trim() !== '' && !cmd.endsWith(' '))
      cmd += ' '
    input.changeText(cmd + text + ' ')
  }
}
