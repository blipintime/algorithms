function longestChain(words) {
  const counters = {}
  const chainMap = {}
  // Write your code here
  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i]
    chainMap[currentWord] = []
    if (currentWord.length === 1) {
      // what's the output?
      counters[currentWord] = 1
    } else {
      // currentWord has more than 1 character
      counters[currentWord] = 0
      for (let j = 0; j < currentWord.length; j++) {
        const substring = currentWord.substring(0, j) + currentWord.substring(j + 1)
        const found = words.indexOf(substring) !== -1
        if (found) {
          counters[currentWord]++
          chainMap[currentWord].push(substring)
        }
      }
    }
  }

  function walkKey(key) {
    const nextNodes = chainMap[key]
    const results = []
    for (let k = 0; k < nextNodes.length; k++) {
      const nextNode = nextNodes[k]
      const ar = []
      if (nextNode.length === 1) {
        ar.push(key)
        ar.push(nextNode)
        results.push(ar)
      } else {
        const partResults = walkKey(nextNode) // ba -> b ba -> a
        for (let p = 0; p<partResults.length; p++) {
          const ar = []
          ar.push(key)
          //ar.push(nextNode)
          ar.push(...partResults[p])
          results.push(ar)
        }
      }
    }
    return results
  }

  // we examined all the words
  let keys = Object.keys(chainMap).sort((a, b) => b.length - a.length)

  // use the chainMap
  const results = walkKey(keys[0])

  // const returnThis = results.map(chain => chain.join(' ')).join(', ')

  //console.log(returnThis)
  
  return results[0].length // largest longest chain
}

//console.log(longestChain(['a', 'b', 'ba', 'bca', 'bda', 'bdca']))
console.log(longestChain(['9', 'a', 'zxb', 'ba', 'bca', 'bda', 'bdca', 'zxbe', 'azxbe', 'azxpbe']))
//longestChain(['a', 'b', 'ba'])
