'use strict';
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
  console.log(text)
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
  start = commandStart
  end = commandEnd
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
