interface Fees {
  amount: string;
}

interface Types {
  feeZiro: Fees;
  feeAntifraud: Fees;
  feeMarkup: Fees;
  feeZoop: Fees;
}

const roundedValue = (value: string) => Math.round((parseFloat(value) + Number.EPSILON) * 100) / 100;

const prepareFees = (fees: string, fee_details: any, receivables: any) => {
  let feeTypes: Types = { feeZiro: { amount: '' }, feeAntifraud: { amount: '' }, feeMarkup: { amount: '' }, feeZoop: { amount: '' } };
  fee_details.forEach(fee => {
    const [feeName] = fee.type.split('_')
    if (feeName === 'ziro') feeTypes.feeZiro = fee
    else if (feeName === 'antifraud') feeTypes.feeAntifraud = fee
    else if (feeName === 'markup') feeTypes.feeMarkup = fee
    else feeTypes.feeZoop = fee
  })
  const { feeZoop, feeMarkup, feeAntifraud, feeZiro } = feeTypes
  const totalAmount = receivables
    .map(item => item.amount)
    .reduce((acc, curr) => Number(acc) + Number(curr))
  if (!feeZoop || !feeMarkup || !feeAntifraud || !feeZiro || !fees || !totalAmount) throw { status: 500, msg: 'Data from Zoop or from reducer is incorrect' }
  const valueZoop = roundedValue(feeZoop.amount).toString().replace('.', ',');
  const valueZiroFromZoop = roundedValue(feeZiro.amount);
  const valueMarkup = `${valueZiroFromZoop + roundedValue(feeMarkup.amount)}`.replace('.', ',');
  const valueAntifraud = roundedValue(feeAntifraud.amount).toString().replace('.', ',');
  const valueZiro = roundedValue(feeMarkup.amount) + roundedValue(feeAntifraud.amount);
  const valueFees = parseFloat(fees) + valueZiro;
  // totalAmount already discounts the zoop fee
  const totalAmountWithComma = (Math.round(((totalAmount - valueZiro) + Number.EPSILON) * 100) / 100).toString().replace('.', ',');
  return [valueZoop, valueMarkup, valueAntifraud, `${valueZiro + valueZiroFromZoop}`.replace('.', ','), `${valueFees}`.replace('.', ','), totalAmountWithComma]
}

export default prepareFees;
