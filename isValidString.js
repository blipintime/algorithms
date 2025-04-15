function isValid(inStr) {
  if (!inStr) {
    return true // nothing in string
  }
  const stack = []
  const parensMap = {
    '[': ']',
    '(': ')',
    '{': '}'
  }
  const openers = Object.keys(parensMap)
  const closers = Object.values(parensMap)

  for (let char of inStr) {
    if (openers.includes(char)) {
      stack.push(char)
    } else if (closers.includes(char)) {
      const closestOpener = stack.pop()
      if (parensMap[closestOpener] !== char) {
        return false
      }
    }
  }
  return stack.length === 0
}


console.log(isValid('()'))
console.log(isValid('()[]{}'))
console.log(isValid('(]'))
console.log(isValid('([)]'))
console.log(isValid('{[]}'))
console.log(isValid('{[()]'))
