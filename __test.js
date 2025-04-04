
let nums = [1, 2, 3, 4, 5]
let i = 1
let j = 3

const changethis = [...nums]
changethis.forEach((num, idx) => {
    if (idx === 3) {
        [changethis[0], changethis[3]] = [changethis[3], changethis[0]]
    }
})

[nums[1], nums[3]] = [nums[3], nums[1]]

console.log(nums)