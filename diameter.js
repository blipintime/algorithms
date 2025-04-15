function Node({ id, left, right, root = false }) {
  this.id = id
  this.left = left
  this.right = right
  this.report = () => {
    let leftnodes = []
    let rightnodes = []
    let ret = [this.id]
    if (this.left) {
      leftnodes = this.left.report()
    }
    if (this.right) {
      rightnodes = this.right.report()
    }
    let longernodes
    if (root) {
      ret = leftnodes.concat(this.id).concat(rightnodes)
    } else {
      // longerchild can be empty array
      longernodes = leftnodes.length >= rightnodes.length ? leftnodes : rightnodes
      ret = longernodes.concat(ret)
    }

    console.log('reporting', ret)
    return ret
  }
}


const nine = new Node({ id: 9 })
const four = new Node({ id: 4, left: nine })
const five = new Node({ id: 5 })
const two = new Node({ id: 2, left: four, right: five })
const three = new Node({ id: 3 })
const node = new Node({ id: 1, left: two, right: three, root: true })

console.log(node.report())