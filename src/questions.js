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
    type: 'input',
    name: 'date',
    message: 'Transaction date',
    default: new Date(),
    filter: (value) => new Date(value),
  },
  {
    type: 'expand',
    name: 'type',
    message: 'What type of transaction?',
    choices: [TransactionTypes.contribute, TransactionTypes.conversion],
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
  {
    type: 'expand',
    name: 'from',
    message: 'from',
    default: 'cad',
    choices: currency,
    when: ({ type }) => type === 'conversion',
  },
  {
    type: 'expand',
    name: 'to',
    message: 'to',
    default: 'usd',
    choices: currency,
    when: ({ type }) => type === 'conversion',
  },
  {
    type: 'number',
    name: 'debit',
    message: 'Source debit',
    when: ({ type }) => type === 'conversion',
  },
  {
    type: 'number',
    name: 'credit',
    message: 'Target Credit',
    when: ({ type }) => type === 'conversion',
  },
];

export default questions;
