/**
 * Finds the longest substring by removing the same number of characters from both strings
 * @param str1 First input string
 * @param str2 Second input string
 * @returns The longest common substring or empty string if no match
 */
function longestCommonSubstring(str1, str2) {
  // If strings are not the same length, return empty string
  if (str1.length !== str2.length) {
    return "";
  }

  // Edge cases
  if (str1 === str2) return str1; // They're identical
  if (str1.length === 0 || str2.length === 0) return "";

  const n = str1.length;
  let longestSubstring = "";

  // Try removing different numbers of characters from both strings
  for (let charsToRemove = 1; charsToRemove < n; charsToRemove++) {
    // Generate all possible subsequences of length (n - charsToRemove)
    const subsequences1 = generateSubsequences(str1, n - charsToRemove);
    const subsequences2 = generateSubsequences(str2, n - charsToRemove);
    
    // Find common subsequences
    for (const sub1 of subsequences1) {
      if (subsequences2.includes(sub1) && sub1.length > longestSubstring.length) {
        longestSubstring = sub1;
      }
    }
  }

  return longestSubstring;
}

/**
 * Generates all possible subsequences of a given length
 * @param str The input string
 * @param length The desired length of subsequences
 * @returns Array of all possible subsequences
 */
function generateSubsequences(str, length) {
  if (length === 0) return [""];
  if (length === str.length) return [str];
  
  const result = [];
  
  function backtrack(current, start) {
    if (current.length === length) {
      result.push(current);
      return;
    }
    
    for (let i = start; i < str.length; i++) {
      backtrack(current + str[i], i + 1)
    }
  }
  
  backtrack('', 0);
  return result;
}

//console.log(longestCommonSubstring("XSIFVPO", "SVFPLOY")) // SFPO
console.log(longestCommonSubstring("ABCD", "ACBD")); // "AD"
// console.log(longestCommonSubstring("XYZ", "ABC")); // ""
// console.log(longestCommonSubstring("ABCDEF", "AFEDCB")); // "A"
// console.log(longestCommonSubstring("HELLO", "WORLD")); // ""
