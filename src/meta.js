import { getExchange } from './cash';

export async function generateMeta({ date, type, currency, account }, rate = null) {
  const exchange = rate ? rate : await getExchange(date);
  return { date, type, currency, exchange, account };
}
