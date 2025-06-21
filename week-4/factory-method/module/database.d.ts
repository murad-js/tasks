import { Query } from './types.js';

export abstract class Database {
  abstract select(query: Query): any;
}
