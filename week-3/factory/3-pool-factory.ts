'use strict';

interface PoolOptions<T extends (...args: any) => any> {
  factory: T;
  factoryOptions: Parameters<T>;
  poolSize: number;
}

interface PoolResult<T extends (...args: any) => any> {
  acquire: () => ReturnType<T>;
  release: (instance: ReturnType<T>) => void;
}

export const poolify = <T extends (...args: any) => any>({
  factory: argFactory,
  factoryOptions,
  poolSize,
}: PoolOptions<T>): PoolResult<T> => {
  const factory = () => argFactory(...factoryOptions);
  const instances = new Array(poolSize).fill(null).map(factory);

  const acquire = () => {
    const instance = instances.pop() || factory();
    console.log('Get from pool, count =', instances.length);
    return instance;
  };

  const release = (instance) => {
    instances.push(instance);
    console.log('Recycle item, count =', instances.length);
  };

  return { acquire, release };
};

// Usage
type NumberFactory = (items?: number[]) => number[];

const factory: NumberFactory = (items) => {
  if (items) {
    return [...items];
  }

  return new Array<number>(1000).fill(0);
};

const POOL_SIZE = 1000;
const arrayPool = poolify<NumberFactory>({
  factory,
  factoryOptions: [new Array<number>(1000).fill(0)],
  poolSize: POOL_SIZE,
});

const a1 = arrayPool.acquire();
const b1 = a1.map((_, i) => i).reduce((x, y) => x + y);
console.log(b1);

const a2 = factory();
const b2 = a2.map((_, i) => i).reduce((x, y) => x + y);
console.log(b2);

factory(a1);
factory(a2);

const a3 = factory();
const b3 = a3.map((_, i) => i).reduce((x, y) => x + y);
console.log(b3);
