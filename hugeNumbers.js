/**
 * Adds two very large numbers represented as strings
 * This implementation handles numbers of arbitrary length
 * @param {string} num1 - First number as string
 * @param {string} num2 - Second number as string
 * @return {string} - Sum as string
 */
function addHugeNumbers(num1, num2) {
    // Ensure both numbers are strings
    num1 = String(num1);
    num2 = String(num2);
    
    // Add leading zeros to make them equal length
    const maxLength = Math.max(num1.length, num2.length);
    num1 = num1.padStart(maxLength, '0');
    num2 = num2.padStart(maxLength, '0');
    
    let result = '';
    let carry = 0;
    
    // Process digits from right to left (least significant to most significant)
    for (let i = maxLength - 1; i >= 0; i--) {
      // Convert character digits to numbers and add them with any carry
      const digit1 = parseInt(num1.charAt(i), 10);
      const digit2 = parseInt(num2.charAt(i), 10);
      const sum = digit1 + digit2 + carry;
      
      // Calculate the new carry and current digit for result
      carry = Math.floor(sum / 10);
      const currentDigit = sum % 10;
      
      // Add current digit to start of result string
      result = currentDigit + result;
    }
    
    // If there's a final carry, add it to the result
    if (carry > 0) {
      result = carry + result;
    }
    
    return result;
  }
  
  // Example usage
  function demonstrateHugeNumberAddition() {
    // Generate some huge numbers
    const hugeNumber1 = "9".repeat(1000) + "7"; // 1000 nines followed by a 7
    const hugeNumber2 = "8".repeat(1000) + "6"; // 1000 eights followed by a 6
    
    console.log("Adding two huge numbers (each over 1000 digits):");
    console.log(`Number 1: ${hugeNumber1.slice(0, 10)}...${hugeNumber1.slice(-10)} (${hugeNumber1.length} digits)`);
    console.log(`Number 2: ${hugeNumber2.slice(0, 10)}...${hugeNumber2.slice(-10)} (${hugeNumber2.length} digits)`);
    
    // Measure performance
    console.time("Addition time");
    const sum = addHugeNumbers(hugeNumber1, hugeNumber2);
    console.timeEnd("Addition time");
    
    console.log(`Result: ${sum.slice(0, 10)}...${sum.slice(-10)} (${sum.length} digits)`);
    
    // Verification with a smaller example
    const a = "12345678901234567890";
    const b = "98765432109876543210";
    const expectedSum = "111111111011111111100"; // Verified sum
    const calculatedSum = addHugeNumbers(a, b);
    
    console.log("\nVerification with smaller numbers:");
    console.log(`${a} + ${b} = ${calculatedSum}`);
    console.log(`Correct result: ${calculatedSum === expectedSum ? "✓" : "✗"}`);
  }
  
  // Run the demonstration
  demonstrateHugeNumberAddition();
  