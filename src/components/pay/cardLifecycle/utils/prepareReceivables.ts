import formatDate from "./formatDate";
import { Receivable } from "../dataCreators/receivables";

const prepareReceivables = (transactionZoopId: string, receivables: Receivable[], markupId: string, antifraudId: string, equals: boolean) =>
    receivables.map(({ installment, gross_amount, amount, expected_on, paid_at, status, split_rule }, index) => {
        const type = split_rule
            ? equals
                ? index % 2 === 0
                    ? "Antifraude"
                    : "Markup"
                : split_rule === markupId
                ? "Markup"
                : split_rule === antifraudId
                ? "Antifraude"
                : "-"
            : "Zoop";
        const grossAmount = gross_amount.replace(".", ",");
        const finalAmount = amount.replace(".", ",");
        const dateExpected = expected_on ? formatDate(expected_on) : "";
        const datePaid = paid_at ? formatDate(paid_at) : "";
        const translatedStatus = status.toLowerCase() === "pending" ? "Pendente" : "Pago";
        return [transactionZoopId, installment, grossAmount, finalAmount, dateExpected, datePaid, translatedStatus, type];
    });

export default prepareReceivables;
