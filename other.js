const blah = {
    identifier(arg) {
        console.log(this, this.foo, arg)
    },
    foo: 'bar'
}

blah.identifier('dfdfddf')