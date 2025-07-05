'use strict';

const timeoutCollection = (ttl) => {
  const collection = new Map();
  let interval = null;

  const isInFuture = (timeInMs) => timeInMs - Date.now() > 0;
  const deleteExpired = () => {
    for (const [key, { value, expiryTime }] of collection) {
      if (!isInFuture(expiryTime)) {
        collection.delete(key);
      }
    }
  };
  const clearIntervalIfNeeded = () => {
    if (interval && collection.size === 0) {
      clearInterval(interval);
      interval = null;
    }
  };

  return {
    set: (key, value) => {
      collection.set(key, {
        value,
        expiryTime: Date.now() + ttl,
      });

      if (!interval) {
        interval = setInterval(() => {
          deleteExpired();
          clearIntervalIfNeeded();
        }, ttl);
      }
    },

    get: (key) => {
      const item = collection.get(key);

      if (!item) return;
      if (isInFuture(item.expiryTime)) return item.value;

      collection.delete(key);
      clearIntervalIfNeeded();
    },

    delete: (key) => {
      const item = collection.get(key);
      if (!item) return false;

      collection.delete(key);
      clearIntervalIfNeeded();
      return true;
    },

    toArray: () => {
      deleteExpired();
      clearIntervalIfNeeded();

      return Array.from(collection, ([key, { value }]) => [key, value]);
    },
  };
};

// Usage

const hash = timeoutCollection(2000);
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
