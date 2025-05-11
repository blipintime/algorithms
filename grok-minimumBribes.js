function minimumMoves(output) {
  let moves = 0;

  // Check each position in output array
  for (let i = 0; i < output.length; i++) {
    // Calculate how far the number has moved from its original position
    let originalPos = output[i] - 1; // Original position (1-based to 0-based)
    let currentPos = i;
    let moveDistance = Math.abs(originalPos - currentPos);

    // If any number moved more than 2 positions, it's too chaotic
    if (moveDistance > 2) {
      return 'Too chaotic'
    }

    // Add the number of positions moved to total
    moves += moveDistance;
  }

  // Return total moves (divide by 2 to avoid double-counting swaps)
  return moves / 2;
}

// Example usage:
// let input = [1, 2, 3, 4, 5];
// let output = [2, 1, 5, 3, 4];
// console.log(minimumMoves(input, output)); // Should print 2

// let chaoticInput = [1, 2, 3, 4, 5];
// let chaoticOutput = [5, 2, 3, 4, 1];
// console.log(minimumMoves(chaoticInput, chaoticOutput)); // Should print 'Too chaotic'

// let output = [2, 1, 5, 3, 4];
// console.log(minimumMoves(output))

let output = [2, 5, 1, 3, 4]
console.log(minimumMoves(output))
