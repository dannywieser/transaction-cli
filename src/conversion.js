import { generateSummary } from './summary';
import { generateMeta } from './meta';

export async function conversion(answers) {
  const { debit, credit, from, to } = answers;
  const details = {};
  details[to] = credit;
  details[from] = -debit;
  const exchange = debit / credit;

  const meta = await generateMeta(answers, exchange);
  const summary = await generateSummary(meta, details);
  const transaction = { meta, summary, details };
  return transaction;
}
