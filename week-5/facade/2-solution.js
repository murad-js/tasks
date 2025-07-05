'use strict';

class TimeoutCollection extends Map {
  constructor(timeout) {
    super();
    this.timeout = timeout;
    this.timers = new Map();
  }

  set(key, value) {
    const timer = this.timers.get(key);
    if (timer) clearTimeout(timer);
    const timeout = setTimeout(() => {
      this.delete(key);
    }, this.timeout);
    timeout.unref();
    super.set(key, value);
    this.timers.set(key, timeout);
  }

  delete(key) {
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(key);
    }
    super.delete(key);
  }

  toArray() {
    return [...super.entries()];
  }
}

// Usage

const hash = new TimeoutCollection(1000);
hash.set('uno', 1);
console.dir({ array: hash.toArray() });

hash.set('due', 2);
console.dir({ array: hash.toArray() });

setTimeout(() => {
  hash.set('tre', 3);
  console.dir({ array: hash.toArray() });

  setTimeout(() => {
    hash.set('quattro', 4);
    console.dir({ array: hash.toArray() });
  }, 500);
}, 1500);
