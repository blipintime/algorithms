console.log('---->global', global)

const elements = [4, 2, 7, 1, 3, 6, 9]

let depth = 0

const add = (parent, value) => {
  let added = true
  depth++
  if (!("right" in parent)) {
    parent.right = { value }
  } else if (!("left" in parent)) {
    parent.left = { value }
  } else if (depth < 2) {
    const ret = add(parent.right, value)
    if (!ret) {
      add(parent.left, value)
    }
  } else {
    added = false
  }
  depth--
  return added
}
let root = { value: elements.shift() }
while (elements.length) {
  const value = elements.shift()
  add(root, value)
}

// read walking from the left first
depth = -1
let output = []
const read = node => {
  depth++
  output[depth] = output[depth] || []
  output[depth].push(node.value)
  if (node.left) {
    read(node.left)
  }
  if (node.right) {
    read(node.right)
  }
  depth--
}
read(root)
console.log(output.flat())