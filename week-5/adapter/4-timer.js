'use strict';

class Timer {
  #counter = 0;
  #queue = [];

  constructor(delay) {
    setInterval(() => {
      this.#counter++;
      this.#queue.forEach((resolve) =>
        resolve({ value: this.#counter, done: false }),
      );
      this.#queue = [];
    }, delay);
  }

  [Symbol.asyncIterator]() {
    return { next: () => new Promise((resolve) => this.#queue.push(resolve)) };
  }
}

// Usage

const main = async () => {
  const timer = new Timer(1000);

  (async () => {
    console.log('Section 1 start');
    for await (const step of timer) {
      console.log({ section: 1, step });
    }
  })();

  (async () => {
    console.log('Section 2 start');
    const iter = timer[Symbol.asyncIterator]();
    do {
      const { value, done } = await iter.next();
      console.log({ section: 2, step: value, done });
    } while (true);
  })();

  (async () => {
    console.log('Section 3 start');
    const iter = timer[Symbol.asyncIterator]();
    do {
      const { value, done } = await iter.next();
      console.log({ section: 3, step: value, done });
    } while (true);
  })();
};

main();
