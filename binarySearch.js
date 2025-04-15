// O(log n) 

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
      // Find the middle element
      const mid = Math.floor((left + right) / 2);
      
      // If target is found, return its index
      if (arr[mid] === target) {
        return mid;
      }
      
      // If target is greater, ignore left half
      if (arr[mid] < target) {
        left = mid + 1;
      }
      // If target is smaller, ignore right half
      else {
        right = mid - 1;
      }
    }
    
    // Target not found
    return -1;
  }

  