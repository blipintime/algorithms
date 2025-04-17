function findStringChains(strings) {
    // Convert array to Set for O(1) lookups
    const stringSet = new Set(strings);
    
    // Keep track of visited strings to avoid redundant work
    const visited = new Set();
    
    // Store all chains we find
    const allChains = [];
    
    // For each string in the original list
    for (const startString of strings) {
      // Skip if we've already processed this string as part of another chain
      if (visited.has(startString)) continue;
      
      // Start a new chain with this string
      const currentChain = [startString];
      visited.add(startString);
      
      // Keep track of current string in the chain
      let currentString = startString;
      
      // Continue until we can't find a valid next string or reach length 1
      while (currentString.length > 1) {
        let foundNext = false;
        
        // Try removing each character one by one
        for (let i = 0; i < currentString.length; i++) {
          // Remove the i-th character
          const nextCandidate = currentString.slice(0, i) + currentString.slice(i + 1);
          
          // Check if the new string exists in our original list
          if (stringSet.has(nextCandidate)) {
            // Add to chain and mark as visited
            currentChain.push(nextCandidate);
            visited.add(nextCandidate);
            
            // Update current string and continue
            currentString = nextCandidate;
            foundNext = true;
            break;
          }
        }
        
        // If we couldn't find a valid next string, end the chain
        if (!foundNext) {
          break;
        }
      }
      
      // Add this chain to our collection
      allChains.push(currentChain);
    }
    
    // Count unique chains
    const uniqueChains = allChains.length;
    
    // Find the longest chain
    let longestChain = [];
    for (const chain of allChains) {
      if (chain.length > longestChain.length) {
        longestChain = chain;
      }
    }
    
    return {
      uniqueChains,
      longestChain,
      allChains
    };
  }
  
  // Example usage
  const testStrings = ["abcd", "abc", "abd", "ab", "a", "xyz", "xy", "x"];
  const result = findStringChains(testStrings);
  
  console.log(`Number of unique chains: ${result.uniqueChains}`);
  console.log(`Longest chain: ${result.longestChain.join(" -> ")}`);
  console.log(`Length of longest chain: ${result.longestChain.length}`);
  console.log("\nAll chains:");
  result.allChains.forEach((chain, i) => {
    console.log(`Chain ${i+1}: ${chain.join(" -> ")}`);
  })
