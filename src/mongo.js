import { MongoClient } from 'mongodb';
import config from '../config';

const {
  dbConfig: { url, name },
} = config;
const mongoConfig = { useUnifiedTopology: true };

export async function connect(collectionName) {
  const client = await MongoClient.connect(url, mongoConfig);
  const db = client.db(name);
  return { client, collection: db.collection(collectionName) };
}
