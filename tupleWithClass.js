#!/usr/bin/env node




// const myAr = Object.freeze(['a', 10, 'g'])
// try {
//     myAr.push(5)
// } catch(e) {
//     console.log('---->', e)
// }
// console.log(myAr)
class Tuple {
    constructor(...items) {
      items.forEach((item, index) => {
        // Define read-only properties
        Object.defineProperty(this, index, {
          value: item,
          enumerable: true,
          writable: false
        });
      });
      
      // Store length
      Object.defineProperty(this, 'length', {
        value: items.length,
        enumerable: false,
        writable: false
      });
    }
    
    // Add array-like methods
    *[Symbol.iterator]() {
      for (let i = 0; i < this.length; i++) {
        yield this[i];
      }
    }
    
    toString() {
      return `(${Array.from(this).join(', ')})`;
    }
  }
  
  const person = new Tuple("John", 30, "Developer");
  console.log(person[0]); // "John"
  console.log(person.toString()); // "(John, 30, Developer)"
  console.log([...person])
  