const left = (r, c) => [r, c - 1]
const upLeft = (r, c) => [r + 1, c - 1]
const up = (r, c) => [r + 1, c]
const upRight = (r, c) => [r + 1, c + 1]
const right = (r, c) => [r, c + 1]
const downRight = (r, c) => [r - 1, c + 1]
const down = (r, c) => [r - 1, c]
const downLeft = (r, c) => [r - 1, c - 1]

function queensAttack(side, countObstacles = 0, rQueen, cQueen, obstacles = []) {

  const prepareSteps = () => {
    const checks = [left, upLeft, up, upRight, right, downRight, down, downLeft]
    return (r, c) => {
      let visitablePositions = 0
      for (let currentCheck = 0; currentCheck < checks.length; currentCheck++) {
        let newRow = rQueen // always start from queen's position
        let newCol = cQueen
        while (true) {
          [newRow, newCol] = checks[currentCheck](newRow, newCol)
          if (newRow > side || newRow < 1 || newCol > side || newCol < 1) {
            // if either is outside, start new direction
            break
          } else {
            const found = obstacles.find(([rObstacle, cObstacle]) => rObstacle === newRow && cObstacle === newCol)
            if (found) {
              break // no more investigation in this direction
            } else {
              visitablePositions++
              console.log('-->', newRow, newCol)
              // no obstacle, try next position
              continue
            }
          }
        }
      }
      return visitablePositions
    }
  }

  const doSteps = prepareSteps()
  return doSteps(rQueen, cQueen)
}

//console.log(queensAttack(4, 0, 4, 4, [[]]))
//console.log(queensAttack(5, 3, 4, 3, [[5, 5], [4, 2], [2, 3]]))
console.log(queensAttack(1, 0, 1, 1, []))
