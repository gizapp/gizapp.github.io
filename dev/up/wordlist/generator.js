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

// Table of Functions
//
// Generate with parameter - generator.phrase.rand
// Generate with specified strength - generator.minEntropy
// Encode - generator.encode
// Deccode - generator.decode

const generator = {nounGroup:{}, phrase:{}}
for (const key in wordlist)
  wordlist[key] = wordlist[key].split(';')
for (let i = 0; i < wordlist.noun.length; i++) {
  const item = wordlist.noun[i] = wordlist.noun[i].replaceAll('_', ',_').split(',')
  if (item[1][0] === '_')
    item[1] = item[1].replace('_', item[0]) + 's'
  if (item.length > 2) {
    item[2] = item[2].replaceAll('_', item[0].substring(0, item[0].length - 2) + 'ing')
    wordlist.firstnoun.push(item.pop())
  } else {
    wordlist.firstnoun.push(item[0])
  }
}
wordlist.quantity = [...wordlist['singular quantity'], ...wordlist['plural quantity']]
generator.quantityCount = wordlist['singular quantity'].length + wordlist['plural quantity'].length
generator.param = {}

const uint8Array = new Uint8Array(1)
const uint16Array = new Uint16Array(1)
const uint32Array = new Uint32Array(1)
function randbelow(max, encodingObj) {
  if (encodingObj != null) {
    const result = encodingObj.value % BigInt(max)
    encodingObj.value = encodingObj.value / BigInt(max)
    return result
  } else {
    // generate random number from Crypto.getRandomValues using rejection sampling
    let naturalRange = 0
    let container = null
    if (max <= 256) {
      container = uint8Array
      naturalRange = 256
    } else if (max <= 65536) {
      container = uint16Array
      naturalRange = 65536
    } else {
      container = uint32Array
      naturalRange = 4294967296
    }
    const discardLimit = naturalRange - naturalRange % max
    while (true) {
      window.crypto.getRandomValues(container)
      if (container[0] < discardLimit)
        return container[0] % max
    }
  }
}
function randChoice(list, encodingObj) {
  return list[randbelow(list.length, encodingObj)]
}
generator.nounGroup.rand = function(size, encodingObj) {
  assert(size >= 1 && size <= 5)
  let noun = randChoice(wordlist.noun, encodingObj)
  if (size === 1) return noun[1]
  let noun2 = randChoice(wordlist.firstnoun, encodingObj)
  noun = noun.map(word => `${noun2}-${word}`)
  if (size === 2) return noun[1]
  let result = randChoice(wordlist.adjective, encodingObj) + ' '
  if (size === 3) return result + noun[1]
  result = randChoice(wordlist.adverb, encodingObj) + ' ' + result
  if (size === 4) return result + noun[1]
  const rand = randbelow(generator.quantityCount, encodingObj)
  if (rand < wordlist['singular quantity'].length) {
    let quantity = wordlist['singular quantity'][rand]
    if (quantity === 'a' && ['a', 'e', 'i', 'o', 'u'].includes(result[0].toLowerCase()))
      quantity = 'an'
    return quantity + ' ' + result + noun[0]
  } else
    return wordlist['plural quantity'][Number(rand) - wordlist['singular quantity'].length] + ' ' + result + noun[1]
}

generator.nounGroup.choices = [1]
generator.nounGroup.choices.push(generator.nounGroup.choices.at(-1) * wordlist.noun.length)
generator.nounGroup.choices.push(generator.nounGroup.choices.at(-1) * wordlist.firstnoun.length)
generator.nounGroup.choices.push(generator.nounGroup.choices.at(-1) * wordlist.adjective.length)
generator.nounGroup.choices.push(generator.nounGroup.choices.at(-1) * wordlist.adverb.length)
generator.nounGroup.choices.push(generator.nounGroup.choices.at(-1) * generator.quantityCount)
generator.nounGroup.choices = generator.nounGroup.choices.map(num => BigInt(num))

