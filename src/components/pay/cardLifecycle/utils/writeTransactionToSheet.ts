import { sheet } from "@bit/vitorbarbosa19.ziro.utils.sheets";

const writeTransactionToSheet = async (body: string[]) => {
    return sheet(process.env.SHEET_ID_TRANSACTIONS).write({ values: [body], range: "Transacoes!A1" });
};

export default writeTransactionToSheet;
