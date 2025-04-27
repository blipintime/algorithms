function countCharacters(str) {
  // Initialize an empty object to store character counts
  const charCount = {};
  
  // Loop through each character in the string
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    
    // If the character is already in our object, increment its count
    // Otherwise, initialize it with a count of 1
    if (charCount[char]) {
      charCount[char]++;
    } else {
      charCount[char] = 1;
    }
  }
  return charCount;
}

function canReplace(totalCounts, counts, totalLength, length) {
  const newCount = {
    'C': (totalCounts.C || 0) - (counts.C || 0),
    'G': (totalCounts.G || 0) - (counts.G || 0),
    'A': (totalCounts.A || 0) - (counts.A || 0),
    'T': (totalCounts.T || 0) - (counts.T || 0)
  }
  let lengthRemain = length
  let ret = ''
  for (let pos of ['C', 'G', 'A', 'T']) {
    if (lengthRemain === 0) {
      break
    }
    const addForThis = totalLength / 4 - newCount[pos]
    if (addForThis < 0) {
      return ''
    } else if (addForThis > 0) {
      const adding = new Array(addForThis).fill(pos).join('')
      lengthRemain -= addForThis
      newCount[pos] += addForThis
      ret += adding
    }
  }
  return isSteady(newCount, totalLength) ? ret : ''
}

function isSteady(counts, n) {
  return counts['A'] === n/4 && counts['C'] === n/4 && counts['T'] === n/4 && counts['G'] === n/4
}

function steadyGene(gene) {
  // Write your code here
  const totalCounts = countCharacters(gene)
  if (!gene || isSteady(totalCounts, gene.length)) {
    return 0
  }
  
  for (let windowSize=1; windowSize<=gene.length; windowSize++) {
    for(let start = 0; start <= gene.length - windowSize; start += 1) {
      const sub = gene.substring(start, start + windowSize)
      const counts = countCharacters(sub)
      const replaceStr = canReplace(totalCounts, counts, gene.length, sub.length)
      if (replaceStr) {
        return replaceStr.length
      }
    }
  }
  return 0
}

console.log(steadyGene('GAAATAAA'))
