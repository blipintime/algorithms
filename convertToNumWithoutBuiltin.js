function convert(numStr) {
	const length = numStr.length
  let total = 0
	let magnitude = 1
  for(let i = length - 1 ; i >= 0; i--) {
    const code = numStr.charCodeAt(i)
  	const currNumber = (code - 48) * magnitude
    total += currNumber
    magnitude *= 10
  }
  return total 
}

console.log('---->', convert("137"))