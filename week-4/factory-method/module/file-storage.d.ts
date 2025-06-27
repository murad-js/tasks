import { Database } from './database.js';
import { ReadStream } from 'fs';
import { FileLineCursor } from './file-line-cursor.js';
import { Query } from './types.js';

export interface IFileStorage {
  fileName: string;
  fileStream: ReadStream;
}

export class FileStorage extends Database implements IFileStorage {
  constructor(fileName: string);
  fileName: string;
  fileStream: ReadStream;
  select(query: Query): FileLineCursor;
}
