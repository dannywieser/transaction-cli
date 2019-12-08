import { calculateContributions } from './contribute';
import { calculateCash } from './cash';
import { getHoldings } from './holdings';
import { round } from './utils';

export async function generateSummary(meta, details) {
  const contributions = await calculateContributions(meta, details);
  const cash = await calculateCash(meta, details);
  const { exchange } = meta;
  // const holdings = await getHoldings(account);

  const totals = { cad: 0, usd: 0 };
  totals['cad'] = cash['cad'] + round(cash['usd'] * exchange, 2);
  totals['usd'] = round(cash['cad'] / exchange, 2) + cash['usd'];

  return { contributions, cash, totals };
}
