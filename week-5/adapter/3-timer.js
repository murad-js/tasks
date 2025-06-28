'use strict';

class Timer extends EventTarget {
  #counter = 0;

  constructor(delay, createEventFn) {
    super();
    setInterval(() => {
      const step = this.#counter++;
      const data = { detail: { step } };
      const event = createEventFn(data);
      this.dispatchEvent(event);
    }, delay);
  }
}

const customEventFactory = (name) => ({
  factory: (data) => new CustomEvent(name, data),
  name,
});

// Usage
const { factory: stepFactory, name } = customEventFactory('step');
const timer = new Timer(1000, stepFactory);

timer.addEventListener(name, (event) => {
  console.log({ event, detail: event.detail });
});
