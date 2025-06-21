export abstract class Cursor {
  current: number;
  [Symbol.asyncIterator](): AsyncIterator<any, undefined, any>;
}
