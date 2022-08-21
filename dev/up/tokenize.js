/*
Understandable Passwords - make random, yet understandable sentences to use as passwords
Copyright 2022 Đặng Văn Quân

This file is part of Understandable Passwords.

Understandable Passwords is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Understandable Passwords is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with Understandable Passwords. If not, see <https://www.gnu.org/licenses/>.

Contact email: gizapp@tutanota.com
*/
function* tokenize(text) {
  let pos = 0
  let quoteChar = null
  for (let i = 0; i < text.length; i++) {
    if (quoteChar != null) {
      if (text[i] === '\\') {
        i++
      } else if (text[i] === quoteChar) {
        yield [text.substring(pos, i).replaceAll(/(?<!\\)\\"/g, '"').replaceAll(/(?<!\\)\\'/g, "'").replaceAll("\\\\", "\\"), pos-1, i+1]
        quoteChar = null
        pos = i+1
      }
      continue
    }
    switch (text[i]) {
    case ' ':
      if (pos < i) yield [text.substring(pos, i), pos, i]
      pos = i + 1
      break
    case '"':
    case '\'':
      if (pos < i) yield [text.substring(pos, i), pos, i]
      quoteChar = text[i]
      pos = i + 1
      break
    }
  }
  if (pos < text.length)
    yield [text.substring(pos), quoteChar == null ? pos : pos - 1, text.length]
}
