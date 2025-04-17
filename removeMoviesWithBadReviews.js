
function removeMoviesWithBadReviews(reviews) {
  let lastOneRemoved = false
  const removedIndices = []
  for (let i = 0; i < reviews.length; i += 3) {
    const [a, b, c] = reviews.slice(i, i + 3)
    if ([a, b, c].includes(undefined)) {
      break // no more work
    }
    if (lastOneRemoved) {
      if (Math.min(b, c) === c) {
        removedIndices.push(i + 2)
        lastOneRemoved = true
      } else {
        removedIndices.push(i + 1)
        lastOneRemoved = false
      }
    } else if (Math.min(a, b, c) === c) {
      removedIndices.push(i + 2)
      lastOneRemoved = true
    } else {
      removedIndices.push(Math.min(a, b) === a ? i : i + 1)
      lastOneRemoved = false
    }
  }
  const ret = reviews.filter((review, idx) => !removedIndices.includes(idx))
  return ret
}

// console.log(removeMoviesWithBadReviews([3]))
// console.log(removeMoviesWithBadReviews([3, 1]))
// console.log(removeMoviesWithBadReviews([3, 1, 4]))
// console.log(removeMoviesWithBadReviews([3, 4, 1]))
// console.log(removeMoviesWithBadReviews([3, 4, 1, 6]))
//console.log(removeMoviesWithBadReviews([3, 4, 1, 6, 7]))
//console.log(removeMoviesWithBadReviews([3, 4, 1, 6, 7, 0]))
console.log(removeMoviesWithBadReviews([3, 1, 4, 5, 6, 7, 1, 1, 1, 11]))
