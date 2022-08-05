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
    if (existing.type === type && similar(existing.textElem.innerText, item.text+suggestions.suffix)) {
      existing.setItem(item, suggestions.suffix)
      return ++i
    } else {
      suggestions.animatedRemoveChild(existing)
    }
  }
  const elem = suggestions.creator[type]()
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
  if (text === '') return
  if (text.includes(' ') || text.includes('"') || text.includes("'")) {
    text = '"' +  text.replaceAll('\\', '\\\\').replaceAll('"', '\\"') + '"'
  }
  let cmd = input.innerText
  if (suggestions.errList.length > 0) {
    input.changeText(cmd.slice(0, suggestions.errList[0].start) + text + cmd.slice(suggestions.errList[0].end))
  } else {
    console.log(cmd, text)
    if (cmd.trim() !== '' && !cmd.endsWith(' '))
      cmd += ' '
    input.changeText(cmd + text + ' ')
  }
}
