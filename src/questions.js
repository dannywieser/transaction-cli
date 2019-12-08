const questions = [
  {
    type: 'expand',
    name: 'type',
    message: 'What type of transaction?',
    choices: [
      {
        key: 'b',
        name: 'Buy',
        value: 'buy',
      },
      {
        key: 's',
        name: 'Sell',
        value: 'sell',
      },
      {
        key: 'c',
        name: 'Contribute',
        value: 'contribute',
      },
    ],
    filter: (val) => val.toLowerCase(),
  },
  {
    type: 'number',
    name: 'contribution',
    message: 'How much are you contributing?',
    when: ({ type }) => type === 'contribute',
  },
  {
    type: 'expand',
    name: 'currency',
    message: 'Currency?',
    choices: [
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
    ],
    when: ({ type }) => type === 'contribute',
  },
];

export default questions;
