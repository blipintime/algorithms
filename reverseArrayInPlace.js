const ar  = [1,2,3,6, 5]

for(let i=0; i<ar.length; i++) {
    const last = ar.pop()
    ar.splice(i, 0, last)
}

console.log('after ', ar)

