function maximizeSum(arr) {
    const n = arr.length;
    if (n <= 2) return arr.reduce((sum, num) => sum + num, 0);
  
    // maxSums[i] represents the maximum sum up to index i
    const maxSums = new Array(n).fill(0);
    
    maxSums[0] = arr[0];
    maxSums[1] = arr[0] + arr[1];
    
    for (let i = 2; i < n; i++) {
      // We have two choices:
      // 1. Include the current element and the best sum up to i-1
      // 2. Remove the current element and take the best sum up to i-2
      const prevCurrent = maxSums[i-1] + arr[i]
      const prevPrevCurrent = maxSums[i-2] + arr[i]
      if (prevCurrent > prevPrevCurrent) {
        console.log('-->out', i-2 )
      } else {
        console.log('-->out', i-1 )
      }
      maxSums[i] = Math.max(prevCurrent, prevPrevCurrent);
    }
    
    return maxSums[n-1];
  }

  const arr = [-1, -1, 3, 3, 5, 2]
//const arr = [3, 1, 5, 2, 7, 4, 6];
console.log(maximizeSum(arr));