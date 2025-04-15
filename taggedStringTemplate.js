function htmlEscape(strings, ...values) {
    return strings.reduce((result, str, i) => 
      result + str + (values[i] ? values[i]
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;') : ''), '');
  }
  const foo = 'bar'
  const userInput = '<script>alert("XSS")</script>';
  const safeOutput = htmlEscape`User input: ${userInput}xx${foo}`;
  console.log(safeOutput);
  // Output: User input: &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;
