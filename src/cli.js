import inquirer from 'inquirer';
import questions from './questions';
import { contribute } from './contribute';
import chalk from 'chalk';
const log = console.log;

//console.log('-- Transaction Handler --');
log(chalk.white.bgBlue.bold('== Transaction::CLI =='));

const handlers = {
  contribute,
};

console.log('starting d');
inquirer.prompt(questions).then((answers) => {
  const { type } = answers;
  handlers[type](answers);
});
