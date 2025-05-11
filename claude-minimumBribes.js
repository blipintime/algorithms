/**
 * Calculates the minimum number of bribes needed to get the queue into its current state
 * @param {number[]} q - The current state of the queue
 * @returns {string|number} - The total number of bribes or "Too chaotic" if impossible
 */
function minimumBribes(q) {
  let totalBribes = 0;
  
  // Check each position in the queue
  for (let i = 0; i < q.length; i++) {
    // Original position (0-indexed) would be value-1
    const originalPosition = q[i] - 1;
    const currentPosition = i;
    
    // Calculate how far this number moved forward
    const bribes = originalPosition - currentPosition;
    
    // If any number moved forward more than 2 positions, it's too chaotic
    if (bribes > 2) {
      return "Too chaotic";
    }
    
    // Count bribes by checking numbers that were overtaken
    // Look at all values that are greater than q[i] and appear before position i
    for (let j = Math.max(0, q[i] - 2); j < i; j++) {
      if (q[j] > q[i]) {
        totalBribes++;
      }
    }
  }
  
  return totalBribes;
}

// Example usage
const testCases = [
  [2, 1, 5, 3, 4],           // Some moves
  [2, 5, 1, 3, 4],           // Too chaotic (5 moved more than 2 positions)
  [1, 2, 3, 4, 5],           // Original array, 0 moves
  [1, 2, 5, 3, 7, 8, 6, 4]   // More complex case
];

testCases.forEach(test => {
  console.log(`Input: [${test}]`);
  console.log(`Result: ${minimumBribes(test)}`);
  console.log('---');
})
