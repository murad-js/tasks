import { FileStorage } from './module';

const main = async () => {
  const db = new FileStorage(`${__dirname}/storage.dat`);
  const cursor = db.select({ city: 'Roma' });
  for await (const record of cursor) {
    console.dir(record);
  }
};

main();
