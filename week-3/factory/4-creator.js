'use strict';

class Product {
  constructor(value) {
    this.field = value;
  }
}

//  Solution using class
class Creator {
  #args;

  constructor(...args) {
    this.#args = args;
  }

  factoryMethod() {
    return new Product(...this.#args);
  }
}

//  Solution using closure
const productFactory =
  (...args) =>
  () =>
    new Product(...args);

// Usage
const arg = 'value';

const creator = new Creator(arg);
console.dir(creator);

const product = creator.factoryMethod();
console.dir(product);

const creatorClosure = productFactory(arg);
console.log(creatorClosure.toString());

const product2 = creatorClosure();
console.dir(product2);
