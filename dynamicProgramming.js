// Three implementations of the Fibonacci sequence to show the power of DP

// 1. Naive recursive implementation - O(2^n) time complexity
function fibRecursive(n) {
    if (n <= 1) return n;
    console.log('fibRecursive ', n)
    return fibRecursive(n - 1) + fibRecursive(n - 2);
  }
  
  // 2. Dynamic Programming with Memoization (Top-Down) - O(n) time complexity
  function fibMemoization(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibMemoization(n - 1, memo) + fibMemoization(n - 2, memo);
    return memo[n];
  }
  
  // 3. Dynamic Programming with Tabulation (Bottom-Up) - O(n) time complexity
  function fibTabulation(n) {
    if (n <= 1) return n;
    
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
  }
  
  // Example usage and performance comparison
  function comparePerformance(n) {
    console.log(`Computing Fibonacci(${n}) with different methods:`);
    
    // Only run recursive for small numbers as it gets exponentially slower
    if (n <= 30) {
      console.time("Recursive");
      const recursiveResult = fibRecursive(n);
      console.timeEnd("Recursive");
      console.log(`Recursive result: ${recursiveResult}`);
    } else {
      console.log("Recursive method skipped (too slow for n > 30)");
    }
    
    console.time("Memoization");
    const memoResult = fibMemoization(n);
    console.timeEnd("Memoization");
    console.log(`Memoization result: ${memoResult}`);
    
    console.time("Tabulation");
    const tabulationResult = fibTabulation(n);
    console.timeEnd("Tabulation");
    console.log(`Tabulation result: ${tabulationResult}`);
  }
  
  // Run comparison with n = 40
  comparePerformance(30);
