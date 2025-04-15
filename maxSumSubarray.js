function maxSumSubarray(nums, k) {
  let maxSum = -Infinity;
  let currentSum = 0;
  let queue = [];

  for (let i = 0; i < nums.length; i++) {
    currentSum += nums[i];
    queue.push(nums[i]);

    if (queue.length > k) {
      currentSum -= queue.shift();
    }

    if (queue.length === k) {
      maxSum = Math.max(maxSum, currentSum);
    }
  }

  return maxSum;
}

//console.log(maxSumSubarray([1, 2, 3, 4, 5], 3))
console.log(maxSumSubarray([-1, -2, -3, -4, -5], 3))
