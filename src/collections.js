export const collections = {
  TRANSACTIONS: 'transactions',
};

export const transactionsCollection = (account) => `${collections.TRANSACTIONS}.${account}`;
