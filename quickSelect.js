/**
 * QuickSelect algorithm implementation in JavaScript
 * Finds the kth smallest element in an unordered array
 * Average time complexity: O(n)
 * Worst case time complexity: O(n²)
 * Space complexity: O(1)
 */

/**
 * Find the kth smallest element in an array
 * @param {number[]} arr - Input array
 * @param {number} k - Position (1-based) of the element to find
 * @return {number} The kth smallest element
 */
function quickSelect(arr, k) {
    // Clone array to avoid modifying the original
    const nums = [...arr];
    
    // Convert to 0-based index
    const targetIndex = k - 1;
    
    // Edge cases
    if (k <= 0 || k > nums.length) {
      throw new Error(`k (${k}) is out of bounds for array of length ${nums.length}`);
    }
    
    return quickSelectHelper(nums, 0, nums.length - 1, targetIndex);
  }
  
  /**
   * Recursive helper function for quickSelect
   * @param {number[]} nums - Input array
   * @param {number} left - Left boundary index
   * @param {number} right - Right boundary index
   * @param {number} targetIndex - Index of the element to find
   * @return {number} The element at the targetIndex
   */
  function quickSelectHelper(nums, left, right, targetIndex) {
    // Base case: if the list contains only one element
    if (left === right) {
      return nums[left];
    }
    
    // Choose a pivot index (can be random or the median)
    const pivotIndex = partition(nums, left, right);
    
    // If the pivot is in the target position, return it
    if (pivotIndex === targetIndex) {
      return nums[pivotIndex];
    } 
    // If the target is in the left subarray
    else if (targetIndex < pivotIndex) {
      return quickSelectHelper(nums, left, pivotIndex - 1, targetIndex);
    } 
    // If the target is in the right subarray
    else {
      return quickSelectHelper(nums, pivotIndex + 1, right, targetIndex);
    }
  }
  
  /**
   * Partition the array and return the pivot index
   * @param {number[]} nums - Input array
   * @param {number} left - Left boundary index
   * @param {number} right - Right boundary index
   * @return {number} Final position of the pivot
   */
  function partition(nums, left, upper) {
    const right = Math.floor((upper-left)/2)
    // Choose the rightmost element as pivot
    const pivot = nums[right];
    
    // Index of smaller element
    let i = left;
    
    // Traverse through all elements
    // Compare each element with the pivot
    for (let j = left; j < right; j++) {
      // If current element is smaller than the pivot
      if (nums[j] < pivot) {
        // Swap elements
        [nums[i], nums[j]] = [nums[j], nums[i]];
        i++;
      }
    }
    
    // Swap pivot with the element at i
    [nums[i], nums[right]] = [nums[right], nums[i]];
    
    // Return the pivot's final position
    return i;
  }
  
  // Example usage
  //const array = [9, 3, 7, 1, 8, 5, 4, 6, 2];
  const array = [10, 8, 13, 14, 15, 16, 17, 18, 9];
  console.log("Original array:", array);
  console.log("3rd smallest element:", quickSelect(array, 3));  // Should output: 3
  console.log("7th smallest element:", quickSelect(array, 7));  // Should output: 7
  console.log("1st smallest element:", quickSelect(array, 1));  // Should output: 1
  console.log("9th smallest element:", quickSelect(array, 9));  // Should output: 9
  
  // The original array remains unchanged
  console.log("Original array after quickSelect:", array);
  