generator.phrase.rand = function(groupCount, groupSize, firstGroupSize, encodingObj) {
  assert(groupCount > 0 && groupCount < 512)
  if (firstGroupSize == null) firstGroupSize = groupSize
  if (groupCount <= 1)
    return generator.nounGroup.rand(firstGroupSize, encodingObj)
  const connectorCount = groupCount - 1
  const verbPosition = Number(randbelow(connectorCount, encodingObj))
  let result = generator.nounGroup.rand(firstGroupSize, encodingObj)
  for (let i = 0; i < connectorCount; i++)
    result += ' ' + randChoice(i === verbPosition ? wordlist.verb : wordlist.connector, encodingObj) + ' ' + generator.nounGroup.rand(groupSize, encodingObj)
  return result
}

generator.phrase.choices = function(groupCount, groupSize, firstGroupSize) {
  if (firstGroupSize == null) firstGroupSize = groupSize
  if (groupCount <= 1)
    return generator.nounGroup.choices[firstGroupSize]
  return generator.nounGroup.choices[groupSize] ** BigInt(groupCount - 1) * generator.nounGroup.choices[firstGroupSize] * BigInt(wordlist.connector.length) ** BigInt(groupCount - 2) * BigInt(wordlist.verb.length) * BigInt(groupCount - 1)
}
generator.phrase.combined = function({groupCount, groupSize, firstGroupSize}={}) {
  return [generator.phrase.rand(groupCount, groupSize, firstGroupSize), generator.phrase.choices(groupCount, groupSize, firstGroupSize)]
}

