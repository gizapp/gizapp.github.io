'use strict';
const suggestions = document.scripts[document.scripts.length - 1].parentNode;
suggestions.removeChild(suggestions.lastChild)
suggestions.animatedRemoveChild = function(child) {
  if (child.classList.contains('hidden')) return
  child.classList.add('hidden')
  setTimeout(() => suggestions.removeChild(child), medAnimTime*2)
}
suggestions.suffix = nonbreakSpace
suggestions.updateChild = function(type, item, i) {
  if (type === 'error')
    suggestions.errList.push(item)
  for (; suggestions.children[i] && suggestions.children[i].classList.contains('hidden'); i++);
  const existing = suggestions.children[i]
  if (existing != null) {
    console.log(existing.type, existing.textElem.innerText, item.text+suggestions.suffix, similar(existing.textElem.innerText, item.text+suggestions.suffix))
    if (existing.type === type && similar(existing.textElem.innerText, item.text+suggestions.suffix)) {
      existing.setItem(item, suggestions.suffix)
      return ++i
    } else {
      suggestions.animatedRemoveChild(existing)
    }
  }
  const elem = suggestionCreator[type]()
  elem.setItem(item, suggestions.suffix)
  elem.type = type
  suggestions.insertBefore(elem, suggestions.children[i])
  return ++i
}
suggestions.childUpdater = function() {
  let i = 0
  suggestions.errList = []
  function next(type, item) {
    i = suggestions.updateChild(type, item, i)
  }
  function stop() {
    for (; i < suggestions.childElementCount; i++) {
      const item = suggestions.children[i]
      suggestions.animatedRemoveChild(item)
    }
  }
  return {next, stop}
}
function appendCmd(text) {
  let cmd = input.innerText
  if (suggestions.errList.find(item => item.text.startsWith('unexpected ')))
    cmd = cmd.trim().substring(0, cmd.lastIndexOf(' '))
  cmd = cmd.trim()
  if (cmd !== '')
    cmd += ' '
  text = text.trim()
  input.changeText(text !== '' ? cmd + text + ' ' : cmd)
}
