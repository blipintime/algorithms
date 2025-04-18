const ar1 = [3, 5, 66, 88, 100]
const ar2 = [2, 67, 68, 69, 70, 71]

function mergeSortedArrays(ar1, ar2) {
  const length = Math.min(ar1.length, ar2.length)
  const result = []
  let i = 0
  let j = 0
  while (i < ar1.length || j < ar2.length) {
    if (i === ar1.length) {
      result.push(...ar2.slice(j))
      break
    } else if (j === ar2.length) {
      result.push(...ar1.slice(i))
      break
    } else if (ar1[i] <= ar2[j]) {
      result.push(ar1[i])
      i++
    } else if (ar2[j] <= ar1[i]) {
      result.push(ar2[j])
      j++
    }
  }
  return result
}

// console.log(mergeSortedArrays([3, 5, 66, 88, 100],
//   [66, 67, 68, 69, 70, 71]))

  console.log(mergeSortedArrays([3, 5, 66],
    [66, 67, 68, 69, 70, 71]))