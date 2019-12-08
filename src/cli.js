import inquirer from 'inquirer';
import chalk from 'chalk';
import clear from 'clear';
import questions from './questions';
import { contribute, conversion, buy } from './handlers';
import { transactionsCollection } from './collections';
import { connect } from './mongo';

clear();
console.log(chalk.white.bgBlue.bold('=== Transaction::CLI ==='));

const handlers = {
  contribute,
  conversion,
  buy,
};

const confirmAndWrite = (transaction, account) => {
  console.dir(transaction);
  inquirer
    .prompt({
      type: 'confirm',
      name: 'confirmTransaction',
      message: 'Is this correct?',
    })
    .then(async () => {
      const { client, collection } = await connect(transactionsCollection(account));
      collection.insertOne(transaction, () => client.close());
    });
};

inquirer.prompt(questions).then(async (answers) => {
  const { type, account } = answers;
  const transaction = await handlers[type](answers);
  confirmAndWrite(transaction, account);
});
