class OneStuff {
  constructor(name) {
    this.name = name
  }
  sayHello() {
    console.log('hello')
  }
}

function OtherStuff(name) { 
  this.name = name
}

OtherStuff.prototype.sayHello = function () {
  console.log('hello')
}

const oneStuff = new OneStuff('apple')
oneStuff.sayHello()

const otherStuff = new OtherStuff('peach')
otherStuff.sayHello()
