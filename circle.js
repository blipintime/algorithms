const set1 = new Set()
let pos = 0

function Node({ id, left, next }) {
  this.id = id
  this.next = next

  this.setNext = (next) => {
    this.next = next
  }

  this.walk = () => {
    let ret = -1
    if (set1.has(this)) {
        ret = this.pos
    } else {
        set1.add(this)
        this.pos = pos // save position
        pos++
        if (this.next) {
          ret = this.next.walk()
        }
    }
    return ret
  }
}

const minusfour = new Node({id: -4 })
const zero = new Node({id: 0, next: minusfour})
const two = new Node({ id: 2, next: zero })
const three = new Node({ id: 3, next: two })
//minusfour.setNext(two)

console.log(three.walk())