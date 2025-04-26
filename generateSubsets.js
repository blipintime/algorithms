/**
 * Generates all possible subsets of a given size from an array of numbers.
 * 
 * @param {number[]} numbers - The set of numbers to choose from
 * @param {number} size - The size of each subset
 * @return {number[][]} All possible subsets of the specified size
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

// Example usage:
//console.log(generateSubsets([1], 2))
//console.log(generateSubsets([1, 2], 2))
console.log(generateSubsets([1, 2, 3, 4], 2))
// Output: [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]

//console.log(generateSubsets([1, 2, 3, 4, 5], 3));
// Output: [[1,2,3], [1,2,4], [1,2,5], [1,3,4], [1,3,5], [1,4,5], [2,3,4], [2,3,5], [2,4,5], [3,4,5]]