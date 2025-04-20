function encryption(str) {
  const cleaned = str.replace(/\s/g, '')
  const length = cleaned.length
  const sq = Math.sqrt(length)
  let rows = Math.floor(sq)
  const cols = Math.ceil(sq)
  if (rows * cols < length) {
    rows++
  }

  // lay out the rows
  const filledRows = []
  let start = 0
  let end = start + cols
  for(let i=0; i<rows; i++) {
    filledRows.push(cleaned.substring(start, end))
    start += cols
    end += cols
  }
  // print column by column
  const colStrings = []
  for(let j=0; j<cols; j++) {
    const oneCol = filledRows.map(row => row[j]).join('')
    colStrings.push(oneCol)
  }
  return colStrings.join(' ')
}

//console.log(encrypt('Janos Mucsi'))
//console.log(encrypt('haveaniceday'))
//console.log(encrypt('feedthedog'))
console.log(encrypt('chillout'))
