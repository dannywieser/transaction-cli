import { calculateContributions } from './contribute';
import { calculateCash } from './cash';
import { getHoldings } from './holdings';
import { round } from './utils';
import { calculateReturn } from './return';

export async function generateSummary(meta, details) {
  const contributions = await calculateContributions(meta, details);
  const cash = await calculateCash(meta, details);
  const { exchange } = meta;
  const returns = await calculateReturn(contributions, cash);
  // const holdings = await getHoldings(account);

  const totals = { cad: 0, usd: 0 };
  totals.cad = round(cash.cad + cash.usd * exchange);
  totals.usd = round(cash.cad / exchange + cash.usd);

  return {
    contributions,
    cash,
    totals,
    returns,
  };
}
