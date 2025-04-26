/**
 * Determines if one or more plus signs can be drawn on a grid of 'G' (good) and 'B' (bad) cells.
 * Each plus sign consists of a vertical and horizontal line of equal lengths.
 * 
 * @param {string[][]} grid - 2D array representing the grid with 'G' and 'B' cells
 * @returns {Object} Object containing whether one plus sign can be formed and if multiple plus signs can be formed
 */
function canFormPlusSigns(grid) {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return { onePlusSign: false, multiplePlusSigns: false };
  }

  const rows = grid.length;
  const cols = grid[0].length;
  let plusSignsFound = 0;

  // Check every cell as a potential center of a plus sign
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Skip bad cells as centers
      if (grid[r][c] === 'B') continue;

      // Find the maximum arm length for a plus sign centered at (r, c)
      const maxArmLength = findMaxArmLength(grid, r, c, rows, cols);
      
      // A plus sign needs at least arm length of 1 (total size 3x3)
      if (maxArmLength >= 1) {
        plusSignsFound++;
        
        // If we've found at least 2 plus signs, we can return immediately
        if (plusSignsFound >= 2) {
          return { onePlusSign: true, multiplePlusSigns: true };
        }
      }
    }
  }

  return { 
    onePlusSign: plusSignsFound >= 1, 
    multiplePlusSigns: plusSignsFound >= 2 
  };
}

/**
 * Finds the maximum arm length for a plus sign centered at the given cell.
 * 
 * @param {string[][]} grid - The grid
 * @param {number} centerRow - Center row of the plus sign
 * @param {number} centerCol - Center column of the plus sign
 * @param {number} rows - Total number of rows in the grid
 * @param {number} cols - Total number of columns in the grid
 * @returns {number} Maximum arm length for a plus sign
 */
function findMaxArmLength(grid, centerRow, centerCol, rows, cols) {
  // Check in all four directions (up, right, down, left)
  let up = 0, right = 0, down = 0, left = 0;
  
  // Check upward
  for (let r = centerRow - 1; r >= 0 && grid[r][centerCol] === 'G'; r--) {
    up++;
  }
  
  // Check rightward
  for (let c = centerCol + 1; c < cols && grid[centerRow][c] === 'G'; c++) {
    right++;
  }
  
  // Check downward
  for (let r = centerRow + 1; r < rows && grid[r][centerCol] === 'G'; r++) {
    down++;
  }
  
  // Check leftward
  for (let c = centerCol - 1; c >= 0 && grid[centerRow][c] === 'G'; c--) {
    left++;
  }
  
  // The arm length is limited by the shortest direction
  return Math.min(up, right, down, left);
}

// Example usage:
function testPlusSigns() {
  // Example 1: Can form one plus sign
  const grid1 = [
    ['G', 'G', 'G', 'G', 'G'],
    ['G', 'B', 'G', 'B', 'G'],
    ['G', 'G', 'G', 'G', 'G'],
    ['G', 'B', 'G', 'B', 'G'],
    ['G', 'G', 'G', 'G', 'G']
  ];
  
 console.log("Grid 1 result:", canFormPlusSigns(grid1));
  
  // Example 2: Can form multiple plus signs
  const grid2 = [
    ['G', 'G', 'G', 'G', 'G', 'G', 'G'],
    ['G', 'G', 'G', 'G', 'G', 'G', 'G'],
    ['G', 'G', 'G', 'G', 'G', 'G', 'G'],
    ['G', 'G', 'G', 'G', 'G', 'G', 'G'],
    ['G', 'G', 'G', 'G', 'G', 'G', 'G']
  ];
  
  console.log("Grid 2 result:", canFormPlusSigns(grid2));
  
  // Example 3: Cannot form any plus sign
  const grid3 = [
    ['G', 'B', 'G'],
    ['B', 'G', 'B'],
    ['G', 'B', 'G']
  ];
  
  console.log("Grid 3 result:", canFormPlusSigns(grid3));
}

testPlusSigns();
