import { MongoClient } from 'mongodb';
import dbConfig from '../config';

const { url } = dbConfig;
const dbName = dbConfig.name;
const mongoConfig = { useUnifiedTopology: true };
console.log(url);
const client = new MongoClient(url, mongoConfig);

function doAction(collectionName, action) {
  client.connect(() => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    action(collection, (err) => {
      if (err) {
        console.error(err);
      }
      client.close();
    });
  });
}

export default doAction;
