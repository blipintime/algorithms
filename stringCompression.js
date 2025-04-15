function compress(inStr) {
  const charCounts = {}
  const ordered = []
  for (let i = 0; i < inStr.length; i++) {
    const char = inStr[i]
    charCounts[char] ??= 0
    if (charCounts[char] === 0) {
      ordered.push(char)
    }
    charCounts[char]++
  }
  // generate output
  const converted = ordered.map(char => {
    return charCounts[char] > 1 ? `${char}${charCounts[char]}` : char
  })
  return converted.join('')
}

console.log(compress('abc'))
console.log(compress('aaaabbc'))
console.log(compress('abbcccccv'))
