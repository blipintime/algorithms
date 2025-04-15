class Link {
  constructor(name, next) {
    this.name = name
    this.next = next
  }
}
const link5 = new Link('5')
const link4 = new Link('4', link5)
const link3 = new Link('3', link4)
const link2 = new Link('2', link3)
const link1 = new Link('1', link2)

function printAll(head) {
  console.log(head.name)
  if(head.next) {
    printAll(head.next)
  }
}

// function reverse(head) {
//   if (head.next) {
//     const next = head.next
//     reverse(next)
//     next.next = head
//     head.next = undefined
//   }
// }

// printAll(link1)
// reverse(link1)
// printAll(link3)


function findMiddle(head) {
  let first = head
  let second = head.next
  let firstPos = 1
  let secondPos = 2

  while (second && second.next) {
    second = second.next
    secondPos++
    const calculatedFirst = Math.ceil(secondPos / 2)
    while (firstPos < calculatedFirst) {
      first = first.next
      firstPos++
    }
  }
  return first
}

console.log(findMiddle(link1))

