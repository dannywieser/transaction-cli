import { TransactionTypes } from './types';
// what makes summary have cash?
//   1. contribution USD/CAD
//   2. SELL transaction => + cash
//   3. BUY transaction => - cash
//   4. convert transaction => +/- cash

//https://api.exchangeratesapi.io/2019-02-12?symbols=CAD&base=USD

export async function calculateCash(collection, date, add = 0, addCurrency = 'cad') {
  const query = { 'meta.date': { $lt: date } };
  const coll = await collection.find(query);
  let cash = {
    usd: 0,
    cad: 0,
  };
  cash[addCurrency] = add;
  while (await coll.hasNext()) {
    const transaction = await coll.next();
    const {
      meta: { type, currency },
      details = {},
    } = transaction;
    if (type === TransactionTypes.contribute.value) {
      // contribution adds to cash
      const { deposit = 0 } = details;
      cash[currency] += deposit;
    }
  }
  return cash;
}
