/**
 * Determines if an array can be sorted by reversing a single subarray
 * 
 * @param {number[]} arr - The input array to check
 * @return {boolean} - True if the array can be sorted by reversing a subarray, false otherwise
 */
function canBeSortedByReversal(arr) {
  // Handle edge cases
  if (!arr || arr.length <= 1) return true;
  
  // Create a copy of the sorted array to compare against
  const sortedArr = [...arr].sort((a, b) => a - b);
  
  // Find the first mismatch from the left
  let left = 0;
  while (left < arr.length && arr[left] === sortedArr[left]) {
    left++;
  }
  
  // If left reached the end, array is already sorted
  if (left === arr.length) return true;
  
  // Find the first mismatch from the right
  let right = arr.length - 1;
  while (right >= 0 && arr[right] === sortedArr[right]) {
    right--;
  }
  
  // Check if reversing the subarray from left to right would sort the array
  // First, reverse the subarray
  let modified = [...arr];
  reverseSubarray(modified, left, right);
  
  // Then check if the modified array is sorted
  for (let i = 0; i < modified.length; i++) {
    if (modified[i] !== sortedArr[i]) {
      return false;
    }
  }
  
  return true;
}

/**
 * Helper function to reverse a subarray in-place
 * 
 * @param {number[]} arr - The array containing the subarray to reverse
 * @param {number} start - The starting index of the subarray
 * @param {number} end - The ending index of the subarray
 */
function reverseSubarray(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

// Example usage:
console.log(canBeSortedByReversal([1, 2, 5, 4, 3])); // true (reverse 3-4-5 to 5-4-3)
// console.log(canBeSortedByReversal([1, 2, 4, 5, 3])); // false
// console.log(canBeSortedByReversal([1, 5, 3, 4, 2])); // false
// console.log(canBeSortedByReversal([5, 4, 3, 2, 1])); // true (reverse the whole array)
// console.log(canBeSortedByReversal([1, 2, 3, 4, 5])); // true (already sorted)
// console.log(canBeSortedByReversal([3, 2, 1, 4, 5])); // true (reverse 1-2-3)
