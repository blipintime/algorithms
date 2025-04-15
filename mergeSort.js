function mergeSort(arr) {
    // Base case: a single element is already sorted
    if (arr.length <= 1) {
      return arr;
    }
  
    // Split the array into two halves
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
  
    // Recursively sort both halves and merge them
    return merge(mergeSort(left), mergeSort(right));
  }
  
  function merge(left, right) {
    console.log(left.join(', '), ' - ', right.join(', '))
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    // Compare elements from both arrays and add the smaller one to the result
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
  
    // Add remaining elements (if any)
    return result
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
  }
  
  console.log(mergeSort([39, 30, 22, 20, 8, 4, 2, 1.5]))
