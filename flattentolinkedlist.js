function Node({ id, left, right, clone }) {
  this.id = id
  this.left = left
  this.right = right
  this.clone = clone
}

let root

Node.prototype.flatten = function() {
  this.walk()
  return root
}

Node.prototype.walk = function(innode) {
  let last = innode
  if (last === undefined) {
    last = new Node({id: this.id, clone: true })
    // save root
    root = last
  } else {
    last.right = new Node({id: this.id, clone: true })
    last = last.right 
  }
  if(this.left) {
    last = this.left.walk(last)
  }
  if(this.right) {
    last = this.right.walk(last)
  }
  return last
}


const three = new Node({ id: 3 })
const four = new Node({ id: 4 })
const two = new Node({ id: 2, left: three, right: four })

const six = new Node({ id: 6 })
const five = new Node({ id: 5, right: six })
const one = new Node({ id: 1, left: two, right: five })


console.log(one.flatten())