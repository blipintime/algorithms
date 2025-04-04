const mystr = 'abcd123a45'

function findChar(str, ch) {
    return [...str].indexOf(ch)
}

console.log('find a', findChar(mystr, 'a'))
console.log('find d', findChar(mystr, 'd'))
