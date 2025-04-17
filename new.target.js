function Blah() {
    console.log('Blah new.target', new.target, typeof new.target)
}

const other = () => {
    console.log('other new.target', new.target)
}

const blah = new Blah()
// const blah2 = Blah()
// const other2 = other()

function Person(name) {
  if (!new.target) {
    // Called without new, redirect to proper constructor
    return new Person(name);
  }
  
  this.name = name;
}

const person1 = new Person("Alice");    // new.target is Person
const person2 = Person("Bob");          // new.target is undefined, but redirected
// abstract class can not be instantiated
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error("Shape is abstract and cannot be instantiated directly");
    }
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
}
