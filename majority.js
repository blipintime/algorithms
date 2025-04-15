const whichone = ar => {
  const occur = {}
  ar.forEach(e => {
    occur[e] ||= occur[e] = 0
    occur[e]++
  })
  console.log(occur)
  const testme = Object.keys(occur)
  // inspect and pick the first one
  for(let i = 0 ; testme.length; i++) {
    if(occur[testme[i]] > ar.length / 2) {
      return testme[i]
    }
  }
}

const majorityElement  = nums => {
  let count = 0
  let candidate
  nums.forEach(num => {
    if (count === 0) {
      candidate = num
    }
    num === candidate ? count++ : count--
  })
  return candidate
}

const nums = [2, 1, 2, 1, 2]
//const thekey = whichone(nums)
const thekey = majorityElement(nums)
console.log(thekey)