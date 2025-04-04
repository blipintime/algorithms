/**
 * QuickSort implementation in JavaScript
 * 
 * Time Complexity:
 * - Best Case: O(n log n)
 * - Average Case: O(n log n)
 * - Worst Case: O(n²) when the array is already sorted
 * 
 * Space Complexity: O(log n) due to the recursion stack
 */

function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
      const pivotIndex = partition(arr, left, right);
      
      // Sort the elements on the left of the pivot
      quickSort(arr, left, pivotIndex - 1);
      
      // Sort the elements on the right of the pivot
      quickSort(arr, pivotIndex + 1, right);
    }
    
    return arr;
  }
  
  function partition(arr, left, right) {
    // Choose the rightmost element as the pivot
    const pivot = arr[right];
    
    // Index of smaller element
    let i = left - 1;
    
    for (let j = left; j < right; j++) {
      // If current element is smaller than the pivot
      if (arr[j] < pivot) {
        i++;
        
        // Swap arr[i] and arr[j]
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    
    // Swap arr[i+1] and arr[right] (put the pivot in its correct position)
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    
    // Return the pivot's index
    return i + 1;
  }
  
  // Example usage
  //const unsortedArray = [10, 7, 8, 9, 1, 5];
  const unsortedArray = [1, 10, 5, 11, 7]
  console.log("Unsorted array:", unsortedArray);
  console.log("Sorted array:", quickSort([...unsortedArray]));
  