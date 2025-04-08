#!/usr/bin/env node

// Define a tuple type
// type Point = readonly [number, number];

// // Create a tuple
// const point: Point = [10, 20];

// // Access elements
// console.log(point[0]); // 10

// This would cause a compile-time error
// point[0] = 99;


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
