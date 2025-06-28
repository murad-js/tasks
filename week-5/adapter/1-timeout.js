'use strict';

const promisify =
  (fn) =>
  (args, options = {}) => {
    return new Promise((resolve, reject) => {
      const timeout = options.timeout;
      let timer = null;
      let isPending = true;

      if (typeof timeout === 'number') {
        timer = setTimeout(() => {
          if (!isPending) return;
          isPending = false;
          reject(new Error('Timed out'));
        }, timeout);
      }

      const callback = (err, data) => {
        if (!isPending) return;
        isPending = false;
        if (timer) clearTimeout(timer);
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
  const fileName = __filename;
  const data = await read([fileName, 'utf8'], { timeout: 0 });
  console.log(`File "${fileName}" size: ${data.length}`);
};

main();
