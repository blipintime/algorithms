function Node({ id, next }) {
  this.id = id
  this.next = next
}

let head
let tail
let counter = 0

Node.prototype.findMiddle = function () {
  head = this
  tail = this
  return this.walk()
}

Node.prototype.walk = function () {
  if (tail.next) {
    counter++
    if (counter % 2 === 0) {
      head = head.next
    }
    tail = tail.next
    return this.walk()
  } else {
    return head
  }
}

// const five = new Node({ id: 5 })
// const four = new Node({ id: 4, next: five })
const three = new Node({ id: 3 /*, next: four*/ })
const two = new Node({ id: 2, next: three })
const one = new Node({ id: 1, next: two })

console.log(one.findMiddle())