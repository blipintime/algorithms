const s = "ADOBECODEBANC"
const t = "ABC"

const findIt = (s, t) => {
    let ret
    // start from left
    for(let i = 0 ; i < s.length; i++) {
        const inspect = s.substring(i, s.length)
        let found = true
        const parts = t.split('')
        for(let j=0 ; j < parts.length; j++) {
            if (!inspect.includes(parts[j]) ) {
                found = false
                break
            }
        }
        if (found) {
            ret = inspect
        } else {
            break
        }
    }
    return ret
}

findIt(s, t)