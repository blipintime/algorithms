//const courses = [[0, 1], [1, 2]] // [1, 0] -> [2, 1, 0] 
//const courses = [[0, 1], [1, 0]] // [1, 0] -> impossible
//const courses = [[0, 1], [6, 1]] // [1, 0, 6]
const courses = [[0, 1], [6, 1], [0, 6]]

const BreakException = {};

const isPossible = (courses) => {

  let lineup = []
  try {
    courses.forEach(course => {
      const [courseId, dependency] = course
      if (lineup.length === 0) {
        lineup = [dependency, courseId]
      } else {
        const depIdx = lineup.indexOf(dependency)
        const courseIdx = lineup.indexOf(courseId)
        if (depIdx === -1) {
          if (courseIdx === -1) {
            lineup.push(dependency)
            lineup.push(courseId)
          } else {
            lineup.splice(courseIdx, 0, dependency)
          }
        } else if (courseIdx === -1) {
          lineup.push(courseId)
        } else if (depIdx > courseIdx) {
          throw BreakException
        }
      }
    })
  } catch (e) {
    return false
  }
  return true
}

console.log(isPossible(courses))