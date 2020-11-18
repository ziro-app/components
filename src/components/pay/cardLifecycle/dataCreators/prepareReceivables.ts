import { GetReceivables, RegisteredTransaction } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import formatDate from "./formatDate";

interface Receivable {
    amount: string;
    gross_amount: string;
    installment: string;
    receivableZoopId: string;
    status: string;
    split_rule: any;
    expected_on?: Date;
    paid_at?: Date;
}

const roundedValue = (value: string | number) => Math.round((parseFloat(`${value}`) + Number.EPSILON) * 100) / 100;

const formatReceivablesDB = ({ items }: GetReceivables.Response) =>
    items
        .map(({ amount, expected_on, gross_amount, installment, paid_at, id, status, split_rule }) => {
            const data: Receivable = {
                amount,
                gross_amount,
                installment: installment || "1",
                receivableZoopId: id,
                status,
                split_rule,
            };
            if (expected_on) data.expected_on = new Date(new Date(expected_on).getTime() + 3 * 60 * 60 * 1000);
            if (paid_at) data.paid_at = new Date(new Date(paid_at).getTime() + 3 * 60 * 60 * 1000);
            return data;
        })
        .sort((a, b) => parseInt(a["installment"]) - parseInt(b["installment"]));

const formatReceivablesSheet = (transactionZoopId: string, receivables: Receivable[], { antiFraud, markup }: any) =>
    receivables.map(({ installment, gross_amount, amount, expected_on, paid_at, status, split_rule }) => {
        let type = "-";
        if (split_rule === null) type = "Zoop";
        if (split_rule === markup.id) type = "Markup";
        if (split_rule === antiFraud.id) type = "Antifraud";
        const grossAmount = gross_amount.replace(".", ",");
        const finalAmount = amount.replace(".", ",");
        const dateExpected = expected_on ? formatDate(expected_on) : "";
        const datePaid = paid_at ? formatDate(paid_at) : "";
        const translatedStatus = status.toLowerCase() === "pending" ? "Pendente" : "Pago";
        return [transactionZoopId, installment, grossAmount, finalAmount, dateExpected, datePaid, translatedStatus, type];
    });

const simplifyFeeDetails = (fee_details: RegisteredTransaction.Response["fee_details"], { antiFraud, markup }: any) => {
    const [antifraudObj, markupObj] = [antiFraud, markup].map(({ receivable_amount }, index) => ({
        amount: receivable_amount || "0.00",
        type: index === 0 ? "antifraud_ziro_fee_brazil" : "markup_ziro_fee_brazil",
        description: index === 0 ? "Ziro antifraud card-present transaction fee" : "Ziro markup card-present transaction fee",
    }));
    return [...fee_details, antifraudObj, markupObj].map(({ amount, type, description }) => ({ amount, type, description }));
};

const formatFeeDetailsSheet = (fees: string, fee_details: any, receivables: any) => {
    const feeTypes = fee_details.reduce((acc, fee) => {
        const [feeName] = fee.type.split("_");
        if (feeName === "ziro") return { ...acc, feeZiro: fee };
        if (feeName === "antifraud") return { ...acc, feeAntifraud: fee };
        if (feeName === "markup") return { ...acc, feeMarkup: fee };
        return { ...acc, feeZoop: fee };
    }, {});
    const { feeZoop, feeMarkup, feeAntifraud, feeZiro } = feeTypes;
    const totalAmount = receivables.map((item) => item.amount).reduce((acc, curr) => Number(acc) + Number(curr));
    const valueZoop = roundedValue(feeZoop?.amount ?? 0)
        .toString()
        .replace(".", ",");
    const valueZiroFromZoop = roundedValue(feeZiro?.amount ?? 0);
    const valueMarkup = `${valueZiroFromZoop + roundedValue(feeMarkup?.amount ?? 0)}`.replace(".", ",");
    const valueAntifraud = roundedValue(feeAntifraud?.amount || 0)
        .toString()
        .replace(".", ",");
    const valueZiro = roundedValue(feeMarkup?.amount || 0) + roundedValue(feeAntifraud?.amount || 0);
    const valueFees = parseFloat(fees) + valueZiro;
    // totalAmount already discounts the zoop fee
    const totalAmountWithComma = roundedValue(totalAmount - valueZiro)
        .toString()
        .replace(".", ",");
    return [
        valueZoop,
        valueMarkup,
        valueAntifraud,
        `${valueZiro + valueZiroFromZoop}`.replace(".", ","),
        `${valueFees}`.replace(".", ","),
        totalAmountWithComma,
    ];
};

export default (
    response: GetReceivables.Response | undefined,
    transactionId: string,
    fee_details: RegisteredTransaction.Response["fee_details"],
    fees: RegisteredTransaction.Response["fees"],
    split_rules: any,
    insurance: boolean,
) => {
    if (insurance || !response) return { receivablesSheet: [], feeDetailsSheet: [] };
    const receivablesDB = formatReceivablesDB(response);
    const feeDetailsDB = simplifyFeeDetails(fee_details, split_rules);
    const feeDetailsSheet = formatFeeDetailsSheet(fees, feeDetailsDB, receivablesDB);
    const total = roundedValue(feeDetailsDB.map(({ amount }) => parseFloat(amount)).reduce((a, c) => a + c)).toString();
    const receivablesSheet = formatReceivablesSheet(transactionId, receivablesDB, split_rules);
    return {
        receivablesDB,
        feeDetailsDB,
        total,
        receivablesSheet,
        feeDetailsSheet,
    };
};
