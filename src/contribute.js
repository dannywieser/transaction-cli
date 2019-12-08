import { connect } from './mongo';
import { TransactionTypes } from './types';
import { transactionsCollection } from './collections';
import { generateSummary } from './summary';

export async function calculateTotalContributions(account, date, add = 0) {
  const { client, collection } = await connect(transactionsCollection(account));
  const query = { 'meta.date': { $lt: date }, 'meta.type': TransactionTypes.contribute.value };
  const coll = await collection.find(query);
  let total = 0;
  while (await coll.hasNext()) {
    const transaction = await coll.next();
    const { details = {} } = transaction || {};
    const { deposit = 0 } = details;
    total += deposit;
  }
  client.close();
  return total + add;
}

export async function contribute(answers) {
  const { type, deposit, currency, date } = answers;
  const summary = await generateSummary(answers);
  const meta = { date, type, currency };

  const transaction = {
    meta,
    summary,
    details: { deposit },
  };
  return transaction;
}
