// A mix-in is essentially a function that adds methods to a class prototype
// This approach lets you add the same functionality to multiple classes

// Define a mix-in that adds swimming capability
const SwimMixin = (superclass) => class extends superclass {
  swim() {
    return `${this.name} is swimming.`;
  }

  dive() {
    return `${this.name} is diving underwater.`;
  }
};

// Define a mix-in that adds flying capability
const FlyMixin = (superclass) => class extends superclass {
  static staticProperty = "someValue";
  static staticMethod() {
    return "static method has been called.";
  }
  static {
    console.log("Class static initialization block called");
  }
  fly() {
    return `${this.name} is flying.`;
  }

  land() {
    return `${this.name} is landing.`;
  }
};

// Base class
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    return `${this.name} is eating.`;
  }
}

// Apply mix-ins to create derived classes
class Fish extends SwimMixin(Animal) {
  constructor(name) {
    super(name);
  }
}

class Bird extends FlyMixin(Animal) {
  constructor(name) {
    super(name);
  }
}

// Create a class with multiple mix-ins (composition)
class Duck extends SwimMixin(FlyMixin(Animal)) {
  constructor(name) {
    super(name);
  }

  quack() {
    return `${this.name} says: Quack!`;
  }
}

// Use the classes
const fish = new Fish("Nemo");
console.log(fish.swim());  // Nemo is swimming.
console.log(fish.eat());   // Nemo is eating.

const bird = new Bird("Tweety");
console.log(bird.fly());   // Tweety is flying.
console.log(bird.eat());   // Tweety is eating.

const duck = new Duck("Donald");
console.log(duck.swim());  // Donald is swimming.
console.log(duck.fly());   // Donald is flying.
console.log(duck.quack()); // Donald says: Quack!
console.log(duck.eat());   // Donald is eating.
