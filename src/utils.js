export const round = (value, decimals = 2) =>
  Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
