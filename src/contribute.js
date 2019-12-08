import { connect } from './mongo';
import { TransactionTypes } from './types';
import { transactionsCollection } from './collections';
import { generateSummary } from './summary';
import { generateMeta } from './meta';

export async function calculateContributions({ date, account, exchange }, newTransaction) {
  const { client, collection } = await connect(transactionsCollection(account));
  const query = { 'meta.date': { $lt: date }, 'meta.type': TransactionTypes.contribute.value };
  const coll = await collection.find(query);
  let contributions = {
    cad: newTransaction['cad'],
    usd: newTransaction['usd'],
  };

  while (await coll.hasNext()) {
    const transaction = await coll.next();
    const { details = {} } = transaction || {};
    const { cad = 0, usd = 0 } = details;
    contributions['cad'] += cad;
    contributions['usd'] += usd;
  }
  client.close();

  return contributions;
}

export async function contribute(answers) {
  const { deposit, currency } = answers;
  const details = { usd: 0, cad: 0 };
  details[currency] = deposit;

  const meta = await generateMeta(answers);
  const summary = await generateSummary(meta, details);
  const transaction = { meta, summary, details };
  return transaction;
}
