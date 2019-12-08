import fetch from 'node-fetch';

import { connect } from './mongo';
import { TransactionTypes } from './types';
import { transactionsCollection } from './collections';
import { round } from './utils';

// what makes summary have cash?
//   1. contribution USD/CAD
//   2. SELL transaction => + cash
//   3. BUY transaction => - cash
//   4. convert transaction => +/- cash

// https://api.exchangeratesapi.io/2019-02-12?symbols=CAD&base=USD
export async function getExchange(date) {
  const fmtDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const url = `https://api.exchangeratesapi.io/${fmtDate}?symbols=CAD&base=USD`;
  const response = await fetch(url);
  const {
    rates: { CAD },
  } = await response.json();
  return CAD;
}

export async function calculateCash({ date, account, exchange }, newTransaction) {
  const { client, collection } = await connect(transactionsCollection(account));
  const query = { 'meta.date': { $lt: date } };
  const coll = await collection.find(query);
  const cash = {
    usd: newTransaction.usd,
    cad: newTransaction.cad,
  };

  while (await coll.hasNext()) {
    const transaction = coll.next();
    const {
      meta: { type },
      details = {},
    } = transaction;
    const { cad = 0, usd = 0 } = details;
    if (type === TransactionTypes.contribute.value) {
      cash.cad = round(cash.cad + cad);
      cash.usd = round(cash.usd + usd);
    }
  }
  const totalInCAD = round(cash.cad + cash.usd * exchange);
  client.close();

  return { ...cash, totalInCAD };
}
