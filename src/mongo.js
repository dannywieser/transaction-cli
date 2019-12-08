import { MongoClient } from 'mongodb';
import dbConfig from '../config';

const { url } = dbConfig;
const dbName = dbConfig.name;
const mongoConfig = { useUnifiedTopology: true };

export async function connect(collectionName) {
  const client = await MongoClient.connect(url, mongoConfig);
  const db = client.db(dbName);
  return { client, collection: db.collection(collectionName) };
}
