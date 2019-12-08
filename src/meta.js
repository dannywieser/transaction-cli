import { getExchange } from './cash';

export async function generateMeta({ date, type, currency, account }) {
  const exchange = await getExchange(date);
  return { date, type, currency, exchange, account };
}
