function roundGrades(grades) {
  const results = []
  grades.forEach(grade => {
    // find closest 
    const mod = grade % 5
    if (grade < 38 || mod === 0) {
      results.push(grade) // no change
    } else {
      if (mod < 3) {
        results.push(grade) // no change
      } else {
        const next = grade - mod + 5
        results.push(next) 
      }
    } 
  })
  return results
}

console.log(roundGrades([4, 73, 67, 38, 33]))
