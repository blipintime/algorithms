function isAnagram(word1, word2) {
    const ar1 = [...word1]
    const ar2 = [...word2]
    let character = ar1.shift()
    while(character) {
      const idx = ar2.indexOf(character)
      if (idx > -1) {
        ar2.splice(idx, 1)
        character = ar1.shift()
      } else {
        return false
      }
    }
    return ar2.length === 0
}

//console.log(isAnagram('galenus', 'angelus'))
//console.log(isAnagram('abc', 'abd'))
console.log(isAnagram('abde', 'abd'))
