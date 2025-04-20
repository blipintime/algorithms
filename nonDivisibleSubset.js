/**
 * 
 *  Given a set of distinct integers, print the size of a maximal subset of where the sum of any 2
 *  numbers in the subset is not divisible by k.

    nonDivisibleSubset has the following parameter(s):
    int S[n]: an array of integers
    int k: the divisor
    Returns
    int: the length of the longest subset o  meeting the criteria

 */
function generateSubsets(numbers, size) {
  // Handle edge cases
  if (size <= 0 || size > numbers.length) {
    return [];
  }
  
  const result = [];
  
  /**
   * Helper function to generate subsets using backtracking
   * @param {number[]} current - The current subset being built
   * @param {number} startIndex - The starting index for considering elements
   */
  function backtrack(current, startIndex) {
    // If we've reached the desired size, add a copy to results
    if (current.length === size) {
      result.push([...current]);
      return;
    }
    
    // Try adding each remaining element
    for (let i = startIndex; i < numbers.length; i++) {
      // Add the current element
      current.push(numbers[i]);
      
      // Recursively generate subsets with this element
      backtrack(current, i + 1);
      
      // Backtrack (remove the element to try others)
      current.pop();
    }
  }
  
  // Start the backtracking process
  backtrack([], 0);
  
  return result;
}

function nonDivisibleSubset(k, numbers) {
  const theSet = new Set([...numbers])
  if (theSet.size !== numbers.length) {
    return 'numbers are not distinct'
  }
  // Write your code here
  const results = []
  for(let length=numbers.length - 1; length>0; length--) {
    const subsets = generateSubsets(numbers, length)
    subsets.forEach(subset => {
      const permutations = generateSubsets(subset, 2)
      if (permutations.every(([a, b]) => {
        return (a + b) % k > 0
      })) {
        results.push(subset)
      }
    })
    if (results.length > 0) {
      // no point to try smaller sets
      break
    }
  }
  // find longest array's length
  const sorted = results.sort((a,b) => b.length - a.length)
  return sorted[0]?.length
}


//console.log(nonDivisibleSubset(4, [19, 10, 12, 10, 24, 25, 22]))
//console.log(nonDivisibleSubset(3, [1, 7, 2, 4]))
console.log(nonDivisibleSubset(7, [278, 576, 496, 727, 410, 124, 338, 149, 209, 702, 282, 718, 771, 575, 436]))
