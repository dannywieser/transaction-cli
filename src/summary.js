import { calculateTotalContributions } from './contribute';
import { calculateCash } from './cash';

export async function generateSummary({ account, deposit, currency, date }) {
  const totalContributions = await calculateTotalContributions(account, date, deposit);
  const cash = await calculateCash(account, date, deposit, currency);
  return { totalContributions, cash };
}
