/**
 * Finds the minimum number of special elements needed from the input array
 * so that each 0 element is at most k distance away from a special element.
 * 
 * @param {number} k - The maximum allowed distance from a 0 to a special element
 * @param {Array<number>} arr - An array of 0s and 1s
 * @return {number} - The minimum number of special elements needed
 */
function minSpecialElements(k, arr) {
  if (arr.length === 0) {
    return 0;
  }
  
  // Create arrays to store which positions must be covered and which can be special
  const needsCoverage = [];
  const canBeSpecial = [];
  
  for (let i = 0; i < arr.length; i++) {
    // If the element is 0, it needs coverage
    if (arr[i] === 0) {
      needsCoverage.push(i);
    } 
    // If the element is 1, it can be made special
    else if (arr[i] === 1) {
      canBeSpecial.push(i);
    }
  }
  
  // If no elements need coverage, return 0
  if (needsCoverage.length === 0) {
    return 0;
  }
  
  // If no elements can be special, return -1 (impossible)
  if (canBeSpecial.length === 0) {
    return -1;
  }
  
  // For each element that needs coverage, create an interval of valid positions for a special element
  const intervals = needsCoverage.map(pos => {
    return {
      start: Math.max(0, pos - k),
      end: Math.min(arr.length - 1, pos + k)
    };
  });
  
  // Filter canBeSpecial to only include positions that are within at least one interval
  const validSpecialPositions = canBeSpecial.filter(pos => {
    return intervals.some(interval => pos >= interval.start && pos <= interval.end);
  });
  
  // If any interval has no valid special positions, return -1 (impossible)
  for (const interval of intervals) {
    if (!validSpecialPositions.some(pos => pos >= interval.start && pos <= interval.end)) {
      return -1;
    }
  }
  
  // Greedy algorithm to select special elements
  let selectedCount = 0;
  let coverageIndex = 0;
  
  // Sort special positions for easier processing
  validSpecialPositions.sort((a, b) => a - b);
  
  while (coverageIndex < intervals.length) {
    let bestPos = -1;
    let bestCoverage = 0;
    
    // Find the special position that covers the most uncovered intervals
    for (const pos of validSpecialPositions) {
      let coverage = 0;
      for (let i = coverageIndex; i < intervals.length; i++) {
        if (pos >= intervals[i].start && pos <= intervals[i].end) {
          coverage++;
        } else if (pos < intervals[i].start) {
          break; // No need to check further intervals
        }
      }
      
      if (coverage > bestCoverage) {
        bestCoverage = coverage;
        bestPos = pos;
      }
    }
    
    if (bestPos === -1) {
      return -1; // Cannot cover all intervals
    }
    
    // Mark this position as selected
    selectedCount++;
    
    // Update which intervals have been covered
    let i = coverageIndex;
    while (i < intervals.length) {
      if (bestPos >= intervals[i].start && bestPos <= intervals[i].end) {
        // This interval is covered, move to the next one
        i++;
      } else if (bestPos < intervals[i].start) {
        // We've passed this interval, exit the loop
        break;
      } else {
        // This interval was not covered
        i++;
      }
    }
    coverageIndex = i;
    
    // If all intervals are covered, we're done
    if (coverageIndex >= intervals.length) {
      break;
    }
  }
  
  return selectedCount;
}

// Test cases
function testMinSpecialElements() {
  console.log("Test 1:", minSpecialElements(1, [0, 1, 0, 1, 0])); // Expected: 2
  console.log("Test 2:", minSpecialElements(2, [0, 1, 0, 0, 1])); // Expected: 1
  console.log("Test 3:", minSpecialElements(1, [0, 0, 0, 1, 1])); // Expected: -1 (impossible)
  console.log("Test 4:", minSpecialElements(2, [0, 0, 1, 0, 1])); // Expected: 2
  console.log("Test 5:", minSpecialElements(1, [1, 0, 1, 0, 0, 1])); // Expected: 3
  console.log("Test 6:", minSpecialElements(3, [0, 1, 0, 0, 1, 0, 1])); // Expected: 1
}

testMinSpecialElements();
