'use strict';

interface IPerson {
  name: string;
}

export class Person implements IPerson {
  constructor(public name: string) {}
}

export const factory = (args: string) => {
  return new Person(args);
};

// Usage

const p1 = new Person('Marcus');
console.dir({ p1 });

const p2 = factory('Marcus');
console.dir({ p2 });
