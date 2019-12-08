import doAction from './mongo';

const allPreviousContributions = (date) => {
  let total = 0;
  doAction('transactions', (collection) => {
    collection.find({ date: { $lt: date } }).each((err, result) => {
      console.log(result);
      const { amount } = result;
      total += amount;
    });
  });
  return total;
};

export function contribute({ type, contribution, currency }) {
  const date = new Date();
  const transaction = {
    type,
    currency,
    date,
    amount: contribution,
  };
  allPreviousContributions(date);
  doAction('transactions', (collection, callback) => collection.insertOne(transaction, callback));
}

export function getContributionTotal() {
  //
}
