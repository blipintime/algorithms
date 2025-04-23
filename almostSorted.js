function reverseSubarray(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

function checkIfSorted(arr) {
  let isSorted = true
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      isSorted = false
      break
    }
  }
  return isSorted
}

function almostSorted(toSort) {
  // Write your code here
  if (!toSort || toSort.length < 2) {
    return console.log('sorted')
  }

  // Write your code here
  if (checkIfSorted(toSort)) {
    return console.log('sorted')
  }

  function checkIfReversableSubsegment(toSort) {

    // Create a copy of the sorted array to compare against
    const sortedArr = [...toSort].sort((a, b) => a - b);

    // Find the first mismatch from the left
    let left = 0;
    while (left < toSort.length && toSort[left] === sortedArr[left]) {
      left++;
    }

    // If left reached the end, array is already sorted
    if (left === toSort.length) return true;

    // Find the first mismatch from the right
    let right = toSort.length - 1;
    while (right >= 0 && toSort[right] === sortedArr[right]) {
      right--;
    }

    // Check if reversing the subarray from left to right would sort the array
    // First, reverse the subarray
    let modified = [...toSort];
    reverseSubarray(modified, left, right);

    // Then check if the modified array is sorted
    for (let i = 0; i < modified.length; i++) {
      if (modified[i] !== sortedArr[i]) {
        return `no`
      }
    }

    return `yes\nreverse ${left + 1} ${right + 1}`
  }

  function checkIfSwappableWith2Elements() {
    const arr = [...toSort]

    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[i]) {
          [arr[i], arr[j]] = [arr[j], arr[i]]
          if (checkIfSorted(arr)) {
            return `yes\nswap ${i + 1} ${j + 1}`
          } else {
            return `no`
          }
        }
      }
    }

  }
  let ret = checkIfSwappableWith2Elements(toSort)

  if (ret !== 'no') {
    console.log(ret)
    return
  }

  ret = checkIfReversableSubsegment(toSort)
  console.log(ret)
}


//almostSorted([4, 2])
//almostSorted([1, 2, 5, 4, 3])
almostSorted([1, 5, 4, 3, 2, 6])
