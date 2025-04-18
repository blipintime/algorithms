// Given a string input_str consisting of characters '0' and '1', and an integer k,
// find a substring of input_str such that
// - The number of 1's is equal to k
// - It has the smallest length
// - It is lexicographically smallest
// Example: input_str = '0101101'
// k = 3
// '01011'
// '1101'
// '1011' -> this is the best
function smallestSubstring(str, k) {
  
  const results = []
  for(let length = str.length; length >= k; length--) {
    for (let i = 0; i < length; ) {
      let word = str.substring(i, i+length)
      let count = [...word].filter(c => c === '1').length
      if (count === k) {
        results.push(word)
      }
      i += 1
    }
  }
  const sorted1 = results.sort((a,b) => a.length - b.length)
  const smallesLength = sorted1[0]?.length
  const smallestStrings = sorted1.filter(str => str.length === smallesLength)
  // finally lexicographically sorted
  return smallestStrings.sort()[0]
}

console.log(smallestSubstring('0101101', 3))


// k = 4
// '010111'
// '1101'
// '1011' -> this is the best
//console.log(smallestSubstring('1101101', 2))
