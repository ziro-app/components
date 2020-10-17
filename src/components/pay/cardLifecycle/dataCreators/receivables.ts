import { GetReceivables } from "@bit/vitorbarbosa19.ziro.pay.zoop";

export interface Receivable {
    amount: string;
    expected_on?: Date;
    gross_amount: string;
    installment: string;
    paid_at?: Date;
    receivableZoopId: string;
    status: string;
    split_rule?: string;
}

export default ({ items }: GetReceivables.Response) =>
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
