const fs = require('node:fs');
const { Database } = require('./database.js');
const { FileLineCursor } = require('./file-line-cursor.js');

class FileStorage extends Database {
  constructor(fileName) {
    super();
    this.fileName = fileName;
    this.fileStream = fs.createReadStream(fileName);
  }

  select(query) {
    return new FileLineCursor(this, query);
  }
}

module.exports = { FileStorage };
