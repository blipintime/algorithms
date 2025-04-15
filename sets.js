const set1 = new Set();

set1.add(42);
set1.add("forty two");

const iterator1 = set1[Symbol.iterator]();

console.log(iterator1.next().value);
// Expected output: 42

console.log(iterator1.next().value);
// Expected output: "forty two"

// 'in' keys
// 'of' iterable
for(let i of set1) {
    console.log('--->', i)
}

const set4 = new Set()
set4.add('apple')

const set5 = new Set()
set5.add('apple')
set5.add('peach')

console.log(set5.difference(set4))
console.log(set4.difference(set5))
