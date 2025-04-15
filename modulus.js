//  Given an array of integers and an integer k, 
// // find the number of pairs (i, j) 
// // such that i < j and (nums[i] + nums[j]) % k == 0. 
// // In other words, count the number of pairs whose sum is divisible by k


function countWithModulus(nums, k) {
  if (!k) {
    console.log('Can not divide by 0')
    return
  }
  let j = 1
  let count = 0
  const ar = []
  const pairs = new Set()
  for(let i=0; i < nums.length; i++) {
    for(let j = i + 1; j < nums.length; j++) {
      if (i!==j && (nums[i] + nums[j]) % k === 0) {
        const key = nums[i] < nums[j] ? `${nums[i]}-${nums[j]}` : `${nums[j]}-${nums[i]}`
        //if (!pairs.has(key)) {
          pairs.add(key)
          count++
          ar.push(`${nums[i]} - ${nums[j]}`)
        //}
      }
    }
  }

  console.log('Count', count)
  console.log(ar.join(`\n`))
}

//countWithModulus([1, 2, 3, 4, 5], 3)

//countWithModulus([1, 2, 3, 4, 5], 0)

countWithModulus([1, 2, 3, 4, 5], 2)


