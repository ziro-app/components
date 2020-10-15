import { GetReceivables } from "@bit/vitorbarbosa19.ziro.pay.zoop";

export interface ReceivablesData {
    amount: string;
    gross_amount: string;
    installment: string;
    receivableZoopId: string;
    status: string;
    split_rule: string;
    expectedOn?: Date;
    paidAt?: Date;
}

export default ({ items }: GetReceivables.Response) =>
    items
        .map(({ amount, expected_on, gross_amount, installment, paid_at, id, status, split_rule }) => {
            const data: ReceivablesData = {
                amount,
                gross_amount,
                installment: installment || "1",
                receivableZoopId: id,
                status,
                split_rule,
            };
            if (expected_on) data.expectedOn = new Date(new Date(expected_on).getTime() + 3 * 60 * 60 * 1000);
            if (paid_at) data.paidAt = new Date(new Date(paid_at).getTime() + 3 * 60 * 60 * 1000);
            return data;
        })
        .sort((a, b) => parseInt(a["installment"]) - parseInt(b["installment"]));
