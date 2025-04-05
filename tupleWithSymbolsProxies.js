#!/usr/bin/env node

function NamedTuple(schema) {
    return function(...values) {
      if (values.length !== Object.keys(schema).length) {
        throw new Error('Invalid number of arguments');
      }
      
      const data = Object.freeze(values);
      const fields = Object.keys(schema);
      
      return new Proxy(data, {
        get(target, prop) {
          console.log('---->', prop)
          if (typeof prop === 'symbol' || prop === 'length' || !isNaN(prop)) {
            return target[prop];
          }
          
          const index = fields.indexOf(prop);
          if (index !== -1) {
            return target[index];
          }
          
          return undefined;
        }
      });
    };
  }
  
  const Point = NamedTuple({x: Number, y: Number});
  const p = Point(5, 10);
  
//   console.log(p[0]); // 5
//   console.log(p.x);  // 5
//   console.log(p.y);  // 10
  console.log([...p])