generator.minEntropy = function({bitCount, encodingObj}={}) {
  let groupCount = 1
  let targetChoices = 2n ** BigInt(bitCount)
  let currentChoices = 0
  while (true) {
    currentChoices = generator.phrase.choices(groupCount, 4)
    if (currentChoices >= targetChoices) break
    groupCount += 1
  }
  let groupSize = 2
  while (true) {
    currentChoices = generator.phrase.choices(groupCount, groupSize)
    if (currentChoices >= targetChoices) break
    groupSize += 1
  }
  currentChoices /= generator.nounGroup.choices[groupSize]
  targetChoices /= currentChoices
  let firstGroupSize = groupCount > 1 ? 2 : 1
  for (;generator.nounGroup.choices[firstGroupSize] <= targetChoices; firstGroupSize++);
  return [generator.phrase.rand(groupCount, groupSize, firstGroupSize, encodingObj), currentChoices * generator.nounGroup.choices[firstGroupSize]]
}
generator.encodeNum = function(encodingObj) {
  let bitCount = 0n
  for (let tmp = encodingObj.value; tmp > 1n; tmp >>= 1n, bitCount++);
  return generator.minEntropy({bitCount, encodingObj})[0]
}
generator.encodingCharset = ['01234567890']
generator.encodingCharset.push(generator.encodingCharset.at(0) + 'abcdef', generator.encodingCharset.at(0) + 'ABCDEF')
generator.encodingCharset.push(generator.encodingCharset.at(-1) + 'abcdefGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')
generator.encodingCharset.push(generator.encodingCharset.at(-1) + '+/= \'')
generator.encodingCharset.push(generator.encodingCharset.at(-1) + "`~!@#%^&*()=[{]}|\\;:\"<.>/?-_$")
generator.encodingCharset.push('abcdefghijklmnopqrstuvwxyz ', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ')
generator.encodingCharset.sort((a, b) => a.length - b.length)
generator.encode = function({input}={}) {
  let charsetI = 0
  let charset = null
  let i = 0
  for (; charsetI < generator.encodingCharset.length; charsetI++) {
    charset = generator.encodingCharset[charsetI]
    for (i = 0; i < input.length; i++)
      if (!charset.includes(input[i]))
        break
    if (i >= input.length)
      break
  }
  if (i < input.length)
    return [true, `unsupported character "${input[i]}"`]
  const encodingObj = {value:1n}
  for (i = 0; i < input.length; i++) {
    encodingObj.value *= BigInt(charset.length)
    encodingObj.value += BigInt(charset.indexOf(input[i]))
  }
  encodingObj.value *= BigInt(generator.encodingCharset.length)
  encodingObj.value += BigInt(charsetI)
  return [false, generator.encodeNum(encodingObj)]
}

generator.decode = function({input}={}) {
  input = input.trim()
  let pos = 0
  let unit = 1n
  let num = 0n
  let errors = ''
  const addNum = (val, choices, msg) => {
    if (val < 0) {
      val = 0
      errors = errors.length > 0 ? errors + ', ' + msg() : msg()
      return true
    }
    num += BigInt(val) * unit
    unit *= BigInt(choices)
  }
  function findCharIndex(str, pos, ...chars) {
    for (; pos < str.length; pos++)
      if (chars.includes(str[pos]))
        return pos
    return -1
  }
  function findLastCharIndex(str, pos, ...chars) {
    if (pos > str.length) pos = str.length - 1
    for (; pos >= 0; pos--)
      if (chars.includes(str[pos]))
        return pos
    return -1
  }
  let connectorCount = 0
  let verbPosition = NaN
  const addFromList = (list, item) => addNum(list.indexOf(item), list.length, ()=>`unexpected word "${item}"`)
  while (true) {
    const nounCenter = findCharIndex(input, pos, '-', nonbreakHyphen)
    if (nounCenter < 0) {
      input = input.trim()
      const val = wordlist.noun.findIndex(item => item[0] === input || item[1] === input)
      if (val >= 0)
        num = BigInt(val)
      else
        errors = 'invalid phrase'
      break
    }
    const groupEnd = findCharIndex(input, nounCenter + 1, ' ', nonbreakSpace)
    function processNounGroup() {
      let word = input.substring(nounCenter + 1, groupEnd >= 0 ? groupEnd : input.length)
      addNum(wordlist.noun.findIndex(item => item[0] === word || item[1] === word), wordlist.noun.length, ()=>`unexpected word "${word}"`)
      let firstnounStart = findLastCharIndex(input, nounCenter - 1, ' ', nonbreakSpace)
      if (firstnounStart >= pos) {
        addFromList(wordlist.firstnoun, input.substring(firstnounStart + 1, nounCenter))
        let adjStart = findLastCharIndex(input, firstnounStart - 1, ' ', nonbreakSpace)
        if (adjStart >= pos) {
          addFromList(wordlist.adjective, input.substring(adjStart + 1, firstnounStart))
          let advStart = findLastCharIndex(input, adjStart - 1, ' ', nonbreakSpace)
          if (advStart >= pos) {
            addFromList(wordlist.adverb, input.substring(advStart + 1, adjStart))
            addFromList(wordlist.quantity, input.substring(pos, advStart))
          } else addFromList(wordlist.adverb, input.substring(pos, adjStart))
        } else addFromList(wordlist.adjective, input.substring(pos, firstnounStart))
      } else addFromList(wordlist.firstnoun, input.substring(pos, nounCenter))
    }
    processNounGroup()
    if (groupEnd === -1) {
      break
    } else {
      let groupStart = findCharIndex(input, groupEnd + 1, ' ', nonbreakSpace)
      const word = input.substring(groupEnd + 1, groupStart)
      if (wordlist.verb.includes(word)) {
        addFromList(wordlist.verb, word)
        assert(isNaN(verbPosition))
        verbPosition = connectorCount
      } else {
        let index = -1
        let length = -1
        for (const i in wordlist.connector) {
          const item = wordlist.connector[i]
          if (input.startsWith(item + ' ', groupEnd + 1) || input.startsWith(item + nonbreakSpace, groupEnd + 1)) {
            if (item.length > length) {
              length = item.length
              index = i
            }
          }
        }
        if (addNum(index, wordlist.connector.length, ()=>`unknown connector at "${input.substring(groupEnd+1, groupEnd + 20)}..."`))
          break
        groupStart = groupEnd + 1 + length
      }
      pos = groupStart + 1
      connectorCount += 1
    }
  }
  if (errors.length > 0)
    return [true, errors]
  if (connectorCount > 0)
    num = num * BigInt(connectorCount) + BigInt(verbPosition)
  let length = BigInt(generator.encodingCharset.length)
  const charset = generator.encodingCharset[Number(num % length)]
  num = num / length
  let result = ''
  length = BigInt(charset.length)
  while(num > 1n) {
    result = charset[Number(num % length)] + result
    num = num / length
  }
  if (num === 1n)
    return [false, result]
  return [true, 'corrupted phrase']
}
