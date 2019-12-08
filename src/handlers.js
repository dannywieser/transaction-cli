import { generateSummary } from './summary';
import { generateMeta } from './meta';

const buildTransaction = async (answers, amounts, details) => {
  const { exchange = null } = details;
  const meta = await generateMeta(answers, exchange);
  const summary = await generateSummary(meta, amounts);
  const transaction = { meta, summary, details };
  return transaction;
};

export async function contribute(answers) {
  const { deposit, currency } = answers;
  const amounts = { usd: 0, cad: 0 };
  amounts[currency] = deposit;
  return await buildTransaction(answers, amounts);
}

export async function conversion(answers) {
  const { debit, credit, from, to } = answers;
  const amounts = {};
  amounts[to] = credit;
  amounts[from] = -debit;
  const exchange = debit / credit;
  return await buildTransaction(answers, amounts, { exchange });
}

export async function buy(answers) {
  const { symbol, shares, price, fee, currency } = answers;
  const net = shares * price;
  const gross = net + fee;
  const details = {
    symbol,
    shares,
    price,
    fee,
    gross,
    net,
  };
  const amounts = {
    usd: 0,
    cad: 0,
    [currency]: -gross,
  };
  return await buildTransaction(answers, amounts, details);
}
