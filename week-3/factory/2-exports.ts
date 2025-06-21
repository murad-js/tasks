'use strict';

interface IPerson {
  name: string;
}

export class Person implements IPerson {
  constructor(public name: string) {}
}

export const personFactory = (args: string) => {
  return new Person(args);
};

// Usage

const p1 = new Person('Marcus');
console.dir({ p1 });

const p2 = personFactory('Marcus');
console.dir({ p2 });
