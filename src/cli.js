import inquirer from 'inquirer';
import questions from './questions';
import { contribute } from './contribute';
import chalk from 'chalk';

console.log(chalk.white.bgBlue.bold('== Transaction::CLI =='));

const handlers = {
  contribute,
};

inquirer.prompt(questions).then((answers) => {
  const { type } = answers;
  handlers[type](answers);
});
