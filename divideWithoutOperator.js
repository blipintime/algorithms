/**
 * Performs division of two numbers without using the division operator
 * @param {number} dividend - The number to be divided
 * @param {number} divisor - The number to divide by
 * @returns {object} - Object containing quotient and remainder
 */
function divideWithoutOperator(dividend, divisor) {
    // Handle division by zero
    if (divisor === 0) {
      throw new Error("Division by zero is not allowed");
    }
    
    // Handle negative numbers
    let isNegative = false;
    if ((dividend < 0 && divisor > 0) || (dividend > 0 && divisor < 0)) {
      isNegative = true;
    }
    
    // Convert to positive numbers for the algorithm
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);
    
    let quotient = 0;
    let remainder = dividend;
    
    // Repeated subtraction
    while (remainder >= divisor) {
      remainder -= divisor;
      quotient++;
    }
    
    return {
      quotient: isNegative ? -quotient : quotient,
      remainder: remainder
    };
  }
  
  // Example usage
  console.log(divideWithoutOperator(20, 4));     // { quotient: 5, remainder: 0 }
  console.log(divideWithoutOperator(25, 4));     // { quotient: 6, remainder: 1 }
  console.log(divideWithoutOperator(-20, 4));    // { quotient: -5, remainder: 0 }
  console.log(divideWithoutOperator(20, -4));    // { quotient: -5, remainder: 0 }
  console.log(divideWithoutOperator(-20, -4));   // { quotient: 5, remainder: 0 }
  