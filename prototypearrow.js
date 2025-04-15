function Node({ id, left, right, clone }) {
  this.id = id
}

let root

Node.prototype.flatten = () => {
  this.walk()
  return root
}

Node.prototype.walk = (innode) => {
    console.log('--->walk')
}


const one = new Node({ id: 1 })


console.log(one.flatten())