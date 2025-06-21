import { Cursor } from './cursor.js';
import { IFileStorage } from './file-storage.js';
import { Query } from './types.js';

export class FileLineCursor extends Cursor {
  constructor(fileStorage: IFileStorage, query: Query);
  query: Query;
  lines: AsyncIterator<string, undefined, any>;
  [Symbol.asyncIterator](): AsyncIterator<any, undefined, any>;
}
