import { connect } from './mongo';
import { TransactionTypes } from './types';
import { transactionsCollection } from './collections';

import { round } from './utils';

export async function calculateContributions({ date, account, exchange, type }, newTransaction) {
  const { client, collection } = await connect(transactionsCollection(account));
  const query = { 'meta.date': { $lt: date }, 'meta.type': TransactionTypes.contribute.value };
  const coll = await collection.find(query);
  const contributions =
    type === TransactionTypes.contribute
    ? {
      cad: newTransaction.cad,
      usd: newTransaction.usd,
        }
    : { cad: 0, usd: 0 };

  while (await coll.hasNext()) {
    const transaction = await coll.next();
    const { details = {} } = transaction || {};
    const { cad = 0, usd = 0 } = details;
    contributions.cad += cad;
    contributions.usd += usd;
  }
  const totalInCAD = round(contributions.cad + contributions.usd * exchange);
  client.close();

  return { ...contributions, totalInCAD };
}
