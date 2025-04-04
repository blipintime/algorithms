
function detectDoubleParentheses(expression) {
    const result = [];
    const stack = [];
    
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      
      if (char === '(') {
        stack.push(i);
      } else if (char === ')') {
        if (stack.length > 0) {
          const openIndex = stack.pop();
          
          // Check if this is a closing of a double parenthesis
          if (stack.length > 0 && stack[stack.length - 1] === openIndex - 1) {
            // We found a double parenthesis!
            // Extract the content between the inner parentheses
            const content = expression.substring(openIndex + 1, i);
            
            // Only add if the content is balanced
            if (isBalanced(content)) {
              result.push(content);
            }
          }
        }
      }
    }
    
    return result;
  }
  
  // Helper function to check if a string has balanced parentheses
  function isBalanced(str) {
    let count = 0;
    
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') {
        count++;
      } else if (str[i] === ')') {
        count--;
        if (count < 0) return false;
      }
    }
    
    return count === 0;
  }
  
  // Test the function
  const testExpression = "(a+(b+((x+1))+(blah+((3)))))";
  console.log(detectDoubleParentheses(testExpression))