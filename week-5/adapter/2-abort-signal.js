'use strict';

const promisify =
  (fn) =>
  (args, options = {}) => {
    return new Promise((resolve, reject) => {
      const signal = options.signal;

      const callback = (err, data) => {
        if (signal?.aborted) {
          reject('aborted');
          return;
        }

        if (err) reject(err);
        else resolve(data);
      };

      fn(...args, callback);
    });
  };

// Usage
const fs = require('node:fs');
const read = promisify(fs.readFile);

const main = async () => {
  const abortController = new AbortController();
  const fileName = __filename;

  const [data] = await Promise.all([
    read([fileName, 'utf8'], { signal: abortController.signal }),
    new Promise((resolve) => {
      setTimeout(() => abortController.abort(), 0);
      resolve();
    }),
  ]);

  console.log(`File "${fileName}" size: ${data.length}`);
};

main();
