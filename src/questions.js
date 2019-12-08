import config from '../config';
import { TransactionTypes } from './types';

const toLower = (val) => (val ? val.toLowerCase() : val);

const currency = [
  {
    key: 'u',
    name: 'USD',
    value: 'usd',
  },
  {
    key: 'c',
    name: 'CAD',
    value: 'cad',
  },
];

const questions = [
  {
    type: 'expand',
    name: 'account',
    message: 'Which Account?',
    choices: config.accounts,
    filter: toLower,
  },
  {
    type: 'expand',
    name: 'type',
    message: 'What type of transaction?',
    choices: [TransactionTypes.contribute],
    filter: toLower,
  },
  {
    type: 'number',
    name: 'deposit',
    message: 'How much are you contributing?',
    when: ({ type }) => type === 'contribute',
  },
  {
    type: 'expand',
    name: 'currency',
    message: 'Currency?',
    default: 'cad',
    choices: currency,
    when: ({ type }) => type === 'contribute',
  },
];

export default questions;
