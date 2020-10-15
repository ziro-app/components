const formatDate = require('./formatDate');

interface Receivable {
  amount: string;
  expected_on: Date | null;
  gross_amount: string;
  installment: string;
  paid_at: Date | null;
  receivableZoopId: string;
  status: string;
  split_rule?: string;
}

const prepareReceivables = (transactionZoopId: string, receivables: Receivable[], markupId: string, antifraudId: string, equals: boolean) =>
  receivables.map(({ installment, gross_amount, amount, expected_on, paid_at, status, split_rule }, index) => {
    const type = split_rule ? equals ? index % 2 === 0 ? 'Antifraude' : 'Markup' : split_rule === markupId ? 'Markup' : split_rule === antifraudId ? 'Antifraude' : '-' : 'Zoop'
    const grossAmount = gross_amount.replace('.', ',')
    const finalAmount = amount.replace('.', ',')
    const dateExpected = expected_on ? formatDate(expected_on) : ''
    const [expected] = typeof dateExpected === 'string' ? dateExpected.split(' ') : ''
    const datePaid = paid_at ? formatDate(paid_at) : ''
    const [paid] = typeof datePaid === 'string' ? datePaid.split(' ') : ''
    const translatedStatus = status.toLowerCase() === 'pending' ? 'Pendente' : 'Pago'
    return [transactionZoopId, installment, grossAmount, finalAmount, expected, paid, translatedStatus, type]
  });

export default prepareReceivables;
