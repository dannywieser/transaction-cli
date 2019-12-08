import inquirer from 'inquirer';
import questions from './questions';
import { contribute } from './contribute';
import { transactionsCollection } from './collections';
import { connect } from './mongo';
import chalk from 'chalk';

console.log(chalk.white.bgBlue.bold('== Transaction::CLI =='));

const handlers = {
  contribute,
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
  const transaction = await handlers[type]({ ...answers, date: new Date() });
  confirmAndWrite(transaction, account);
});
