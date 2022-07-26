function createPlain() {
  const elem = document.createElement('span')
  const text = document.createElement('span')
  text.id = 'text'
  elem.appendChild(text)
  elem.textElem = text
  makeTooltipTrigger(elem)
  elem.onclick = () => appendCmd(text.innerText)
  elem.setPlain = elem.setItem = function(item, suffix) {
    elem.textElem.innerText = item.text + suffix
    if (item.help)
      elem.tooltip.innerText = item.help
    elem.classList.toggle('tooltiptrigger', !!item.help)
    if (item.color == null) {
      elem.style.setProperty('--localColor',  null)
      elem.style.setProperty('--localBg',  null)
    } else {
      elem.style.setProperty('--localColor', `var(--${themeBg !== 'white' ? 'dark-' : ''}${item.color})`)
      elem.style.setProperty('--localBg', `var(--${themeBg}-${item.color}Bg)`)
    }
  }
  return elem
}
const suggestionCreator = {
  plain:createPlain,
  error:function() {
    const elem = createPlain()
    elem.className = 'strong'
    elem.onclick = function() {
      const range = document.createRange()
      range.setStart(input.childNodes[0], elem.range[0])
      range.setEnd(input.childNodes[0], elem.range[1] - 1)
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
    const param = suggestionCreator.plain()
    const input = document.createElement('span')
    input.id = 'input'
    input.contentEditable = true
    param.input = input
    param.appendChild(input)
    function trigger() {
      const paramName = param.textElem.innerText
      if (!paramName.includes('<'))
        appendCmd(paramName)
      appendCmd(input.innerText)
    }
    input.onkeydown = function(e) {
      if (e.keyCode === enterKey) e.preventDefault()
    }
    input.onkeyup = function(e) {
      if (e.keyCode === enterKey && input.innerText.trim !== '')
        trigger()
    }
    const enterBtn = document.createElement('span')
    enterBtn.innerText = nonbreakSpace + nonbreakSpace + nonbreakSpace + nonbreakSpace
    enterBtn.className = 'icon'
    enterBtn.style.backgroundImage = 'var(--icon-enter)'
    enterBtn.id = 'enter'
    makeTooltipTrigger(enterBtn, '', param)
    enterBtn.onclick = function(e) {
      trigger()
      e.stopPropagation()
    }
    param.enterBtn = enterBtn
    param.appendChild(enterBtn)
    input.onmousedown = e => e.inputClick = true
    param.onmousedown = function(e)/*hold-focus*/{
      if (param.classList.contains('active') && !e.inputClick)
        e.preventDefault()
    }
    param.onclick = function() {
      if (!param.classList.contains('active'))/*param-deploy*/{
        if (param.noInput) {
          appendCmd(param.textElem.innerText)
        } else {
          input.innerText = param.suggestion
          param.classList.toggle('active', true)
          param.classList.toggle('tooltiptrigger', false)
          setTimeout(() => param.enterBtn.triggerTooltip(2500), medAnimTime)
          selectElement(input)
        }
      }
    }
    input.onblur = function() {
      param.classList.toggle('active', false)
      param.classList.toggle('tooltiptrigger', true)
      param.enterBtn.classList.toggle('triggered', false)
    }
    param.setItem = function(item, suffix) {
      param.setPlain(item, suffix)
      param.suggestion = item.suggestion
      const type = item.type
      if (!type.noInput) {
        let inputHelp = ''
        inputHelp = 'enter ' + type.desc
        param.enterBtn.tooltip.innerText = inputHelp
        param.enterBtn.classList.toggle('tooltiptrigger', !!inputHelp)
      } else
        param.noInput = type.noInput
    }
    return param
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
          const choice = suggestionCreator.plain()
          choice.setItem(choiceItem, suggestions.suffix)
          suggestions.insertBefore(choice, elem)
          choice.onclick = function() {
            const paramName = elem.textElem.innerText
            if (!paramName.includes('<'))
              appendCmd(paramName)
            appendCmd(choice.textElem.innerText)
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
