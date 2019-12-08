import { connect } from './mongo';
import { TransactionTypes } from './types';
import { calculateCash } from './cash';

export async function calculateTotalContributions(collection, date, add = 0) {
  const query = { 'meta.date': { $lt: date }, 'meta.type': TransactionTypes.contribute.value };
  const coll = await collection.find(query);
  let total = 0;
  while (await coll.hasNext()) {
    const transaction = await coll.next();
    const { details = {} } = transaction || {};
    const { deposit = 0 } = details;
    total += deposit;
  }
  return total + add;
}

export async function contribute({ account, type, deposit, currency }) {
  const date = new Date();
  const { client, collection } = await connect(`transactions.${account}`);
  const totalContributions = await calculateTotalContributions(collection, date, deposit);
  const cash = await calculateCash(collection, date, deposit, currency);

  const transaction = {
    meta: {
      date,
      type,
      currency,
    },
    details: { deposit },
    summary: { totalContributions, cash },
  };
  console.log(transaction);
  collection.insertOne(transaction, () => client.close());
}
