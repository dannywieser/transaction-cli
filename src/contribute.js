import { connect } from './mongo';
import { TransactionTypes } from './types';

export async function calculateTotalContributions(collection, date) {
  const query = { 'meta.date': { $lt: date }, 'meta.type': TransactionTypes.contribute.value };
  const coll = await collection.find(query);
  let total = 0;
  while (await coll.hasNext()) {
    const transaction = await coll.next();
    const { details = {} } = transaction || {};
    const { deposit = 0 } = details;
    total += deposit;
  }
  return total;
}

export async function contribute({ account, type, deposit, currency }) {
  const date = new Date();
  const { client, collection } = await connect(`transactions.${account}`);
  const prevContributions = await calculateTotalContributions(collection, date);
  const totalContributions = prevContributions + deposit;

  const transaction = {
    meta: {
      date,
      type,
      currency,
    },
    details: { deposit },
    summary: { totalContributions },
  };
  console.log(transaction);
  collection.insertOne(transaction, () => client.close());
}
