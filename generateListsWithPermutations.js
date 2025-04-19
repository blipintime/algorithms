function generateLists(n) {
  // Base case: if n is 0, return an array with one empty array
  if (n === 0) {
    return [[]];
  }
  
  // Get all lists of length n-1
  const smallerLists = generateLists(n - 1);
  const result = [];
  
  // For each smaller list, add both 2 and 3 as possible values
  for (const list of smallerLists) {
    result.push([...list, 2]); // Add 2 to the list
    result.push([...list, 3]); // Add 3 to the list
  }
  
  return result;
}

// Example usage for n = 3
const n = 3;
const allPossibleLists = generateLists(n);

console.log(`Total number of possible lists: ${allPossibleLists.length}`);
console.log("All possible lists:");
allPossibleLists.forEach(list => {
  console.log(list);
});

// You can change the value of n to generate lists of different lengths
// For example:
// const n = 4;
// const allPossibleLists = generateLists(n)