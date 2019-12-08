export function calculateReturn({ totalInCAD: contribInCAD }, { totalInCAD: cashInCAD }) {
  const all = (contribInCAD - cashInCAD) / contribInCAD;
  return { all, annualized: 0 };
}
