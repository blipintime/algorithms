let num = 45
const stack = []
let pos = 7
while ( pos >= 0 ) {
  const curr = 2 ** pos
  if (num >= curr ) {
    stack.push(1)
    num -= curr
  } else {
    stack.push(0)
  }
  pos--
}
console.log(stack.join(''))

const ar = [ 5, 7, 8, 9, 'u']
const foo = ar.shift()
console.log(ar, foo)

