import { sheet } from "@bit/vitorbarbosa19.ziro.utils.sheets";

const writeReceivablesToSheet = async (body: string[][]) => {
  return sheet(process.env.SHEET_ID_TRANSACTIONS).write({ values: body, range: 'Recebiveis!A1' });
};

export default writeReceivablesToSheet;
