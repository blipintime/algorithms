function degreeOfArray(arr) {
    if (!arr || arr.length<1) {
        return 0
    }
    // Write your code here
    let degree = -Infinity
    const counts = {}
    const subArrays = {}
    for(let i=0; i<arr.length; i++) {
        const el = arr[i]
        if (!(el in counts)) {
           counts[el] = 1
           subArrays[el] = [i, -Infinity ]
        } else {
            counts[el]++
            const sub = subArrays[el]
            sub[1] = i
        }
        if (counts[el] > degree) {
            degree = counts[el]
        }
    }

    // let's look at counts
    let shortestSubarray = Infinity
    let keys = Object.keys(counts)
    for(let j=0; j<keys.length; j++) {
        const entry = keys[j]
        if (counts[entry] === degree) {
            const subArray = subArrays[entry]
            const distance = subArray[1] - subArray[0] + 1
            if (distance < shortestSubarray) {
                shortestSubarray = distance
            }
        }
    }

    // find which element has the highest occurrence
    return shortestSubarray
}

//degreeOfArray([1, 2, 2, 3, 1])
//console.log(degreeOfArray([1, 1, 1, 2, 2, 3]))
console.log(degreeOfArray([1,2,2,3,1,2]))



