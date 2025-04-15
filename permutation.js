
const permutate = input => {
    if (!input || input.length === 0) {
        return []
    } else if (input.length === 1) {
        return input
    } else if(input.length === 2) {
        return [input, [input[1], input[0]]]
    } else {
        return input.map(first => {
            const rest = input.filter(el => el !== first)
            const perms = permutate(rest)
            return perms.map(perm => {
                return [first].concat(perm)
            })
        })
    }
}

console.log('---->', permutate([1, 2, 4]))