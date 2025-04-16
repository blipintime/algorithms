// Here is the improved version
// Only my ideas were used.
function longestChain(words) {
  const chainMap = {}
  
  function checkWord(currentWord) {
    if (currentWord in chainMap) {
      return 
    }
    
    if (currentWord.length > 1) {
      chainMap[currentWord] = []
      // currentWord has more than 1 character
      for (let j = 0; j < currentWord.length; j++) {
        // check each variant
        const substring = currentWord.substring(0, j) + currentWord.substring(j + 1)
        const found = words.indexOf(substring) !== -1
        if (found) {
          checkWord(substring)
          for(let subchain of chainMap[substring]) {
            const ar = [currentWord]
            ar.push(...subchain)
            chainMap[currentWord].push(ar)
          }
        }
      }
    } else {
      chainMap[currentWord] = [[currentWord]]
    }
  }
  // Write your code here
  for (let i = 0; i < words.length; i++) {
    checkWord(words[i])
  }
  let largestChain = 0
  for (let chain in chainMap) {
    if (chainMap[chain][0]?.length > largestChain) {
      largestChain = chainMap[chain][0].length
    }
  }
  return largestChain
}

console.log(longestChain(['a', 'b', 'ba']))
console.log(longestChain(['a', 'b', 'ba', 'zba']))

console.log(longestChain(['a', 'b', 'ba', 'bca', 'bda', 'bdca']))
console.log(longestChain(['9', 'a', 'zxb', 'ba', 'bca', 'bda', 'bdca', 'zxbe', 'azxbe', 'azxpbe']))
