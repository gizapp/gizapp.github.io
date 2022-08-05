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
