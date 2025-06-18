'use strict';

class Product {
  constructor(value) {
    this.field = value;
  }
}

class Creator {
  #entity;

  constructor(entity) {
    this.#entity = entity;
  }

  factoryMethod(...args) {
    return new this.#entity(...args);
  }
}

// Usage

const creator = new Creator(Product);
console.dir(creator);
const product = creator.factoryMethod('value');
console.dir(product);
