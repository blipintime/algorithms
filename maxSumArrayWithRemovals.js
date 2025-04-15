
// no two adjacent element can be removed
function maximizeArraySumWithRemoval(nums) {
  if (nums.length < 3) {
    return nums
  }
  let queue = []
  let num = 0
  while (num < nums.length - 1) {

    if (nums[num] <= nums[num + 1]) {
      // first is the smallest
      queue.push(nums[num+1])  
      num += 2
    } else if (nums[num + 1] <= nums[num]  && nums[num + 1] <= nums[num + 2]) {
        // middle is the smallest
        queue.push(nums[num])
        queue.push(nums[num+2])
        num += 3
    } else {
        // third is the smallest
        queue.push(nums[num])
        queue.push(nums[num + 1])
        num += 4
    // } else {
    //   queue.push(nums[num])
    // }
  }

  return queue
}
//console.log(maximizeArraySumWithRemoval([1, 2, 3]))
//console.log(maximizeArraySumWithRemoval([1, 2, 1, 6]))
console.log(maximizeArraySumWithRemoval([4, 2, 5, 6]))
//console.log(maxSumSubarray([1, 2, 3, 4, 5]))
//console.log(maximizeArraySumWithRemoval([2, 2, 1, 1, 4, 5]))
