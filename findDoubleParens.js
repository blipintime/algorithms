function findClosingIdx(str) {
  if (!str) {
    return -1
  }
  console.log('findClosingIdx--->', str)
  let openCnt = 1
  for (let i = 1; i < str.length; i++) {
    if (str.substr(i, 1) === '(') {
      openCnt++
    } else if (str.substr(i, 1) === ')') {
      openCnt--
    }
    if (openCnt === 0) {
      return i
    }
  }
  return -1
}

const theHeap = [] // this will hold all strings to be analyzed
let results = []

function findDoubleParens() {
  let str = theHeap.pop()
  while(str) {
    let start = 0
    // look for multiple groups
    while (start < str.length) {
      const startIdx = str.slice(start).indexOf('(')
      if (startIdx > -1) {
        const closeIdx = findClosingIdx(str, startIdx)
        if (closeIdx > -1) {
          // if (parentHasIt) {
          //   results.push(str.slice(startIdx+1, closeIdx))
          // }
          theHeap.unshift(str.slice(startIdx + 1, closeIdx))
          start = closeIdx + 1
        } else {
          break
        }
      }
    }
    str = theHeap.pop()
  }
}

function analyzeString(str) {
  theHeap.push(str)
  findDoubleParens()
}

//findDoubleParens('((x))')
//findDoubleParens('(a+((b))+z)')
//findDoubleParens('((a))((b))')
findDoubleParens('((y))((z))')

//findDoubleParens('((a+((b))+z))')

//findDoubleParens('(a+((b+(a+((b))))+z+((g)))')